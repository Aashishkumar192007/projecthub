import { Controller, Get, Post, Body, Param, UseGuards, ValidationPipe, Query, HttpCode } from '@nestjs/common';
import { FloorService } from './floor.service';
import { CreateFloorDto } from './dto/create-floor.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RequireRoles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('v1/floors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FloorController {
  constructor(private readonly floorService: FloorService) {}

  @Post()
  @RequireRoles('SuperAdmin', 'RegionalAdmin', 'PropertyManager')
  create(@Body(ValidationPipe) createFloorDto: CreateFloorDto, @CurrentUser() user: any) {
    return this.floorService.create(createFloorDto, user.tenantId);
  }

  @Get()
  findAll(@Query(new ValidationPipe({ transform: true })) query: PaginationQueryDto, @CurrentUser() user: any) {
    return this.floorService.findAll(user.tenantId, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.floorService.findOne(id, user.tenantId);
  }

  @Post(':id/archive')
  @HttpCode(200)
  @RequireRoles('SuperAdmin', 'RegionalAdmin', 'PropertyManager')
  archive(@Param('id') id: string, @CurrentUser() user: any) {
    return this.floorService.archive(id, user.tenantId);
  }

  @Post(':id/restore')
  @HttpCode(200)
  @RequireRoles('SuperAdmin', 'RegionalAdmin')
  restore(@Param('id') id: string, @CurrentUser() user: any) {
    return this.floorService.restore(id, user.tenantId);
  }
}
