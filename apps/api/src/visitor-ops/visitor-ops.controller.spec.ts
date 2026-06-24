import { Test, TestingModule } from '@nestjs/testing';
import { VisitorOpsController } from './visitor-ops.controller';

describe('VisitorOpsController', () => {
  let controller: VisitorOpsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitorOpsController],
    }).compile();

    controller = module.get<VisitorOpsController>(VisitorOpsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
