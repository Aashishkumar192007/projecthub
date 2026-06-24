import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: any, tenantId: string) {
    const { name, permissions } = createRoleDto;
    
    return this.prisma.role.create({
      data: {
        name,
        tenantId,
        permissions: {
          create: permissions.map(permissionName => ({
            permission: {
              connectOrCreate: {
                where: { name: permissionName },
                create: { name: permissionName, description: `Permission: ${permissionName}` }
              }
            }
          }))
        }
      }
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.role.findMany({
      where: { tenantId },
      include: {
        permissions: { include: { permission: true } }
      }
    });
  }
}
