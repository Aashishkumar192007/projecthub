import { Controller, Get, Post, Body, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { WorkOrderService } from './work-order.service';
import { CreateWorkOrderDto } from './dto/create-work-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RequireRoles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('api/v1/work-orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WorkOrderController {
  constructor(private readonly workOrderService: WorkOrderService) {}

  @Post()
  @RequireRoles('SuperAdmin', 'RegionalAdmin', 'PropertyManager', 'FacilityManager')
  create(@Body(ValidationPipe) createWorkOrderDto: CreateWorkOrderDto, @CurrentUser() user: any) {
    return this.workOrderService.create(createWorkOrderDto, user.tenantId);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.workOrderService.findAll(user.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.workOrderService.findOne(id, user.tenantId);
  }
}
