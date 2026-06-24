import { Test, TestingModule } from '@nestjs/testing';
import { EsgService } from './esg.service';

describe('EsgService', () => {
  let service: EsgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EsgService],
    }).compile();

    service = module.get<EsgService>(EsgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
