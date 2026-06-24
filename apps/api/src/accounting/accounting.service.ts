import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountingService {
  constructor(private prisma: PrismaService) {}

  async generateInvoice(createInvoiceDto: any, tenantId: string) {
    const { amount, dueDate, leaseContractId, salesAgreementId, paymentPlanId, type } = createInvoiceDto;

    return this.prisma.invoice.create({
      data: {
        amount,
        dueDate: new Date(dueDate),
        status: 'DRAFT',
        type: type || 'RENT',
        leaseContractId,
        salesAgreementId,
        paymentPlanId,
        tenantId,
      }
    });
  }

  async recordPayment(paymentDto: any, tenantId: string) {
    const { invoiceId, amount, paymentMethod, reference } = paymentDto;

    return this.prisma.$transaction(async (tx) => {
      const receipt = await tx.paymentReceipt.create({
        data: {
          invoiceId,
          amount,
          paymentDate: new Date(),
          paymentMethod: paymentMethod || 'BANK_TRANSFER',
          reference,
          tenantId,
        }
      });

      // Simple logic: if payment matches invoice, mark paid
      const invoice = await tx.invoice.findUnique({ where: { id: invoiceId } });
      if (invoice && amount >= invoice.amount) {
        await tx.invoice.update({
          where: { id: invoiceId },
          data: { status: 'PAID' }
        });
      }

      return receipt;
    });
  }

  async getLedger(tenantId: string) {
    const [invoices, receipts] = await Promise.all([
      this.prisma.invoice.findMany({ 
        where: { tenantId }, 
        orderBy: { createdAt: 'desc' } 
      }),
      this.prisma.paymentReceipt.findMany({ 
        where: { tenantId }, 
        orderBy: { paymentDate: 'desc' } 
      })
    ]);

    return { invoices, receipts };
  }
}
