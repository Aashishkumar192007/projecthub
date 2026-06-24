import { create } from 'zustand';

export type PipelineCategory = 'New Leads' | 'Qualified Leads' | 'Site Visits' | 'Negotiations' | 'Bookings' | 'Won Deals' | 'Lost Deals' | 'Leasing Prospects' | 'Corporate Clients' | 'Channel Partners' | 'Brokers';

export type LeadStage = 'Lead' | 'Qualified' | 'Interested' | 'Visit Scheduled' | 'Negotiation' | 'Booked' | 'Won' | 'Lost';

export interface SalesInsight {
  id: string;
  type: 'Probability' | 'Action' | 'Risk' | 'Forecast' | 'Broker Performance';
  message: string;
  metric?: string;
  actionLabel?: string;
  isUrgent?: boolean;
}

export interface CrmEvent {
  id: string;
  entityId: string;
  date: string;
  message: string;
  type: 'Lead Created' | 'Visit Completed' | 'Booking Confirmed' | 'Commission Released' | 'Call Logged';
}

export interface CrmEntity {
  id: string;
  name: string;
  category: PipelineCategory;
  stage: LeadStage;
  
  // Financials
  potentialValue: number; // In currency
  probability: number; // Percentage
  
  // Meta
  assignedBroker: string;
  lastContact: string;
  source: string;
  
  insights: SalesInsight[];
}

// Command Center Additional Types
export interface LifecycleStage {
  id: string;
  name: string;
  value: number;
  convToNext: number | null;
}

export interface TopProject {
  id: string;
  name: string;
  leads: number;
  visits: number;
  revenue: number;
  conv: number;
}

export interface SalesLeader {
  id: string;
  name: string;
  role: string;
  revenue: number;
  conv: number;
  avatarUrl?: string;
  status: 'online' | 'offline' | 'busy';
}

// System Level Stats
export interface CrmSystemStats {
  pipelineValue: number;
  activeLeads: number;
  monthlyBookings: number;
  conversionRate: number; // Percentage
  revenueGenerated: number;
  // New Command Center Stats
  totalLeads: number;
  totalLeadsChange: number;
  hotLeads: number;
  qualified: number;
  qualifiedPercentage: number;
  siteVisits: number;
  todaysLeads: number;
  followUps: number;
  lifecycleStages: LifecycleStage[];
  topProjects: TopProject[];
  salesLeaders: SalesLeader[];
}

interface CrmState {
  entities: CrmEntity[];
  events: CrmEvent[];
  stats: CrmSystemStats;
  activeEntityId: string | null;
  activeTab: string;
  activeFolder: string;
  
  setActiveEntity: (id: string) => void;
  setActiveTab: (tabId: string) => void;
  setActiveFolder: (folderId: string) => void;
  moveLeadStage: (id: string, newStage: LeadStage) => void;

  // Async Actions
  fetchLeads: (folder?: string) => Promise<void>;
  fetchLeadDetails: (id: string) => Promise<any>;
  updateLeadStatusAPI: (id: string, status: string) => Promise<void>;
}

