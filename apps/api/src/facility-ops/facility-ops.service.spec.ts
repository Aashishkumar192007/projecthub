import { Test, TestingModule } from '@nestjs/testing';
import { FacilityOpsService } from './facility-ops.service';

describe('FacilityOpsService', () => {
  let service: FacilityOpsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilityOpsService],
    }).compile();

    service = module.get<FacilityOpsService>(FacilityOpsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
