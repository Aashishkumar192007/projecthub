import { Controller, Get, Post, Put, Body, Param, Req } from '@nestjs/common';
import { FacilityBookingService } from './facility-booking.service';

@Controller('v1/facility-booking')
export class FacilityBookingController {
  constructor(private readonly facilityBookingService: FacilityBookingService) {}

  @Get('amenities')
  getAmenities(@Req() req: any) {
    return this.facilityBookingService.getAmenities(req['tenantId'] || 'acme-corp');
  }

  @Get('bookings')
  getBookings(@Req() req: any) {
    return this.facilityBookingService.getBookings(req['tenantId'] || 'acme-corp');
  }

  @Post('bookings')
  createBooking(@Req() req: any, @Body() body: any) {
    return this.facilityBookingService.createBooking(req['tenantId'] || 'acme-corp', body);
  }

  @Put('bookings/:id/status')
  updateBookingStatus(@Req() req: any, @Param('id') id: string, @Body() body: { status: string }) {
    return this.facilityBookingService.updateBookingStatus(req['tenantId'] || 'acme-corp', id, body.status);
  }
}
