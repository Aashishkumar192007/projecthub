import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { RoleService } from './role.service';
import type { RequestWithTenant } from '../tenant/tenant.middleware';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: any, @Req() req: RequestWithTenant) {
    return this.roleService.create(createRoleDto, req.tenantId || req.user?.tenantId);
  }

  @Get()
  findAll(@Req() req: RequestWithTenant) {
    return this.roleService.findAll(req.tenantId || req.user?.tenantId);
  }
}