const mockStats: CrmSystemStats = {
  pipelineValue: 48500000, 
  activeLeads: 1240,
  monthlyBookings: 12,
  conversionRate: 4.8,
  revenueGenerated: 184500000,
  
  totalLeads: 2450,
  totalLeadsChange: 4,
  hotLeads: 142,
  qualified: 380,
  qualifiedPercentage: 8.2,
  siteVisits: 84,
  todaysLeads: 24,
  followUps: 18,

  lifecycleStages: [
    { id: 'new', name: 'NEW LEAD', value: 2450, convToNext: 62 },
    { id: 'contacted', name: 'CONTACTED', value: 1519, convToNext: 25 },
    { id: 'qualified', name: 'QUALIFIED', value: 380, convToNext: 22 },
    { id: 'site_visit', name: 'SITE VISIT', value: 84, convToNext: 40 },
    { id: 'negotiation', name: 'NEGOTIATION', value: 34, convToNext: 35 },
    { id: 'won', name: 'WON', value: 12, convToNext: null },
  ],

  topProjects: [
    { id: 'p1', name: 'Skyline Plaza', leads: 840, visits: 42, revenue: 18200000, conv: 5.2 },
    { id: 'p2', name: 'Marina Heights', leads: 610, visits: 28, revenue: 14500000, conv: 4.6 },
    { id: 'p3', name: 'The Reserve', leads: 340, visits: 14, revenue: 15800000, conv: 4.1 },
  ],

  salesLeaders: [
    { id: 'u1', name: 'Alex Rivera', role: 'SENIOR SALES ASSOC.', revenue: 12400000, conv: 6.8, status: 'online' },
    { id: 'u2', name: 'Sarah Chen', role: 'PORTFOLIO MANAGER', revenue: 10200000, conv: 5.4, status: 'online' },
    { id: 'u3', name: 'James Wilson', role: 'EXTERNAL BROKER', revenue: 8100000, conv: 3.9, status: 'busy' },
  ],
};

const mockEntities: CrmEntity[] = [
  {
    id: 'lead-001',
    name: 'Anjali Desai',
    category: 'Qualified Leads',
    stage: 'Qualified',
    potentialValue: 12500000,
    probability: 45,
    assignedBroker: 'Rahul Sharma',
    lastContact: '2 hours ago',
    source: 'Facebook Ad',
    insights: [
      { id: 'in-1', type: 'Action', message: 'Schedule follow-up call within 48 hours to discuss pricing.', actionLabel: 'Schedule Call' },
      { id: 'in-2', type: 'Probability', message: 'Lead matches Ideal Customer Profile (ICP).', metric: '45% Close Rate' }
    ]
  },
  {
    id: 'lead-002',
    name: 'TechCorp India',
    category: 'Corporate Clients',
    stage: 'Negotiation',
    potentialValue: 450000000,
    probability: 87,
    assignedBroker: 'Priya Patel',
    lastContact: '1 day ago',
    source: 'LinkedIn B2B',
    insights: [
      { id: 'in-3', type: 'Forecast', message: 'Lead L-002 has 87% booking probability. Expected close this week.', metric: 'High Intent', isUrgent: true, actionLabel: 'Generate Proposal' }
    ]
  },
  {
    id: 'lead-003',
    name: 'Vikram Singh',
    category: 'Site Visits',
    stage: 'Visit Scheduled',
    potentialValue: 28000000,
    probability: 60,
    assignedBroker: 'Rahul Sharma',
    lastContact: '5 mins ago',
    source: 'Property Finder',
    insights: [
      { id: 'in-4', type: 'Broker Performance', message: 'Broker Rahul has highest conversion rate for this property type.', metric: '18% Conv.' }
    ]
  },
  {
    id: 'lead-004',
    name: 'Neha Kapoor',
    category: 'Bookings',
    stage: 'Booked',
    potentialValue: 15500000,
    probability: 100,
    assignedBroker: 'Amit Kumar',
    lastContact: '3 days ago',
    source: 'Referral',
    insights: []
  }
];

const mockEvents: CrmEvent[] = [
  { id: 'ev-1', entityId: 'lead-002', date: 'Today, 10:45 AM', message: 'Commercial Lease Proposal Sent', type: 'Call Logged' },
  { id: 'ev-2', entityId: 'lead-003', date: 'Today, 09:15 AM', message: 'Site Visit Confirmed for Tomorrow 2PM', type: 'Visit Completed' },
  { id: 'ev-3', entityId: 'lead-004', date: 'Yesterday', message: 'Booking Amount Received (₹5,00,000)', type: 'Booking Confirmed' },
  { id: 'ev-4', entityId: 'lead-001', date: '2 Days Ago', message: 'Lead Created via Campaign: Summer Launch', type: 'Lead Created' }
];

