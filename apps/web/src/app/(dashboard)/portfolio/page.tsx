'use client';

import { useState } from 'react';
import { PropertyHierarchy } from '@/components/properties/PropertyHierarchy';
import { GeographicMap } from '@/components/explorer/GeographicMap';
import { DigitalTwin } from '@/components/explorer/DigitalTwin';
import { RelationshipGraph } from '@/components/explorer/RelationshipGraph';
import { FloorPlanViewer } from '@/components/explorer/FloorPlanViewer';
import { ExplorerContextPanel } from '@/components/explorer/ExplorerContextPanel';
import { Map, Layers, Network, Box } from 'lucide-react';

export default function VisualExplorerPage() {
  const [activeEngine, setActiveEngine] = useState<'map' | 'twin' | 'graph' | 'floorplan'>('twin');

  return (
    <div className="w-full h-full bg-[#0A0C10] overflow-hidden flex font-sans">
      
      {/* Reusing the exact same Hierarchy tree from Property Workspace */}
      <PropertyHierarchy />

      {/* Main Visual Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#121212]">
        
        {/* Top Visual Engine Toolbar */}
        <div className="h-16 border-b border-[#2A2A30] bg-[#161616] flex items-center justify-center gap-2 px-6 z-20 shrink-0 shadow-lg">
           <button 
             onClick={() => setActiveEngine('map')}
             className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold transition-all ${activeEngine === 'map' ? 'bg-[#1A2533] text-brand-blue border border-brand-blue/30 shadow-[0_0_15px_rgba(79,132,255,0.1)]' : 'text-[#A1A1AA] hover:text-white hover:bg-[#1E1E22]'}`}
           >
             <Map size={16} /> Geographic Map
           </button>
           <button 
             onClick={() => setActiveEngine('twin')}
             className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold transition-all ${activeEngine === 'twin' ? 'bg-[#1A2533] text-brand-blue border border-brand-blue/30 shadow-[0_0_15px_rgba(79,132,255,0.1)]' : 'text-[#A1A1AA] hover:text-white hover:bg-[#1E1E22]'}`}
           >
             <Layers size={16} /> Digital Twin
           </button>
           <button 
             onClick={() => setActiveEngine('graph')}
             className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold transition-all ${activeEngine === 'graph' ? 'bg-[#1A2533] text-brand-blue border border-brand-blue/30 shadow-[0_0_15px_rgba(79,132,255,0.1)]' : 'text-[#A1A1AA] hover:text-white hover:bg-[#1E1E22]'}`}
           >
             <Network size={16} /> Relationship Graph
           </button>
           <button 
             onClick={() => setActiveEngine('floorplan')}
             className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold transition-all ${activeEngine === 'floorplan' ? 'bg-[#1A2533] text-brand-blue border border-brand-blue/30 shadow-[0_0_15px_rgba(79,132,255,0.1)]' : 'text-[#A1A1AA] hover:text-white hover:bg-[#1E1E22]'}`}
           >
             <Box size={16} /> Floor Plan
           </button>
        </div>
        
        {/* Active Engine Render Area */}
        <div className="flex-1 relative">
           {activeEngine === 'map' && <GeographicMap />}
           {activeEngine === 'twin' && <DigitalTwin />}
           {activeEngine === 'graph' && <RelationshipGraph />}
           {activeEngine === 'floorplan' && <FloorPlanViewer />}
        </div>
      </div>

      {/* Right Context Drawer */}
      <ExplorerContextPanel />
      
    </div>
  );
}
