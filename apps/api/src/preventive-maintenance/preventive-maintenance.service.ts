import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PreventiveMaintenanceService {
  async getChecklists(tenantId: string) {
    return prisma.maintenanceChecklist.findMany({ where: { tenantId }, include: { tasks: true } });
  }
}
