import { Module } from '@nestjs/common';
import { FacilityBookingController } from './facility-booking.controller';
import { FacilityBookingService } from './facility-booking.service';

@Module({
  controllers: [FacilityBookingController],
  providers: [FacilityBookingService]
})
export class FacilityBookingModule {}
