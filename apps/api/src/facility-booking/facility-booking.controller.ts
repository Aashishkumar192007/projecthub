import { Controller, Get, Post, Put, Body, Param, Req } from '@nestjs/common';
import { FacilityBookingService } from './facility-booking.service';

@Controller('facility-bookings')
export class FacilityBookingController {
  constructor(private readonly facilityBookingService: FacilityBookingService) {}

  @Get()
  getBookings(@Req() req: any) {
    return this.facilityBookingService.getBookings(req['tenantId']);
  }

  @Post()
  createBooking(@Req() req: any, @Body() body: any) {
    return this.facilityBookingService.createBooking(req['tenantId'], body);
  }

  @Put(':id/status')
  updateBookingStatus(@Req() req: any, @Param('id') id: string, @Body() body: { status: string }) {
    return this.facilityBookingService.updateBookingStatus(req['tenantId'], id, body.status);
  }
}
