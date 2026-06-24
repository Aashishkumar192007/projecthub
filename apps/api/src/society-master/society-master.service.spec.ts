import { Test, TestingModule } from '@nestjs/testing';
import { SocietyMasterService } from './society-master.service';

describe('SocietyMasterService', () => {
  let service: SocietyMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocietyMasterService],
    }).compile();

    service = module.get<SocietyMasterService>(SocietyMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
