import { Test, TestingModule } from '@nestjs/testing';
import { UtilityEnergyController } from './utility-energy.controller';

describe('UtilityEnergyController', () => {
  let controller: UtilityEnergyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UtilityEnergyController],
    }).compile();

    controller = module.get<UtilityEnergyController>(UtilityEnergyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
