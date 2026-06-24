import { Module } from '@nestjs/common';
import { VisitorOpsController } from './visitor-ops.controller';
import { VisitorOpsService } from './visitor-ops.service';

@Module({
  controllers: [VisitorOpsController],
  providers: [VisitorOpsService]
})
export class VisitorOpsModule {}
