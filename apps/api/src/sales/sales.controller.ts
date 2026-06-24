import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { SalesService } from './sales.service';
import type { RequestWithTenant } from '../tenant/tenant.middleware';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post('convert-lead')
  convertLead(@Body() convertDto: any, @Req() req: RequestWithTenant) {
    return this.salesService.convertLeadToSale(convertDto, req.tenantId || req.user?.tenantId, req.user?.userId);
  }

  @Get()
  findAll(@Req() req: RequestWithTenant) {
    return this.salesService.findAll(req.tenantId || req.user?.tenantId);
  }
}
