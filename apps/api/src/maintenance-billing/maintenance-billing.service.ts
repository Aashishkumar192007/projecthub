import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class MaintenanceBillingService {
  async getBills(tenantId: string) {
    const bills = await prisma.maintenanceBill.findMany({
      where: { tenantId },
      include: {
        lineItems: true,
        unit: {
          include: { floor: { include: { tower: true } } }
        },
        invoice: {
          include: { payments: true }
        },
        Resident: {
          include: { customer: true }
        }
      }
    });

    return bills.map(b => {
      const paymentDate = b.invoice?.payments?.[0]?.paymentDate;
      return {
        id: b.id,
        unitNumber: b.unit?.unitNumber || 'N/A',
        residentName: b.Resident?.customer?.name || 'Unassigned',
        billingPeriod: b.billingPeriod,
        amount: b.amount,
        status: b.invoice?.status || 'UNPAID',
        dueDate: b.invoice?.dueDate || new Date(),
        paymentDate: paymentDate || undefined
      };
    }).sort((a, b) => b.dueDate.getTime() - a.dueDate.getTime());
  }

  async createBill(tenantId: string, data: any) {
    const { lineItems, ...billData } = data;
    return prisma.maintenanceBill.create({
      data: {
        ...billData,
        tenantId,
        lineItems: {
          create: lineItems
        }
      },
      include: { lineItems: true }
    });
  }
}
