import { Test, TestingModule } from '@nestjs/testing';
import { GateManagementService } from './gate-management.service';

describe('GateManagementService', () => {
  let service: GateManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GateManagementService],
    }).compile();

    service = module.get<GateManagementService>(GateManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
