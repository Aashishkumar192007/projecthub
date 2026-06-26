import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class VisitorOpsService {
  async getVisitorLogs(tenantId: string) {
    const logs = await prisma.visitorLog.findMany({
      where: {
        propertyProject: { tenantId }
      },
      include: {
        unit: true,
        Resident: {
          include: { customer: true }
        },
        approvedBy: true
      },
      orderBy: { entryTime: 'desc' }
    });

    return logs.map(v => ({
      id: v.id,
      visitorName: v.visitorName,
      purpose: v.purpose,
      status: v.status,
      entryTime: v.entryTime,
      exitTime: v.exitTime,
      unitNumber: v.unit?.unitNumber || 'N/A',
      hostName: v.Resident?.customer?.name || v.approvedBy?.name || 'N/A',
      vehiclePlate: v.vehiclePlate
    }));
  }

  async createVisitor(tenantId: string, data: any) {
    return prisma.visitorLog.create({
      data: {
        ...data,
      }
    });
  }
}
