import { create } from 'zustand';

export type ProcurementCategory = 'Purchase Requisitions' | 'RFQs' | 'Purchase Orders' | 'Goods Receipts' | 'Inventory' | 'Warehouses' | 'Vendors' | 'Contracts' | 'Budgets' | 'Approvals' | 'Construction Procurement' | 'Facility Procurement';

export interface ProcurementInsight {
  id: string;
  type: 'Risk' | 'Forecast' | 'Anomaly' | 'Recommendation';
  message: string;
  metric?: string;
  actionLabel?: string;
  isUrgent?: boolean;
}

export interface SupplyChainEvent {
  id: string;
  categoryId: string;
  date: string;
  message: string;
  type: 'PR Created' | 'RFQ Issued' | 'PO Approved' | 'Goods Received' | 'Vendor Rated' | 'Stock Alert';
}

export interface ProcurementEntity {
  id: string;
  name: string;
  category: ProcurementCategory;
  
  // Specifics
  value?: number; // In currency
  status: 'Healthy' | 'At Risk' | 'Delayed' | 'Pending Approval' | 'Active' | 'Low Stock' | 'Critical Stock';
  
  // Meta
  lastUpdated: string;
  owner: string;
  
  insights: ProcurementInsight[];
}

// System Level Stats
export interface ProcurementSystemStats {
  totalSpend: number;
  activeVendors: number;
  openPOs: number;
  inventoryValue: number;
  pendingApprovals: number;
  budgetConsumption: number; // Percentage
  supplyChainHealth: number; // 0-100
}

interface ProcurementState {
  entities: ProcurementEntity[];
  events: SupplyChainEvent[];
  stats: ProcurementSystemStats;
  activeCategoryId: ProcurementCategory | null;
  
  setActiveCategory: (category: ProcurementCategory) => void;
}

const mockStats: ProcurementSystemStats = {
  totalSpend: 184500000, // 184.5M
  activeVendors: 342,
  openPOs: 84,
  inventoryValue: 42500000, // 42.5M
  pendingApprovals: 12,
  budgetConsumption: 68.4,
  supplyChainHealth: 88
};

const mockEntities: ProcurementEntity[] = [
  {
    id: 'po-1',
    name: 'PO-2026-4492 (L&T Steel)',
    category: 'Purchase Orders',
    value: 12500000, // 1.25Cr
    status: 'Delayed',
    lastUpdated: '2 hours ago',
    owner: 'Procurement Dept',
    insights: [
      { id: 'in-1', type: 'Risk', message: 'Steel delivery from L&T delayed by 14 days, impacting Project Alpha timeline.', metric: '+14 Days Delay', isUrgent: true, actionLabel: 'Escalate to Vendor' }
    ]
  },
  {
    id: 'inv-1',
    name: 'HVAC Filters (SKU-220)',
    category: 'Inventory',
    value: 450000,
    status: 'Critical Stock',
    lastUpdated: '10 mins ago',
    owner: 'Warehouse Alpha',
    insights: [
      { id: 'in-2', type: 'Forecast', message: 'Inventory SKU-220 likely stockout in 10 days based on current consumption rates.', metric: '10 Days Left', isUrgent: true, actionLabel: 'Create PR' }
    ]
  },
  {
    id: 'ven-1',
    name: 'Otis Elevators',
    category: 'Vendors',
    status: 'At Risk',
    lastUpdated: 'Yesterday',
    owner: 'Vendor Management',
    insights: [
      { id: 'in-3', type: 'Anomaly', message: 'Vendor Otis Elevators SLA dropped below 85% for maintenance responses this quarter.', metric: '82% SLA', isUrgent: true, actionLabel: 'Review Contract' }
    ]
  },
  {
    id: 'bud-1',
    name: 'Project Alpha Procurement',
    category: 'Budgets',
    value: 85000000,
    status: 'Healthy',
    lastUpdated: '1 hour ago',
    owner: 'Project Finance',
    insights: [
      { id: 'in-4', type: 'Risk', message: 'Project Alpha procurement budget tracking 4% above forecast due to material cost inflation.', metric: '+4% Variance', actionLabel: 'View Spend Analysis' }
    ]
  }
];

const mockEvents: SupplyChainEvent[] = [
  { id: 'ev-1', categoryId: 'Purchase Requisitions', date: 'Today, 11:30 AM', message: 'PR-4491 Created for Generator Fuel', type: 'PR Created' },
  { id: 'ev-2', categoryId: 'Purchase Orders', date: 'Today, 09:15 AM', message: 'PO-2026-4480 Approved by VP Finance', type: 'PO Approved' },
  { id: 'ev-3', categoryId: 'Goods Receipts', date: 'Yesterday', message: 'GRN-112: Received 500 units of Cement', type: 'Goods Received' },
  { id: 'ev-4', categoryId: 'Inventory', date: '2 Days Ago', message: 'Automated Stock Alert: Cleaning Supplies Low', type: 'Stock Alert' }
];

export const useProcurementStore = create<ProcurementState>((set) => ({
  entities: mockEntities,
  events: mockEvents,
  stats: mockStats,
  activeCategoryId: 'Purchase Orders',
  
  setActiveCategory: (category) => set({ activeCategoryId: category })
}));
