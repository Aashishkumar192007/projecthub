import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CrmService {
  constructor(private prisma: PrismaService) {}

  private calculateLeadScore(lead: any): number {
    let score = 0;
    if (lead.budgetMax) score += 20; // Budget fit mock
    if (lead.activities?.some(a => a.type === 'CALL')) score += 20;
    if (lead.siteVisits?.some(v => v.status === 'COMPLETED')) score += 30;
    if (lead.activities?.some(a => a.type === 'WHATSAPP')) score += 10;
    if (lead.activities?.length > 0) score += 20;
    return Math.min(score, 100);
  }

  private determineNextAction(lead: any): string {
    if (lead.status === 'NEW') return 'Call within 30 minutes';
    if (lead.status === 'QUALIFIED') return 'Schedule Site Visit';
    if (lead.status === 'VISIT_COMPLETED') return 'Send Price Sheet';
    if (lead.status === 'NEGOTIATION') return 'Follow Up In 24 Hours';
    return 'N/A';
  }

  async getLeads(tenantId: string, folder?: string) {
    let whereClause: any = { tenantId };
    
    if (folder) {
      switch (folder) {
        case 'hot-leads':
          whereClause.score = { gt: 60 };
          break;
        case 'qualified':
          whereClause.status = 'QUALIFIED';
          break;
        case 'site-visits':
          whereClause.status = { in: ['VISIT_SCHEDULED', 'VISIT_COMPLETED'] };
          break;
        case 'negotiations':
          whereClause.status = 'NEGOTIATION';
          break;
        case 'bookings':
          whereClause.status = 'BOOKING';
          break;
        // customers and brokers handled elsewhere or with different logic
      }
    }

    const leads = await this.prisma.lead.findMany({
      where: whereClause,
      include: {
        activities: true,
        siteVisits: true,
        interestedUnits: { include: { unit: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return leads.map(lead => ({
      ...lead,
      nextAction: this.determineNextAction(lead)
    }));
  }

  async getLead(tenantId: string, id: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id, tenantId },
      include: {
        activities: { orderBy: { createdAt: 'desc' } },
        siteVisits: true,
        interestedUnits: { include: { unit: true } },
        notes: true
      }
    });
    
    if (!lead) throw new NotFoundException('Lead not found');

    return {
      ...lead,
      nextAction: this.determineNextAction(lead)
    };
  }

  async createLead(tenantId: string, data: any) {
    // Initial creation logic
    const lead = await this.prisma.lead.create({
      data: {
        tenantId,
        name: data.name,
        phone: data.phone,
        email: data.email,
        source: data.source || 'ORGANIC',
        status: 'NEW',
        score: 0,
        budgetMin: data.budgetMin,
        budgetMax: data.budgetMax
      }
    });

    // Score is 0 initially, recalculate will happen on activities
    return lead;
  }

  async updateLeadStatus(tenantId: string, id: string, status: string) {
    const lead = await this.prisma.lead.update({
      where: { id, tenantId },
      data: { status }
    });

    await this.prisma.leadActivity.create({
      data: {
        tenantId,
        leadId: id,
        type: 'STATUS_CHANGE',
        title: `Status updated to ${status}`
      }
    });

    return lead;
  }

  async addActivity(tenantId: string, leadId: string, data: any) {
    const activity = await this.prisma.leadActivity.create({
      data: {
        tenantId,
        leadId,
        type: data.type, // CALL, WHATSAPP, EMAIL
        title: data.title,
        details: data.details
      }
    });

    // Recalculate Score
    const fullLead = await this.prisma.lead.findUnique({
      where: { id: leadId },
      include: { activities: true, siteVisits: true }
    });

    if (fullLead) {
      const newScore = this.calculateLeadScore(fullLead);
      if (newScore !== fullLead.score) {
        await this.prisma.lead.update({
          where: { id: leadId },
          data: { score: newScore }
        });
      }
    }

    return activity;
  }

  async reserveUnit(tenantId: string, leadId: string, unitId: string) {
    // 1. Mark unit as RESERVED in main Unit table
    await this.prisma.unit.update({
      where: { id: unitId },
      data: { status: 'RESERVED' }
    });

    // 2. Link as InterestedUnit
    return this.prisma.interestedUnit.create({
      data: {
        tenantId,
        leadId,
        unitId,
        status: 'RESERVED',
        reservedAt: new Date()
      }
    });
  }

  async getInventory(tenantId: string, filters: any) {
    let whereClause: any = { 
      floor: {
        tower: {
          propertyProject: { tenantId }
        }
      }
    };

    if (filters.status) whereClause.status = filters.status;
    if (filters.projectId) whereClause.floor.tower.propertyProject.id = filters.projectId;
    if (filters.towerId) whereClause.floor.tower.id = filters.towerId;

    return this.prisma.unit.findMany({
      where: whereClause,
      include: {
        floor: {
          include: {
            tower: {
              include: {
                propertyProject: true
              }
            }
          }
        }
      },
      take: 100 // limit for now
    });
  }

  async compareUnits(tenantId: string, unitIds: string[]) {
    return this.prisma.unit.findMany({
      where: {
        id: { in: unitIds },
        floor: { tower: { propertyProject: { tenantId } } }
      },
      include: {
        floor: {
          include: { tower: { include: { propertyProject: true } } }
        }
      }
    });
  }
}
