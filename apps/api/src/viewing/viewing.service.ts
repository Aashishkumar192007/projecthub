import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ViewingService {
  constructor(private prisma: PrismaService) {}

  async create(createViewingDto: any, tenantId: string, userId: string) {
    const { scheduledAt, leadId, propertyId, status, notes } = createViewingDto;

    return this.prisma.viewing.create({
      data: {
        scheduledAt: new Date(scheduledAt),
        leadId,
        propertyId,
        assignedToId: userId,
        status: status || 'SCHEDULED',
        notes,
        tenantId,
      }
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.viewing.findMany({
      where: { tenantId },
      include: {
        lead: { select: { firstName: true, lastName: true } },
        property: { select: { name: true } },
      },
      orderBy: { scheduledAt: 'asc' }
    });
  }

  async updateStatus(id: string, status: string, tenantId: string) {
    return this.prisma.viewing.updateMany({
      where: { id, tenantId },
      data: { status }
    });
  }
}
