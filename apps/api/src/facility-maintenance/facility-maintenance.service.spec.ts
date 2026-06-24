import { Test, TestingModule } from '@nestjs/testing';
import { FacilityMaintenanceService } from './facility-maintenance.service';

describe('FacilityMaintenanceService', () => {
  let service: FacilityMaintenanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilityMaintenanceService],
    }).compile();

    service = module.get<FacilityMaintenanceService>(FacilityMaintenanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
