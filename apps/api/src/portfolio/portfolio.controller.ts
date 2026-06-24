import { Controller, Get, Post, Body, Patch, Param, UseGuards, ValidationPipe, Query, HttpCode } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto, UpdatePortfolioDto } from './dto/create-portfolio.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RequireRoles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('v1/portfolios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  @RequireRoles('SuperAdmin', 'RegionalAdmin')
  create(@Body(ValidationPipe) createPortfolioDto: CreatePortfolioDto, @CurrentUser() user: any) {
    return this.portfolioService.create(createPortfolioDto, user.tenantId);
  }

  @Get()
  findAll(@Query(new ValidationPipe({ transform: true })) query: PaginationQueryDto, @CurrentUser() user: any) {
    return this.portfolioService.findAll(user.tenantId, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.portfolioService.findOne(id, user.tenantId);
  }

  @Patch(':id')
  @RequireRoles('SuperAdmin', 'RegionalAdmin')
  update(@Param('id') id: string, @Body(ValidationPipe) updatePortfolioDto: UpdatePortfolioDto, @CurrentUser() user: any) {
    return this.portfolioService.update(id, updatePortfolioDto, user.tenantId);
  }

  @Post(':id/archive')
  @HttpCode(200)
  @RequireRoles('SuperAdmin', 'RegionalAdmin')
  archive(@Param('id') id: string, @CurrentUser() user: any) {
    return this.portfolioService.archive(id, user.tenantId);
  }

  @Post(':id/restore')
  @HttpCode(200)
  @RequireRoles('SuperAdmin')
  restore(@Param('id') id: string, @CurrentUser() user: any) {
    return this.portfolioService.restore(id, user.tenantId);
  }
}
