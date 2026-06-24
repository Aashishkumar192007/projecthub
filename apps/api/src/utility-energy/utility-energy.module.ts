import { Module } from '@nestjs/common';
import { UtilityEnergyService } from './utility-energy.service';
import { UtilityEnergyController } from './utility-energy.controller';

@Module({
  providers: [UtilityEnergyService],
  controllers: [UtilityEnergyController]
})
export class UtilityEnergyModule {}
