// @ts-nocheck
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTowerDto, UpdateTowerDto } from './dto/create-tower.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';

@Injectable()
export class TowerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTowerDto: any, tenantId: string) {
    const property = await this.prisma.propertyProject.findFirst({
      where: { id: createTowerDto.projectId, tenantId }
    });
    if (!property) throw new ForbiddenException('You do not have access to this Property');

    // Default totalFloors to 10 if not provided
    const data = { ...createTowerDto, totalFloors: createTowerDto.totalFloors || 10 };

    return this.prisma.tower.create({ data: data as any });
  }

  async findAll(tenantId: string, query: PaginationQueryDto) {
    let { page = 1, limit = 10, search, sortBy = 'id', sortOrder = 'desc' } = query;
    if (sortBy === 'createdAt') sortBy = 'id';
    const skip = (page - 1) * limit;

    const where = {
      propertyProject: { tenantId },
      archivedAt: null,
      ...(search ? { name: { contains: search, mode: 'insensitive' as const } } : {})
    };

    const [data, total] = await Promise.all([
      this.prisma.tower.findMany({
        where, skip, take: limit, orderBy: { [sortBy]: sortOrder },
        include: { propertyProject: { select: { name: true } }, _count: { select: { floors: true } } }
      }),
      this.prisma.tower.count({ where })
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async update(id: string, updateTowerDto: any, tenantId: string) {
    await this.findOne(id, tenantId);
    return this.prisma.tower.update({
      where: { id },
      data: updateTowerDto,
    });
  }

  async findOne(id: string, tenantId: string) {
    const tower = await this.prisma.tower.findFirst({
      where: { id, propertyProject: { tenantId }, archivedAt: null },
      include: { floors: { where: { archivedAt: null } } }
    });
    if (!tower) throw new NotFoundException('Building not found');
    return tower;
  }

  async archive(id: string, tenantId: string) {
    await this.findOne(id, tenantId);
    return this.prisma.tower.update({ where: { id }, data: { archivedAt: new Date() } });
  }

  async restore(id: string, tenantId: string) {
    const tower = await this.prisma.tower.findFirst({ where: { id, propertyProject: { tenantId } } });
    if (!tower) throw new NotFoundException('Building not found');
    return this.prisma.tower.update({ where: { id }, data: { archivedAt: null } });
  }
}
