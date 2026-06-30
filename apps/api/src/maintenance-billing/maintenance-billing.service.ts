import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MaintenanceBillingService {
  constructor(private prisma: PrismaService) {}

  async getBills(tenant_id: string) {
    return this.prisma.maintenanceBill.findMany({
      where: { tenant_id },
      include: {
        lineItems: true,
        unit: true,
        invoice: true
      }
    });
  }

  async createBill(tenant_id: string, data: any) {
    const { lineItems, unitId, invoiceId, ...billData } = data;
    return this.prisma.maintenanceBill.create({
      data: {
        ...billData,
        tenant_id,
        unit_id: unitId,
        invoice_id: invoiceId,
        lineItems: {
          create: lineItems
        }
      },
      include: { lineItems: true }
    });
  }
}
