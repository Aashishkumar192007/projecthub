'use client';

import { useExecutiveStore } from '@/store/executiveStore';
import { ExecutiveCommandBar } from '@/components/executive/ExecutiveCommandBar';
import { PortfolioNavigator } from '@/components/executive/PortfolioNavigator';
import { ExecutiveCopilot } from '@/components/executive/ExecutiveCopilot';
import { PortfolioHealthWidget } from '@/components/executive/widgets/PortfolioHealthWidget';
import { StrategicForecastWidget } from '@/components/executive/widgets/StrategicForecastWidget';
import { RegionalMapWidget } from '@/components/executive/widgets/RegionalMapWidget';
import { ExecutiveTimelineWidget } from '@/components/executive/widgets/ExecutiveTimelineWidget';
import { PortfolioScorecardsWidget } from '@/components/executive/widgets/PortfolioScorecardsWidget';
import { MockIntelligenceWidget } from '@/components/executive/widgets/MockIntelligenceWidget';

export default function ExecutiveDashboard() {
  const { isWarRoomMode } = useExecutiveStore();

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] flex flex-col font-sans overflow-hidden">
      
      {/* TOP COMMAND BAR */}
      <ExecutiveCommandBar />

      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL */}
        {!isWarRoomMode && <PortfolioNavigator />}

        {/* CENTER FEED */}
        <div className={`flex-1 overflow-y-auto p-8 relative ${
          isWarRoomMode ? 'bg-[#000000]' : 'bg-[#121212]'
        }`}>
           
           <div className="max-w-7xl mx-auto space-y-8 pb-12">
             
             {/* 1. Health Index & Command Deck */}
             <PortfolioHealthWidget />

             {/* 2. Strategic Forecast Layer */}
             <StrategicForecastWidget />

             {/* 3 & 4. Occupancy & Risk (Mocks) */}
             <div className="grid grid-cols-2 gap-8">
               <MockIntelligenceWidget title="Occupancy Intelligence" type="Occupancy" />
               <MockIntelligenceWidget title="Risk Intelligence" type="Risk" />
             </div>

             {/* 5. Ecosystem Graph */}
             <MockIntelligenceWidget title="Portfolio Ecosystem Graph" type="Ecosystem" />

             {/* 6. Regional Intelligence Map */}
             <RegionalMapWidget />

             {/* 7 & 8. Construction & ESG */}
             <div className="grid grid-cols-2 gap-8">
               <MockIntelligenceWidget title="Construction Intelligence" type="Construction" />
               <MockIntelligenceWidget title="ESG & Sustainability" type="ESG" />
             </div>

             {/* 9. Scorecards */}
             <PortfolioScorecardsWidget />

             {/* 10. Live Timeline */}
             <ExecutiveTimelineWidget />

           </div>

        </div>

        {/* RIGHT PANEL - AI */}
        <ExecutiveCopilot />

      </div>

    </div>
  );
}
