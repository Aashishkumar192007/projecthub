import { Controller, Get, Post, Body, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { LeasingService } from './leasing.service';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RequireRoles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('api/v1/leases')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LeasingController {
  constructor(private readonly leasingService: LeasingService) {}

  @Post()
  @RequireRoles('SuperAdmin', 'RegionalAdmin', 'PropertyManager', 'LeasingAgent')
  create(@Body(ValidationPipe) createLeaseDto: CreateLeaseDto, @CurrentUser() user: any) {
    return this.leasingService.create(createLeaseDto, user.tenantId);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.leasingService.findAll(user.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.leasingService.findOne(id, user.tenantId);
  }
}
