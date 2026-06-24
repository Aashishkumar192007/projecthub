import { Test, TestingModule } from '@nestjs/testing';
import { FacilityBookingService } from './facility-booking.service';

describe('FacilityBookingService', () => {
  let service: FacilityBookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilityBookingService],
    }).compile();

    service = module.get<FacilityBookingService>(FacilityBookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
