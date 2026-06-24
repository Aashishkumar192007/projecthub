'use client';

import { useState, useEffect } from 'react';
import { SocietyNavigator } from '@/components/society/SocietyNavigator';
import { SocietyCopilot } from '@/components/society/SocietyCopilot';
import { SocietyHeader } from '@/components/society/SocietyHeader';
import { SocietyTabs } from '@/components/society/SocietyTabs';
import { useSocietyStore } from '@/store/societyStore';

import { OverviewTab } from '@/components/society/tabs/OverviewTab';
import { ResidentsTab } from '@/components/society/tabs/ResidentsTab';
import { ComplaintsTab } from '@/components/society/tabs/ComplaintsTab';
import { RelationsTab } from '@/components/society/tabs/RelationsTab';
import { TimelineTab } from '@/components/society/tabs/TimelineTab';

import { 
  CommitteeTab, VisitorsTab, StaffTab, FacilitiesTab, EventsTab, 
  CommunicationTab, NoticesTab, PollsTab, ElectionsTab, AccountingTab, 
  ComplianceTab, DocumentsTab, AnalyticsTab
} from '@/components/society/tabs/MockSocietyTabs';

export default function SocietyWorkspace() {
  const [activeTab, setActiveTab] = useState('overview');
  const { activeCategoryId, setActiveCategory } = useSocietyStore();

  useEffect(() => {
    if (!activeCategoryId) {
      setActiveCategory('Complaints');
    }
  }, [activeCategoryId, setActiveCategory]);

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview': return <OverviewTab />;
      case 'residents': return <ResidentsTab />;
      case 'complaints': return <ComplaintsTab />;
      case 'relations': return <RelationsTab />;
      case 'timeline': return <TimelineTab />;
      case 'committee': return <CommitteeTab />;
      case 'visitors': return <VisitorsTab />;
      case 'staff': return <StaffTab />;
      case 'facilities': return <FacilitiesTab />;
      case 'events': return <EventsTab />;
      case 'communication': return <CommunicationTab />;
      case 'notices': return <NoticesTab />;
      case 'polls': return <PollsTab />;
      case 'elections': return <ElectionsTab />;
      case 'accounting': return <AccountingTab />;
      case 'compliance': return <ComplianceTab />;
      case 'documents': return <DocumentsTab />;
      case 'analytics': return <AnalyticsTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] overflow-hidden flex font-sans">
      
      {/* LEFT PANEL */}
      <SocietyNavigator />

      {/* CENTER WORKSPACE */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#121212]">
        <SocietyHeader />
        <SocietyTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-y-auto">
           {renderTabContent()}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <SocietyCopilot />

    </div>
  );
}
