import { Module } from '@nestjs/common';
import { SpaceManagementService } from './space-management.service';
import { SpaceManagementController } from './space-management.controller';

@Module({
  providers: [SpaceManagementService],
  controllers: [SpaceManagementController]
})
export class SpaceManagementModule {}
