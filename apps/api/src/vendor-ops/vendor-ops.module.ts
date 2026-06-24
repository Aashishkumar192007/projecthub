import { Module } from '@nestjs/common';
import { VendorOpsController } from './vendor-ops.controller';
import { VendorOpsService } from './vendor-ops.service';

@Module({
  controllers: [VendorOpsController],
  providers: [VendorOpsService]
})
export class VendorOpsModule {}
