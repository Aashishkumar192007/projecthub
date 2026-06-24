import { create } from 'zustand';

export type FacilityType = 'Campus' | 'Zone' | 'Building' | 'Common Area' | 'Critical Facility';
export type HealthStatus = 'Healthy' | 'Warning' | 'Critical';
export type AssetType = 'HVAC' | 'Generator' | 'Lift' | 'Fire System' | 'Electrical' | 'Water System';

export interface FacilityEscalation {
  id: string;
  title: string;
  severity: 'Critical' | 'Warning';
  metric: string;
  reason: string;
  action: string;
  targetId?: string; // Links to an asset if applicable
}

export interface FacilityAsset {
  id: string;
  facilityId: string;
  name: string;
  type: AssetType;
  health: number; // 0-100
  warranty: 'Active' | 'Expired' | 'Expiring Soon';
  amcStatus: 'Valid' | 'Expired';
  depreciation: number; // %
  lifecycleStage: 'New' | 'Mid-Life' | 'End-of-Life';
  coordinates: { top: string; left: string }; // For digital twin
}

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  campus: string;
  location: string;
  healthScore: number;
  openWorkOrders: number;
  occupancy: number; // %
  
  // Risk Metrics for Copilot
  assetFailureRisk: number;
  energyRisk: number;
  maintenanceRisk: number;
  complianceRisk: number;
  
  escalations: FacilityEscalation[];
  
  // Dashboard Metrics
  maintenanceBacklog: number;
  energyUsageVariance: number; // e.g., +18
}

export interface FacilityEvent {
  id: string;
  facilityId: string;
  time: string;
  message: string;
  type: 'WorkOrder' | 'Inspection' | 'Vendor' | 'UtilityAlert';
}

interface FacilityState {
  facilities: Facility[];
  assets: FacilityAsset[];
  events: FacilityEvent[];
  activeFacilityId: string | null;
  
  setActiveFacility: (id: string) => void;
}

const mockAssets: FacilityAsset[] = [
  { id: 'ast-001', facilityId: 'fac-001', name: 'Generator G-12', type: 'Generator', health: 45, warranty: 'Expired', amcStatus: 'Expired', depreciation: 80, lifecycleStage: 'End-of-Life', coordinates: { top: '30%', left: '20%' } },
  { id: 'ast-002', facilityId: 'fac-001', name: 'HVAC-22', type: 'HVAC', health: 65, warranty: 'Expiring Soon', amcStatus: 'Valid', depreciation: 60, lifecycleStage: 'Mid-Life', coordinates: { top: '50%', left: '70%' } },
  { id: 'ast-003', facilityId: 'fac-001', name: 'Lift L-04', type: 'Lift', health: 95, warranty: 'Active', amcStatus: 'Valid', depreciation: 10, lifecycleStage: 'New', coordinates: { top: '60%', left: '40%' } },
  { id: 'ast-004', facilityId: 'fac-001', name: 'Main Fire Panel', type: 'Fire System', health: 98, warranty: 'Active', amcStatus: 'Valid', depreciation: 5, lifecycleStage: 'New', coordinates: { top: '20%', left: '50%' } },
  { id: 'ast-005', facilityId: 'fac-001', name: 'Transformer T-1', type: 'Electrical', health: 88, warranty: 'Active', amcStatus: 'Valid', depreciation: 25, lifecycleStage: 'Mid-Life', coordinates: { top: '80%', left: '80%' } },
];

const mockFacilities: Facility[] = [
  {
    id: 'fac-001',
    name: 'Cyber City Main Campus',
    type: 'Campus',
    campus: 'Cyber City',
    location: 'North Zone',
    healthScore: 92,
    openWorkOrders: 14,
    occupancy: 88,
    assetFailureRisk: 84, // High risk due to G-12
    energyRisk: 65,
    maintenanceRisk: 30,
    complianceRisk: 10,
    maintenanceBacklog: 8,
    energyUsageVariance: 18,
    escalations: [
      { id: 'esc-1', title: 'Generator G-12', severity: 'Critical', metric: '84%', reason: 'Failure Risk', action: 'Schedule Inspection', targetId: 'ast-001' },
      { id: 'esc-2', title: 'Energy Usage', severity: 'Warning', metric: '+18%', reason: 'Above Baseline', action: 'Audit HVAC Systems' }
    ]
  },
  {
    id: 'fac-002',
    name: 'Tower 3 Datacenter',
    type: 'Critical Facility',
    campus: 'Cyber City',
    location: 'Tower 3, Basement',
    healthScore: 98,
    openWorkOrders: 1,
    occupancy: 100,
    assetFailureRisk: 5,
    energyRisk: 12,
    maintenanceRisk: 2,
    complianceRisk: 0,
    maintenanceBacklog: 0,
    energyUsageVariance: -2,
    escalations: []
  },
  {
    id: 'fac-003',
    name: 'Central Plaza',
    type: 'Common Area',
    campus: 'Cyber City',
    location: 'Ground Floor',
    healthScore: 75,
    openWorkOrders: 28,
    occupancy: 95,
    assetFailureRisk: 40,
    energyRisk: 45,
    maintenanceRisk: 85,
    complianceRisk: 30,
    maintenanceBacklog: 15,
    energyUsageVariance: 5,
    escalations: [
      { id: 'esc-3', title: 'Maintenance Backlog', severity: 'Warning', metric: '15 Tasks', reason: 'Resource Shortage', action: 'Assign External Vendor' }
    ]
  }
];

const mockEvents: FacilityEvent[] = [
  { id: 'ev-1', facilityId: 'fac-001', time: '08:15', message: 'Work Order #492 Created (HVAC Issue)', type: 'WorkOrder' },
  { id: 'ev-2', facilityId: 'fac-001', time: '08:45', message: 'Monthly Fire Safety Inspection Completed', type: 'Inspection' },
  { id: 'ev-3', facilityId: 'fac-001', time: '09:20', message: 'Vendor (Johnson Controls) Assigned to Lift L-04', type: 'Vendor' },
  { id: 'ev-4', facilityId: 'fac-001', time: '10:05', message: 'Utility Alert Triggered: Water Pressure Drop', type: 'UtilityAlert' },
];

export const useFacilityStore = create<FacilityState>((set) => ({
  facilities: mockFacilities,
  assets: mockAssets,
  events: mockEvents,
  activeFacilityId: null,
  
  setActiveFacility: (id) => set({ activeFacilityId: id }),
}));
