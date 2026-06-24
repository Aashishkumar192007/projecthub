'use client';

import { useProjectStore } from '@/store/projectStore';
import { AlertTriangle, CheckCircle2, Navigation, Activity } from 'lucide-react';

export function SiteViewTab() {
  const { projects, activeProjectId } = useProjectStore();
  
  if (!activeProjectId) return null;
  const activeProject = projects.find(p => p.id === activeProjectId);

  // Mock site assets
  const siteAssets = [
    { id: 't-a', name: 'Tower A', type: 'Residential', progress: 95, risk: 'Low', coordinates: { top: '30%', left: '20%' } },
    { id: 't-b', name: 'Tower B', type: 'Residential', progress: 45, risk: 'High', coordinates: { top: '50%', left: '50%' } },
    { id: 'c-1', name: 'Clubhouse', type: 'Amenity', progress: 10, risk: 'Medium', coordinates: { top: '70%', left: '30%' } },
    { id: 'p-1', name: 'Underground Parking', type: 'Infrastructure', progress: 100, risk: 'Low', coordinates: { top: '20%', left: '70%' } },
  ];

  return (
    <div className="p-8 h-full flex flex-col">
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Navigation size={20} className="text-brand-blue" />
          Construction Digital Twin
        </h3>
        <span className="flex items-center gap-2 text-xs font-bold text-success uppercase tracking-widest">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div> Live Telemetry
        </span>
      </div>

      <div className="relative w-full flex-1 bg-[#0A0C10] overflow-hidden flex items-center justify-center rounded-xl border border-[#2A2A30] min-h-[500px]">
        {/* Abstract Grid Map Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.02)_2px,transparent_2px)] bg-[size:50px_50px] pointer-events-none"></div>

        {/* Site Layout Polygons */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 1000 600">
          <rect x="150" y="150" width="200" height="150" fill="none" stroke="#3F3F46" strokeWidth="2" strokeDasharray="5,5" />
          <rect x="450" y="250" width="200" height="150" fill="none" stroke="#3F3F46" strokeWidth="2" strokeDasharray="5,5" />
          <rect x="250" y="400" width="150" height="100" fill="none" stroke="#3F3F46" strokeWidth="2" strokeDasharray="5,5" />
          <rect x="650" y="100" width="250" height="200" fill="none" stroke="#3F3F46" strokeWidth="2" strokeDasharray="5,5" />
        </svg>

        {/* Overlay Assets */}
        {siteAssets.map(asset => (
          <div 
            key={asset.id} 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-crosshair z-10"
            style={{ top: asset.coordinates.top, left: asset.coordinates.left }}
          >
            {/* Pulsing indicator based on risk */}
            <div className={`absolute -inset-4 rounded-full opacity-20 group-hover:opacity-40 transition-opacity animate-pulse ${
              asset.risk === 'High' ? 'bg-danger' : asset.risk === 'Medium' ? 'bg-warning' : 'bg-brand-blue'
            }`}></div>

            <div className={`relative w-12 h-12 rounded-lg border-2 flex items-center justify-center bg-[#1A1A1A] shadow-xl transition-transform group-hover:scale-110 ${
              asset.risk === 'High' ? 'border-danger text-danger' : 
              asset.risk === 'Medium' ? 'border-warning text-warning' : 
              'border-brand-blue text-brand-blue'
            }`}>
               {asset.progress === 100 ? <CheckCircle2 size={20} className="text-success" /> : <Activity size={20} />}
            </div>

            {/* Hover Tooltip */}
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-48 bg-[#161616] border border-[#2A2A30] rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl z-20">
               <div className="flex justify-between items-start mb-2">
                 <h4 className="text-xs font-bold text-white uppercase">{asset.name}</h4>
                 {asset.risk === 'High' && <AlertTriangle size={12} className="text-danger" />}
               </div>
               <p className="text-[10px] text-[#A1A1AA] mb-3">{asset.type}</p>
               
               <div className="space-y-1.5">
                 <div className="flex justify-between items-center text-[10px]">
                   <span className="text-[#71717A]">Progress</span>
                   <span className={`font-bold ${asset.progress === 100 ? 'text-success' : 'text-white'}`}>{asset.progress}%</span>
                 </div>
                 <div className="w-full h-1 bg-[#111111] rounded-full overflow-hidden">
                    <div className={`h-full ${asset.progress === 100 ? 'bg-success' : 'bg-brand-blue'}`} style={{ width: `${asset.progress}%` }}></div>
                 </div>
               </div>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
