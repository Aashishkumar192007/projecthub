import { Controller, Get, Post, Body, Patch, Param, UseGuards, ValidationPipe, Query, HttpCode } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto, UpdatePropertyDto } from './dto/create-property.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RequirePermission } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('v1/properties')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @RequirePermission('Property', 'CREATE')
  create(@Body(ValidationPipe) createPropertyDto: CreatePropertyDto, @CurrentUser() user: any) {
    return this.propertyService.create(createPropertyDto, user.tenantId);
  }

  @Get()
  findAll(@Query(new ValidationPipe({ transform: true })) query: PaginationQueryDto, @CurrentUser() user: any) {
    return this.propertyService.findAll(user.tenantId, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.propertyService.findOne(id, user.tenantId);
  }

  @Patch(':id')
  @RequirePermission('Property', 'UPDATE')
  update(@Param('id') id: string, @Body(ValidationPipe) updatePropertyDto: UpdatePropertyDto, @CurrentUser() user: any) {
    return this.propertyService.update(id, updatePropertyDto, user.tenantId);
  }

  @Post(':id/archive')
  @HttpCode(200)
  @RequirePermission('Property', 'ARCHIVE')
  archive(@Param('id') id: string, @CurrentUser() user: any) {
    return this.propertyService.archive(id, user.tenantId);
  }

  @Post(':id/restore')
  @HttpCode(200)
  @RequirePermission('Property', 'RESTORE')
  restore(@Param('id') id: string, @CurrentUser() user: any) {
    return this.propertyService.restore(id, user.tenantId);
  }

  @Post(':id/clone')
  @HttpCode(201)
  @RequirePermission('Property', 'CLONE')
  clone(@Param('id') id: string, @CurrentUser() user: any) {
    return this.propertyService.clone(id, user.tenantId);
  }
}
