import { Test, TestingModule } from '@nestjs/testing';
import { TenantOpsService } from './tenant-ops.service';

describe('TenantOpsService', () => {
  let service: TenantOpsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenantOpsService],
    }).compile();

    service = module.get<TenantOpsService>(TenantOpsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
