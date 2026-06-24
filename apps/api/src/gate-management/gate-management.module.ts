import { Module } from '@nestjs/common';
import { GateManagementController } from './gate-management.controller';
import { GateManagementService } from './gate-management.service';

@Module({
  controllers: [GateManagementController],
  providers: [GateManagementService]
})
export class GateManagementModule {}
