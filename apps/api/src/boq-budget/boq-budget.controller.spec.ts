import { Test, TestingModule } from '@nestjs/testing';
import { BoqBudgetController } from './boq-budget.controller';

describe('BoqBudgetController', () => {
  let controller: BoqBudgetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoqBudgetController],
    }).compile();

    controller = module.get<BoqBudgetController>(BoqBudgetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
