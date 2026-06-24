import { create } from 'zustand';

export type ResidentCategory = 'Owner' | 'Tenant' | 'Family Member' | 'Committee Member' | 'VIP Resident' | 'Defaulter';

export interface AssistantRecommendation {
  id: string;
  type: 'Alert' | 'Suggestion' | 'Notification';
  message: string;
  actionLabel?: string;
  isUrgent?: boolean;
}

export interface SmartDevice {
  id: string;
  name: string;
  type: 'Light' | 'AC' | 'Lock' | 'Sensor' | 'Camera';
  status: 'On' | 'Off' | 'Locked' | 'Unlocked' | 'Active' | 'Inactive';
  value?: string; // e.g., "22°C"
}

export interface Resident {
  id: string;
  name: string;
  unit: string;
  tower: string;
  category: ResidentCategory;
  occupancyStatus: 'Occupied' | 'Vacant' | 'Moving Out';
  communityScore: number;
  
  // Dashboard Metrics
  pendingDues: number;
  openComplaints: number;
  activeBookings: number;
  activeVisitors: number;
  
  recommendations: AssistantRecommendation[];
  smartDevices: SmartDevice[];
}

export interface ResidentEvent {
  id: string;
  residentId: string;
  time: string;
  message: string;
  type: 'Visitor' | 'Complaint' | 'Payment' | 'Booking';
}

interface ResidentState {
  residents: Resident[];
  events: ResidentEvent[];
  activeResidentId: string | null;
  
  setActiveResident: (id: string) => void;
  toggleDevice: (residentId: string, deviceId: string) => void;
}

const mockResidents: Resident[] = [
  {
    id: 'res-001',
    name: 'Aisha Sharma',
    unit: '1402',
    tower: 'Tower A',
    category: 'Owner',
    occupancyStatus: 'Occupied',
    communityScore: 92,
    pendingDues: 0,
    openComplaints: 1,
    activeBookings: 2,
    activeVisitors: 0,
    recommendations: [
      { id: 'rec-1', type: 'Suggestion', message: 'Pool booking available at 6 PM.', actionLabel: 'Book Now' },
      { id: 'rec-2', type: 'Notification', message: 'Community Yoga class this weekend.' }
    ],
    smartDevices: [
      { id: 'sd-1', name: 'Living Room Lights', type: 'Light', status: 'On', value: '75%' },
      { id: 'sd-2', name: 'Master Bedroom AC', type: 'AC', status: 'On', value: '22°C' },
      { id: 'sd-3', name: 'Front Door Lock', type: 'Lock', status: 'Locked' },
    ]
  },
  {
    id: 'res-002',
    name: 'Vikram Mehta',
    unit: '804',
    tower: 'Tower B',
    category: 'VIP Resident',
    occupancyStatus: 'Occupied',
    communityScore: 98,
    pendingDues: 0,
    openComplaints: 0,
    activeBookings: 5,
    activeVisitors: 2,
    recommendations: [
      { id: 'rec-3', type: 'Notification', message: 'Your guest, Rahul, has arrived at the gate.', actionLabel: 'Approve' }
    ],
    smartDevices: [
      { id: 'sd-4', name: 'Living Room AC', type: 'AC', status: 'Off' },
      { id: 'sd-5', name: 'Front Door Lock', type: 'Lock', status: 'Unlocked' },
    ]
  },
  {
    id: 'res-003',
    name: 'Karan Patel',
    unit: '501',
    tower: 'Tower A',
    category: 'Defaulter',
    occupancyStatus: 'Occupied',
    communityScore: 45,
    pendingDues: 18500,
    openComplaints: 3,
    activeBookings: 0,
    activeVisitors: 0,
    recommendations: [
      { id: 'rec-4', type: 'Alert', message: 'You have ₹18,500 due immediately.', actionLabel: 'Pay Now', isUrgent: true }
    ],
    smartDevices: [
      { id: 'sd-6', name: 'Front Door Lock', type: 'Lock', status: 'Locked' },
    ]
  }
];

const mockEvents: ResidentEvent[] = [
  { id: 'ev-1', residentId: 'res-001', time: '08:15', message: 'Visitor (Amazon Delivery) Approved', type: 'Visitor' },
  { id: 'ev-2', residentId: 'res-001', time: '09:20', message: 'Complaint Raised: Leaking Tap in Kitchen', type: 'Complaint' },
  { id: 'ev-3', residentId: 'res-001', time: '14:05', message: 'Clubhouse Booked for 18:00', type: 'Booking' },
  
  { id: 'ev-4', residentId: 'res-003', time: '10:05', message: 'Payment Overdue Alert Generated', type: 'Payment' },
];

export const useResidentStore = create<ResidentState>((set) => ({
  residents: mockResidents,
  events: mockEvents,
  activeResidentId: null,
  
  setActiveResident: (id) => set({ activeResidentId: id }),
  toggleDevice: (residentId, deviceId) => set((state) => ({
    residents: state.residents.map(res => {
      if (res.id !== residentId) return res;
      return {
        ...res,
        smartDevices: res.smartDevices.map(device => {
          if (device.id !== deviceId) return device;
          if (device.type === 'Lock') return { ...device, status: device.status === 'Locked' ? 'Unlocked' : 'Locked' };
          return { ...device, status: device.status === 'On' ? 'Off' : 'On' };
        })
      };
    })
  })),
}));
