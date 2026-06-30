import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CrmService {
  constructor(private prisma: PrismaService) {}

  private calculateLeadScore(lead: any): number {
    let score = 0;
    if (lead.budgetMax) score += 20; // Budget fit mock
    if (lead.activities?.some((a: any) => a.type === 'CALL')) score += 20;
    if (lead.siteVisits?.some((v: any) => v.status === 'COMPLETED')) score += 30;
    if (lead.activities?.some((a: any) => a.type === 'WHATSAPP')) score += 10;
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

  async getLeads(tenant_id: string, folder?: string) {
    let whereClause: any = { tenant_id };
    
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

  async getLead(tenant_id: string, id: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id, tenant_id },
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

  async createLead(tenant_id: string, data: any) {
    const lead = await this.prisma.lead.create({
      data: {
        tenant_id,
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
    return lead;
  }

  async updateLeadStatus(tenant_id: string, id: string, status: string) {
    const lead = await this.prisma.lead.update({
      where: { id, tenant_id },
      data: { status }
    });

    await this.prisma.leadActivity.create({
      data: {
        tenant_id,
        lead_id: id,
        type: 'STATUS_CHANGE',
        title: `Status updated to ${status}`
      }
    });

    return lead;
  }

  async addActivity(tenant_id: string, lead_id: string, data: any) {
    const activity = await this.prisma.leadActivity.create({
      data: {
        tenant_id,
        lead_id,
        type: data.type,
        title: data.title,
        details: data.details
      }
    });

    const fullLead = await this.prisma.lead.findUnique({
      where: { id: lead_id },
      include: { activities: true, siteVisits: true }
    });

    if (fullLead) {
      const newScore = this.calculateLeadScore(fullLead);
      if (newScore !== fullLead.score) {
        await this.prisma.lead.update({
          where: { id: lead_id },
          data: { score: newScore }
        });
      }
    }

    return activity;
  }

  async reserveUnit(tenant_id: string, lead_id: string, unit_id: string) {
    await this.prisma.unit.update({
      where: { unit_id },
      data: { status: 'OCCUPIED' }
    });

    return this.prisma.interestedUnit.create({
      data: {
        tenant_id,
        lead_id,
        unit_id,
        status: 'RESERVED',
        reservedAt: new Date()
      }
    });
  }

  async getInventory(tenant_id: string, filters: any) {
    let whereClause: any = { 
      floor: {
        building: {
          property: { tenant_id }
        }
      }
    };

    if (filters.status) whereClause.status = filters.status;
    if (filters.projectId) {
      if (!whereClause.floor.building.property.id) {
        whereClause.floor.building.property.id = filters.projectId;
      }
    }
    if (filters.towerId) {
      whereClause.floor.building.building_id = filters.towerId;
    }

    return this.prisma.unit.findMany({
      where: whereClause,
      include: {
        floor: {
          include: {
            building: {
              include: {
                property: true
              }
            }
          }
        }
      },
      take: 100
    });
  }

  async compareUnits(tenant_id: string, unitIds: string[]) {
    return this.prisma.unit.findMany({
      where: {
        unit_id: { in: unitIds },
        floor: { building: { property: { tenant_id } } }
      },
      include: {
        floor: {
          include: {
            building: {
              include: { property: true }
            }
          }
        }
      }
    });
  }
}
