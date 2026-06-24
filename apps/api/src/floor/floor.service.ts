// @ts-nocheck
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFloorDto } from './dto/create-floor.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';

@Injectable()
export class FloorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFloorDto: any, tenantId: string) {
    // Validate that the tower belongs to a property owned by the tenant
    const tower = await this.prisma.tower.findFirst({
      where: { 
        id: createFloorDto.towerId, 
        propertyProject: { tenantId } 
      }
    });
    
    if (!tower) throw new ForbiddenException('Invalid Tower or unauthorized access');

    // Map `name` from UI payload to `floorNumber` for DB
    const data = { ...createFloorDto };
    if (data.name && !data.floorNumber) {
      data.floorNumber = data.name;
      delete data.name;
    }

    return this.prisma.floor.create({
      data: data as any
    });
  }

  async findAll(tenantId: string, query: PaginationQueryDto) {
    let { page = 1, limit = 10, search, sortBy = 'id', sortOrder = 'desc' } = query;
    if (sortBy === 'createdAt') sortBy = 'id';
    const skip = (page - 1) * limit;

    const where = {
      tower: { propertyProject: { tenantId } },
      archivedAt: null,
      ...(search ? { floorNumber: { contains: search, mode: 'insensitive' as const } } : {})
    };

    const [data, total] = await Promise.all([
      this.prisma.floor.findMany({
        where, skip, take: limit, orderBy: { [sortBy]: sortOrder },
        include: { tower: { select: { name: true, propertyProject: { select: { name: true } } } }, _count: { select: { units: true } } }
      }),
      this.prisma.floor.count({ where })
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string, tenantId: string) {
    const floor = await this.prisma.floor.findFirst({
      where: { id, tower: { propertyProject: { tenantId } }, archivedAt: null },
      include: { units: { where: { archivedAt: null } } }
    });
    if (!floor) throw new NotFoundException('Floor not found');
    return floor;
  }

  async archive(id: string, tenantId: string) {
    const floor = await this.findOne(id, tenantId);
    return this.prisma.floor.update({
      where: { id },
      data: { archivedAt: new Date() }
    });
  }

  async restore(id: string, tenantId: string) {
    const floor = await this.prisma.floor.findFirst({
      where: { id, tower: { propertyProject: { tenantId } } }
    });
    if (!floor) throw new NotFoundException('Floor not found');
    
    return this.prisma.floor.update({
      where: { id },
      data: { archivedAt: null }
    });
  }
}
