// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePortfolioDto, UpdatePortfolioDto } from './dto/create-portfolio.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPortfolioDto: CreatePortfolioDto, tenantId: string) {
    return this.prisma.portfolio.create({
      data: {
        ...createPortfolioDto,
        tenantId,
      },
    });
  }

  async findAll(tenantId: string, query: PaginationQueryDto) {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const skip = (page - 1) * limit;

    const where = {
      tenantId,
      archivedAt: null, // Only return active portfolios
      ...(search ? { name: { contains: search, mode: 'insensitive' as const } } : {})
    };

    const [data, total] = await Promise.all([
      this.prisma.portfolio.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: { _count: { select: { properties: true } } }
      }),
      this.prisma.portfolio.count({ where })
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string, tenantId: string) {
    const portfolio = await this.prisma.portfolio.findFirst({
      where: { id, tenantId, archivedAt: null },
      include: { properties: { where: { archivedAt: null } } }
    });

    if (!portfolio) throw new NotFoundException('Portfolio not found');
    return portfolio;
  }

  async update(id: string, updatePortfolioDto: UpdatePortfolioDto, tenantId: string) {
    await this.findOne(id, tenantId); // ensure existence & ownership
    return this.prisma.portfolio.update({
      where: { id },
      data: updatePortfolioDto,
    });
  }

  async archive(id: string, tenantId: string) {
    await this.findOne(id, tenantId);
    return this.prisma.portfolio.update({
      where: { id },
      data: { archivedAt: new Date() },
    });
  }

  async restore(id: string, tenantId: string) {
    const portfolio = await this.prisma.portfolio.findFirst({
      where: { id, tenantId } // Even if archivedAt is not null
    });
    if (!portfolio) throw new NotFoundException('Portfolio not found');

    return this.prisma.portfolio.update({
      where: { id },
      data: { archivedAt: null },
    });
  }
}
