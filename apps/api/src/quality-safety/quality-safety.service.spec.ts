import { Test, TestingModule } from '@nestjs/testing';
import { QualitySafetyService } from './quality-safety.service';

describe('QualitySafetyService', () => {
  let service: QualitySafetyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QualitySafetyService],
    }).compile();

    service = module.get<QualitySafetyService>(QualitySafetyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
