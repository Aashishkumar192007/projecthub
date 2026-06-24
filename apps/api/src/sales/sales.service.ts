import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async convertLeadToSale(convertDto: any, tenantId: string, userId: string) {
    const { leadId, unitId, saleAmount, depositAmount, paymentTerms, contractDate } = convertDto;

    // 1. Verify Unit Availability
    const unit = await this.prisma.unit.findFirst({
      where: { id: unitId, tenantId, status: 'AVAILABLE' }
    });

    if (!unit) {
      throw new BadRequestException('Unit is not available for sale');
    }

    // 2. Start a Transaction to ensure atomic conversion
    return this.prisma.$transaction(async (tx) => {
      // 3. Mark Lead as WON
      await tx.lead.update({
        where: { id: leadId },
        data: { status: 'WON' }
      });

      // 4. Create the Sales Agreement
      const agreement = await tx.salesAgreement.create({
        data: {
          leadId,
          unitId,
          saleAmount,
          depositAmount,
          contractDate: new Date(contractDate),
          status: 'PENDING_PAYMENT',
          assignedToId: userId,
          tenantId,
        }
      });

      // 5. Generate Payment Plan Schedule
      // Simplified: Just 1 initial deposit payment for MVP
      await tx.paymentPlan.create({
        data: {
          salesAgreementId: agreement.id,
          amount: depositAmount,
          dueDate: new Date(contractDate),
          status: 'PENDING',
          tenantId,
        }
      });

      // 6. Block the Unit
      await tx.unit.update({
        where: { id: unitId },
        data: { status: 'SOLD' }
      });

      return agreement;
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.salesAgreement.findMany({
      where: { tenantId },
      include: {
        lead: { select: { firstName: true, lastName: true } },
        unit: { select: { unitNumber: true } },
        paymentPlans: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
