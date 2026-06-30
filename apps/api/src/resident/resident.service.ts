import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResidentService {
  constructor(private prisma: PrismaService) {}

  async getResidents(tenant_id: string) {
    return this.prisma.customer.findMany({ 
      where: { tenant_id },
      include: {
        familyMembers: true,
        ownedUnits: {
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
          }
        }
      }
    });
  }

  async getResidentDetails(tenant_id: string, id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
      include: {
        pets: true,
        emergencyContacts: true,
        familyMembers: true,
        ownedUnits: {
          include: {
            parkingSlot: true,
            maintenanceBills: {
              where: { tenant_id }
            },
            floor: {
              include: {
                building: {
                  include: {
                    property: {
                      include: {
                        UtilityMeters: {
                          include: { consumptions: true }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        vehicles: true
      }
    });
  }

  async assignUnit(tenant_id: string, data: any) {
    const { unitId, name, email, phone, familyMembers } = data;

    const unit = await this.prisma.unit.findUnique({ where: { unit_id: unitId } });
    if (!unit) throw new NotFoundException('Unit not found');

    // Create the customer
    const customer = await this.prisma.customer.create({
      data: {
        tenant_id,
        name,
        email,
        phone,
        kycStatus: 'VERIFIED',
        ownedUnits: {
          connect: { unit_id: unitId }
        },
        familyMembers: {
          create: (familyMembers || []).map((fm: any) => ({
            tenant_id,
            firstName: fm.firstName,
            lastName: fm.lastName,
            relation: fm.relation,
          }))
        }
      }
    });

    // Mark unit as sold/occupied
    await this.prisma.unit.update({
      where: { unit_id: unitId },
      data: { status: 'SOLD' }
    });

    return customer;
  }
}
