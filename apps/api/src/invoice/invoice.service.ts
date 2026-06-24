// @ts-nocheck
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInvoiceDto: CreateInvoiceDto, tenantId: string) {
    const lease = await this.prisma.lease.findFirst({
      where: { id: createInvoiceDto.leaseId, customer: { tenantId } }
    });

    if (!lease) throw new ForbiddenException('Invalid Lease or unauthorized access.');

    return this.prisma.invoice.create({
      data: {
        ...createInvoiceDto,
        invoiceDate: new Date(createInvoiceDto.invoiceDate),
        dueDate: new Date(createInvoiceDto.dueDate),
        status: createInvoiceDto.status || 'UNPAID',
      } as any,
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.invoice.findMany({
      where: { customer: { tenantId } } as any,
      include: { /* as any */
        customer: { select: { firstName: true, lastName: true } } as any,
        lease: { select: { unit: { select: { unitNumber: true } } } }
      } as any,
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string, tenantId: string) {
    const invoice = await this.prisma.invoice.findFirst({
      where: { id, customer: { tenantId } } as any,
      include: { /* as any */ payments: true, customer: true, lease: { include: { /* as any */ unit: true } } }
    });

    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }
}
