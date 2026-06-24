import { Test, TestingModule } from '@nestjs/testing';
import { VisitorOpsService } from './visitor-ops.service';

describe('VisitorOpsService', () => {
  let service: VisitorOpsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitorOpsService],
    }).compile();

    service = module.get<VisitorOpsService>(VisitorOpsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
