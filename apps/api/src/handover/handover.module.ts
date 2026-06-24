import { Module } from '@nestjs/common';
import { HandoverService } from './handover.service';
import { HandoverController } from './handover.controller';

@Module({
  providers: [HandoverService],
  controllers: [HandoverController]
})
export class HandoverModule {}
