import { create } from 'zustand';

export interface ResidentMaster {
  id: string;
  name: string;
  customerId: string;
  unitId?: string;
  unitNumber: string;
  buildingName: string;
  type: string;
  status: string;
  phone: string;
  email: string;
  vehicles: number;
  familyMembers: number;
  moveInDate: string;
  healthScore: number;
  complaintRisk: 'Low' | 'Medium' | 'High';
  outstandingDues: number;
  communityParticipation: number;
  avatarUrl?: string;
  rawDetails?: any;
}

interface ResidentState {
  residents: ResidentMaster[];
  activeResidentId: string | null;
  isLoading: boolean;
  error: string | null;

  setActiveResident: (id: string) => void;
  getResidentById: (id: string) => ResidentMaster | undefined;
  
  fetchResidents: () => Promise<void>;
  fetchResidentDetails: (id: string) => Promise<void>;
  createResident: (data: Partial<ResidentMaster>) => void;
}

export const useResidentStore = create<ResidentState>((set, get) => ({
  residents: [],
  activeResidentId: null,
  isLoading: false,
  error: null,

  setActiveResident: (id) => set({ activeResidentId: id }),
  
  getResidentById: (id) => get().residents.find(r => r.id === id),

  fetchResidents: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('http://localhost:3001/api/v1/residents');
      if (!response.ok) throw new Error('Failed to fetch residents');
      const data = await response.json();
      
      const formattedResidents: ResidentMaster[] = data.map((r: any) => ({
        id: r.id,
        name: r.name,
        customerId: r.customerId,
        unitNumber: r.unitNumber,
        buildingName: r.buildingName,
        type: r.type,
        status: r.status,
        phone: r.phone || '',
        email: r.email || '',
        vehicles: r.vehicles?.length || 0,
        familyMembers: r.familyMembers?.length || 0,
        moveInDate: r.moveInDate,
        healthScore: r.healthScore,
        complaintRisk: r.healthScore < 50 ? 'High' : (r.healthScore < 80 ? 'Medium' : 'Low'),
        outstandingDues: r.outstandingDues,
        communityParticipation: 50, // default or calculated later
      }));
      
      set({ residents: formattedResidents, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchResidentDetails: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`http://localhost:3001/api/v1/residents/${id}`);
      if (!response.ok) throw new Error('Failed to fetch resident details');
      const data = await response.json();
      
      set((state) => {
        const existing = state.residents.find(r => r.id === id);
        if (existing) {
          existing.rawDetails = data;
          return { residents: [...state.residents], isLoading: false };
        } else {
          // If we loaded details directly without main list
          return { isLoading: false };
        }
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createResident: (data) => set((state) => ({
    residents: [...state.residents, { ...data, id: `res-${Date.now()}` } as ResidentMaster]
  })),
}));
