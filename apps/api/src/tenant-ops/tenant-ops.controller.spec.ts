import { Test, TestingModule } from '@nestjs/testing';
import { TenantOpsController } from './tenant-ops.controller';

describe('TenantOpsController', () => {
  let controller: TenantOpsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenantOpsController],
    }).compile();

    controller = module.get<TenantOpsController>(TenantOpsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
