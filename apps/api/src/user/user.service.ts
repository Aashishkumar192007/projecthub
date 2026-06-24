import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: any, tenantId: string) {
    const { email, password, firstName, lastName, roleId } = createUserDto;
    
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        tenantId,
        roles: {
          create: {
            roleId,
          }
        }
      },
      include: {
        roles: { include: { role: true } }
      }
    });

    // Exclude password hash from response
    const { passwordHash: _, ...result } = user;
    return result;
  }

  async findAll(tenantId: string) {
    return this.prisma.user.findMany({
      where: { tenantId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        status: true,
        lastLogin: true,
        roles: { include: { role: true } }
      }
    });
  }

  async findOne(id: string, tenantId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, tenantId },
      include: { roles: { include: { role: true } } }
    });

    if (!user) throw new NotFoundException('User not found');
    
    const { passwordHash: _, ...result } = user;
    return result;
  }
}
