import { create } from 'zustand';

export interface CustomerMaster {
  id: string;
  name: string;
  customerCode: string;
  type: 'Buyer' | 'Owner' | 'Resident' | 'Investor' | 'Landlord' | 'Tenant' | 'Corporate Client';
  email: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'High Risk';
  healthScore: number;
  propertiesOwned: number;
  unitsOwned: number;
  bookings: number;
  outstandingBalance: number;
  portfolioValue: number;
  avatarUrl?: string;
  engagementScore: number;
  paymentRisk: 'Low' | 'Medium' | 'High';
  lifetimeValue: number;
  joinDate: string;
}

export interface FamilyMember {
  id: string;
  customerId: string;
  name: string;
  relation: string;
  phone?: string;
  isResident: boolean;
}

export interface Vehicle {
  id: string;
  customerId: string;
  registrationNumber: string;
  type: string;
  parkingSlot?: string;
  rfidTag?: string;
}

export interface Document {
  id: string;
  customerId: string;
  title: string;
  type: string;
  uploadDate: string;
  status: 'Verified' | 'Pending' | 'Rejected';
}

export interface Ownership {
  id: string;
  customerId: string;
  propertyName: string;
  unitNumber: string;
  ownershipPct: number;
  purchaseValue: number;
  currentValue: number;
  roi: number;
}

export interface Interaction {
  id: string;
  customerId: string;
  type: 'Call' | 'Email' | 'Meeting' | 'Site Visit' | 'WhatsApp';
  summary: string;
  date: string;
}

interface CustomerState {
  customers: CustomerMaster[];
  familyMembers: FamilyMember[];
  vehicles: Vehicle[];
  documents: Document[];
  ownerships: Ownership[];
  interactions: Interaction[];
  activeCustomerId: string | null;

  setActiveCustomer: (id: string) => void;
  
  // Computed (getters)
  getCustomerById: (id: string) => CustomerMaster | undefined;
  getCustomerHealth: (id: string) => number;
  getCustomerLTV: (id: string) => number;
  getOutstandingBalance: (id: string) => number;
  getEngagementScore: (id: string) => number;
  getPortfolioValue: (id: string) => number;

  // Actions
  createCustomer: (data: Partial<CustomerMaster>) => void;
  updateCustomer: (id: string, data: Partial<CustomerMaster>) => void;
  addFamilyMember: (data: Partial<FamilyMember>) => void;
  addVehicle: (data: Partial<Vehicle>) => void;
  uploadDocument: (data: Partial<Document>) => void;
  addInteraction: (data: Partial<Interaction>) => void;
}

// Mock Data
const mockCustomers: CustomerMaster[] = [
  {
    id: 'cust-1',
    name: 'Rajesh Sharma',
    customerCode: 'CUS-1001',
    type: 'Owner',
    email: 'rajesh.s@example.com',
    phone: '+91 98765 43210',
    status: 'Active',
    healthScore: 92,
    propertiesOwned: 2,
    unitsOwned: 3,
    bookings: 3,
    outstandingBalance: 0,
    portfolioValue: 45000000,
    engagementScore: 88,
    paymentRisk: 'Low',
    lifetimeValue: 45000000,
    joinDate: '2024-01-15'
  },
  {
    id: 'cust-2',
    name: 'Ananya Gupta',
    customerCode: 'CUS-1002',
    type: 'Investor',
    email: 'ananya.g@example.com',
    phone: '+91 99887 76655',
    status: 'Active',
    healthScore: 95,
    propertiesOwned: 4,
    unitsOwned: 6,
    bookings: 6,
    outstandingBalance: 1500000,
    portfolioValue: 120000000,
    engagementScore: 94,
    paymentRisk: 'Low',
    lifetimeValue: 118500000,
    joinDate: '2023-08-22'
  },
  {
    id: 'cust-3',
    name: 'Vikram Singh',
    customerCode: 'CUS-1003',
    type: 'Buyer',
    email: 'vikram.s@example.com',
    phone: '+91 98765 11223',
    status: 'High Risk',
    healthScore: 45,
    propertiesOwned: 1,
    unitsOwned: 1,
    bookings: 1,
    outstandingBalance: 5000000,
    portfolioValue: 15000000,
    engagementScore: 30,
    paymentRisk: 'High',
    lifetimeValue: 10000000,
    joinDate: '2025-11-10'
  }
];

const mockOwnerships: Ownership[] = [
  { id: 'own-1', customerId: 'cust-1', propertyName: 'Skyline Plaza', unitNumber: 'A-402', ownershipPct: 100, purchaseValue: 12000000, currentValue: 14500000, roi: 20.8 },
  { id: 'own-2', customerId: 'cust-1', propertyName: 'Skyline Plaza', unitNumber: 'B-105', ownershipPct: 50, purchaseValue: 8000000, currentValue: 9000000, roi: 12.5 },
  { id: 'own-3', customerId: 'cust-2', propertyName: 'Marina Heights', unitNumber: 'PH-1', ownershipPct: 100, purchaseValue: 45000000, currentValue: 52000000, roi: 15.5 },
];

export const useCustomerStore = create<CustomerState>((set, get) => ({
  customers: mockCustomers,
  familyMembers: [],
  vehicles: [],
  documents: [],
  ownerships: mockOwnerships,
  interactions: [],
  activeCustomerId: null,

  setActiveCustomer: (id) => set({ activeCustomerId: id }),

  getCustomerById: (id) => get().customers.find(c => c.id === id),
  getCustomerHealth: (id) => get().customers.find(c => c.id === id)?.healthScore || 0,
  getCustomerLTV: (id) => get().customers.find(c => c.id === id)?.lifetimeValue || 0,
  getOutstandingBalance: (id) => get().customers.find(c => c.id === id)?.outstandingBalance || 0,
  getEngagementScore: (id) => get().customers.find(c => c.id === id)?.engagementScore || 0,
  getPortfolioValue: (id) => get().customers.find(c => c.id === id)?.portfolioValue || 0,

  createCustomer: (data) => set((state) => ({
    customers: [...state.customers, { ...data, id: `cust-${Date.now()}` } as CustomerMaster]
  })),

  updateCustomer: (id, data) => set((state) => ({
    customers: state.customers.map(c => c.id === id ? { ...c, ...data } : c)
  })),

  addFamilyMember: (data) => set((state) => ({
    familyMembers: [...state.familyMembers, { ...data, id: `fm-${Date.now()}` } as FamilyMember]
  })),

  addVehicle: (data) => set((state) => ({
    vehicles: [...state.vehicles, { ...data, id: `veh-${Date.now()}` } as Vehicle]
  })),

  uploadDocument: (data) => set((state) => ({
    documents: [...state.documents, { ...data, id: `doc-${Date.now()}` } as Document]
  })),

  addInteraction: (data) => set((state) => ({
    interactions: [...state.interactions, { ...data, id: `int-${Date.now()}` } as Interaction]
  }))
}));
