import { create } from 'zustand';

export type NodeType = 'portfolio' | 'property' | 'building' | 'floor' | 'unit';

export interface PropertyNode {
  id: string;
  name: string;
  type: NodeType;
  parentId: string | null;
  // Common details
  status?: 'nominal' | 'warning' | 'critical' | 'available' | 'occupied' | 'maintenance';
  health?: number;
  value?: string;
  yield?: string;
  address?: string;
  typeCategory?: string; // e.g. Commercial, Residential
  sqft?: number;
  // Specific details
  totalFloors?: number; // for buildings
  occupancy?: number;
  monthlyRevenue?: number;
}

export interface Document {
  id: string;
  name: string;
  category: string;
  nodeId: string;
  uploadDate: string;
  size: string;
}

export interface Person {
  id: string;
  name: string;
  role: 'owner' | 'tenant';
  nodeId: string;
  email: string;
  phone: string;
  kycStatus: 'VERIFIED' | 'PENDING';
}

export interface Asset {
  id: string;
  name: string;
  type: 'HVAC' | 'Generator' | 'Lift' | 'Electrical' | 'Water' | 'Security';
  nodeId: string;
  health: number;
  status: 'nominal' | 'warning' | 'critical';
}

export interface Lease {
  id: string;
  tenantId: string;
  unitId: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  status: 'active' | 'expired' | 'pending';
}

export interface WorkOrder {
  id: string;
  title: string;
  nodeId: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'completed';
}

export interface Invoice {
  id: string;
  leaseId: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
}

interface PropertyState {
  nodes: PropertyNode[];
  documents: Document[];
  people: Person[];
  assets: Asset[];
  leases: Lease[];
  workOrders: WorkOrder[];
  invoices: Invoice[];
  activeNodeId: string | null;
  
  // Modal State
  isAddNodeModalOpen: boolean;
  setAddNodeModalOpen: (isOpen: boolean) => void;

  // Selectors
  setActiveNode: (id: string) => void;
  getActiveNode: () => PropertyNode | undefined;
  getChildren: (parentId: string) => PropertyNode[];
  
  // Actions
  addNode: (node: Omit<PropertyNode, 'id'>) => void;
  updateNode: (id: string, data: Partial<PropertyNode>) => void;
  deleteNode: (id: string) => void;
  
  addDocument: (doc: Omit<Document, 'id'>) => void;
  addPerson: (person: Omit<Person, 'id'>) => void;
  addWorkOrder: (wo: Omit<WorkOrder, 'id'>) => void;
}

// Initial Seed Data (Cleared for backend integration)
const initialNodes: PropertyNode[] = [];
const initialDocs: Document[] = [];
const initialPeople: Person[] = [];
const initialAssets: Asset[] = [];
const initialLeases: Lease[] = [];
const initialWorkOrders: WorkOrder[] = [];
const initialInvoices: Invoice[] = [];

export const usePropertyStore = create<PropertyState>((set, get) => ({
  nodes: initialNodes,
  documents: initialDocs,
  people: initialPeople,
  assets: initialAssets,
  leases: initialLeases,
  workOrders: initialWorkOrders,
  invoices: initialInvoices,
  activeNodeId: 'port-1',
  
  isAddNodeModalOpen: false,
  setAddNodeModalOpen: (isOpen) => set({ isAddNodeModalOpen: isOpen }),
  
  setActiveNode: (id) => set({ activeNodeId: id }),
  getActiveNode: () => {
    const { nodes, activeNodeId } = get();
    return nodes.find(n => n.id === activeNodeId);
  },
  getChildren: (parentId) => {
    return get().nodes.filter(n => n.parentId === parentId);
  },
  
  addNode: (nodeData) => set((state) => {
    const newNode = { ...nodeData, id: `node-${Date.now()}` };
    return { nodes: [...state.nodes, newNode] };
  }),
  updateNode: (id, data) => set((state) => ({
    nodes: state.nodes.map(n => n.id === id ? { ...n, ...data } : n)
  })),
  deleteNode: (id) => set((state) => {
    // Basic cascade: just filter out the node.
    // (In a real app, you'd recursively delete children too)
    return { nodes: state.nodes.filter(n => n.id !== id && n.parentId !== id) };
  }),
  
  addDocument: (docData) => set((state) => ({
    documents: [...state.documents, { ...docData, id: `doc-${Date.now()}` }]
  })),
  addPerson: (personData) => set((state) => ({
    people: [...state.people, { ...personData, id: `p-${Date.now()}` }]
  })),
  addWorkOrder: (woData) => set((state) => ({
    workOrders: [...state.workOrders, { ...woData, id: `wo-${Date.now()}` }]
  })),
}));
