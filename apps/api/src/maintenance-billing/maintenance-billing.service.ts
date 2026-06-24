import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class MaintenanceBillingService {
  async getBills(tenantId: string) {
    return prisma.maintenanceBill.findMany({
      where: { tenantId },
      include: {
        lineItems: true,
        unit: true,
        invoice: true
      }
    });
  }

  async createBill(tenantId: string, data: any) {
    // Expected data: { societyId, unitId, invoiceId, billingPeriod, amount, lineItems: [{ description, amount }] }
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
