import { Controller, Get, Post, Patch, Body, Param, UseGuards, ValidationPipe, Query, HttpCode } from '@nestjs/common';
import { TowerService } from './tower.service';
import { CreateTowerDto } from './dto/create-tower.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RequireRoles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('v1/buildings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TowerController {
  constructor(private readonly towerService: TowerService) {}

  @Post()
  @RequireRoles('SuperAdmin', 'RegionalAdmin', 'PropertyManager')
  create(@Body(ValidationPipe) createTowerDto: CreateTowerDto, @CurrentUser() user: any) {
    return this.towerService.create(createTowerDto, user.tenantId);
  }

  @Get()
  findAll(@Query(new ValidationPipe({ transform: true })) query: PaginationQueryDto, @CurrentUser() user: any) {
    return this.towerService.findAll(user.tenantId, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.towerService.findOne(id, user.tenantId);
  }

  @Patch(':id')
  @RequireRoles('SuperAdmin', 'RegionalAdmin', 'PropertyManager')
  update(@Param('id') id: string, @Body(ValidationPipe) updateTowerDto: any, @CurrentUser() user: any) {
    return this.towerService.update(id, updateTowerDto, user.tenantId);
  }

  @Post(':id/archive')
  @HttpCode(200)
  @RequireRoles('SuperAdmin', 'RegionalAdmin', 'PropertyManager')
  archive(@Param('id') id: string, @CurrentUser() user: any) {
    return this.towerService.archive(id, user.tenantId);
  }

  @Post(':id/restore')
  @HttpCode(200)
  @RequireRoles('SuperAdmin', 'RegionalAdmin')
  restore(@Param('id') id: string, @CurrentUser() user: any) {
    return this.towerService.restore(id, user.tenantId);
  }
}
