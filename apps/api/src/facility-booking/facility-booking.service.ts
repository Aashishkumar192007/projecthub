import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FacilityBookingService {
  constructor(private prisma: PrismaService) {}

  async getBookings(tenant_id: string) {
    return this.prisma.facilityBooking.findMany({
      where: { tenant_id },
      include: {
        facility: true,
        customer: true
      }
    });
  }

  async createBooking(tenant_id: string, data: any) {
    const { facilityId, customerId, ...bookingData } = data;
    return this.prisma.facilityBooking.create({
      data: { 
        ...bookingData, 
        tenant_id,
        facility_id: facilityId,
        customer_id: customerId
      }
    });
  }

  async updateBookingStatus(tenant_id: string, id: string, status: string) {
    return this.prisma.facilityBooking.update({
      where: { id },
      data: { status }
    });
  }
}
