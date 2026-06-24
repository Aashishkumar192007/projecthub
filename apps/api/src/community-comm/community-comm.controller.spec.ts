import { Test, TestingModule } from '@nestjs/testing';
import { CommunityCommController } from './community-comm.controller';

describe('CommunityCommController', () => {
  let controller: CommunityCommController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityCommController],
    }).compile();

    controller = module.get<CommunityCommController>(CommunityCommController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
