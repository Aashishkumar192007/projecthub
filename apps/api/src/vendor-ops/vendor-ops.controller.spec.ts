import { Test, TestingModule } from '@nestjs/testing';
import { VendorOpsController } from './vendor-ops.controller';

describe('VendorOpsController', () => {
  let controller: VendorOpsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendorOpsController],
    }).compile();

    controller = module.get<VendorOpsController>(VendorOpsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
