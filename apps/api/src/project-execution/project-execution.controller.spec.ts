import { Test, TestingModule } from '@nestjs/testing';
import { ProjectExecutionController } from './project-execution.controller';

describe('ProjectExecutionController', () => {
  let controller: ProjectExecutionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectExecutionController],
    }).compile();

    controller = module.get<ProjectExecutionController>(ProjectExecutionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
