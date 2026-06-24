import { Module } from '@nestjs/common';
import { TenantOpsController } from './tenant-ops.controller';
import { TenantOpsService } from './tenant-ops.service';

@Module({
  controllers: [TenantOpsController],
  providers: [TenantOpsService]
})
export class TenantOpsModule {}
