import { Test, TestingModule } from '@nestjs/testing';
import { ProjectExecutionService } from './project-execution.service';

describe('ProjectExecutionService', () => {
  let service: ProjectExecutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectExecutionService],
    }).compile();

    service = module.get<ProjectExecutionService>(ProjectExecutionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
