import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';
import type { RequestWithTenant } from '../tenant/tenant.middleware';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: any, @Req() req: RequestWithTenant) {
    return this.userService.create(createUserDto, req.tenantId || req.user?.tenantId);
  }

  @Get()
  findAll(@Req() req: RequestWithTenant) {
    return this.userService.findAll(req.tenantId || req.user?.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithTenant) {
    return this.userService.findOne(id, req.tenantId || req.user?.tenantId);
  }
}
