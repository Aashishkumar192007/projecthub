'use client';

import { useState } from 'react';
import { TenantNavigator } from '@/components/tenants/TenantNavigator';
import { TenantCopilot } from '@/components/tenants/TenantCopilot';
import { TenantHeader } from '@/components/tenants/TenantHeader';
import { TenantTabs } from '@/components/tenants/TenantTabs';
import { OverviewTab } from '@/components/tenants/tabs/OverviewTab';
import { LeaseTab } from '@/components/tenants/tabs/LeaseTab';
import { PaymentsTab } from '@/components/tenants/tabs/PaymentsTab';
import { CommunicationTab } from '@/components/tenants/tabs/CommunicationTab';
import { RelationshipsTab } from '@/components/tenants/tabs/RelationshipsTab';
import { ComplaintsTab } from '@/components/tenants/tabs/ComplaintsTab';
import { DocumentsTab } from '@/components/tenants/tabs/DocumentsTab';
import { VehiclesTab } from '@/components/tenants/tabs/VehiclesTab';
import { FamilyTab } from '@/components/tenants/tabs/FamilyTab';
import { TimelineTab } from '@/components/tenants/tabs/TimelineTab';

export default function TenantWorkspace() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview': return <OverviewTab />;
      case 'lease': return <LeaseTab />;
      case 'payments': return <PaymentsTab />;
      case 'communication': return <CommunicationTab />;
      case 'relationships': return <RelationshipsTab />;
      case 'complaints': return <ComplaintsTab />;
      case 'documents': return <DocumentsTab />;
      case 'vehicles': return <VehiclesTab />;
      case 'family': return <FamilyTab />;
      case 'timeline': return <TimelineTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] overflow-hidden flex font-sans">
      
      {/* LEFT PANEL */}
      <TenantNavigator />

      {/* CENTER WORKSPACE */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#121212]">
        <TenantHeader />
        <TenantTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-y-auto">
           {renderTabContent()}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <TenantCopilot />

    </div>
  );
}
