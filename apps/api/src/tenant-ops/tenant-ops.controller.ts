import { Controller, Get, Post, Body, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { TenantOpsService } from './tenant-ops.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RequireRoles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('api/v1/customers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TenantOpsController {
  constructor(private readonly tenantOpsService: TenantOpsService) {}

  @Post()
  @RequireRoles('SuperAdmin', 'RegionalAdmin', 'PropertyManager', 'LeasingAgent')
  create(@Body(ValidationPipe) createCustomerDto: CreateCustomerDto, @CurrentUser() user: any) {
    return this.tenantOpsService.create(createCustomerDto, user.tenantId);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.tenantOpsService.findAll(user.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.tenantOpsService.findOne(id, user.tenantId);
  }
}
