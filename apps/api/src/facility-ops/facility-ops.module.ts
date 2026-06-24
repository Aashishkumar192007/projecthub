import { Module } from '@nestjs/common';
import { FacilityOpsController } from './facility-ops.controller';
import { FacilityOpsService } from './facility-ops.service';

@Module({
  controllers: [FacilityOpsController],
  providers: [FacilityOpsService]
})
export class FacilityOpsModule {}
