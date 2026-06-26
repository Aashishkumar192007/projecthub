import { create } from 'zustand';

export interface MaintenanceBill {
  id: string;
  unitNumber: string;
  residentName: string;
  billingPeriod: string;
  amount: number;
  status: string;
  dueDate: string;
  paymentDate?: string;
}

interface MaintenanceState {
  bills: MaintenanceBill[];
  isLoading: boolean;
  
  fetchBills: () => Promise<void>;
}

export const useMaintenanceStore = create<MaintenanceState>((set) => ({
  bills: [],
  isLoading: false,

  fetchBills: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('http://localhost:3001/api/v1/maintenance');
      if (res.ok) {
        const data = await res.json();
        set({ bills: data, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
    }
  }
}));
