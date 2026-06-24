// @ts-nocheck
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateComplaintDto, UpdateComplaintDto } from './dto/create-complaint.dto';

@Injectable()
export class HelpDeskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createComplaintDto: CreateComplaintDto, tenantId: string) {
    const customer = await this.prisma.customer.findFirst({
      where: { id: createComplaintDto.customerId, tenantId }
    });

    if (!customer) throw new ForbiddenException('Invalid Customer or unauthorized access.');

    return this.prisma.complaint.create({
      data: {
        ...createComplaintDto,
        tenantId,
        status: createComplaintDto.status || 'OPEN',
      } as any,
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.complaint.findMany({
      where: { tenantId } as any,
      include: {
        customer: { select: { firstName: true, lastName: true } } as any,
        unit: { select: { unitNumber: true } }
      } as any,
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string, tenantId: string) {
    const complaint = await this.prisma.complaint.findFirst({
      where: { id, tenantId } as any,
      include: { workOrders: true, customer: true, unit: true }
    });

    if (!complaint) throw new NotFoundException('Complaint not found');
    return complaint;
  }
}
