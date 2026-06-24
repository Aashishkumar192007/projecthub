import { create } from 'zustand';

export type TenantCategory = 'active' | 'expiring' | 'high_risk' | 'delinquent' | 'corporate';

export interface TenantUnit {
  unitId: string;
  unitName: string;
  type: string;
}

export interface Tenant {
  id: string;
  name: string;
  type: 'Individual' | 'Corporate';
  photoUrl: string;
  status: 'Active' | 'Notice' | 'Eviction' | 'Past';
  paymentStatus: 'Current' | 'Delinquent' | 'Pending';
  category: TenantCategory;
  units: TenantUnit[]; // Support for multiple units
  
  // Scoring Components
  metrics: {
    paymentHistory: number; // out of 100
    complaintFrequency: number; // out of 100
    leaseRenewalHistory: number; // out of 100
    communicationActivity: number; // out of 100
    occupancyDuration: number; // out of 100
    documentCompliance: number; // out of 100
  };
}

export interface LeaseInfo {
  id: string;
  tenantId: string;
  unitId: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  depositAmount: number;
  status: 'Application' | 'Approval' | 'Move In' | 'Active' | 'Renewal' | 'Move Out';
}

export interface Invoice {
  id: string;
  tenantId: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface Complaint {
  id: string;
  tenantId: string;
  title: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  date: string;
  slaStatus: 'On Track' | 'Breached';
}

export interface Communication {
  id: string;
  tenantId: string;
  type: 'Email' | 'SMS' | 'WhatsApp' | 'Call' | 'Notice';
  subject: string;
  date: string;
  direction: 'Inbound' | 'Outbound';
}

interface TenantState {
  tenants: Tenant[];
  leases: LeaseInfo[];
  invoices: Invoice[];
  complaints: Complaint[];
  communications: Communication[];
  activeTenantId: string | null;
  
  // Actions
  setActiveTenant: (id: string) => void;
  getCalculatedHealth: (tenant: Tenant) => { score: number, risk: 'High Risk' | 'Medium Risk' | 'Healthy' };
}

// Initial Data
const initialTenants: Tenant[] = [
  {
    id: 't-1',
    name: 'Sarah Jenkins',
    type: 'Individual',
    photoUrl: 'https://i.pravatar.cc/150?u=sarah',
    status: 'Active',
    paymentStatus: 'Current',
    category: 'active',
    units: [{ unitId: 'u-101', unitName: 'A-1203', type: 'Apartment' }],
    metrics: { paymentHistory: 95, complaintFrequency: 90, leaseRenewalHistory: 80, communicationActivity: 75, occupancyDuration: 85, documentCompliance: 100 }
  },
  {
    id: 't-2',
    name: 'Acme Corp',
    type: 'Corporate',
    photoUrl: 'https://ui-avatars.com/api/?name=Acme+Corp&background=random',
    status: 'Active',
    paymentStatus: 'Delinquent',
    category: 'corporate',
    units: [
      { unitId: 'u-201', unitName: 'C-Retail-1', type: 'Retail' },
      { unitId: 'u-202', unitName: 'C-Retail-2', type: 'Retail' },
      { unitId: 'p-1', unitName: 'Parking P-22', type: 'Parking' }
    ],
    metrics: { paymentHistory: 60, complaintFrequency: 70, leaseRenewalHistory: 100, communicationActivity: 50, occupancyDuration: 95, documentCompliance: 80 }
  },
  {
    id: 't-3',
    name: 'Michael Chang',
    type: 'Individual',
    photoUrl: 'https://i.pravatar.cc/150?u=michael',
    status: 'Notice',
    paymentStatus: 'Pending',
    category: 'expiring',
    units: [{ unitId: 'u-105', unitName: 'B-405', type: 'Apartment' }],
    metrics: { paymentHistory: 80, complaintFrequency: 60, leaseRenewalHistory: 40, communicationActivity: 60, occupancyDuration: 50, documentCompliance: 90 }
  }
];

const initialLeases: LeaseInfo[] = [
  { id: 'l-1', tenantId: 't-1', unitId: 'u-101', startDate: '2023-01-01', endDate: '2026-12-31', monthlyRent: 2500, depositAmount: 5000, status: 'Active' },
  { id: 'l-2', tenantId: 't-2', unitId: 'u-201', startDate: '2020-05-01', endDate: '2030-04-30', monthlyRent: 15000, depositAmount: 30000, status: 'Active' },
  { id: 'l-3', tenantId: 't-3', unitId: 'u-105', startDate: '2025-07-01', endDate: '2026-06-30', monthlyRent: 1800, depositAmount: 3600, status: 'Renewal' }
];

const initialInvoices: Invoice[] = [
  { id: 'inv-1', tenantId: 't-1', amount: 2500, date: '2026-06-01', status: 'Paid' },
  { id: 'inv-2', tenantId: 't-2', amount: 15000, date: '2026-06-01', status: 'Overdue' },
  { id: 'inv-3', tenantId: 't-3', amount: 1800, date: '2026-06-01', status: 'Pending' }
];

const initialComplaints: Complaint[] = [
  { id: 'c-1', tenantId: 't-1', title: 'HVAC Noise', status: 'Resolved', date: '2026-05-15', slaStatus: 'On Track' },
  { id: 'c-2', tenantId: 't-2', title: 'Plumbing leak in Retail-1', status: 'Open', date: '2026-06-18', slaStatus: 'Breached' }
];

const initialCommunications: Communication[] = [
  { id: 'comm-1', tenantId: 't-1', type: 'Email', subject: 'Lease Renewal Offer', date: '2026-06-15', direction: 'Outbound' },
  { id: 'comm-2', tenantId: 't-1', type: 'WhatsApp', subject: 'Maintenance Update', date: '2026-05-16', direction: 'Outbound' },
  { id: 'comm-3', tenantId: 't-2', type: 'Notice', subject: 'Overdue Payment Notice', date: '2026-06-10', direction: 'Outbound' },
];

export const useTenantStore = create<TenantState>((set, get) => ({
  tenants: initialTenants,
  leases: initialLeases,
  invoices: initialInvoices,
  complaints: initialComplaints,
  communications: initialCommunications,
  activeTenantId: null,
  
  setActiveTenant: (id) => set({ activeTenantId: id }),
  
  getCalculatedHealth: (tenant) => {
    // Component weights
    // Payment History = 30%
    // Complaint Frequency = 20%
    // Lease Renewal History = 20%
    // Communication Activity = 10%
    // Occupancy Duration = 10%
    // Document Compliance = 10%
    
    const score = (
      (tenant.metrics.paymentHistory * 0.3) +
      (tenant.metrics.complaintFrequency * 0.2) +
      (tenant.metrics.leaseRenewalHistory * 0.2) +
      (tenant.metrics.communicationActivity * 0.1) +
      (tenant.metrics.occupancyDuration * 0.1) +
      (tenant.metrics.documentCompliance * 0.1)
    );
    
    let risk: 'High Risk' | 'Medium Risk' | 'Healthy' = 'Healthy';
    if (score <= 40) risk = 'High Risk';
    else if (score <= 70) risk = 'Medium Risk';
    
    return { score: Math.round(score), risk };
  }
}));
