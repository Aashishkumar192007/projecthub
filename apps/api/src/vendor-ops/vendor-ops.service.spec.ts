import { Test, TestingModule } from '@nestjs/testing';
import { VendorOpsService } from './vendor-ops.service';

describe('VendorOpsService', () => {
  let service: VendorOpsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VendorOpsService],
    }).compile();

    service = module.get<VendorOpsService>(VendorOpsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
