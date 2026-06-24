import { Module } from '@nestjs/common';
import { LandBankService } from './land-bank.service';
import { LandBankController } from './land-bank.controller';

@Module({
  providers: [LandBankService],
  controllers: [LandBankController]
})
export class LandBankModule {}
