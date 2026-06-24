import { Module } from '@nestjs/common';
import { QualitySafetyService } from './quality-safety.service';
import { QualitySafetyController } from './quality-safety.controller';

@Module({
  providers: [QualitySafetyService],
  controllers: [QualitySafetyController]
})
export class QualitySafetyModule {}
