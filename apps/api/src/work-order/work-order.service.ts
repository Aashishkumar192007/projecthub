import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkOrderDto, UpdateWorkOrderDto } from './dto/create-work-order.dto';

@Injectable()
export class WorkOrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorkOrderDto: any, tenantId: string) {
    const property = await this.prisma.propertyProject.findFirst({
      where: { id: createWorkOrderDto.propertyProjectId, tenantId }
    });

    if (!property) throw new ForbiddenException('Invalid Property or unauthorized access.');

    return this.prisma.workOrder.create({
      data: {
        ...createWorkOrderDto,
        tenantId,
        status: createWorkOrderDto.status || 'OPEN',
      } as any,
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.workOrder.findMany({
      where: { tenantId },
      include: {
        assignedToVendor: { select: { name: true } }
      }
    } as any);
  }

  async findOne(id: string, tenantId: string) {
    const workOrder = await this.prisma.workOrder.findFirst({
      where: { id, tenantId },
      include: { unit: true, assignedToVendor: true, complaint: true }
    } as any);

    if (!workOrder) throw new NotFoundException('Work Order not found');
    return workOrder;
  }
}
