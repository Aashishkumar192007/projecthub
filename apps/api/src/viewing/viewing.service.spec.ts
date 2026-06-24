import { Test, TestingModule } from '@nestjs/testing';
import { ViewingService } from './viewing.service';

describe('ViewingService', () => {
  let service: ViewingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViewingService],
    }).compile();

    service = module.get<ViewingService>(ViewingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
