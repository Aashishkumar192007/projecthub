import { create } from 'zustand';

// ─────────────────────────────────────────────────────────────────────────────
// Model Interfaces
// ─────────────────────────────────────────────────────────────────────────────

export type CustomerType = 'Owner' | 'Resident' | 'Corporate' | 'Investor' | 'Buyer' | 'Tenant';
export type CustomerStatus = 'Active' | 'Inactive' | 'Archived' | 'High Risk' | 'VIP';
export type PaymentRisk = 'Low' | 'Medium' | 'High';
export type DocStatus = 'Verified' | 'Pending' | 'Rejected' | 'Expired';
export type KYCStatus = 'Approved' | 'Pending' | 'Rejected' | 'Under Review';

export interface Customer {
  id: string;
  customerCode: string;
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  type: CustomerType;
  status: CustomerStatus;
  tags: string[];
  assignedExecutive: string;
  healthScore: number;
  paymentScore: number;
  riskScore: number;
  engagementScore: number;
  outstandingBalance: number;
  portfolioValue: number;
  lifetimeValue: number;
  propertiesOwned: number;
  unitsOwned: number;
  vehicleCount: number;
  familyCount: number;
  joinDate: string;
  lastContactDate: string;
  avatarInitials: string;
  avatarColor: string;
  nationality: string;
  panNumber?: string;
  isVIP: boolean;
  isHot: boolean;
  isDelinquent: boolean;
}

export interface Vehicle {
  id: string;
  customerId: string;
  registrationNumber: string;
  make: string;
  model: string;
  color: string;
  type: 'Sedan' | 'SUV' | 'Hatchback' | 'Luxury' | 'Two-Wheeler' | 'Electric';
  parkingSlot?: string;
  rfidTag?: string;
  isActive: boolean;
}

export interface FamilyMember {
  id: string;
  customerId: string;
  name: string;
  relation: 'Spouse' | 'Son' | 'Daughter' | 'Parent' | 'Sibling' | 'Other';
  phone?: string;
  email?: string;
  isResident: boolean;
  dob?: string;
}

export interface Document {
  id: string;
  customerId: string;
  title: string;
  type: 'Aadhaar' | 'PAN' | 'Passport' | 'Agreement' | 'Receipt' | 'NOC' | 'KYC Form' | 'Utility Bill' | 'Bank Statement';
  uploadDate: string;
  expiryDate?: string;
  status: DocStatus;
  fileSizeKB: number;
}

