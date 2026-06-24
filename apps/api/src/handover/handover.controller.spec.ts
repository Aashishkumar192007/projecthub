import { Test, TestingModule } from '@nestjs/testing';
import { HandoverController } from './handover.controller';

describe('HandoverController', () => {
  let controller: HandoverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HandoverController],
    }).compile();

    controller = module.get<HandoverController>(HandoverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
