import { create } from 'zustand';

export interface Visitor {
  id: string;
  visitorName: string;
  purpose: string;
  entryTime: string;
  exitTime?: string;
  status: string;
  vehiclePlate?: string;
  unitNumber: string;
  hostName: string;
}

interface VisitorState {
  visitors: Visitor[];
  isLoading: boolean;
  
  fetchVisitors: () => Promise<void>;
}

export const useVisitorStore = create<VisitorState>((set) => ({
  visitors: [],
  isLoading: false,

  fetchVisitors: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('http://localhost:3001/api/v1/visitors');
      if (res.ok) {
        const data = await res.json();
        set({ visitors: data, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
    }
  }
}));
