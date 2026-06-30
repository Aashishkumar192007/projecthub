import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto, RegisterDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string, tenant_id: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { email, tenant_id },
      include: { roleAssignments: { include: { role: { include: { baseTemplate: true } } } } }
    });

    if (user && await bcrypt.compare(pass, user.auth_id)) {
      const { auth_id, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const roles = user.roleAssignments ? user.roleAssignments.map(ra => ra.role.name) : [];

    let vertical = null;
    if (user.roleAssignments && user.roleAssignments.length > 0) {
      const assignmentWithTemplate = user.roleAssignments.find(ra => ra.role && ra.role.baseTemplate);
      if (assignmentWithTemplate) {
        vertical = (assignmentWithTemplate.role.baseTemplate as any).vertical;
      }
    }

    const payload = {
      email: user.email,
      sub: user.user_id,
      tenant_id: user.tenant_id,
      organizationId: user.organizationId,
      roles: roles,
      vertical: vertical
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-1234',
      }),
      user: {
        user_id: user.user_id,
        email: user.email,
        name: user.name,
        roles: payload.roles,
        tenant_id: user.tenant_id,
        vertical: vertical
      }
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, password, fullName, roleId, scopeReference, tenantId } = registerDto;

    // 1. Resolve or seed Tenant based on workspace context / email domain
    let resolvedTenantId = tenantId;
    if (!resolvedTenantId) {
      const domain = email.split('@')[1];
      if (!domain) {
        throw new UnauthorizedException('Invalid email format');
      }
      const tenantIdCandidate = domain.split('.')[0] + '-corp';

      // Find or create tenant
      const tenant = await this.prisma.tenant.findFirst({
        where: { slug: tenantIdCandidate }
      });
      if (tenant) {
        resolvedTenantId = tenant.tenant_id;
      } else {
        const newTenant = await this.prisma.tenant.create({
          data: {
            name: domain.split('.')[0].toUpperCase() + ' Corp',
            slug: tenantIdCandidate,
            business_type: 'DEVELOPER',
            plan: 'BASIC',
            schema_name: 'public',
            status: 'ACTIVE'
          }
        });
        resolvedTenantId = newTenant.tenant_id;
      }
    } else {
      const tenant = await this.prisma.tenant.findUnique({ where: { tenant_id: resolvedTenantId } });
      if (!tenant) {
        throw new NotFoundException('Tenant not found');
      }
    }

    const existing = await this.prisma.user.findFirst({ where: { email, tenant_id: resolvedTenantId } });
    if (existing) {
      throw new UnauthorizedException('User already exists in this tenant');
    }

    // 2. Resolve RoleTemplate
    const template = await this.prisma.roleTemplate.findUnique({
      where: { template_id: roleId }
    });
    if (!template) {
      throw new NotFoundException('Selected role template not found');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // 3. Execute atomic transaction for user creation, role resolution, and scoped assignment
    const result = await this.prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email,
          auth_id: passwordHash,
          name: fullName,
          status: 'ACTIVE',
          tenant_id: resolvedTenantId,
        }
      });

      // Find or create a tenant-specific Role for this template
      let role = await tx.role.findFirst({
        where: {
          tenant_id: resolvedTenantId,
          base_template_id: template.template_id
        }
      });

      if (!role) {
        const newRole = await tx.role.create({
          data: {
            tenant_id: resolvedTenantId,
            name: template.name,
            description: template.description,
            base_template_id: template.template_id
          }
        });
        role = newRole;

        // Copy permissions from seeded system role if exists
        const systemRole = await tx.role.findFirst({
          where: {
            name: template.name,
            tenant_id: resolvedTenantId
          },
          include: {
            rolePermissions: true
          }
        });

        if (systemRole && systemRole.rolePermissions.length > 0) {
          await tx.rolePermission.createMany({
            data: systemRole.rolePermissions.map(p => ({
              role_id: newRole.role_id,
              permission_id: p.permission_id
            }))
          });
        }
      }

      // Determine scope
      const scope_type = scopeReference ? 'PROJECT' : 'TENANT';
      const scope_id = scopeReference ? scopeReference : resolvedTenantId;

      // Create role assignment
      await tx.roleAssignment.create({
        data: {
          user_id: user.user_id,
          tenant_id: resolvedTenantId,
          role_id: role.role_id,
          scope_type,
          scope_id
        }
      });

      return user;
    });

    // Fetch complete user with assignments for login response
    const completeUser = await this.prisma.user.findUnique({
      where: { user_id: result.user_id },
      include: {
        roleAssignments: {
          include: { role: { include: { baseTemplate: true } } }
        }
      }
    });

    if (!completeUser) {
      throw new NotFoundException('Registered user not found');
    }

    // Seed welcome notification
    await this.prisma.notification.create({
      data: {
        user_id: completeUser.user_id,
        tenant_id: completeUser.tenant_id,
        title: 'Welcome to PropertyHub360',
        message: `Welcome, ${completeUser.name}! Your workspace environment has been successfully configured.`,
      }
    });

    return this.login(completeUser);
  }

  async refreshToken(user: any) {
    const payload = {
      email: user.email,
      sub: user.sub,
      tenant_id: user.tenant_id,
      organizationId: user.organizationId,
      roles: user.roles
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async getRoleTemplatesByVertical(vertical: string) {
    return this.prisma.roleTemplate.findMany({
      where: {
        is_global_template: true
      } as any
    });
  }
}
