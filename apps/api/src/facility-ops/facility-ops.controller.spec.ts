import { Test, TestingModule } from '@nestjs/testing';
import { FacilityOpsController } from './facility-ops.controller';

describe('FacilityOpsController', () => {
  let controller: FacilityOpsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilityOpsController],
    }).compile();

    controller = module.get<FacilityOpsController>(FacilityOpsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
