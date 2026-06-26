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
  // Computed
  healthScore: number;
  paymentScore: number;
  riskScore: number;
  engagementScore: number;
  // Financials
  outstandingBalance: number;
  portfolioValue: number;
  lifetimeValue: number;
  // Relations
  propertiesOwned: number;
  unitsOwned: number;
  vehicleCount: number;
  familyCount: number;
  // Meta
  joinDate: string;
  lastContactDate: string;
  avatarInitials: string;
  avatarColor: string;
  nationality: string;
  panNumber?: string;
  aadharNumber?: string;
  gstNumber?: string;
  isVIP: boolean;
  isHot: boolean;
  isDelinquent: boolean;
}

export interface Owner {
  id: string;
  customerId: string;
  ownershipType: 'Sole' | 'Joint' | 'Corporate';
  sharePercentage: number;
  since: string;
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

// ─────────────────────────────────────────────────────────────────────────────
// Store State Interface
// ─────────────────────────────────────────────────────────────────────────────

interface CustomerStoreState {
  // Data
  customers: Customer[];
  owners: Owner[];
  vehicles: Vehicle[];
  familyMembers: FamilyMember[];
  documents: Document[];
  kycs: KYC[];
  ledgerEntries: LedgerEntry[];
  payments: Payment[];
  propertyRelations: PropertyRelation[];
  communications: Communication[];
  timelineEvents: TimelineEvent[];

  // UI State
  activeCustomerId: string | null;
  activeCategory: CustomerCategory;
  searchQuery: string;
  filters: FilterState;
  sortField: SortField;
  sortDirection: SortDirection;
  currentPage: number;
  pageSize: number;
  selectedIds: Set<string>;
  visibleColumns: string[];
  savedViews: SavedView[];

  // Computed selectors
  getCustomerById: (id: string) => Customer | undefined;
  getFilteredCustomers: () => Customer[];
  getPaginatedCustomers: () => Customer[];
  getTotalPages: () => number;
  getKPIs: () => CustomerKPIs;
  getCategoryCount: (cat: CustomerCategory) => number;
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
  toggleColumnVisibility: (col: string) => void;
  setVisibleColumns: (cols: string[]) => void;
  saveView: (view: Omit<SavedView, 'id'>) => void;
  loadView: (viewId: string) => void;

  // Selection Actions
  toggleSelectCustomer: (id: string) => void;
  selectAll: () => void;
  clearSelection: () => void;

  // Bulk Actions
  bulkArchive: (ids: string[]) => void;
  bulkAssignExecutive: (ids: string[], executive: string) => void;
  bulkTag: (ids: string[], tags: string[]) => void;
  bulkExport: (ids: string[]) => void;
  mergeCustomers: (primaryId: string, secondaryId: string) => void;
  generateStatement: (customerId: string) => void;

