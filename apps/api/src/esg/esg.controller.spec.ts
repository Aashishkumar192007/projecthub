import { Test, TestingModule } from '@nestjs/testing';
import { EsgController } from './esg.controller';

describe('EsgController', () => {
  let controller: EsgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EsgController],
    }).compile();

    controller = module.get<EsgController>(EsgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