export interface KYC {
  id: string;
  customerId: string;
  status: KYCStatus;
  submittedDate: string;
  approvedDate?: string;
  reviewedBy?: string;
  notes?: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface LedgerEntry {
  id: string;
  customerId: string;
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  category: 'Maintenance' | 'Sale' | 'Rental' | 'Penalty' | 'Refund' | 'Service Charge';
}

export interface Payment {
  id: string;
  customerId: string;
  amount: number;
  date: string;
  method: 'Bank Transfer' | 'Cheque' | 'Online' | 'Cash' | 'UPI';
  status: 'Paid' | 'Pending' | 'Failed' | 'Overdue';
  invoiceNumber: string;
  description: string;
}

export interface PropertyRelation {
  id: string;
  customerId: string;
  propertyName: string;
  propertyId: string;
  unitNumber: string;
  role: 'Owner' | 'Co-Owner' | 'Tenant' | 'Resident';
  ownershipPct: number;
  purchaseValue: number;
  currentValue: number;
  purchaseDate: string;
  roi: number;
}

export interface Communication {
  id: string;
  customerId: string;
  channel: 'Phone' | 'Email' | 'WhatsApp' | 'Meeting' | 'Site Visit' | 'SMS';
  summary: string;
  date: string;
  outcome: 'Positive' | 'Neutral' | 'Negative' | 'Follow Up Required';
  executiveHandled: string;
  duration?: number;
}

export interface TimelineEvent {
  id: string;
  customerId: string;
  eventType: 'Registration' | 'Booking' | 'Payment' | 'Communication' | 'Document Upload' | 'Status Change' | 'KYC' | 'Complaint' | 'Renewal';
  title: string;
  description: string;
  date: string;
  icon: string;
  severity: 'info' | 'success' | 'warning' | 'danger';
}

// ─────────────────────────────────────────────────────────────────────────────
// Filter & UI State
// ─────────────────────────────────────────────────────────────────────────────

export type CustomerCategory = 'all' | 'owners' | 'residents' | 'corporate' | 'vip' | 'hot' | 'delinquent' | 'archived';
export type SortField = 'name' | 'healthScore' | 'outstandingBalance' | 'portfolioValue' | 'joinDate' | 'lifetimeValue';
export type SortDirection = 'asc' | 'desc';

export interface FilterState {
  type: CustomerType | 'All';
  status: CustomerStatus | 'All';
  paymentRisk: PaymentRisk | 'All';
  assignedExecutive: string;
  tags: string[];
  dateFrom: string;
  dateTo: string;
  property: string;
}

export interface SavedView {
  id: string;
  name: string;
  category: CustomerCategory;
  filters: Partial<FilterState>;
  columns: string[];
  sortField: SortField;
  sortDirection: SortDirection;
}

export interface CustomerKPIs {
  totalCustomers: number;
  totalOwners: number;
  totalResidents: number;
  totalCorporate: number;
  totalOutstanding: number;
  collectionRate: number;
  avgLifetimeValue: number;
  avgHealthScore: number;
  vipCount: number;
  delinquentCount: number;
  hotCount: number;
  newThisMonth: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Pure computation functions – exported so components can use with useMemo
// These take raw data as arguments, return stable values when inputs don't change
// ─────────────────────────────────────────────────────────────────────────────

export function computeKPIs(customers: Customer[]): CustomerKPIs {
  const active = customers.filter(c => c.status !== 'Archived');
  const totalOutstanding = active.reduce((sum, c) => sum + c.outstandingBalance, 0);
  const totalCollectable = active.reduce((sum, c) => sum + c.portfolioValue * 0.02, 0);
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  return {
    totalCustomers: active.length,
    totalOwners: active.filter(c => c.type === 'Owner' || c.type === 'Investor').length,
    totalResidents: active.filter(c => c.type === 'Resident' || c.type === 'Tenant').length,
    totalCorporate: active.filter(c => c.type === 'Corporate').length,
    totalOutstanding,
    collectionRate: totalCollectable > 0 ? Math.round((1 - totalOutstanding / totalCollectable) * 100) : 0,
    avgLifetimeValue: active.length > 0 ? Math.round(active.reduce((s, c) => s + c.lifetimeValue, 0) / active.length) : 0,
    avgHealthScore: active.length > 0 ? Math.round(active.reduce((s, c) => s + c.healthScore, 0) / active.length) : 0,
    vipCount: active.filter(c => c.isVIP).length,
    delinquentCount: active.filter(c => c.isDelinquent).length,
    hotCount: active.filter(c => c.isHot).length,
    newThisMonth: active.filter(c => c.joinDate >= cutoff).length,
  };
}

export function computeCategoryCount(customers: Customer[], cat: CustomerCategory): number {
  switch (cat) {
    case 'all': return customers.filter(c => c.status !== 'Archived').length;
    case 'owners': return customers.filter(c => (c.type === 'Owner' || c.type === 'Investor') && c.status !== 'Archived').length;
    case 'residents': return customers.filter(c => (c.type === 'Resident' || c.type === 'Tenant') && c.status !== 'Archived').length;
    case 'corporate': return customers.filter(c => c.type === 'Corporate' && c.status !== 'Archived').length;
    case 'vip': return customers.filter(c => c.isVIP && c.status !== 'Archived').length;
    case 'hot': return customers.filter(c => c.isHot && c.status !== 'Archived').length;
    case 'delinquent': return customers.filter(c => c.isDelinquent && c.status !== 'Archived').length;
    case 'archived': return customers.filter(c => c.status === 'Archived').length;
    default: return 0;
  }
}

export function computeFilteredCustomers(
  customers: Customer[],
  activeCategory: CustomerCategory,
  searchQuery: string,
  filters: FilterState,
  sortField: SortField,
  sortDirection: SortDirection,
): Customer[] {
  let result = [...customers];

  switch (activeCategory) {
    case 'owners': result = result.filter(c => c.type === 'Owner' || c.type === 'Investor'); break;
    case 'residents': result = result.filter(c => c.type === 'Resident' || c.type === 'Tenant'); break;
    case 'corporate': result = result.filter(c => c.type === 'Corporate'); break;
    case 'vip': result = result.filter(c => c.isVIP); break;
    case 'hot': result = result.filter(c => c.isHot); break;
    case 'delinquent': result = result.filter(c => c.isDelinquent); break;
    case 'archived': result = result.filter(c => c.status === 'Archived'); break;
    default: result = result.filter(c => c.status !== 'Archived');
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    result = result.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.customerCode.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q)
    );
  }

