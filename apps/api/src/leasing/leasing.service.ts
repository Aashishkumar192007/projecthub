import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeaseDto, UpdateLeaseDto } from './dto/create-lease.dto';

@Injectable()
export class LeasingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLeaseDto: CreateLeaseDto, tenantId: string) {
    // Validate Customer belongs to Tenant
    const customer = await this.prisma.customer.findFirst({
      where: { id: createLeaseDto.customerId, tenantId }
    });
    if (!customer) throw new ForbiddenException('Invalid Customer or unauthorized access.');

    // Validate Unit belongs to Tenant
    const unit = await this.prisma.unit.findFirst({
      where: { id: createLeaseDto.unitId, tower: { propertyProject: { tenantId } } }
    });
    if (!unit) throw new ForbiddenException('Invalid Unit or unauthorized access.');

    // Check for active lease conflicts on this unit
    const activeLease = await this.prisma.lease.findFirst({
      where: { unitId: createLeaseDto.unitId, status: 'ACTIVE' }
    });
    if (activeLease) throw new ConflictException('This unit already has an active lease.');

    return this.prisma.lease.create({
      data: {
        ...createLeaseDto,
        startDate: new Date(createLeaseDto.startDate),
        endDate: new Date(createLeaseDto.endDate),
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.lease.findMany({
      where: { customer: { tenantId } },
      include: {
        customer: true,
        unit: { include: { tower: { select: { propertyProject: { select: { name: true } } } } } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string, tenantId: string) {
    const lease = await this.prisma.lease.findFirst({
      where: { id, customer: { tenantId } },
      include: { invoices: true, customer: true, unit: true }
    });

    if (!lease) throw new NotFoundException('Lease not found');
    return lease;
  }
}
