import { Test, TestingModule } from '@nestjs/testing';
import { LandBankService } from './land-bank.service';

describe('LandBankService', () => {
  let service: LandBankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LandBankService],
    }).compile();

    service = module.get<LandBankService>(LandBankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
