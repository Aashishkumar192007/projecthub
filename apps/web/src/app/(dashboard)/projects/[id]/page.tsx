'use client';

import { useState } from 'react';
import { ProjectNavigator } from '@/components/projects/ProjectNavigator';
import { ProjectCopilot } from '@/components/projects/ProjectCopilot';
import { ProjectHeader } from '@/components/projects/ProjectHeader';
import { ProjectTabs } from '@/components/projects/ProjectTabs';
import { OverviewTab } from '@/components/projects/tabs/OverviewTab';
import { MilestonesTab } from '@/components/projects/tabs/MilestonesTab';
import { FinancialsTab } from '@/components/projects/tabs/FinancialsTab';
import { SiteViewTab } from '@/components/projects/tabs/SiteViewTab';
import { TimelineTab } from '@/components/projects/tabs/TimelineTab';
import { RelationshipsTab } from '@/components/projects/tabs/RelationshipsTab';
import { 
  BoqTab, ProcurementTab, DprTab, QualityTab, SafetyTab, 
  SnaggingTab, DocumentsTab, AnalyticsTab 
} from '@/components/projects/tabs/MockTabComponents';

export default function ProjectWorkspace() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview': return <OverviewTab />;
      case 'milestones': return <MilestonesTab />;
      case 'siteview': return <SiteViewTab />;
      case 'timeline': return <TimelineTab />;
      case 'relations': return <RelationshipsTab />;
      case 'financials': return <FinancialsTab />;
      case 'boq': return <BoqTab />;
      case 'procurement': return <ProcurementTab />;
      case 'dpr': return <DprTab />;
      case 'quality': return <QualityTab />;
      case 'safety': return <SafetyTab />;
      case 'snagging': return <SnaggingTab />;
      case 'documents': return <DocumentsTab />;
      case 'analytics': return <AnalyticsTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] overflow-hidden flex font-sans">
      
      {/* LEFT PANEL */}
      <ProjectNavigator />

      {/* CENTER WORKSPACE */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#121212]">
        <ProjectHeader />
        <ProjectTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-y-auto">
           {renderTabContent()}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <ProjectCopilot />

    </div>
  );
}
