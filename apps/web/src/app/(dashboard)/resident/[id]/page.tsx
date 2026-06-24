'use client';

import { useState } from 'react';
import { ResidentNavigator } from '@/components/resident/ResidentNavigator';
import { ResidentAssistant } from '@/components/resident/ResidentAssistant';
import { ResidentHeader } from '@/components/resident/ResidentHeader';
import { ResidentTabs } from '@/components/resident/ResidentTabs';

import { OverviewTab } from '@/components/resident/tabs/OverviewTab';
import { SmartHomeTab } from '@/components/resident/tabs/SmartHomeTab';
import { PaymentsTab } from '@/components/resident/tabs/PaymentsTab';
import { RelationsTab } from '@/components/resident/tabs/RelationsTab';
import { TimelineTab } from '@/components/resident/tabs/TimelineTab';
import { 
  CommunityTab, VisitorsTab, FacilitiesTab, ComplaintsTab, 
  DocumentsTab, VehiclesTab, FamilyTab, MarketplaceTab, 
  EventsTab, NoticesTab, CommunicationTab 
} from '@/components/resident/tabs/MockResidentTabs';

export default function ResidentWorkspace({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [residentData, setResidentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResident = async () => {
      try {
        const token = localStorage.getItem('access_token') || '';
        const res = await fetch(`http://localhost:3001/api/v1/residents/${params.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          setResidentData(await res.json());
        }
      } catch (e) {
        console.error('Failed to fetch resident', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResident();
  }, [params.id]);

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview': return <OverviewTab resident={residentData} />;
      case 'smarthome': return <SmartHomeTab />;
      case 'payments': return <PaymentsTab />;
      case 'relations': return <RelationsTab />;
      case 'timeline': return <TimelineTab />;
      case 'community': return <CommunityTab />;
      case 'visitors': return <VisitorsTab />;
      case 'facilities': return <FacilitiesTab />;
      case 'complaints': return <ComplaintsTab />;
      case 'documents': return <DocumentsTab />;
      case 'vehicles': return <VehiclesTab />;
      case 'family': return <FamilyTab />;
      case 'marketplace': return <MarketplaceTab />;
      case 'events': return <EventsTab />;
      case 'notices': return <NoticesTab />;
      case 'communication': return <CommunicationTab />;
      default: return <OverviewTab resident={residentData} />;
    }
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] overflow-hidden flex font-sans">
      
      {/* LEFT PANEL */}
      <ResidentNavigator />

      {/* CENTER WORKSPACE */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#121212]">
        <ResidentHeader resident={residentData} isLoading={isLoading} />
        <ResidentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-y-auto">
           {isLoading ? (
             <div className="flex items-center justify-center h-full text-neutral-500 animate-pulse">Loading resident profile...</div>
           ) : residentData ? (
             renderTabContent()
           ) : (
             <div className="flex items-center justify-center h-full text-red-500">Failed to load resident profile</div>
           )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <ResidentAssistant />

    </div>
  );
}
