import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ResidentService {
  async getResidents(tenantId: string) {
    return prisma.customer.findMany({ 
      where: { tenantId },
      include: {
        familyMembers: true,
        ownedUnits: {
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
          }
        }
      }
    });
  }

  async getResidentDetails(tenantId: string, id: string) {
    return prisma.customer.findUnique({
      where: { id },
      include: {
        pets: true,
        emergencyContacts: true,
        familyMembers: true,
        ownedUnits: {
          include: {
            parkingSlot: true,
            maintenanceBills: {
              where: { tenantId }
            },
            floor: {
              include: {
                tower: {
                  include: {
                    propertyProject: {
                      include: {
                        UtilityMeter: {
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

  async assignUnit(tenantId: string, data: any) {
    const { unitId, name, email, phone, familyMembers } = data;

    const unit = await prisma.unit.findUnique({ where: { id: unitId } });
    if (!unit) throw new NotFoundException('Unit not found');

    // Create the customer
    const customer = await prisma.customer.create({
      data: {
        tenantId,
        name,
        email,
        phone,
        kycStatus: 'VERIFIED',
        ownedUnits: {
          connect: { id: unitId }
        },
        familyMembers: {
          create: (familyMembers || []).map((fm: any) => ({
            tenantId,
            firstName: fm.firstName,
            lastName: fm.lastName,
            relation: fm.relation,
          }))
        }
      }
    });

    // Mark unit as sold/occupied
    await prisma.unit.update({
      where: { id: unitId },
      data: { status: 'SOLD' }
    });

    return customer;
  }
}
