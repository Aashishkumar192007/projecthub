import { Test, TestingModule } from '@nestjs/testing';
import { ViewingController } from './viewing.controller';

describe('ViewingController', () => {
  let controller: ViewingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViewingController],
    }).compile();

    controller = module.get<ViewingController>(ViewingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
