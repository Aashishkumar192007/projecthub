import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ResidentService {
  async getResidents(tenantId: string) {
    const residents = await prisma.resident.findMany({
      where: { tenantId },
      include: {
        customer: {
          include: {
            familyMembers: true,
            vehicles: true,
          }
        },
        occupancies: {
          include: {
            unit: {
              include: {
                floor: {
                  include: {
                    tower: true
                  }
                }
              }
            }
          }
        },
        maintenanceBills: {
          where: { tenantId }
        },
        complaints: {
          where: { tenantId }
        }
      }
    });

    return residents.map(r => {
      const currentOccupancy = r.occupancies.find(o => o.status === 'ACTIVE') || r.occupancies[0];
      const outstandingDues = r.maintenanceBills?.reduce((sum, bill) => sum + Number(bill.amount || 0), 0) || 0;
      
      // Calculate a simple health score based on outstanding dues and complaints
      let healthScore = 100;
      if (outstandingDues > 1000) healthScore -= 20;
      if (outstandingDues > 5000) healthScore -= 30;
      if (r.complaints.length > 2) healthScore -= 10;
      healthScore = Math.max(0, healthScore);

      return {
        id: r.id,
        customerId: r.customer.id,
        name: r.customer.name,
        email: r.customer.email,
        phone: r.customer.phone,
        type: r.type,
        status: r.status,
        unitNumber: currentOccupancy?.unit?.unitNumber || 'Unassigned',
        buildingName: currentOccupancy?.unit?.floor?.tower?.name || 'N/A',
        moveInDate: currentOccupancy?.moveInDate || r.createdAt,
        familyMembers: r.customer.familyMembers,
        vehicles: r.customer.vehicles,
        outstandingDues,
        healthScore
      };
    });
  }

  async getResidentDetails(tenantId: string, id: string) {
    const resident = await prisma.resident.findUnique({
      where: { id },
      include: {
        customer: {
          include: {
            pets: true,
            emergencyContacts: true,
            familyMembers: true,
            vehicles: true,
            documents: true,
          }
        },
        occupancies: {
          include: {
            unit: {
              include: {
                parkingSlot: true,
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
        },
        amenityBookings: {
          include: { amenity: true }
        },
        visitorLogs: true,
        maintenanceBills: true,
        complaints: true,
      }
    });

    if (!resident) throw new NotFoundException('Resident not found');
    return resident;
  }

  async assignUnit(tenantId: string, data: any) {
    const { unitId, name, email, phone, familyMembers, type = 'OWNER' } = data;

    const unit = await prisma.unit.findUnique({ where: { id: unitId } });
    if (!unit) throw new NotFoundException('Unit not found');

    // 1. Create or find the Customer
    const customer = await prisma.customer.create({
      data: {
        tenantId,
        name,
        email,
        phone,
        kycStatus: 'VERIFIED',
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

    // 2. Create the Resident record linking customer and tenant
    const resident = await prisma.resident.create({
      data: {
        tenantId,
        customerId: customer.id,
        type,
        status: 'ACTIVE'
      }
    });

    // 3. Create Occupancy
    await prisma.occupancy.create({
      data: {
        tenantId,
        residentId: resident.id,
        unitId: unit.id,
        moveInDate: new Date(),
        status: 'ACTIVE'
      }
    });

    // 4. Mark unit as occupied/sold
    await prisma.unit.update({
      where: { id: unitId },
      data: { status: 'SOLD', ownerId: customer.id }
    });

    return this.getResidentDetails(tenantId, resident.id);
  }
}
