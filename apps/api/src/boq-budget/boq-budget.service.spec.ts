import { Test, TestingModule } from '@nestjs/testing';
import { BoqBudgetService } from './boq-budget.service';

describe('BoqBudgetService', () => {
  let service: BoqBudgetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoqBudgetService],
    }).compile();

    service = module.get<BoqBudgetService>(BoqBudgetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
