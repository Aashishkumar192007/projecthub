import { Module } from '@nestjs/common';
import { FacilityMaintenanceService } from './facility-maintenance.service';
import { FacilityMaintenanceController } from './facility-maintenance.controller';

@Module({
  providers: [FacilityMaintenanceService],
  controllers: [FacilityMaintenanceController]
})
export class FacilityMaintenanceModule {}
