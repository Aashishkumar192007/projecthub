import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PreventiveMaintenanceService {
  constructor(private prisma: PrismaService) {}

  async getChecklists(tenant_id: string) {
    return this.prisma.maintenanceChecklist.findMany({ where: { tenant_id }, include: { tasks: true } });
  }
}
