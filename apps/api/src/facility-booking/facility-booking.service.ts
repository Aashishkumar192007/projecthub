import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class FacilityBookingService {
  async getBookings(tenantId: string) {
    return prisma.facilityBooking.findMany({
      where: { tenantId },
      include: {
        facility: true,
        customer: true
      }
    });
  }

  async createBooking(tenantId: string, data: any) {
    return prisma.facilityBooking.create({
      data: { ...data, tenantId }
    });
  }

  async updateBookingStatus(tenantId: string, id: string, status: string) {
    return prisma.facilityBooking.update({
      where: { id },
      data: { status }
    });
  }
}
