import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { AccountingService } from './accounting.service';
import type { RequestWithTenant } from '../tenant/tenant.middleware';

@Controller('accounting')
export class AccountingController {
  constructor(private readonly accountingService: AccountingService) {}

  @Post('invoice')
  createInvoice(@Body() createInvoiceDto: any, @Req() req: RequestWithTenant) {
    return this.accountingService.generateInvoice(createInvoiceDto, req.tenantId || req.user?.tenantId);
  }

  @Post('payment')
  recordPayment(@Body() paymentDto: any, @Req() req: RequestWithTenant) {
    return this.accountingService.recordPayment(paymentDto, req.tenantId || req.user?.tenantId);
  }

  @Get('ledger')
  getLedger(@Req() req: RequestWithTenant) {
    return this.accountingService.getLedger(req.tenantId || req.user?.tenantId);
  }
}
