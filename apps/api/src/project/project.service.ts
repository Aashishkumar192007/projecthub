import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: any, tenantId: string) {
    const { name, description, location, status, totalBudget, estimatedCompletion } = createProjectDto;

    return this.prisma.project.create({
      data: {
        name,
        description,
        location,
        status,
        totalBudget,
        estimatedCompletion,
        tenantId,
      }
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.project.findMany({
      where: { tenantId },
      include: {
        _count: {
          select: { properties: true }
        }
      }
    });
  }

  async findOne(id: string, tenantId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, tenantId },
      include: {
        properties: true,
      }
    });

    if (!project) throw new NotFoundException('Project not found');
    return project;
  }
}
