import { Test, TestingModule } from '@nestjs/testing';
import { FacilityMaintenanceController } from './facility-maintenance.controller';

describe('FacilityMaintenanceController', () => {
  let controller: FacilityMaintenanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilityMaintenanceController],
    }).compile();

    controller = module.get<FacilityMaintenanceController>(FacilityMaintenanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
