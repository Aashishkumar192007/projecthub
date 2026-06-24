import { Module } from '@nestjs/common';
import { BoqBudgetService } from './boq-budget.service';
import { BoqBudgetController } from './boq-budget.controller';

@Module({
  providers: [BoqBudgetService],
  controllers: [BoqBudgetController]
})
export class BoqBudgetModule {}
