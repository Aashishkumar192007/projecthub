import { Test, TestingModule } from '@nestjs/testing';
import { FacilityMasterService } from './facility-master.service';

describe('FacilityMasterService', () => {
  let service: FacilityMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilityMasterService],
    }).compile();

    service = module.get<FacilityMasterService>(FacilityMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
