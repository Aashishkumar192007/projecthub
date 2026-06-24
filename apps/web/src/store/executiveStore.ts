import { create } from 'zustand';

export type PortfolioCategory = 'Residential' | 'Commercial' | 'Mixed Use' | 'Construction' | 'Facilities';

export interface RegionalMetrics {
  id: string;
  name: string;
  revenue: number; // in Cr
  occupancy: number; // percentage
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface PropertyScorecard {
  id: string;
  name: string;
  category: PortfolioCategory;
  revenue: number; // in Cr
  occupancy: number; // percentage
  tenantHealth: number; // percentage
  esgScore: number; // percentage
  riskScore: number; // percentage
}

export interface StrategicForecast {
  currentRevenue: number;
  projectedRevenue: number;
  currentOccupancy: number;
  projectedOccupancy: number;
  currentConstruction: number;
  projectedConstruction: number;
}

export interface ExecutiveEvent {
  id: string;
  time: string;
  message: string;
  type: 'Revenue' | 'Risk' | 'Operations' | 'Project';
}

interface ExecutiveState {
  activeCategory: PortfolioCategory | 'All';
  isWarRoomMode: boolean;
  
  // Data
  regions: RegionalMetrics[];
  scorecards: PropertyScorecard[];
  forecasts: StrategicForecast;
  timeline: ExecutiveEvent[];
  
  // Computed
  getPortfolioHealthIndex: () => number;
  
  // Actions
  setActiveCategory: (category: PortfolioCategory | 'All') => void;
  toggleWarRoomMode: () => void;
}

const mockRegions: RegionalMetrics[] = [
  { id: 'r-west', name: 'West Region', revenue: 42, occupancy: 95, riskLevel: 'Low' },
  { id: 'r-south', name: 'South Region', revenue: 31, occupancy: 87, riskLevel: 'Medium' },
  { id: 'r-north', name: 'North Region', revenue: 58, occupancy: 92, riskLevel: 'Medium' },
  { id: 'r-east', name: 'East Region', revenue: 17, occupancy: 81, riskLevel: 'High' },
];

const mockScorecards: PropertyScorecard[] = [
  { id: 'p-1', name: 'Millennium Tower', category: 'Commercial', revenue: 12.5, occupancy: 98, tenantHealth: 92, esgScore: 85, riskScore: 10 },
  { id: 'p-2', name: 'Sunset Heights', category: 'Residential', revenue: 8.2, occupancy: 85, tenantHealth: 78, esgScore: 60, riskScore: 35 },
  { id: 'p-3', name: 'Tech Park Alpha', category: 'Commercial', revenue: 24.0, occupancy: 91, tenantHealth: 88, esgScore: 90, riskScore: 15 },
  { id: 'p-4', name: 'The Galleria', category: 'Mixed Use', revenue: 15.8, occupancy: 89, tenantHealth: 85, esgScore: 75, riskScore: 20 },
];

const mockTimeline: ExecutiveEvent[] = [
  { id: 'e-1', time: '08:12', message: 'Lease Renewed: Acme Corp (5 years)', type: 'Revenue' },
  { id: 'e-2', time: '08:24', message: 'Revenue Alert: Collection drop in East Region', type: 'Risk' },
  { id: 'e-3', time: '08:31', message: 'Work Order Escalated: Millennium Tower HVAC', type: 'Operations' },
  { id: 'e-4', time: '08:44', message: 'Project Delay Detected: Phase 3 Foundation', type: 'Project' },
  { id: 'e-5', time: '09:05', message: 'Invoice Paid: ₹4.2 Cr from Tech Park', type: 'Revenue' },
];

export const useExecutiveStore = create<ExecutiveState>((set, get) => ({
  activeCategory: 'All',
  isWarRoomMode: false,
  
  regions: mockRegions,
  scorecards: mockScorecards,
  forecasts: {
    currentRevenue: 148,
    projectedRevenue: 162,
    currentOccupancy: 91,
    projectedOccupancy: 94,
    currentConstruction: 76,
    projectedConstruction: 81,
  },
  timeline: mockTimeline,
  
  setActiveCategory: (category) => set({ activeCategory: category }),
  toggleWarRoomMode: () => set((state) => ({ isWarRoomMode: !state.isWarRoomMode })),
  
  getPortfolioHealthIndex: () => {
    // Calculated from Occupancy, Revenue Growth, Collections, ESG, Tenant Health, Project Health
    // Mocking an 87/100 based on the requirement
    return 87;
  }
}));
