'use client';

import { useCrmStore } from '@/store/crmStore';
import { CrmNavigator } from '@/components/crm/CrmNavigator';
import { CrmCopilot } from '@/components/crm/CrmCopilot';
import { CrmHeader } from '@/components/crm/CrmHeader';
import { CrmTabs } from '@/components/crm/CrmTabs';
import { OverviewTab } from '@/components/crm/tabs/OverviewTab';
import { 
  PipelineTab, LeadsTab, SiteVisitsTab, BookingsTab, 
  CustomersTab, BrokersTab, CampaignsTab, AnalyticsTab 
} from '@/components/crm/tabs/MockTabComponents';

export default function CrmWorkspace() {
  const { activeTab } = useCrmStore();

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview': return <OverviewTab />;
      case 'pipeline': return <PipelineTab />;
      case 'leads': return <LeadsTab />;
      case 'site_visits': return <SiteVisitsTab />;
      case 'bookings': return <BookingsTab />;
      case 'customers': return <CustomersTab />;
      case 'brokers': return <BrokersTab />;
      case 'campaigns': return <CampaignsTab />;
      case 'analytics': return <AnalyticsTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] overflow-hidden flex font-sans">
      
      {/* LEFT PANEL: Navigator */}
      <CrmNavigator />

      {/* CENTER WORKSPACE */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#121212]">
        <CrmHeader />
        <CrmTabs />
        <div className="flex-1 overflow-y-auto no-scrollbar">
           {renderTabContent()}
        </div>
      </div>

      {/* RIGHT PANEL: Copilot */}
      <CrmCopilot />

    </div>
  );
}
