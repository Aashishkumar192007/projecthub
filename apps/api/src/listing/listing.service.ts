import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ListingService {
  constructor(private prisma: PrismaService) {}

  async create(createListingDto: any, tenantId: string) {
    const { title, description, price, unitId, propertyId, status, channels } = createListingDto;

    return this.prisma.listing.create({
      data: {
        title,
        description,
        price,
        unitId,
        propertyId,
        status: status || 'DRAFT',
        channels: channels || [], // e.g. ["ZILLOW", "INTERNAL_PORTAL"]
        tenantId,
      }
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.listing.findMany({
      where: { tenantId },
      include: {
        property: { select: { name: true } },
        unit: { select: { unitNumber: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async updateStatus(id: string, status: string, tenantId: string) {
    return this.prisma.listing.updateMany({
      where: { id, tenantId },
      data: { status }
    });
  }
}
