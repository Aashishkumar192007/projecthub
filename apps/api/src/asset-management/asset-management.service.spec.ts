import { Test, TestingModule } from '@nestjs/testing';
import { AssetManagementService } from './asset-management.service';

describe('AssetManagementService', () => {
  let service: AssetManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetManagementService],
    }).compile();

    service = module.get<AssetManagementService>(AssetManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
