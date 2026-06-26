'use client';

import { useCrmStore } from '@/store/crmStore';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LeadProfileNavigator } from '@/components/crm/lead/LeadProfileNavigator';
import { LeadCopilot } from '@/components/crm/lead/LeadCopilot';
import { LeadHeader } from '@/components/crm/lead/LeadHeader';
import { LeadTabs } from '@/components/crm/lead/LeadTabs';

// Tabs
import { LeadOverviewTab } from '@/components/crm/lead/tabs/LeadOverviewTab';
import { LeadActivitiesTab } from '@/components/crm/lead/tabs/LeadActivitiesTab';
import { LeadSiteVisitsTab } from '@/components/crm/lead/tabs/LeadSiteVisitsTab';
import { LeadNegotiationsTab } from '@/components/crm/lead/tabs/LeadNegotiationsTab';
import { LeadBookingsTab } from '@/components/crm/lead/tabs/LeadBookingsTab';

export default function LeadProfile() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  
  const { leads, setActiveEntity } = useCrmStore();
  const [activeTab, setActiveTab] = useState('overview');

  const lead = leads.find(l => l.id === id);

  useEffect(() => {
    if (id) {
      setActiveEntity(id);
    }
    return () => setActiveEntity(null);
  }, [id, setActiveEntity]);

  if (!lead) {
    return (
      <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] flex items-center justify-center text-white">
        Lead not found. <button onClick={() => router.push('/crm')} className="ml-2 text-[#00E5FF]">Go back</button>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <LeadOverviewTab lead={lead} />;
      case 'activities': return <LeadActivitiesTab lead={lead} />;
      case 'visits': return <LeadSiteVisitsTab lead={lead} />;
      case 'negotiations': return <LeadNegotiationsTab lead={lead} />;
      case 'bookings': return <LeadBookingsTab lead={lead} />;
      default: return <LeadOverviewTab lead={lead} />;
    }
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] overflow-hidden flex font-sans">
      
      {/* LEFT PANEL: Navigator */}
      <LeadProfileNavigator lead={lead} />

      {/* CENTER WORKSPACE */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#121212]">
        <LeadHeader lead={lead} />
        <LeadTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-y-auto no-scrollbar">
           {renderTabContent()}
        </div>
      </div>

      {/* RIGHT PANEL: Copilot */}
      <LeadCopilot lead={lead} />

    </div>
  );
}
