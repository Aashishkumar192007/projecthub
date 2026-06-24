import { Module } from '@nestjs/common';
import { AssetManagementService } from './asset-management.service';
import { AssetManagementController } from './asset-management.controller';

@Module({
  providers: [AssetManagementService],
  controllers: [AssetManagementController]
})
export class AssetManagementModule {}