export const useCrmStore = create<CrmState>((set) => ({
  entities: mockEntities,
  events: mockEvents,
  stats: mockStats,
  activeEntityId: null,
  activeTab: 'overview',
  activeFolder: 'hot_leads',
  
  setActiveEntity: (id) => set({ activeEntityId: id }),
  setActiveTab: (tabId) => set({ activeTab: tabId }),
  setActiveFolder: (folderId) => {
    set({ activeFolder: folderId });
    // Auto-fetch leads when folder changes
    useCrmStore.getState().fetchLeads(folderId);
  },
  moveLeadStage: (id, newStage) => {
    // Optimistic UI update
    set((state) => ({
      entities: state.entities.map(e => {
        if (e.id !== id) return e;
        let newProb = e.probability;
        if (newStage === 'Lead') newProb = 10;
        if (newStage === 'Qualified') newProb = 30;
        if (newStage === 'Visit Scheduled') newProb = 50;
        if (newStage === 'Negotiation') newProb = 80;
        if (newStage === 'Booked' || newStage === 'Won') newProb = 100;
        if (newStage === 'Lost') newProb = 0;
        return { ...e, stage: newStage, probability: newProb };
      })
    }));
    
    // Convert LeadStage to backend status string
    let backendStatus = 'NEW';
    if (newStage === 'Lead') backendStatus = 'NEW';
    if (newStage === 'Qualified') backendStatus = 'QUALIFIED';
    if (newStage === 'Visit Scheduled') backendStatus = 'VISIT_SCHEDULED';
    if (newStage === 'Negotiation') backendStatus = 'NEGOTIATION';
    if (newStage === 'Booked') backendStatus = 'BOOKING';
    if (newStage === 'Won') backendStatus = 'WON';
    if (newStage === 'Lost') backendStatus = 'LOST';
    
    // Call API
    useCrmStore.getState().updateLeadStatusAPI(id, backendStatus);
  },

  // API Integration
  fetchLeads: async (folder) => {
    try {
      let url = 'http://localhost:3001/api/v1/crm/leads';
      if (folder) url += `?folder=${folder}`;
      
      const res = await fetch(url);
      if (!res.ok) return;
      const data = await res.json();
      
      const mappedEntities: CrmEntity[] = data.map((dbLead: any) => ({
        id: dbLead.id,
        name: dbLead.name,
        category: 'New Leads',
        stage: dbLead.status === 'NEW' ? 'Lead' : 
               dbLead.status === 'QUALIFIED' ? 'Qualified' :
               dbLead.status === 'VISIT_SCHEDULED' ? 'Visit Scheduled' :
               dbLead.status === 'NEGOTIATION' ? 'Negotiation' :
               dbLead.status === 'BOOKING' ? 'Booked' :
               dbLead.status === 'WON' ? 'Won' : 'Lost',
        potentialValue: dbLead.budgetMax || 0,
        probability: dbLead.score || 10,
        assignedBroker: 'Unassigned',
        lastContact: dbLead.activities?.length > 0 ? 'Recently' : 'Never',
        source: dbLead.source,
        insights: dbLead.nextAction && dbLead.nextAction !== 'N/A' ? [{ 
          id: 'in-' + dbLead.id, 
          type: 'Action', 
          message: dbLead.nextAction,
          actionLabel: dbLead.nextAction.includes('Call') ? 'Call' : 'Execute'
        }] : []
      }));
      
      set({ entities: mappedEntities });
    } catch (e) {
      console.error('Failed to fetch leads', e);
    }
  },

  fetchLeadDetails: async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/v1/crm/leads/${id}`);
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      console.error('Failed to fetch lead details', e);
      return null;
    }
  },

  updateLeadStatusAPI: async (id, status) => {
    try {
      await fetch(`http://localhost:3001/api/v1/crm/leads/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (e) {
      console.error('Failed to update status', e);
    }
  }
}));
