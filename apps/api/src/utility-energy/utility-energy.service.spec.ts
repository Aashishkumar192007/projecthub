import { Test, TestingModule } from '@nestjs/testing';
import { UtilityEnergyService } from './utility-energy.service';

describe('UtilityEnergyService', () => {
  let service: UtilityEnergyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilityEnergyService],
    }).compile();

    service = module.get<UtilityEnergyService>(UtilityEnergyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
