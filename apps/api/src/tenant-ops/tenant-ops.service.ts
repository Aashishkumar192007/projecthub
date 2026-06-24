// @ts-nocheck
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class TenantOpsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: any, tenantId: string) {
    // Check if customer email already exists in this Tenant
    const existing = await this.prisma.customer.findFirst({
      where: { email: createCustomerDto.email, tenantId }
    });

    if (existing) {
      throw new ConflictException('Customer with this email already exists in your workspace.');
    }

    return this.prisma.customer.create({
      data: {
        ...createCustomerDto,
        tenantId,
        name: createCustomerDto.firstName + ' ' + createCustomerDto.lastName,
      } as any,
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.customer.findMany({
      where: { tenantId },
      include: {
        leases: {
          include: { unit: true }
        }
      }
    } as any);
  }

  async findOne(id: string, tenantId: string) {
    const customer = await this.prisma.customer.findFirst({
      where: { id, tenantId },
      include: { leases: true, complaints: true, invoices: true }
    } as any);

    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }
}
