import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  async create(createTenantDto: any) {
    const { name, domain, industry, themePrimary, themeSecondary, logoUrl } = createTenantDto;

    return this.prisma.tenant.create({
      data: {
        name,
        domain,
        industry,
        themePrimary,
        themeSecondary,
        logoUrl
      }
    });
  }

  async findAll() {
    return this.prisma.tenant.findMany();
  }

  async findOne(id: string) {
    const tenant = await this.prisma.tenant.findUnique({ where: { id } });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }
}
