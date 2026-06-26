import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class SpaceManagementService {
  async getParkingInventory(tenantId: string) {
    const facilities = await prisma.parkingFacility.findMany({
      where: { tenantId },
      include: {
        slots: {
          include: {
            sessions: {
              where: { status: 'ACTIVE' },
              include: {
                vehicle: {
                  include: { customer: true, employee: true }
                }
              }
            }
          }
        }
      }
    });

    const allSlots: any[] = [];
    for (const facility of facilities) {
      for (const slot of facility.slots) {
        let status = slot.isOccupied ? 'Allocated' : 'Available';
        let allocatedTo: string | null = null;
        if (slot.sessions.length > 0) {
          status = 'Allocated';
          const activeSession = slot.sessions[0];
          if (activeSession.vehicle?.customer) {
            allocatedTo = activeSession.vehicle.customer.name;
          } else if (activeSession.vehicle?.employee) {
            allocatedTo = activeSession.vehicle.employee.firstName + ' ' + activeSession.vehicle.employee.lastName;
          }
        }

        allSlots.push({
          id: slot.id,
          slotNumber: slot.slotNumber,
          type: slot.slotType === 'EV_CHARGING' ? 'EV' : (slot.slotType === 'HANDICAP' ? 'Visitor' : 'Reserved'),
          status,
          allocatedTo,
          rfidTag: slot.sessions[0]?.vehicle?.licensePlate || null,
        });
      }
    }
    return allSlots;
  }
}
