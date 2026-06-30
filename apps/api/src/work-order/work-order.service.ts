import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkOrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorkOrderDto: any, tenant_id: string) {
    const project_id = createWorkOrderDto.propertyProjectId || createWorkOrderDto.projectId;
    if (project_id) {
      const project = await this.prisma.project.findFirst({
        where: { project_id, tenant_id }
      });

      if (!project) throw new ForbiddenException('Invalid Project or unauthorized access.');
    }

    const { unitId, vendorId, complaintId, propertyProjectId, ...data } = createWorkOrderDto;

    return this.prisma.workOrder.create({
      data: {
        ...data,
        tenant_id,
        unit_id: unitId,
        vendor_id: vendorId,
        complaint_id: complaintId,
        project_id: project_id,
        status: createWorkOrderDto.status || 'OPEN',
      },
    });
  }

  async findAll(tenant_id: string) {
    return this.prisma.workOrder.findMany({
      where: { tenant_id },
      include: {
        assignedToVendor: { select: { name: true } }
      }
    });
  }

  async findOne(id: string, tenant_id: string) {
    const workOrder = await this.prisma.workOrder.findFirst({
      where: { id, tenant_id },
      include: { unit: true, assignedToVendor: true, complaint: true }
    });

    if (!workOrder) throw new NotFoundException('Work Order not found');
    return workOrder;
  }
}
