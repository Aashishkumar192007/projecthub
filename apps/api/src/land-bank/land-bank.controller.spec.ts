import { Test, TestingModule } from '@nestjs/testing';
import { LandBankController } from './land-bank.controller';

describe('LandBankController', () => {
  let controller: LandBankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandBankController],
    }).compile();

    controller = module.get<LandBankController>(LandBankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
