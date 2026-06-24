// @ts-nocheck
import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto, tenantId: string) {
    const invoice = await this.prisma.invoice.findFirst({
      where: { id: createPaymentDto.invoiceId, customer: { tenantId } }
    });

    if (!invoice) throw new ForbiddenException('Invalid Invoice or unauthorized access.');
    if (invoice.status === 'PAID') throw new BadRequestException('Invoice is already paid in full.');

    return this.prisma.$transaction(async (prisma) => {
      const payment = await prisma.payment.create({
        data: {
          invoiceId: createPaymentDto.invoiceId,
          amount: createPaymentDto.amount,
          paymentDate: new Date(createPaymentDto.paymentDate),
          paymentMethod: createPaymentDto.paymentMethod,
          referenceNumber: createPaymentDto.referenceNumber,
          status: 'COMPLETED'
        }
      });

      // Simple status update for MVP: If any payment is made, mark as PAID
      // In a real system, we'd sum payments and compare to totalAmount
      await prisma.invoice.update({
        where: { id: createPaymentDto.invoiceId },
        data: { status: 'PAID' }
      });

      return payment;
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.payment.findMany({
      where: { invoice: { customer: { tenantId } } },
      include: {
        invoice: { include: { customer: true } }
      }
    } as any);
  }

  async findOne(id: string, tenantId: string) {
    const payment = await this.prisma.payment.findFirst({
      where: { id, invoice: { customer: { tenantId } } },
      include: { invoice: true }
    });

    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }
}
