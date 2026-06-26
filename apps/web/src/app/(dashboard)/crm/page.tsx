'use client';

import { useCrmStore } from '@/store/crmStore';
import { CrmNavigator } from '@/components/crm/CrmNavigator';
import { CrmCopilot } from '@/components/crm/CrmCopilot';
import { CrmHeader } from '@/components/crm/CrmHeader';
import { CrmTabs } from '@/components/crm/CrmTabs';
import { OverviewTab } from '@/components/crm/tabs/OverviewTab';
import { PipelineTab } from '@/components/crm/tabs/PipelineTab';
import { AnalyticsTab } from '@/components/crm/tabs/AnalyticsTab';
import { CRMWorkspaceRouter } from '@/components/crm/CRMWorkspaceRouter';
import { GlobalActionModal } from '@/components/crm/GlobalActionModal';

import { useEffect, useState } from 'react';

export default function CrmWorkspace() {
  const { activeTab } = useCrmStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderTabContent = () => {
    if (!mounted) return null; // Avoid hydration mismatch

    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'pipeline': return <PipelineTab />;
      case 'analytics': return <AnalyticsTab />;
      case 'operations': return <CRMWorkspaceRouter />;
      default: return <CRMWorkspaceRouter />;
    }
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] overflow-hidden flex font-sans">
      <GlobalActionModal />
      
      {/* LEFT PANEL: Navigator */}
      <CrmNavigator />

      {/* CENTER WORKSPACE */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#121212]">
        <CrmHeader />
        <CrmTabs />
        
        {/* Dynamic Tab Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
           {renderTabContent()}
        </div>
      </div>

      {/* RIGHT PANEL: Copilot */}
      <CrmCopilot />

    </div>
  );
}
