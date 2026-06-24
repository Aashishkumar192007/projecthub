import { Module } from '@nestjs/common';
import { EsgService } from './esg.service';
import { EsgController } from './esg.controller';

@Module({
  providers: [EsgService],
  controllers: [EsgController]
})
export class EsgModule {}
