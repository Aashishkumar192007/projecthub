import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class FacilityBookingService {
  async getAmenities(tenantId: string) {
    const amenities = await prisma.amenity.findMany({
      where: { tenantId }
    });
    return amenities.map(a => ({
      id: a.id,
      name: a.name,
      category: a.category,
      capacity: a.capacity || 0,
      status: a.status
    }));
  }

  async getBookings(tenantId: string) {
    return prisma.amenityBooking.findMany({
      where: { tenantId },
      include: {
        amenity: true,
        resident: { include: { customer: true } }
      }
    });
  }

  async createBooking(tenantId: string, data: any) {
    return prisma.amenityBooking.create({
      data: { ...data, tenantId }
    });
  }

  async updateBookingStatus(tenantId: string, id: string, status: string) {
    return prisma.amenityBooking.update({
      where: { id },
      data: { status }
    });
  }
}
