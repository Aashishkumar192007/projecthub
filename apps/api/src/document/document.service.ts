import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async getDocuments(tenant_id: string) {
    return this.prisma.document.findMany({ where: { tenant_id } });
  }

  async uploadDocument(tenant_id: string, data: any) {
    return this.prisma.document.create({ data: { ...data, tenant_id } });
  }
}
