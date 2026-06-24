import { Test, TestingModule } from '@nestjs/testing';
import { SocietyMasterController } from './society-master.controller';

describe('SocietyMasterController', () => {
  let controller: SocietyMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocietyMasterController],
    }).compile();

    controller = module.get<SocietyMasterController>(SocietyMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
