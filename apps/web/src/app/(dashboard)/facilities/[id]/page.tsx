'use client';

import { useState } from 'react';
import { FacilityNavigator } from '@/components/facilities/FacilityNavigator';
import { FacilityCopilot } from '@/components/facilities/FacilityCopilot';
import { FacilityHeader } from '@/components/facilities/FacilityHeader';
import { FacilityTabs } from '@/components/facilities/FacilityTabs';

import { OverviewTab } from '@/components/facilities/tabs/OverviewTab';
import { AssetsTab } from '@/components/facilities/tabs/AssetsTab';
import { DigitalTwinTab } from '@/components/facilities/tabs/DigitalTwinTab';
import { SpaceManagementTab } from '@/components/facilities/tabs/SpaceManagementTab';
import { RelationsTab } from '@/components/facilities/tabs/RelationsTab';
import { ESGTab } from '@/components/facilities/tabs/ESGTab';
import { AnalyticsTab } from '@/components/facilities/tabs/AnalyticsTab';
import { 
  MaintenanceTab, WorkOrdersTab, UtilitiesTab, EnergyTab, 
  InspectionsTab, VendorManagementTab, VisitorOperationsTab, 
  ReservationsTab, TimelineTab 
} from '@/components/facilities/tabs/MockFacilityTabs';

export default function FacilityWorkspace() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview': return <OverviewTab />;
      case 'assets': return <AssetsTab />;
      case 'digitaltwin': return <DigitalTwinTab />;
      case 'space': return <SpaceManagementTab />;
      case 'relations': return <RelationsTab />;
      case 'esg': return <ESGTab />;
      case 'analytics': return <AnalyticsTab />;
      case 'maintenance': return <MaintenanceTab />;
      case 'workorders': return <WorkOrdersTab />;
      case 'utilities': return <UtilitiesTab />;
      case 'energy': return <EnergyTab />;
      case 'inspections': return <InspectionsTab />;
      case 'vendors': return <VendorManagementTab />;
      case 'visitors': return <VisitorOperationsTab />;
      case 'reservations': return <ReservationsTab />;
      case 'timeline': return <TimelineTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] overflow-hidden flex font-sans">
      
      {/* LEFT PANEL */}
      <FacilityNavigator />

      {/* CENTER WORKSPACE */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#121212]">
        <FacilityHeader />
        <FacilityTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-y-auto">
           {renderTabContent()}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <FacilityCopilot />

    </div>
  );
}
