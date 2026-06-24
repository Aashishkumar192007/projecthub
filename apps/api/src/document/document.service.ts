import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class DocumentService {
  async getDocuments(tenantId: string) {
    return prisma.document.findMany({ where: { tenantId } });
  }

  async uploadDocument(tenantId: string, data: any) {
    return prisma.document.create({ data: { ...data, tenantId } });
  }
}
