'use client';

import { useState } from 'react';
import { InvestorNavigator } from '@/components/investors/InvestorNavigator';
import { InvestmentAdvisor } from '@/components/investors/InvestmentAdvisor';
import { InvestorHeader } from '@/components/investors/InvestorHeader';
import { InvestorTabs } from '@/components/investors/InvestorTabs';

import { OverviewTab } from '@/components/investors/tabs/OverviewTab';
import { PortfolioTab } from '@/components/investors/tabs/PortfolioTab';
import { CashFlowTab } from '@/components/investors/tabs/CashFlowTab';
import { RelationsTab } from '@/components/investors/tabs/RelationsTab';
import { TimelineTab } from '@/components/investors/tabs/TimelineTab';

import { 
  InvestmentsTab, PropertiesTab, ProjectsTab, ReturnsTab, 
  DistributionsTab, ValuationsTab, DocumentsTab, RiskTab, 
  EsgTab, ForecastsTab, AnalyticsTab 
} from '@/components/investors/tabs/MockInvestorTabs';

export default function InvestorWorkspace() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview': return <OverviewTab />;
      case 'portfolio': return <PortfolioTab />;
      case 'cashflow': return <CashFlowTab />;
      case 'relations': return <RelationsTab />;
      case 'timeline': return <TimelineTab />;
      case 'investments': return <InvestmentsTab />;
      case 'properties': return <PropertiesTab />;
      case 'projects': return <ProjectsTab />;
      case 'returns': return <ReturnsTab />;
      case 'distributions': return <DistributionsTab />;
      case 'valuations': return <ValuationsTab />;
      case 'documents': return <DocumentsTab />;
      case 'risk': return <RiskTab />;
      case 'esg': return <EsgTab />;
      case 'forecasts': return <ForecastsTab />;
      case 'analytics': return <AnalyticsTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] overflow-hidden flex font-sans">
      
      {/* LEFT PANEL */}
      <InvestorNavigator />

      {/* CENTER WORKSPACE */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#121212]">
        <InvestorHeader />
        <InvestorTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-y-auto">
           {renderTabContent()}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <InvestmentAdvisor />

    </div>
  );
}
