// @ts-nocheck
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlockDto, UpdateBlockDto } from './dto/create-block.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';

@Injectable()
export class BlockService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBlockDto: CreateBlockDto, tenantId: string) {
    const property = await this.prisma.propertyProject.findFirst({
      where: { id: createBlockDto.propertyProjectId, tenantId }
    });
    if (!property) throw new ForbiddenException('Invalid Property or unauthorized');

    return this.prisma.block.create({
      data: createBlockDto,
    });
  }

  async findAll(tenantId: string, query: PaginationQueryDto) {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const skip = (page - 1) * limit;

    const where = {
      propertyProject: { tenantId },
      archivedAt: null,
      ...(search ? { name: { contains: search, mode: 'insensitive' as const } } : {})
    };

    const [data, total] = await Promise.all([
      this.prisma.block.findMany({
        where, skip, take: limit, orderBy: { [sortBy]: sortOrder },
        include: { propertyProject: { select: { name: true } }, _count: { select: { towers: true } } }
      }),
      this.prisma.block.count({ where })
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string, tenantId: string) {
    const block = await this.prisma.block.findFirst({
      where: { id, propertyProject: { tenantId }, archivedAt: null },
      include: { towers: { where: { archivedAt: null } } }
    });
    if (!block) throw new NotFoundException('Block not found');
    return block;
  }

  async update(id: string, updateBlockDto: UpdateBlockDto, tenantId: string) {
    await this.findOne(id, tenantId);
    return this.prisma.block.update({ where: { id }, data: updateBlockDto });
  }

  async archive(id: string, tenantId: string) {
    await this.findOne(id, tenantId);
    return this.prisma.block.update({ where: { id }, data: { archivedAt: new Date() } });
  }

  async restore(id: string, tenantId: string) {
    const block = await this.prisma.block.findFirst({ where: { id, propertyProject: { tenantId } } });
    if (!block) throw new NotFoundException('Block not found');
    return this.prisma.block.update({ where: { id }, data: { archivedAt: null } });
  }
}
