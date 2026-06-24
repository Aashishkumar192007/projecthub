import { Controller, Get, Post, Body, Param, Req, Patch } from '@nestjs/common';
import { ViewingService } from './viewing.service';
import type { RequestWithTenant } from '../tenant/tenant.middleware';

@Controller('viewings')
export class ViewingController {
  constructor(private readonly viewingService: ViewingService) {}

  @Post()
  create(@Body() createViewingDto: any, @Req() req: RequestWithTenant) {
    return this.viewingService.create(createViewingDto, req.tenantId || req.user?.tenantId, req.user?.userId);
  }

  @Get()
  findAll(@Req() req: RequestWithTenant) {
    return this.viewingService.findAll(req.tenantId || req.user?.tenantId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string, @Req() req: RequestWithTenant) {
    return this.viewingService.updateStatus(id, status, req.tenantId || req.user?.tenantId);
  }
}
