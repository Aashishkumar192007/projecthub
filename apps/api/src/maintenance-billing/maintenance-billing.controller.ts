import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { MaintenanceBillingService } from './maintenance-billing.service';

@Controller('maintenance-billing')
export class MaintenanceBillingController {
  constructor(private readonly billingService: MaintenanceBillingService) {}

  @Get()
  getBills(@Req() req: any) {
    return this.billingService.getBills(req['tenantId']);
  }

  @Post()
  createBill(@Req() req: any, @Body() body: any) {
    return this.billingService.createBill(req['tenantId'], body);
  }
}