  // CRUD Actions
  createCustomer: (data: Partial<Customer>) => void;
  updateCustomer: (id: string, data: Partial<Customer>) => void;
  archiveCustomer: (id: string) => void;
  addVehicle: (data: Partial<Vehicle>) => void;
  addFamilyMember: (data: Partial<FamilyMember>) => void;
  uploadDocument: (data: Partial<Document>) => void;
  addCommunication: (data: Partial<Communication>) => void;
  addPayment: (data: Partial<Payment>) => void;
  addLedgerEntry: (data: Partial<LedgerEntry>) => void;
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
// Mock Data Generation
// ─────────────────────────────────────────────────────────────────────────────

const FIRST_NAMES = ['Rajesh', 'Ananya', 'Vikram', 'Priya', 'Arjun', 'Neha', 'Sanjay', 'Meera', 'Rohit', 'Kavita', 'Amit', 'Sunita', 'Deepak', 'Pooja', 'Rahul', 'Swati', 'Kiran', 'Anil', 'Divya', 'Suresh', 'Shreya', 'Manish', 'Nisha', 'Alok', 'Rekha', 'Varun', 'Shilpa', 'Gaurav', 'Ritu', 'Tarun', 'Asha', 'Vijay', 'Usha', 'Nikhil', 'Geeta', 'Manoj', 'Archana', 'Saurabh', 'Leela', 'Vishal'];
const LAST_NAMES = ['Sharma', 'Gupta', 'Singh', 'Agarwal', 'Mehta', 'Joshi', 'Patel', 'Verma', 'Kumar', 'Malhotra', 'Bose', 'Nair', 'Reddy', 'Rao', 'Iyer', 'Shah', 'Pillai', 'Menon', 'Kaur', 'Mishra', 'Chaudhary', 'Thakur', 'Pandey', 'Saxena', 'Srivastava'];
const PROPERTIES = ['Skyline Plaza', 'Marina Heights', 'Green Valley', 'The Crown Towers', 'Heritage Residences', 'Central Park Villas', 'Riverside Enclave', 'Summit Ridge', 'Azure Towers', 'The Meridian'];
const UNITS = ['A-101', 'B-202', 'C-303', 'D-404', 'PH-1', 'E-501', 'F-602', 'G-703', 'H-804', 'A-901'];
const EXECUTIVES = ['Priya Kapoor', 'Rahul Nair', 'Ankit Sharma', 'Sunita Rao', 'Vikash Mehta'];
const TAGS_POOL = ['VIP', 'Priority', 'Long-term', 'New', 'Referral', 'High Value', 'Watch List', 'Renewal Due', 'NRI', 'Corporate'];
const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899', '#14B8A6', '#F97316', '#6366F1'];
const TYPES: CustomerType[] = ['Owner', 'Resident', 'Corporate', 'Investor', 'Buyer', 'Tenant'];
const STATUSES: CustomerStatus[] = ['Active', 'Inactive', 'Archived', 'High Risk', 'VIP'];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start: string, end: string): string {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  return new Date(s + Math.random() * (e - s)).toISOString().split('T')[0];
}

function generateCustomers(): Customer[] {
  const customers: Customer[] = [];
  for (let i = 1; i <= 120; i++) {
    const firstName = randomFrom(FIRST_NAMES);
    const lastName = randomFrom(LAST_NAMES);
    const name = `${firstName} ${lastName}`;
    const type = randomFrom(TYPES);
    const healthScore = randomInt(20, 98);
    const paymentScore = randomInt(30, 99);
    const riskScore = Math.max(0, 100 - paymentScore + randomInt(-10, 10));
    const outstandingBalance = riskScore > 60 ? randomInt(50000, 5000000) : randomInt(0, 200000);
    const portfolioValue = randomInt(5000000, 150000000);
    const status: CustomerStatus = riskScore > 70 ? 'High Risk' : healthScore > 90 ? 'VIP' : randomFrom(['Active', 'Active', 'Active', 'Inactive', 'Archived']);

    customers.push({
      id: `cust-${String(i).padStart(4, '0')}`,
      customerCode: `CUS-${1000 + i}`,
      name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
      phone: `+91 ${randomInt(70000, 99999)} ${randomInt(10000, 99999)}`,
      alternatePhone: i % 3 === 0 ? `+91 ${randomInt(70000, 99999)} ${randomInt(10000, 99999)}` : undefined,
      type,
      status,
      tags: [...new Set([randomFrom(TAGS_POOL), i % 7 === 0 ? randomFrom(TAGS_POOL) : ''].filter(Boolean))],
      assignedExecutive: randomFrom(EXECUTIVES),
      healthScore,
      paymentScore,
      riskScore: Math.min(100, riskScore),
      engagementScore: randomInt(10, 99),
      outstandingBalance,
      portfolioValue,
      lifetimeValue: portfolioValue + randomInt(0, 5000000),
      propertiesOwned: randomInt(1, 5),
      unitsOwned: randomInt(1, 8),
      vehicleCount: randomInt(0, 3),
      familyCount: randomInt(0, 6),
      joinDate: randomDate('2018-01-01', '2025-12-01'),
      lastContactDate: randomDate('2025-01-01', '2026-06-20'),
      avatarInitials: `${firstName[0]}${lastName[0]}`,
      avatarColor: randomFrom(COLORS),
      nationality: i % 10 === 0 ? 'NRI' : 'Indian',
      panNumber: `${String.fromCharCode(65 + i % 26)}BCE${randomInt(1000, 9999)}P`,
      isVIP: status === 'VIP' || healthScore > 92,
      isHot: type === 'Buyer' && healthScore > 75,
      isDelinquent: outstandingBalance > 500000 || status === 'High Risk',
    });
  }
  return customers;
}

function generateVehicles(customers: Customer[]): Vehicle[] {
  const vehicles: Vehicle[] = [];
  const vTypes: Vehicle['type'][] = ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Two-Wheeler', 'Electric'];
  const makes = ['Toyota', 'Honda', 'Mercedes', 'BMW', 'Maruti', 'Hyundai', 'Tata', 'Mahindra', 'Audi', 'Kia'];
  const models = ['Fortuner', 'City', 'S-Class', 'X5', 'Swift', 'Creta', 'Nexon', 'Scorpio', 'A6', 'Seltos'];
  let vi = 1;
  customers.forEach(c => {
    for (let j = 0; j < c.vehicleCount; j++) {
      vehicles.push({
        id: `veh-${String(vi++).padStart(4, '0')}`,
        customerId: c.id,
        registrationNumber: `MH-${randomInt(10, 99)}-${String.fromCharCode(65 + vi % 26)}${String.fromCharCode(66 + vi % 26)}-${randomInt(1000, 9999)}`,
        make: randomFrom(makes),
        model: randomFrom(models),
        color: randomFrom(['Black', 'White', 'Silver', 'Red', 'Blue', 'Grey']),
        type: randomFrom(vTypes),
        parkingSlot: `P-${randomInt(100, 999)}`,
        rfidTag: `RFID-${randomInt(10000, 99999)}`,
        isActive: true,
      });
    }
  });
  return vehicles;
}

function generateFamilyMembers(customers: Customer[]): FamilyMember[] {
  const members: FamilyMember[] = [];
  const relations: FamilyMember['relation'][] = ['Spouse', 'Son', 'Daughter', 'Parent', 'Sibling', 'Other'];
  let mi = 1;
  customers.forEach(c => {
    for (let j = 0; j < c.familyCount; j++) {
      const fn = randomFrom(FIRST_NAMES);
      const ln = randomFrom(LAST_NAMES);
      members.push({
        id: `fm-${String(mi++).padStart(4, '0')}`,
        customerId: c.id,
        name: `${fn} ${ln}`,
        relation: randomFrom(relations),
        phone: j === 0 ? `+91 ${randomInt(70000, 99999)} ${randomInt(10000, 99999)}` : undefined,
        email: `${fn.toLowerCase()}@example.com`,
        isResident: j < 2,
        dob: randomDate('1960-01-01', '2005-12-31'),
      });
    }
  });
  return members;
}

function generateDocuments(customers: Customer[]): Document[] {
  const docs: Document[] = [];
  const docTypes: Document['type'][] = ['Aadhaar', 'PAN', 'Passport', 'Agreement', 'Receipt', 'NOC', 'KYC Form', 'Utility Bill', 'Bank Statement'];
  const statuses: DocStatus[] = ['Verified', 'Verified', 'Pending', 'Rejected', 'Expired'];
  let di = 1;
  customers.slice(0, 60).forEach(c => {
    const count = randomInt(1, 4);
    for (let j = 0; j < count; j++) {
      docs.push({
        id: `doc-${String(di++).padStart(4, '0')}`,
        customerId: c.id,
        title: `${randomFrom(docTypes)} - ${c.name}`,
        type: randomFrom(docTypes),
        uploadDate: randomDate('2022-01-01', '2026-06-01'),
        expiryDate: randomDate('2026-07-01', '2030-01-01'),
        status: randomFrom(statuses),
        fileSizeKB: randomInt(50, 2048),
      });
    }
  });
  return docs;
}

function generatePropertyRelations(customers: Customer[]): PropertyRelation[] {
  const rels: PropertyRelation[] = [];
  let ri = 1;
  customers.forEach(c => {
    for (let j = 0; j < c.propertiesOwned; j++) {
      const purchase = randomInt(3000000, 60000000);
      const current = purchase + randomInt(200000, 15000000);
      rels.push({
        id: `pr-${String(ri++).padStart(4, '0')}`,
        customerId: c.id,
        propertyName: randomFrom(PROPERTIES),
        propertyId: `prop-${randomInt(100, 999)}`,
        unitNumber: randomFrom(UNITS),
        role: c.type === 'Tenant' ? 'Tenant' : c.type === 'Resident' ? 'Resident' : 'Owner',
        ownershipPct: randomFrom([100, 100, 50, 75, 25]),
        purchaseValue: purchase,
        currentValue: current,
        purchaseDate: randomDate('2015-01-01', '2025-01-01'),
        roi: Math.round(((current - purchase) / purchase) * 100 * 10) / 10,
      });
    }
  });
  return rels;
}

function generateCommunications(customers: Customer[]): Communication[] {
  const comms: Communication[] = [];
  const channels: Communication['channel'][] = ['Phone', 'Email', 'WhatsApp', 'Meeting', 'Site Visit', 'SMS'];
  const outcomes: Communication['outcome'][] = ['Positive', 'Neutral', 'Negative', 'Follow Up Required'];
  let ci = 1;
  customers.slice(0, 80).forEach(c => {
    const count = randomInt(1, 5);
    for (let j = 0; j < count; j++) {
      comms.push({
        id: `comm-${String(ci++).padStart(4, '0')}`,
        customerId: c.id,
        channel: randomFrom(channels),
        summary: randomFrom(['Discussed payment schedule', 'Inquired about maintenance', 'Renewal reminder sent', 'Site visit completed', 'KYC documents requested', 'Complaint raised about parking', 'Interest in upgrading unit']),
        date: randomDate('2025-01-01', '2026-06-25'),
        outcome: randomFrom(outcomes),
        executiveHandled: randomFrom(EXECUTIVES),
        duration: randomInt(5, 60),
      });
    }
  });
  return comms;
}

function generatePayments(customers: Customer[]): Payment[] {
  const pmts: Payment[] = [];
  const methods: Payment['method'][] = ['Bank Transfer', 'Cheque', 'Online', 'Cash', 'UPI'];
  const statuses: Payment['status'][] = ['Paid', 'Paid', 'Paid', 'Pending', 'Overdue', 'Failed'];
  let pi = 1;
  customers.slice(0, 100).forEach(c => {
    const count = randomInt(1, 6);
    for (let j = 0; j < count; j++) {
      pmts.push({
        id: `pmt-${String(pi++).padStart(4, '0')}`,
        customerId: c.id,
        amount: randomInt(10000, 500000),
        date: randomDate('2025-01-01', '2026-06-25'),
        method: randomFrom(methods),
        status: randomFrom(statuses),
        invoiceNumber: `INV-${randomInt(10000, 99999)}`,
        description: randomFrom(['Maintenance Charge Q1', 'Annual Dues', 'Parking Fee', 'Society Charges', 'Repair Levy', 'Registry Fee']),
      });
    }
  });
  return pmts;
}

function generateKYCs(customers: Customer[]): KYC[] {
  const kycStatuses: KYCStatus[] = ['Approved', 'Approved', 'Pending', 'Under Review', 'Rejected'];
  return customers.map((c, i) => ({
    id: `kyc-${String(i + 1).padStart(4, '0')}`,
    customerId: c.id,
    status: randomFrom(kycStatuses),
    submittedDate: randomDate('2022-01-01', '2026-01-01'),
    approvedDate: randomDate('2022-02-01', '2026-03-01'),
    reviewedBy: randomFrom(EXECUTIVES),
    riskLevel: c.riskScore > 70 ? 'High' : c.riskScore > 40 ? 'Medium' : 'Low',
  }));
}

function generateTimeline(customers: Customer[]): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  const eventTypes: TimelineEvent['eventType'][] = ['Registration', 'Booking', 'Payment', 'Communication', 'Document Upload', 'Status Change', 'KYC', 'Complaint', 'Renewal'];
  let ti = 1;
  customers.slice(0, 40).forEach(c => {
    const count = randomInt(2, 8);
    for (let j = 0; j < count; j++) {
      const et = randomFrom(eventTypes);
      events.push({
        id: `te-${String(ti++).padStart(4, '0')}`,
        customerId: c.id,
        eventType: et,
        title: `${et} Event`,
        description: randomFrom(['Successfully completed', 'Awaiting review', 'Requires attention', 'Processed automatically', 'Escalated to manager']),
        date: randomDate('2022-01-01', '2026-06-25'),
        icon: 'circle',
        severity: randomFrom(['info', 'success', 'warning', 'danger']),
      });
    }
  });
  return events;
}

