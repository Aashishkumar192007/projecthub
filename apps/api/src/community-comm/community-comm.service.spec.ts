import { Test, TestingModule } from '@nestjs/testing';
import { CommunityCommService } from './community-comm.service';

describe('CommunityCommService', () => {
  let service: CommunityCommService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityCommService],
    }).compile();

    service = module.get<CommunityCommService>(CommunityCommService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
