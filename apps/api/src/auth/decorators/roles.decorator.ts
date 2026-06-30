import { SetMetadata } from '@nestjs/common';

// Deprecated: Use RequirePermission instead
export const ROLES_KEY = 'roles';
export const RequireRoles = (...roles: string[]) => {
  return SetMetadata(ROLES_KEY, roles);
};

export const PERMISSION_KEY = 'permission';
export interface PermissionRequirement {
  resource: string;
  action: string;
}

export const RequirePermission = (resource: string, action: string) =>
  SetMetadata(PERMISSION_KEY, { resource, action });
