import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ExecutiveFolder = 
  // Core Command Centers
  | 'SALES_COMMAND_CENTER'
  | 'REVENUE_WAR_ROOM'
  | 'DYNAMIC_TARGETS'
  // Forecasting & Scenarios
  | 'REVENUE_FORECAST'
  | 'SALES_FORECAST'
  | 'SCENARIO_PLANNER'
  | 'FORECAST_ACCURACY'
  // Intelligence Layer
  | 'PROJECT_INTELLIGENCE'
  | 'REGIONAL_INTELLIGENCE'
  | 'SALES_TEAM_INTELLIGENCE'
  | 'BROKER_INTELLIGENCE'
  | 'CAMPAIGN_INTELLIGENCE'
  | 'CUSTOMER_INTELLIGENCE'
  // Predictors
  | 'INVENTORY_INTELLIGENCE'
  | 'DEMAND_PREDICTION'
  | 'CHURN_INTELLIGENCE'
  // Reporting & Copilot
  | 'LEAD_CONVERSION_PREDICTION'
  | 'CUSTOM_REPORT_BUILDER'
  | 'BOARD_REPORTING'
  | 'AI_COPILOT';

export interface RevenueForecastData {
  month: string;
  actual: number;
  forecast: number;
  bestCase: number;
  worstCase: number;
}

interface ExecutiveIntelligenceState {
  activeFolder: ExecutiveFolder;
  setActiveFolder: (folder: ExecutiveFolder) => void;
  
  // High-Level KPIs (Mocked for Intelligence Layer)
  kpis: {
    totalRevenue: number;
    forecastRevenue: number;
    recognizedRevenue: number;
    pendingRevenue: number;
    targetRevenue: number;
    conversionPercentage: number;
  };
  
  // Forecast Arrays
  revenueForecasts: RevenueForecastData[];
}

export const useRevenueIntelligenceStore = create<ExecutiveIntelligenceState>()(
  persist(
    (set) => ({
      activeFolder: 'SALES_COMMAND_CENTER',
      setActiveFolder: (folder) => set({ activeFolder: folder }),
      
      kpis: {
        totalRevenue: 425000000,
        forecastRevenue: 510000000,
        recognizedRevenue: 380000000,
        pendingRevenue: 45000000,
        targetRevenue: 500000000,
        conversionPercentage: 4.8
      },
      
      revenueForecasts: [
        { month: 'Jan', actual: 35, forecast: 36, bestCase: 40, worstCase: 32 },
        { month: 'Feb', actual: 42, forecast: 40, bestCase: 45, worstCase: 38 },
        { month: 'Mar', actual: 38, forecast: 45, bestCase: 50, worstCase: 42 },
        { month: 'Apr', actual: 48, forecast: 46, bestCase: 52, worstCase: 44 },
        { month: 'May', actual: 52, forecast: 55, bestCase: 60, worstCase: 48 },
        { month: 'Jun', actual: 0, forecast: 62, bestCase: 68, worstCase: 55 },
      ]
    }),
    {
      name: 'revenue-intelligence-store',
      partialize: (state) => ({ activeFolder: state.activeFolder })
    }
  )
);
