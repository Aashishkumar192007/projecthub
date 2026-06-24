import { Controller, Get, Post, Body, Param, UseGuards, ValidationPipe, Query, HttpCode } from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RequireRoles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('v1/units')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  @RequireRoles('SuperAdmin', 'RegionalAdmin', 'PropertyManager')
  create(@Body(ValidationPipe) createUnitDto: CreateUnitDto, @CurrentUser() user: any) {
    return this.unitService.create(createUnitDto, user.tenantId);
  }

  @Get()
  findAll(@Query(new ValidationPipe({ transform: true })) query: PaginationQueryDto, @CurrentUser() user: any) {
    return this.unitService.findAll(user.tenantId, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.unitService.findOne(id, user.tenantId);
  }

  @Post(':id/archive')
  @HttpCode(200)
  @RequireRoles('SuperAdmin', 'RegionalAdmin', 'PropertyManager')
  archive(@Param('id') id: string, @CurrentUser() user: any) {
    return this.unitService.archive(id, user.tenantId);
  }

  @Post(':id/restore')
  @HttpCode(200)
  @RequireRoles('SuperAdmin', 'RegionalAdmin')
  restore(@Param('id') id: string, @CurrentUser() user: any) {
    return this.unitService.restore(id, user.tenantId);
  }
}
