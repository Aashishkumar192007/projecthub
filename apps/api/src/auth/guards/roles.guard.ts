import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, PERMISSION_KEY, PermissionRequirement } from '../decorators/roles.decorator';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Check for granular permissions first
    const requiredPermission = this.reflector.getAllAndOverride<PermissionRequirement>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (requiredPermission) {
      if (!user || !user.sub) {
        throw new ForbiddenException('Access Denied: User not authenticated');
      }

      const userId = user.sub;
      const { resource, action } = requiredPermission;

      // Query the RoleAssignment table to find matching role with the required permission
      const assignments = await this.prisma.roleAssignment.findMany({
        where: {
          user_id: userId,
          role: {
            rolePermissions: {
              some: {
                permission: {
                  code: `${action}:${resource}`,
                },
              },
            },
          },
        },
      });

      if (assignments.length === 0) {
        throw new ForbiddenException(`Access Denied: Lacks permission ${action} on ${resource}`);
      }

      // 2. Scope Validation
      // Extract resource ID from request params (e.g. :id), body, or query
      const resourceId = request.params.id || request.body.id || request.query.id;

      const hasValidScope = assignments.some((assignment) => {
        if (assignment.scope_type === 'TENANT') {
          return true; // Tenant-wide scope, always allowed
        }
        if (resourceId && assignment.scope_id === resourceId) {
          return true; // Resource-specific scope matches
        }
        return false;
      });

      if (!hasValidScope) {
        throw new ForbiddenException(
          `Access Denied: Permission exists but scope check failed. Required Resource ID: ${resourceId}`
        );
      }

      return true;
    }

    // 3. Fallback to deprecated role-based check if permission is not specified
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // No auth metadata, public endpoint
    }

    if (!user || !user.sub) {
      throw new ForbiddenException('Access Denied: User not authenticated');
    }

    // Verify user roles via RoleAssignment
    const assignments = await this.prisma.roleAssignment.findMany({
      where: {
        user_id: user.sub,
        role: {
          name: {
            in: requiredRoles,
          },
        },
      },
      include: {
        role: true,
      },
    });

    if (assignments.length === 0) {
      throw new ForbiddenException(`Access Denied: Required one of roles [${requiredRoles.join(', ')}]`);
    }

    return true;
  }
}
