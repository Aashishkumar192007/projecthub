import { Test, TestingModule } from '@nestjs/testing';
import { SpaceManagementController } from './space-management.controller';

describe('SpaceManagementController', () => {
  let controller: SpaceManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpaceManagementController],
    }).compile();

    controller = module.get<SpaceManagementController>(SpaceManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
