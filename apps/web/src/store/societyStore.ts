import { create } from 'zustand';

export interface ParkingSlot {
  id: string;
  slotNumber: string;
  type: string;
  status: string;
  allocatedTo?: string; // Resident Name
  vehicleId?: string;
  rfidTag?: string;
}

export interface Amenity {
  id: string;
  name: string;
  category: string;
  capacity: number;
  status: string;
}

interface SocietyState {
  parkingSlots: ParkingSlot[];
  amenities: Amenity[];
  isLoading: boolean;
  
  fetchParkingSlots: () => Promise<void>;
  fetchAmenities: () => Promise<void>;
  allocateParking: (slotId: string, residentId: string, vehicleId: string) => void;
}

export const useSocietyStore = create<SocietyState>((set) => ({
  parkingSlots: [],
  amenities: [],
  isLoading: false,

  fetchParkingSlots: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('http://localhost:3001/api/v1/parking/inventory');
      if (res.ok) {
        const data = await res.json();
        set({ parkingSlots: data, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
    }
  },

  fetchAmenities: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('http://localhost:3001/api/v1/facility-booking/amenities');
      if (res.ok) {
        const data = await res.json();
        set({ amenities: data, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
    }
  },

  allocateParking: (slotId, residentId, vehicleId) => set((state) => ({
    parkingSlots: state.parkingSlots.map(slot => 
      slot.id === slotId ? { ...slot, status: 'Allocated', allocatedTo: residentId, vehicleId } : slot
    )
  }))
}));

