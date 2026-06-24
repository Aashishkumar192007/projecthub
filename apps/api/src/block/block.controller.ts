import { Controller, Get, Post, Body, Patch, Param, UseGuards, ValidationPipe, Query, HttpCode } from '@nestjs/common';
import { BlockService } from './block.service';
import { CreateBlockDto, UpdateBlockDto } from './dto/create-block.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RequireRoles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('v1/blocks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  @RequireRoles('SuperAdmin', 'RegionalAdmin', 'PropertyManager')
  create(@Body(ValidationPipe) createBlockDto: CreateBlockDto, @CurrentUser() user: any) {
    return this.blockService.create(createBlockDto, user.tenantId);
  }

  @Get()
  findAll(@Query(new ValidationPipe({ transform: true })) query: PaginationQueryDto, @CurrentUser() user: any) {
    return this.blockService.findAll(user.tenantId, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.blockService.findOne(id, user.tenantId);
  }

  @Patch(':id')
  @RequireRoles('SuperAdmin', 'RegionalAdmin', 'PropertyManager')
  update(@Param('id') id: string, @Body(ValidationPipe) updateBlockDto: UpdateBlockDto, @CurrentUser() user: any) {
    return this.blockService.update(id, updateBlockDto, user.tenantId);
  }

  @Post(':id/archive')
  @HttpCode(200)
  @RequireRoles('SuperAdmin', 'RegionalAdmin', 'PropertyManager')
  archive(@Param('id') id: string, @CurrentUser() user: any) {
    return this.blockService.archive(id, user.tenantId);
  }

  @Post(':id/restore')
  @HttpCode(200)
  @RequireRoles('SuperAdmin', 'RegionalAdmin')
  restore(@Param('id') id: string, @CurrentUser() user: any) {
    return this.blockService.restore(id, user.tenantId);
  }
}
