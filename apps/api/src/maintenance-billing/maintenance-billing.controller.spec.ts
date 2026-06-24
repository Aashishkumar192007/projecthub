import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceBillingController } from './maintenance-billing.controller';

describe('MaintenanceBillingController', () => {
  let controller: MaintenanceBillingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceBillingController],
    }).compile();

    controller = module.get<MaintenanceBillingController>(MaintenanceBillingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
