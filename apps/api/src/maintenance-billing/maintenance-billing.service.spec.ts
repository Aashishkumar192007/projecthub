import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceBillingService } from './maintenance-billing.service';

describe('MaintenanceBillingService', () => {
  let service: MaintenanceBillingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenanceBillingService],
    }).compile();

    service = module.get<MaintenanceBillingService>(MaintenanceBillingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
