'use client';

import { useState, useEffect } from 'react';
import { FinanceNavigator } from '@/components/finance/FinanceNavigator';
import { FinanceCopilot } from '@/components/finance/FinanceCopilot';
import { FinanceHeader } from '@/components/finance/FinanceHeader';
import { FinanceTabs } from '@/components/finance/FinanceTabs';
import { useFinanceStore } from '@/store/financeStore';

import { OverviewTab } from '@/components/finance/tabs/OverviewTab';
import { AccountsReceivableTab } from '@/components/finance/tabs/AccountsReceivableTab';
import { AccountsPayableTab } from '@/components/finance/tabs/AccountsPayableTab';
import { RelationsTab } from '@/components/finance/tabs/RelationsTab';
import { TimelineTab } from '@/components/finance/tabs/TimelineTab';

import { 
  GeneralLedgerTab, BudgetingTab, TreasuryTab, CollectionsTab, TaxationTab,
  AssetsTab, ProjectsTab, InvestorsTab, ReportingTab, AuditTab, AnalyticsTab
} from '@/components/finance/tabs/MockFinanceTabs';

export default function FinanceWorkspace() {
  const [activeTab, setActiveTab] = useState('overview');
  const { activeCategoryId, setActiveCategory } = useFinanceStore();

  useEffect(() => {
    if (!activeCategoryId) {
      setActiveCategory('Accounts Receivable');
    }
  }, [activeCategoryId, setActiveCategory]);

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview': return <OverviewTab />;
      case 'ar': return <AccountsReceivableTab />;
      case 'ap': return <AccountsPayableTab />;
      case 'relations': return <RelationsTab />;
      case 'timeline': return <TimelineTab />;
      case 'gl': return <GeneralLedgerTab />;
      case 'budgets': return <BudgetingTab />;
      case 'treasury': return <TreasuryTab />;
      case 'collections': return <CollectionsTab />;
      case 'taxation': return <TaxationTab />;
      case 'assets': return <AssetsTab />;
      case 'projects': return <ProjectsTab />;
      case 'investors': return <InvestorsTab />;
      case 'reporting': return <ReportingTab />;
      case 'audit': return <AuditTab />;
      case 'analytics': return <AnalyticsTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] overflow-hidden flex font-sans">
      
      {/* LEFT PANEL */}
      <FinanceNavigator />

      {/* CENTER WORKSPACE */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#121212]">
        <FinanceHeader />
        <FinanceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-y-auto">
           {renderTabContent()}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <FinanceCopilot />

    </div>
  );
}
