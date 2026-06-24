import { Test, TestingModule } from '@nestjs/testing';
import { FacilityMasterController } from './facility-master.controller';

describe('FacilityMasterController', () => {
  let controller: FacilityMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilityMasterController],
    }).compile();

    controller = module.get<FacilityMasterController>(FacilityMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
