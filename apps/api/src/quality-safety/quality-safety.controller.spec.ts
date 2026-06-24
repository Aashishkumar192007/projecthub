import { Test, TestingModule } from '@nestjs/testing';
import { QualitySafetyController } from './quality-safety.controller';

describe('QualitySafetyController', () => {
  let controller: QualitySafetyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QualitySafetyController],
    }).compile();

    controller = module.get<QualitySafetyController>(QualitySafetyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
