import { Module } from '@nestjs/common';
import { FacilityMasterService } from './facility-master.service';
import { FacilityMasterController } from './facility-master.controller';

@Module({
  providers: [FacilityMasterService],
  controllers: [FacilityMasterController]
})
export class FacilityMasterModule {}
