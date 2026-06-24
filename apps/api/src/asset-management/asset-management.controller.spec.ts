import { Test, TestingModule } from '@nestjs/testing';
import { AssetManagementController } from './asset-management.controller';

describe('AssetManagementController', () => {
  let controller: AssetManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetManagementController],
    }).compile();

    controller = module.get<AssetManagementController>(AssetManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