  if (filters.type !== 'All') result = result.filter(c => c.type === filters.type);
  if (filters.status !== 'All') result = result.filter(c => c.status === filters.status);
  if (filters.paymentRisk !== 'All') {
    result = result.filter(c => {
      if (filters.paymentRisk === 'High') return c.riskScore > 70;
      if (filters.paymentRisk === 'Medium') return c.riskScore > 40 && c.riskScore <= 70;
      return c.riskScore <= 40;
    });
  }
  if (filters.assignedExecutive) result = result.filter(c => c.assignedExecutive === filters.assignedExecutive);
  if (filters.tags.length > 0) result = result.filter(c => filters.tags.every(t => c.tags.includes(t)));
  if (filters.dateFrom) result = result.filter(c => c.joinDate >= filters.dateFrom);
  if (filters.dateTo) result = result.filter(c => c.joinDate <= filters.dateTo);

  result.sort((a, b) => {
    let av: number | string = a[sortField] as number | string;
    let bv: number | string = b[sortField] as number | string;
    if (typeof av === 'string') av = av.toLowerCase();
    if (typeof bv === 'string') bv = bv.toLowerCase();
    if (av < bv) return sortDirection === 'asc' ? -1 : 1;
    if (av > bv) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// Store State Interface
// ─────────────────────────────────────────────────────────────────────────────

interface CustomerStoreState {
  // Raw data
  customers: Customer[];
  vehicles: Vehicle[];
  familyMembers: FamilyMember[];
  documents: Document[];
  kycs: KYC[];
  ledgerEntries: LedgerEntry[];
  payments: Payment[];
  propertyRelations: PropertyRelation[];
  communications: Communication[];
  timelineEvents: TimelineEvent[];

  // UI State (all primitives or plain arrays – no Sets, no computed objects)
  activeCustomerId: string | null;
  activeCategory: CustomerCategory;
  searchQuery: string;
  filters: FilterState;
  sortField: SortField;
  sortDirection: SortDirection;
  currentPage: number;
  pageSize: number;
  selectedIds: string[];        // plain array – stable reference per action
  visibleColumns: string[];
  savedViews: SavedView[];

  // Simple per-customer lookups
  getCustomerVehicles: (id: string) => Vehicle[];
  getCustomerFamily: (id: string) => FamilyMember[];
  getCustomerDocuments: (id: string) => Document[];
  getCustomerPayments: (id: string) => Payment[];
  getCustomerTimeline: (id: string) => TimelineEvent[];
  getCustomerCommunications: (id: string) => Communication[];
  getCustomerPropertyRelations: (id: string) => PropertyRelation[];

  // UI Actions
  setActiveCategory: (cat: CustomerCategory) => void;
  setSearchQuery: (q: string) => void;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  setSortField: (field: SortField) => void;
  setSortDirection: (dir: SortDirection) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setActiveCustomer: (id: string | null) => void;
  setVisibleColumns: (cols: string[]) => void;
  saveView: (view: Omit<SavedView, 'id'>) => void;

  // Selection Actions
  toggleSelectCustomer: (id: string) => void;
  selectAllFiltered: (ids: string[]) => void;
  clearSelection: () => void;

  // Bulk Actions
  bulkArchive: (ids: string[]) => void;
  bulkAssignExecutive: (ids: string[], executive: string) => void;
  bulkTag: (ids: string[], tags: string[]) => void;

  // CRUD Actions
  createCustomer: (data: Partial<Customer>) => void;
  updateCustomer: (id: string, data: Partial<Customer>) => void;
  archiveCustomer: (id: string) => void;
  addVehicle: (data: Partial<Vehicle>) => void;
  addFamilyMember: (data: Partial<FamilyMember>) => void;
  uploadDocument: (data: Partial<Document>) => void;
  addCommunication: (data: Partial<Communication>) => void;
  addPayment: (data: Partial<Payment>) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock Data Generation
// ─────────────────────────────────────────────────────────────────────────────

const FIRST_NAMES = ['Rajesh', 'Ananya', 'Vikram', 'Priya', 'Arjun', 'Neha', 'Sanjay', 'Meera', 'Rohit', 'Kavita', 'Amit', 'Sunita', 'Deepak', 'Pooja', 'Rahul', 'Swati', 'Kiran', 'Anil', 'Divya', 'Suresh', 'Shreya', 'Manish', 'Nisha', 'Alok', 'Rekha', 'Varun', 'Shilpa', 'Gaurav', 'Ritu', 'Tarun', 'Asha', 'Vijay', 'Usha', 'Nikhil', 'Geeta', 'Manoj', 'Archana', 'Saurabh', 'Leela', 'Vishal'];
const LAST_NAMES = ['Sharma', 'Gupta', 'Singh', 'Agarwal', 'Mehta', 'Joshi', 'Patel', 'Verma', 'Kumar', 'Malhotra', 'Bose', 'Nair', 'Reddy', 'Rao', 'Iyer', 'Shah', 'Pillai', 'Menon', 'Kaur', 'Mishra', 'Chaudhary', 'Thakur', 'Pandey', 'Saxena', 'Srivastava'];
const EXECUTIVES = ['Priya Kapoor', 'Rahul Nair', 'Ankit Sharma', 'Sunita Rao', 'Vikash Mehta'];
const TAGS_POOL = ['VIP', 'Priority', 'Long-term', 'New', 'Referral', 'High Value', 'Watch List', 'Renewal Due', 'NRI', 'Corporate'];
const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899', '#14B8A6', '#F97316', '#6366F1'];
const TYPES: CustomerType[] = ['Owner', 'Resident', 'Corporate', 'Investor', 'Buyer', 'Tenant'];
const STATUSES_WEIGHTED: CustomerStatus[] = ['Active', 'Active', 'Active', 'Inactive', 'High Risk'];

function rng(seed: number) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}

function seedFrom<T>(arr: T[], r: () => number): T {
  return arr[Math.floor(r() * arr.length)];
}

function generateCustomers(): Customer[] {
  const customers: Customer[] = [];
  for (let i = 1; i <= 120; i++) {
    const r = rng(i * 31337);
    const firstName = seedFrom(FIRST_NAMES, r);
    const lastName = seedFrom(LAST_NAMES, r);
    const name = `${firstName} ${lastName}`;
    const type = seedFrom(TYPES, r);
    const healthScore = Math.floor(r() * 78) + 20;
    const paymentScore = Math.floor(r() * 68) + 30;
    const riskScore = Math.min(100, Math.max(0, 100 - paymentScore + Math.floor(r() * 20) - 10));
    const outstandingBalance = riskScore > 60 ? Math.floor(r() * 4950000) + 50000 : Math.floor(r() * 200000);
    const portfolioValue = Math.floor(r() * 145000000) + 5000000;
    const status: CustomerStatus = riskScore > 70 ? 'High Risk' : healthScore > 90 ? 'VIP' : seedFrom(STATUSES_WEIGHTED, r);

    customers.push({
      id: `cust-${String(i).padStart(4, '0')}`,
      customerCode: `CUS-${1000 + i}`,
      name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
      phone: `+91 ${70000 + Math.floor(r() * 29999)} ${10000 + Math.floor(r() * 89999)}`,
      type,
      status,
      tags: [seedFrom(TAGS_POOL, r)],
      assignedExecutive: seedFrom(EXECUTIVES, r),
      healthScore,
      paymentScore,
      riskScore,
      engagementScore: Math.floor(r() * 89) + 10,
      outstandingBalance,
      portfolioValue,
      lifetimeValue: portfolioValue + Math.floor(r() * 5000000),
      propertiesOwned: Math.floor(r() * 4) + 1,
      unitsOwned: Math.floor(r() * 7) + 1,
      vehicleCount: Math.floor(r() * 3),
      familyCount: Math.floor(r() * 6),
      joinDate: `20${18 + Math.floor(r() * 7)}-${String(Math.floor(r() * 12) + 1).padStart(2, '0')}-${String(Math.floor(r() * 28) + 1).padStart(2, '0')}`,
      lastContactDate: `2025-${String(Math.floor(r() * 12) + 1).padStart(2, '0')}-${String(Math.floor(r() * 28) + 1).padStart(2, '0')}`,
      avatarInitials: `${firstName[0]}${lastName[0]}`,
      avatarColor: seedFrom(COLORS, r),
      nationality: i % 10 === 0 ? 'NRI' : 'Indian',
      panNumber: `ABCDE${1000 + i}F`,
      isVIP: status === 'VIP' || healthScore > 92,
      isHot: type === 'Buyer' && healthScore > 75,
      isDelinquent: outstandingBalance > 500000 || status === 'High Risk',
    });
  }
  return customers;
}

const seedCustomers = generateCustomers();

const defaultFilter: FilterState = {
  type: 'All',
  status: 'All',
  paymentRisk: 'All',
  assignedExecutive: '',
  tags: [],
  dateFrom: '',
  dateTo: '',
  property: '',
};

const defaultColumns = ['photo', 'customerCode', 'name', 'phone', 'email', 'properties', 'outstanding', 'health', 'status', 'executive', 'actions'];

// ─────────────────────────────────────────────────────────────────────────────
// Zustand Store – raw state only, NO computed functions in state
// ─────────────────────────────────────────────────────────────────────────────

export const useCustomerStore = create<CustomerStoreState>((set, get) => ({
  // Raw data
  customers: seedCustomers,
  vehicles: [],
  familyMembers: [],
  documents: [],
  kycs: [],
  ledgerEntries: [],
  payments: [],
  propertyRelations: [],
  communications: [],
  timelineEvents: [],

  // UI State
  activeCustomerId: null,
  activeCategory: 'all',
  searchQuery: '',
  filters: defaultFilter,
  sortField: 'healthScore',
  sortDirection: 'desc',
  currentPage: 1,
  pageSize: 25,
  selectedIds: [],
  visibleColumns: defaultColumns,
  savedViews: [],

  // Simple lookups (return slices, called with useMemo in components)
  getCustomerVehicles: (id) => get().vehicles.filter(v => v.customerId === id),
  getCustomerFamily: (id) => get().familyMembers.filter(f => f.customerId === id),
  getCustomerDocuments: (id) => get().documents.filter(d => d.customerId === id),
  getCustomerPayments: (id) => get().payments.filter(p => p.customerId === id),
  getCustomerTimeline: (id) => get().timelineEvents.filter(t => t.customerId === id).sort((a, b) => b.date.localeCompare(a.date)),
  getCustomerCommunications: (id) => get().communications.filter(c => c.customerId === id).sort((a, b) => b.date.localeCompare(a.date)),
  getCustomerPropertyRelations: (id) => get().propertyRelations.filter(p => p.customerId === id),

  // UI Actions
  setActiveCategory: (cat) => set({ activeCategory: cat, currentPage: 1, selectedIds: [] }),
  setSearchQuery: (q) => set({ searchQuery: q, currentPage: 1 }),
  setFilter: (key, value) => set(s => ({ filters: { ...s.filters, [key]: value }, currentPage: 1 })),
  resetFilters: () => set({ filters: defaultFilter, searchQuery: '', currentPage: 1 }),
  setSortField: (field) => set(s => ({
    sortField: field,
    sortDirection: s.sortField === field && s.sortDirection === 'desc' ? 'asc' : 'desc',
    currentPage: 1,
  })),
  setSortDirection: (dir) => set({ sortDirection: dir }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),
  setActiveCustomer: (id) => set({ activeCustomerId: id }),
  setVisibleColumns: (cols) => set({ visibleColumns: cols }),
  saveView: (view) => set(s => ({ savedViews: [...s.savedViews, { ...view, id: `view-${Date.now()}` }] })),

  // Selection Actions
  toggleSelectCustomer: (id) => set(s => ({
    selectedIds: s.selectedIds.includes(id)
      ? s.selectedIds.filter(x => x !== id)
      : [...s.selectedIds, id],
  })),
  selectAllFiltered: (ids) => set({ selectedIds: ids }),
  clearSelection: () => set({ selectedIds: [] }),

  // Bulk Actions
  bulkArchive: (ids) => set(s => ({
    customers: s.customers.map(c => ids.includes(c.id) ? { ...c, status: 'Archived' as CustomerStatus } : c),
    selectedIds: [],
  })),
  bulkAssignExecutive: (ids, executive) => set(s => ({
    customers: s.customers.map(c => ids.includes(c.id) ? { ...c, assignedExecutive: executive } : c),
    selectedIds: [],
  })),
  bulkTag: (ids, tags) => set(s => ({
    customers: s.customers.map(c => ids.includes(c.id) ? { ...c, tags: [...new Set([...c.tags, ...tags])] } : c),
    selectedIds: [],
  })),

  // CRUD
  createCustomer: (data) => set(s => ({
    customers: [...s.customers, {
      id: `cust-${Date.now()}`,
      customerCode: `CUS-${2000 + s.customers.length}`,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      type: data.type || 'Resident',
      status: 'Active' as CustomerStatus,
      tags: [],
      assignedExecutive: data.assignedExecutive || EXECUTIVES[0],
      healthScore: 70, paymentScore: 70, riskScore: 30, engagementScore: 50,
      outstandingBalance: 0, portfolioValue: 0, lifetimeValue: 0,
      propertiesOwned: 0, unitsOwned: 0, vehicleCount: 0, familyCount: 0,
      joinDate: new Date().toISOString().split('T')[0],
      lastContactDate: new Date().toISOString().split('T')[0],
      avatarInitials: (data.name || 'NA').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2),
      avatarColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      nationality: 'Indian',
      isVIP: false, isHot: false, isDelinquent: false,
      ...data,
    } as Customer],
  })),
  updateCustomer: (id, data) => set(s => ({
    customers: s.customers.map(c => c.id === id ? { ...c, ...data } : c),
  })),
  archiveCustomer: (id) => set(s => ({
    customers: s.customers.map(c => c.id === id ? { ...c, status: 'Archived' as CustomerStatus } : c),
  })),
  addVehicle: (data) => set(s => ({
    vehicles: [...s.vehicles, { ...data, id: `veh-${Date.now()}`, isActive: true } as Vehicle],
  })),
  addFamilyMember: (data) => set(s => ({
    familyMembers: [...s.familyMembers, { ...data, id: `fm-${Date.now()}` } as FamilyMember],
  })),
  uploadDocument: (data) => set(s => ({
    documents: [...s.documents, { ...data, id: `doc-${Date.now()}` } as Document],
  })),
  addCommunication: (data) => set(s => ({
    communications: [...s.communications, { ...data, id: `comm-${Date.now()}` } as Communication],
  })),
  addPayment: (data) => set(s => ({
    payments: [...s.payments, { ...data, id: `pmt-${Date.now()}` } as Payment],
  })),
}));
