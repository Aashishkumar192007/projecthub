'use client';

import { useRevenueIntelligenceStore } from '@/store/revenueIntelligenceStore';
import { ExecutiveSalesCommandCenter } from '@/components/executive/views/ExecutiveSalesCommandCenter';
import { RevenueWarRoom } from '@/components/executive/views/RevenueWarRoom';
import { DynamicSalesTargets } from '@/components/executive/views/DynamicSalesTargets';
import { RevenueForecastEngine } from '@/components/executive/views/RevenueForecastEngine';
import { SalesForecastingEngine } from '@/components/executive/views/SalesForecastingEngine';
import { ScenarioSimulationEngine } from '@/components/executive/views/ScenarioSimulationEngine';
import { ForecastAccuracyTracking } from '@/components/executive/views/ForecastAccuracyTracking';

import { ProjectIntelligence } from '@/components/executive/views/ProjectIntelligence';
import { RegionalIntelligence } from '@/components/executive/views/RegionalIntelligence';
import { SalesExecutiveIntelligence } from '@/components/executive/views/SalesExecutiveIntelligence';
import { BrokerIntelligence } from '@/components/executive/views/BrokerIntelligence';
import { CampaignIntelligence } from '@/components/executive/views/CampaignIntelligence';
import { CustomerIntelligence } from '@/components/executive/views/CustomerIntelligence';

import { InventoryIntelligenceEngine } from '@/components/executive/views/InventoryIntelligenceEngine';
import { DemandPredictionEngine } from '@/components/executive/views/DemandPredictionEngine';
import { ChurnIntelligence } from '@/components/executive/views/ChurnIntelligence';
import { AILeadConversionPrediction } from '@/components/executive/views/AILeadConversionPrediction';

import { ExecutiveAICopilot } from '@/components/executive/views/ExecutiveAICopilot';
import { CustomReportBuilder } from '@/components/executive/views/CustomReportBuilder';
import { AutomatedBoardReporting } from '@/components/executive/views/AutomatedBoardReporting';

export function ExecutiveWorkspaceRouter() {
  const { activeFolder } = useRevenueIntelligenceStore();

  switch (activeFolder) {
    case 'SALES_COMMAND_CENTER': return <ExecutiveSalesCommandCenter />;
    case 'REVENUE_WAR_ROOM': return <RevenueWarRoom />;
    case 'DYNAMIC_TARGETS': return <DynamicSalesTargets />;
    case 'REVENUE_FORECAST': return <RevenueForecastEngine />;
    case 'SALES_FORECAST': return <SalesForecastingEngine />;
    case 'SCENARIO_PLANNER': return <ScenarioSimulationEngine />;
    case 'FORECAST_ACCURACY': return <ForecastAccuracyTracking />;
    case 'PROJECT_INTELLIGENCE': return <ProjectIntelligence />;
    case 'REGIONAL_INTELLIGENCE': return <RegionalIntelligence />;
    case 'SALES_TEAM_INTELLIGENCE': return <SalesExecutiveIntelligence />;
    case 'BROKER_INTELLIGENCE': return <BrokerIntelligence />;
    case 'CAMPAIGN_INTELLIGENCE': return <CampaignIntelligence />;
    case 'CUSTOMER_INTELLIGENCE': return <CustomerIntelligence />;
    case 'INVENTORY_INTELLIGENCE': return <InventoryIntelligenceEngine />;
    case 'DEMAND_PREDICTION': return <DemandPredictionEngine />;
    case 'CHURN_INTELLIGENCE': return <ChurnIntelligence />;
    case 'LEAD_CONVERSION_PREDICTION': return <AILeadConversionPrediction />;
    case 'AI_COPILOT': return <ExecutiveAICopilot />;
    case 'CUSTOM_REPORT_BUILDER': return <CustomReportBuilder />;
    case 'BOARD_REPORTING': return <AutomatedBoardReporting />;
    
    // Future phases will have actual components here
    default: return (
      <div className="flex items-center justify-center h-full text-neutral-500">
        Module "{activeFolder}" is part of a future rollout phase.
      </div>
    );
  }
}
