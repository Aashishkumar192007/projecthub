import { create } from 'zustand';

interface DashboardState {
  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  toggleSearchModal: () => void;
  
  // Potential future state
  dateRange: string;
  setDateRange: (range: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  isSearchModalOpen: false,
  openSearchModal: () => set({ isSearchModalOpen: true }),
  closeSearchModal: () => set({ isSearchModalOpen: false }),
  toggleSearchModal: () => set((state) => ({ isSearchModalOpen: !state.isSearchModalOpen })),
  
  dateRange: 'YTD',
  setDateRange: (range) => set({ dateRange: range }),
}));
