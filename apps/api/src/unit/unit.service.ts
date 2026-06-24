// @ts-nocheck
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUnitDto, UpdateUnitDto } from './dto/create-unit.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';

@Injectable()
export class UnitService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUnitDto: any, tenantId: string) {
    const floor = await this.prisma.floor.findFirst({
      where: { id: createUnitDto.floorId, tower: { propertyProject: { tenantId } } }
    });
    if (!floor) throw new ForbiddenException('Invalid Floor or unauthorized access.');

    const data = { ...createUnitDto };
    data.type = data.unitType || 'OFFICE';
    delete data.unitType;
    data.carpetArea = data.areaSqFt || 1000;
    delete data.areaSqFt;
    data.basePrice = 0;

    return this.prisma.unit.create({ data: data as any });
  }

  async findAll(tenantId: string, query: PaginationQueryDto) {
    let { page = 1, limit = 10, search, sortBy = 'id', sortOrder = 'desc' } = query;
    if (sortBy === 'createdAt') sortBy = 'id';
    const skip = (page - 1) * limit;

    const where = {
      floor: { tower: { propertyProject: { tenantId } } },
      archivedAt: null,
      ...(search ? { unitNumber: { contains: search, mode: 'insensitive' as const } } : {})
    };

    const [data, total] = await Promise.all([
      this.prisma.unit.findMany({
        where, skip, take: limit, orderBy: { [sortBy]: sortOrder },
        include: { floor: { select: { floorNumber: true, tower: { select: { name: true, propertyProject: { select: { name: true } } } } } } }
      }),
      this.prisma.unit.count({ where })
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string, tenantId: string) {
    const unit = await this.prisma.unit.findFirst({
      where: { id, floor: { tower: { propertyProject: { tenantId } } }, archivedAt: null },
      include: { leases: true }
    });
    if (!unit) throw new NotFoundException('Unit not found');
    return unit;
  }

  async archive(id: string, tenantId: string) {
    await this.findOne(id, tenantId);
    return this.prisma.unit.update({ where: { id }, data: { archivedAt: new Date() } });
  }

  async restore(id: string, tenantId: string) {
    const unit = await this.prisma.unit.findFirst({ where: { id, floor: { tower: { propertyProject: { tenantId } } } } });
    if (!unit) throw new NotFoundException('Unit not found');
    return this.prisma.unit.update({ where: { id }, data: { archivedAt: null } });
  }
}
