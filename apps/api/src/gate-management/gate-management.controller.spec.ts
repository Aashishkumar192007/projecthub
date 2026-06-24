import { Test, TestingModule } from '@nestjs/testing';
import { GateManagementController } from './gate-management.controller';

describe('GateManagementController', () => {
  let controller: GateManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GateManagementController],
    }).compile();

    controller = module.get<GateManagementController>(GateManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
