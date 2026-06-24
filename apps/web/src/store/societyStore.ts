import { create } from 'zustand';

export type CommunityCategory = 'Societies' | 'Towers' | 'Committees' | 'Residents' | 'Staff' | 'Visitors' | 'Facilities' | 'Events' | 'Violations' | 'Complaints' | 'Polls' | 'Elections';

export interface GovernanceInsight {
  id: string;
  type: 'Risk' | 'Forecast' | 'Anomaly' | 'Recommendation';
  message: string;
  metric?: string;
  actionLabel?: string;
  isUrgent?: boolean;
}

export interface SocietyEvent {
  id: string;
  categoryId: string;
  date: string;
  message: string;
  type: 'Complaint Raised' | 'Notice Published' | 'Poll Opened' | 'Visitor Approved' | 'Event Scheduled' | 'Payment Received';
}

export interface CommunityEntity {
  id: string;
  name: string;
  category: CommunityCategory;
  
  // Specifics
  value?: number; // In currency
  status: 'Healthy' | 'At Risk' | 'Delayed' | 'Active' | 'Resolved' | 'Open' | 'Pending';
  
  // Meta
  lastUpdated: string;
  owner: string;
  
  insights: GovernanceInsight[];
}

// System Level Stats
export interface SocietySystemStats {
  societyName: string;
  totalResidents: number;
  totalUnits: number;
  occupancyRate: number; // Percentage
  collectionRate: number; // Percentage
  openComplaints: number;
  communityScore: number; // 0-100
}

interface SocietyState {
  entities: CommunityEntity[];
  events: SocietyEvent[];
  stats: SocietySystemStats;
  activeCategoryId: CommunityCategory | null;
  
  setActiveCategory: (category: CommunityCategory) => void;
}

const mockStats: SocietySystemStats = {
  societyName: 'Cyber City Residences',
  totalResidents: 1420,
  totalUnits: 450,
  occupancyRate: 94.5,
  collectionRate: 88.2,
  openComplaints: 14,
  communityScore: 92
};

const mockEntities: CommunityEntity[] = [
  {
    id: 'res-1',
    name: 'Aashish Kumar (Flat 104)',
    category: 'Residents',
    status: 'Healthy',
    lastUpdated: '1 hour ago',
    owner: 'Owner',
    insights: [
      { id: 'in-1', type: 'Risk', message: 'Maintenance dues pending for Q2 2026.', metric: '₹12,400 Due', actionLabel: 'Send Reminder' }
    ]
  },
  {
    id: 'com-1',
    name: 'Tkt-842: Plumbing Leak',
    category: 'Complaints',
    status: 'Open',
    lastUpdated: '20 mins ago',
    owner: 'Tower B - 204',
    insights: [
      { id: 'in-2', type: 'Anomaly', message: 'Tower B complaints increased 18% this month (Plumbing & HVAC).', metric: '+18% Tickets', isUrgent: true, actionLabel: 'View Analytics' }
    ]
  },
  {
    id: 'fac-1',
    name: 'Clubhouse Bookings',
    category: 'Facilities',
    status: 'Active',
    lastUpdated: 'Just now',
    owner: 'Amenities Team',
    insights: [
      { id: 'in-3', type: 'Forecast', message: 'Clubhouse fully booked for upcoming weekend. Advise scheduling extra housekeeping.', actionLabel: 'Schedule Staff' }
    ]
  },
  {
    id: 'stf-1',
    name: 'Security Agency (SIS)',
    category: 'Staff',
    status: 'At Risk',
    lastUpdated: 'Yesterday',
    owner: 'Facility Management',
    insights: [
      { id: 'in-4', type: 'Recommendation', message: 'Recommend additional security staffing for Tower C due to increased visitor traffic.', metric: 'High Traffic', actionLabel: 'Approve Roster' }
    ]
  }
];

const mockEvents: SocietyEvent[] = [
  { id: 'ev-1', categoryId: 'Complaints', date: 'Today, 10:30 AM', message: 'Tkt-842: Plumbing Leak reported by Flat 204', type: 'Complaint Raised' },
  { id: 'ev-2', categoryId: 'Societies', date: 'Today, 09:15 AM', message: 'Maintenance Notice published for Tower A', type: 'Notice Published' },
  { id: 'ev-3', categoryId: 'Visitors', date: 'Yesterday', message: '140 Visitors Approved at Main Gate', type: 'Visitor Approved' },
  { id: 'ev-4', categoryId: 'Polls', date: '2 Days Ago', message: 'Poll Opened: Gym Equipment Upgrade', type: 'Poll Opened' }
];

export const useSocietyStore = create<SocietyState>((set) => ({
  entities: mockEntities,
  events: mockEvents,
  stats: mockStats,
  activeCategoryId: 'Complaints',
  
  setActiveCategory: (category) => set({ activeCategoryId: category })
}));
