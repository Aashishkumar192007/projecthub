import { Test, TestingModule } from '@nestjs/testing';
import { FacilityBookingController } from './facility-booking.controller';

describe('FacilityBookingController', () => {
  let controller: FacilityBookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilityBookingController],
    }).compile();

    controller = module.get<FacilityBookingController>(FacilityBookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
