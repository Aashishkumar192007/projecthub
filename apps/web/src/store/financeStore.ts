import { create } from 'zustand';

export type LedgerCategory = 'Accounts Receivable' | 'Accounts Payable' | 'General Ledger' | 'Budgets' | 'Treasury' | 'Collections' | 'Taxation' | 'Fixed Assets' | 'Project Accounting' | 'Investor Accounting' | 'Financial Reports' | 'Audits';

export interface FinanceInsight {
  id: string;
  type: 'Risk' | 'Forecast' | 'Anomaly' | 'Recommendation';
  message: string;
  metric?: string;
  actionLabel?: string;
  isUrgent?: boolean;
}

export interface FinancialEvent {
  id: string;
  categoryId: string;
  date: string;
  message: string;
  type: 'Invoice Created' | 'Payment Received' | 'Budget Approved' | 'Journal Posted' | 'Expense Approved';
  amount?: number;
}

export interface LedgerEntity {
  id: string;
  name: string;
  category: LedgerCategory;
  
  // Financials
  balance: number; // In currency
  variance?: number; // Percentage
  status: 'Healthy' | 'At Risk' | 'Overdue' | 'Pending Approval' | 'Cleared';
  
  // Meta
  lastUpdated: string;
  owner: string;
  
  insights: FinanceInsight[];
}

// System Level Stats
export interface FinanceSystemStats {
  revenue: number;
  expenses: number;
  profit: number;
  cashPosition: number;
  outstandingReceivables: number;
  outstandingPayables: number;
  budgetUtilization: number; // Percentage
  financialHealth: number; // 0-100
}

interface FinanceState {
  ledgers: LedgerEntity[];
  events: FinancialEvent[];
  stats: FinanceSystemStats;
  activeCategoryId: LedgerCategory | null;
  
  setActiveCategory: (category: LedgerCategory) => void;
}

const mockStats: FinanceSystemStats = {
  revenue: 845000000, // 845M
  expenses: 312000000, // 312M
  profit: 533000000, // 533M
  cashPosition: 125000000, // 125M
  outstandingReceivables: 42000000, // 42M
  outstandingPayables: 18500000, // 18.5M
  budgetUtilization: 78.5,
  financialHealth: 92
};

const mockLedgers: LedgerEntity[] = [
  {
    id: 'led-ar-1',
    name: 'Q2 Commercial Rent Receivables',
    category: 'Accounts Receivable',
    balance: 42000000,
    status: 'At Risk',
    lastUpdated: '1 hour ago',
    owner: 'AR Department',
    insights: [
      { id: 'in-1', type: 'Risk', message: 'Collections expected to drop 6% next month due to 3 major tenant renewals pending.', metric: '-6% Forecast', isUrgent: true, actionLabel: 'Review Leases' }
    ]
  },
  {
    id: 'led-ap-1',
    name: 'Construction Vendor Payables',
    category: 'Accounts Payable',
    balance: 18500000,
    status: 'Pending Approval',
    lastUpdated: '3 hours ago',
    owner: 'AP Department',
    insights: [
      { id: 'in-2', type: 'Action', message: 'Vendor payments of ₹4.2Cr due within 5 days.', actionLabel: 'Approve Payments' }
    ]
  },
  {
    id: 'led-bud-1',
    name: 'Project Alpha CapEx Budget',
    category: 'Budgets',
    balance: 120000000,
    variance: 12.4,
    status: 'Overdue',
    lastUpdated: 'Yesterday',
    owner: 'FP&A Team',
    insights: [
      { id: 'in-3', type: 'Anomaly', message: 'Project Alpha exceeding allocated budget by 12.4% in procurement costs.', metric: '+12.4% Var', isUrgent: true, actionLabel: 'View Variance Report' }
    ]
  },
  {
    id: 'led-tre-1',
    name: 'Corporate Treasury Cash Reserves',
    category: 'Treasury',
    balance: 125000000,
    status: 'Healthy',
    lastUpdated: '10 mins ago',
    owner: 'Treasury Dept',
    insights: [
      { id: 'in-4', type: 'Forecast', message: 'Liquidity ratios optimal. Excess cash can be swept to short-term yields.', metric: '+4.2% Yield' }
    ]
  }
];

const mockEvents: FinancialEvent[] = [
  { id: 'ev-1', categoryId: 'Accounts Receivable', date: 'Today, 11:30 AM', message: 'Invoice INV-2026-084 Generated', type: 'Invoice Created', amount: 1250000 },
  { id: 'ev-2', categoryId: 'Accounts Payable', date: 'Today, 09:15 AM', message: 'L&T Vendor Payment Released', type: 'Expense Approved', amount: 4500000 },
  { id: 'ev-3', categoryId: 'Treasury', date: 'Yesterday', message: 'Inbound Wire Transfer Received (Fund II)', type: 'Payment Received', amount: 25000000 },
  { id: 'ev-4', categoryId: 'Budgets', date: '2 Days Ago', message: 'Q3 Operational Budget Approved by Board', type: 'Budget Approved' }
];

export const useFinanceStore = create<FinanceState>((set) => ({
  ledgers: mockLedgers,
  events: mockEvents,
  stats: mockStats,
  activeCategoryId: 'Accounts Receivable',
  
  setActiveCategory: (category) => set({ activeCategoryId: category })
}));
