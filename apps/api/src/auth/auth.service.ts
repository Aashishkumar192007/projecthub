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
  ) {}

  async validateUser(email: string, pass: string, tenantId: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { email, tenantId },
      include: { userRoles: { include: { role: true } } }
    });
    
    if (user && await bcrypt.compare(pass, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id, 
      tenantId: user.tenantId,
      organizationId: user.organizationId,
      roles: user.userRoles.map(ur => ur.role.name)
    };
    
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-1234',
      }),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: payload.roles,
        tenantId: user.tenantId,
      }
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, tenantId } = registerDto;
    
    // Validate tenant exists
    const tenant = await this.prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) throw new NotFoundException('Tenant not found');

    const existing = await this.prisma.user.findFirst({ where: { email, tenantId } });
    if (existing) throw new UnauthorizedException('User already exists in this tenant');

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        tenantId,
      },
      include: { userRoles: { include: { role: true } } }
    });

    return this.login(user);
  }

  async refreshToken(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.sub, 
      tenantId: user.tenantId,
      organizationId: user.organizationId,
      roles: user.roles
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