// ─────────────────────────────────────────────────────────────────────────────
// Seeded Data
// ─────────────────────────────────────────────────────────────────────────────

const seedCustomers = generateCustomers();
const seedVehicles = generateVehicles(seedCustomers);
const seedFamily = generateFamilyMembers(seedCustomers);
const seedDocuments = generateDocuments(seedCustomers);
const seedPropertyRelations = generatePropertyRelations(seedCustomers);
const seedCommunications = generateCommunications(seedCustomers);
const seedPayments = generatePayments(seedCustomers);
const seedKYCs = generateKYCs(seedCustomers);
const seedTimeline = generateTimeline(seedCustomers);

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
// Zustand Store
// ─────────────────────────────────────────────────────────────────────────────

export const useCustomerStore = create<CustomerStoreState>((set, get) => ({
  // Data
  customers: seedCustomers,
  owners: [],
  vehicles: seedVehicles,
  familyMembers: seedFamily,
  documents: seedDocuments,
  kycs: seedKYCs,
  ledgerEntries: [],
  payments: seedPayments,
  propertyRelations: seedPropertyRelations,
  communications: seedCommunications,
  timelineEvents: seedTimeline,

  // UI State
  activeCustomerId: null,
  activeCategory: 'all',
  searchQuery: '',
  filters: defaultFilter,
  sortField: 'healthScore',
  sortDirection: 'desc',
  currentPage: 1,
  pageSize: 25,
  selectedIds: new Set(),
  visibleColumns: defaultColumns,
  savedViews: [],

  // ─── Selectors ─────────────────────────────────────────────────────────────

  getCustomerById: (id) => get().customers.find(c => c.id === id),

  getFilteredCustomers: () => {
    const { customers, activeCategory, searchQuery, filters, sortField, sortDirection } = get();
    let result = [...customers];

    // Category filter
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

    // Search
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

    // Filters
    if (filters.type !== 'All') result = result.filter(c => c.type === filters.type);
    if (filters.status !== 'All') result = result.filter(c => c.status === filters.status);
    if (filters.paymentRisk !== 'All') result = result.filter(c => {
      if (filters.paymentRisk === 'High') return c.riskScore > 70;
      if (filters.paymentRisk === 'Medium') return c.riskScore > 40 && c.riskScore <= 70;
      return c.riskScore <= 40;
    });
    if (filters.assignedExecutive) result = result.filter(c => c.assignedExecutive === filters.assignedExecutive);
    if (filters.tags.length > 0) result = result.filter(c => filters.tags.every(t => c.tags.includes(t)));
    if (filters.dateFrom) result = result.filter(c => c.joinDate >= filters.dateFrom);
    if (filters.dateTo) result = result.filter(c => c.joinDate <= filters.dateTo);

    // Sort
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
  },

  getPaginatedCustomers: () => {
    const filtered = get().getFilteredCustomers();
    const { currentPage, pageSize } = get();
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  },

  getTotalPages: () => {
    const filtered = get().getFilteredCustomers();
    return Math.ceil(filtered.length / get().pageSize);
  },

  getKPIs: () => {
    const { customers } = get();
    const active = customers.filter(c => c.status !== 'Archived');
    const totalOutstanding = active.reduce((sum, c) => sum + c.outstandingBalance, 0);
    const totalCollectable = active.reduce((sum, c) => sum + c.portfolioValue * 0.02, 0);
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
      newThisMonth: active.filter(c => c.joinDate >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]).length,
    };
  },

  getCategoryCount: (cat) => {
    const { customers } = get();
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
  },

  getCustomerVehicles: (id) => get().vehicles.filter(v => v.customerId === id),
  getCustomerFamily: (id) => get().familyMembers.filter(f => f.customerId === id),
  getCustomerDocuments: (id) => get().documents.filter(d => d.customerId === id),
  getCustomerPayments: (id) => get().payments.filter(p => p.customerId === id),
  getCustomerTimeline: (id) => get().timelineEvents.filter(t => t.customerId === id).sort((a, b) => b.date.localeCompare(a.date)),
  getCustomerCommunications: (id) => get().communications.filter(c => c.customerId === id).sort((a, b) => b.date.localeCompare(a.date)),
  getCustomerPropertyRelations: (id) => get().propertyRelations.filter(p => p.customerId === id),

  // ─── UI Actions ────────────────────────────────────────────────────────────

  setActiveCategory: (cat) => set({ activeCategory: cat, currentPage: 1, selectedIds: new Set() }),
  setSearchQuery: (q) => set({ searchQuery: q, currentPage: 1 }),
  setFilter: (key, value) => set(s => ({ filters: { ...s.filters, [key]: value }, currentPage: 1 })),
  resetFilters: () => set({ filters: defaultFilter, searchQuery: '', currentPage: 1 }),
  setSortField: (field) => set(s => ({
    sortField: field,
    sortDirection: s.sortField === field && s.sortDirection === 'desc' ? 'asc' : 'desc',
    currentPage: 1
  })),
  setSortDirection: (dir) => set({ sortDirection: dir }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),
  setActiveCustomer: (id) => set({ activeCustomerId: id }),
  toggleColumnVisibility: (col) => set(s => ({
    visibleColumns: s.visibleColumns.includes(col)
      ? s.visibleColumns.filter(c => c !== col)
      : [...s.visibleColumns, col]
  })),
  setVisibleColumns: (cols) => set({ visibleColumns: cols }),
  saveView: (view) => set(s => ({
    savedViews: [...s.savedViews, { ...view, id: `view-${Date.now()}` }]
  })),
  loadView: (viewId) => {
    const view = get().savedViews.find(v => v.id === viewId);
    if (view) {
      set({
        activeCategory: view.category,
        filters: { ...defaultFilter, ...view.filters },
        visibleColumns: view.columns,
        sortField: view.sortField,
        sortDirection: view.sortDirection,
        currentPage: 1,
      });
    }
  },

  // ─── Selection Actions ─────────────────────────────────────────────────────

  toggleSelectCustomer: (id) => set(s => {
    const next = new Set(s.selectedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    return { selectedIds: next };
  }),
  selectAll: () => set(s => ({ selectedIds: new Set(s.getFilteredCustomers().map(c => c.id)) })),
  clearSelection: () => set({ selectedIds: new Set() }),

  // ─── Bulk Actions ──────────────────────────────────────────────────────────

  bulkArchive: (ids) => set(s => ({
    customers: s.customers.map(c => ids.includes(c.id) ? { ...c, status: 'Archived' as CustomerStatus } : c),
    selectedIds: new Set(),
  })),
  bulkAssignExecutive: (ids, executive) => set(s => ({
    customers: s.customers.map(c => ids.includes(c.id) ? { ...c, assignedExecutive: executive } : c),
    selectedIds: new Set(),
  })),
  bulkTag: (ids, tags) => set(s => ({
    customers: s.customers.map(c => ids.includes(c.id) ? { ...c, tags: [...new Set([...c.tags, ...tags])] } : c),
    selectedIds: new Set(),
  })),
  bulkExport: (_ids) => {
    // In a real app this would trigger a CSV/Excel download
    console.log('Exporting customers:', _ids);
  },
  mergeCustomers: (primaryId, secondaryId) => set(s => ({
    customers: s.customers.filter(c => c.id !== secondaryId).map(c =>
      c.id === primaryId ? { ...c, familyCount: c.familyCount + 1 } : c
    ),
    selectedIds: new Set(),
  })),
  generateStatement: (customerId) => {
    console.log('Generating statement for:', customerId);
  },

  // ─── CRUD Actions ──────────────────────────────────────────────────────────

  createCustomer: (data) => set(s => ({
    customers: [...s.customers, {
      ...data,
      id: `cust-${Date.now()}`,
      customerCode: `CUS-${2000 + s.customers.length}`,
      healthScore: 70,
      paymentScore: 70,
      riskScore: 30,
      engagementScore: 50,
      outstandingBalance: 0,
      portfolioValue: 0,
      lifetimeValue: 0,
      propertiesOwned: 0,
      unitsOwned: 0,
      vehicleCount: 0,
      familyCount: 0,
      tags: [],
      isVIP: false,
      isHot: false,
      isDelinquent: false,
      avatarInitials: (data.name || 'NA').split(' ').map(n => n[0]).join('').toUpperCase(),
      avatarColor: randomFrom(COLORS),
      joinDate: new Date().toISOString().split('T')[0],
      lastContactDate: new Date().toISOString().split('T')[0],
      nationality: 'Indian',
      status: 'Active' as CustomerStatus,
      type: data.type || 'Resident',
      assignedExecutive: data.assignedExecutive || randomFrom(EXECUTIVES),
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
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
  addLedgerEntry: (data) => set(s => ({
    ledgerEntries: [...s.ledgerEntries, { ...data, id: `le-${Date.now()}` } as LedgerEntry],
  })),
}));
