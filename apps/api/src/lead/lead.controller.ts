import { Controller, Get, Post, Body, Param, Req, Patch } from '@nestjs/common';
import { LeadService } from './lead.service';
import type { RequestWithTenant } from '../tenant/tenant.middleware';

@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  create(@Body() createLeadDto: any, @Req() req: RequestWithTenant) {
    return this.leadService.create(createLeadDto, req.tenantId || req.user?.tenantId, req.user?.userId);
  }

  @Get()
  findAll(@Req() req: RequestWithTenant) {
    return this.leadService.findAll(req.tenantId || req.user?.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithTenant) {
    return this.leadService.findOne(id, req.tenantId || req.user?.tenantId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string, @Req() req: RequestWithTenant) {
    return this.leadService.updateStatus(id, status, req.tenantId || req.user?.tenantId);
  }
}
