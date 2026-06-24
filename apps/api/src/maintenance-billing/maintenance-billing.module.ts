import { Module } from '@nestjs/common';
import { MaintenanceBillingController } from './maintenance-billing.controller';
import { MaintenanceBillingService } from './maintenance-billing.service';

@Module({
  controllers: [MaintenanceBillingController],
  providers: [MaintenanceBillingService]
})
export class MaintenanceBillingModule {}
