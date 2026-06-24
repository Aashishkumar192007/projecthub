import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeadService {
  constructor(private prisma: PrismaService) {}

  async create(createLeadDto: any, tenantId: string, userId: string) {
    const { firstName, lastName, email, phone, status, source, propertyId } = createLeadDto;

    return this.prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        status: status || 'NEW',
        source,
        propertyId,
        assignedToId: userId,
        tenantId,
      }
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.lead.findMany({
      where: { tenantId },
      include: {
        property: { select: { name: true } },
        assignedTo: { select: { firstName: true, lastName: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string, tenantId: string) {
    const lead = await this.prisma.lead.findFirst({
      where: { id, tenantId },
      include: {
        property: true,
        viewings: true,
      }
    });

    if (!lead) throw new NotFoundException('Lead not found');
    return lead;
  }

  async updateStatus(id: string, status: string, tenantId: string) {
    return this.prisma.lead.updateMany({
      where: { id, tenantId },
      data: { status }
    });
  }
}
