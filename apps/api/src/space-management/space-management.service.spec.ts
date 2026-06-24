import { Test, TestingModule } from '@nestjs/testing';
import { SpaceManagementService } from './space-management.service';

describe('SpaceManagementService', () => {
  let service: SpaceManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceManagementService],
    }).compile();

    service = module.get<SpaceManagementService>(SpaceManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
