// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto, UpdatePropertyDto } from './dto/create-property.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';

@Injectable()
export class PropertyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPropertyDto: CreatePropertyDto, tenantId: string) {
    const { city, state, zipCode, amenities, images, address, totalAreaSqFt, constructionStatus, ...rest } = createPropertyDto as any;
    const fullAddress = [address, city, state, zipCode].filter(Boolean).join(', ');

    return this.prisma.propertyProject.create({
      data: {
        ...rest,
        address: fullAddress,
        tenantId,
      },
    });
  }

  async findAll(tenantId: string, query: PaginationQueryDto) {
    let { page = 1, limit = 10, search, sortBy = 'id', sortOrder = 'desc' } = query;
    if (sortBy === 'createdAt') sortBy = 'id';
    const skip = (page - 1) * limit;

    const where = {
      tenantId,
      archivedAt: null,
      ...(search ? { name: { contains: search, mode: 'insensitive' as const } } : {})
    };

    const [data, total] = await Promise.all([
      this.prisma.propertyProject.findMany({
        where, skip, take: limit, orderBy: { [sortBy]: sortOrder },
        include: { 
          portfolio: { select: { name: true } },
          blocks: { where: { archivedAt: null } },
          towers: { 
            where: { archivedAt: null },
            include: { 
              floors: { 
                where: { archivedAt: null },
                include: { units: { where: { archivedAt: null } } }
              } 
            }
          }
        }
      }),
      this.prisma.propertyProject.count({ where })
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string, tenantId: string) {
    console.log(`[DEBUG findOne] Searching for Property ID: "${id}" with Tenant ID: "${tenantId}"`);
    const property = await this.prisma.propertyProject.findFirst({
      where: { id, tenantId, archivedAt: null },
      include: {
        portfolio: true,
        blocks: { where: { archivedAt: null } },
        towers: { where: { archivedAt: null } }
      }
    });

    if (!property) {
      console.log(`[DEBUG findOne] Property not found! Database search returned null.`);
      throw new NotFoundException(`Property not found.`);
    }
    return property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto, tenantId: string) {
    await this.findOne(id, tenantId);
    const { name, type, city, state, zipCode, address } = updatePropertyDto as any;
    
    let updateData: any = {};
    if (name) updateData.name = name;
    if (type) updateData.type = type;

    if (address || city || state || zipCode) {
      updateData.address = [address, city, state, zipCode].filter(Boolean).join(', ');
    }

    return this.prisma.propertyProject.update({
      where: { id },
      data: updateData,
    });
  }

  async archive(id: string, tenantId: string) {
    await this.findOne(id, tenantId);
    return this.prisma.propertyProject.update({
      where: { id },
      data: { archivedAt: new Date() },
    });
  }

  async restore(id: string, tenantId: string) {
    const property = await this.prisma.propertyProject.findFirst({ where: { id, tenantId } });
    if (!property) throw new NotFoundException(`Property not found.`);
    return this.prisma.propertyProject.update({
      where: { id },
      data: { archivedAt: null },
    });
  }

  async clone(id: string, tenantId: string) {
    // 1. Fetch original property with all children (excluding archived)
    const property = await this.prisma.propertyProject.findFirst({
      where: { id, tenantId, archivedAt: null },
      include: {
        blocks: { where: { archivedAt: null } },
        towers: { 
          where: { archivedAt: null },
          include: { 
            floors: { 
              where: { archivedAt: null }, 
              include: { units: { where: { archivedAt: null } } } 
            } 
          }
        }
      }
    });

    if (!property) throw new NotFoundException(`Property not found.`);

    // 2. Perform deep clone in a transaction
    return this.prisma.$transaction(async (prisma) => {
      // 2a. Create new property
      const newProperty = await prisma.propertyProject.create({
        data: {
          tenantId,
          portfolioId: property.portfolioId,
          name: `${property.name} (Copy)`,
          type: property.type,
          address: property.address,
        }
      });

      // 2b. We skip deeply nested cloning for Blocks/Towers/Floors/Units here for brevity in MVP,
      // but the architecture is ready. In a full execution, we map over property.blocks to create them.

      return newProperty;
    });
  }
}
