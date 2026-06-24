import { create } from 'zustand';

export type InvestorType = 'Institutional' | 'Private' | 'REIT' | 'Family Office' | 'Strategic' | 'High Net Worth' | 'Portfolio Owner' | 'Joint Venture';

export interface AdvisorInsight {
  id: string;
  type: 'Opportunity' | 'Risk' | 'Forecast' | 'Recommendation';
  message: string;
  metric?: string;
  actionLabel?: string;
  isUrgent?: boolean;
}

export interface PortfolioAllocation {
  id: string;
  sector: 'Residential' | 'Commercial' | 'Mixed Use' | 'Construction' | 'Hospitality' | 'Industrial';
  value: number; // In millions
  percentage: number;
  roi: number; // Percentage
  trend: 'Up' | 'Down' | 'Stable';
}

export interface Investor {
  id: string;
  name: string;
  type: InvestorType;
  portfolioValue: number; // In millions
  investedCapital: number; // In millions
  currentRoi: number; // Percentage
  irr: number; // Internal Rate of Return
  netWorthContribution: number; // Percentage
  riskRating: 'Low' | 'Moderate' | 'High';
  healthScore: number; // 0-100
  
  allocations: PortfolioAllocation[];
  insights: AdvisorInsight[];
}

export interface InvestmentEvent {
  id: string;
  investorId: string;
  date: string;
  message: string;
  type: 'Capital Call' | 'Distribution' | 'Acquisition' | 'Report';
  amount?: number; // In millions
}

interface InvestorState {
  investors: Investor[];
  events: InvestmentEvent[];
  activeInvestorId: string | null;
  
  setActiveInvestor: (id: string) => void;
}

const mockInvestors: Investor[] = [
  {
    id: 'inv-001',
    name: 'Blackstone Asia Real Estate Fund',
    type: 'Institutional',
    portfolioValue: 4250, // $4.25B
    investedCapital: 3800,
    currentRoi: 14.2,
    irr: 18.5,
    netWorthContribution: 45,
    riskRating: 'Moderate',
    healthScore: 94,
    allocations: [
      { id: 'al-1', sector: 'Commercial', value: 2125, percentage: 50, roi: 16.4, trend: 'Up' },
      { id: 'al-2', sector: 'Mixed Use', value: 1275, percentage: 30, roi: 12.8, trend: 'Stable' },
      { id: 'al-3', sector: 'Hospitality', value: 850, percentage: 20, roi: 9.5, trend: 'Up' },
    ],
    insights: [
      { id: 'in-1', type: 'Opportunity', message: 'Commercial assets outperforming mixed-use by 3.6%.', metric: '+3.6%', actionLabel: 'Analyze' },
      { id: 'in-2', type: 'Forecast', message: 'Portfolio valuation expected to increase by Q3.', metric: '12% Growth' }
    ]
  },
  {
    id: 'inv-002',
    name: 'Oberoi Family Office',
    type: 'Family Office',
    portfolioValue: 850,
    investedCapital: 600,
    currentRoi: 18.4,
    irr: 22.1,
    netWorthContribution: 12,
    riskRating: 'Low',
    healthScore: 98,
    allocations: [
      { id: 'al-4', sector: 'Residential', value: 510, percentage: 60, roi: 21.0, trend: 'Up' },
      { id: 'al-5', sector: 'Commercial', value: 340, percentage: 40, roi: 14.5, trend: 'Stable' },
    ],
    insights: [
      { id: 'in-3', type: 'Recommendation', message: 'Recommend increasing exposure to West Region Industrial.', actionLabel: 'View Assets' }
    ]
  },
  {
    id: 'inv-003',
    name: 'Global REIT Partners',
    type: 'REIT',
    portfolioValue: 1200,
    investedCapital: 1100,
    currentRoi: 8.5,
    irr: 10.2,
    netWorthContribution: 25,
    riskRating: 'High',
    healthScore: 65,
    allocations: [
      { id: 'al-6', sector: 'Construction', value: 840, percentage: 70, roi: 5.2, trend: 'Down' },
      { id: 'al-7', sector: 'Industrial', value: 360, percentage: 30, roi: 12.5, trend: 'Up' },
    ],
    insights: [
      { id: 'in-4', type: 'Risk', message: 'Construction delays impacting Q2 yield projections.', metric: '-2.4% Yield', isUrgent: true, actionLabel: 'View Risk Report' }
    ]
  }
];

const mockEvents: InvestmentEvent[] = [
  { id: 'ev-1', investorId: 'inv-001', date: '2026-06-15', message: 'Quarterly Distribution Released', type: 'Distribution', amount: 45.5 },
  { id: 'ev-2', investorId: 'inv-001', date: '2026-05-28', message: 'Capital Call: Cyber City Phase 2', type: 'Capital Call', amount: 120 },
  { id: 'ev-3', investorId: 'inv-001', date: '2026-05-10', message: 'Property Acquired: Tech Park West', type: 'Acquisition' },
  
  { id: 'ev-4', investorId: 'inv-003', date: '2026-06-18', message: 'Risk Audit Report Published', type: 'Report' },
];

export const useInvestorStore = create<InvestorState>((set) => ({
  investors: mockInvestors,
  events: mockEvents,
  activeInvestorId: null,
  
  setActiveInvestor: (id) => set({ activeInvestorId: id }),
}));
