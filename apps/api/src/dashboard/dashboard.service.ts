// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getExecutiveMetrics(tenantId: string) {
    // 1. Total Properties & Units
    const totalProperties = await this.prisma.propertyProject.count({ where: { tenantId } });
    const totalUnitsQuery = await this.prisma.unit.count({
      where: { owner: { propertyProject: { tenantId } } }
    });

    // 2. Active Leases
    const activeLeases = await this.prisma.lease.count({
      where: { customer: { tenantId }, status: 'ACTIVE' }
    });

    const occupancyRate = totalUnitsQuery > 0 ? (activeLeases / totalUnitsQuery) * 100 : 0;

    // 3. Financials (Invoices)
    const invoices = await this.prisma.invoice.findMany({
      where: { customer: { tenantId } },
      select: { totalAmount: true, status: true }
    });

    const totalRevenue = invoices
      .filter(inv => inv.status === 'PAID')
      .reduce((sum, inv) => sum + inv.totalAmount, 0);

    const outstandingReceivables = invoices
      .filter(inv => inv.status === 'UNPAID')
      .reduce((sum, inv) => sum + inv.totalAmount, 0);

    // 4. Operations
    const openComplaints = await this.prisma.complaint.count({
      where: { tenantId, status: 'OPEN' }
    });

    return {
      properties: totalProperties,
      units: totalUnitsQuery,
      activeLeases,
      occupancyRate: Math.round(occupancyRate),
      totalRevenue,
      outstandingReceivables,
      openComplaints
    };
  }
}
