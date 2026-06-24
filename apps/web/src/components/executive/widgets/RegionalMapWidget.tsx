'use client';

import { useExecutiveStore } from '@/store/executiveStore';
import { Map, AlertTriangle } from 'lucide-react';

export function RegionalMapWidget() {
  const { regions } = useExecutiveStore();

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Map size={20} className="text-brand-blue" />
          Regional Intelligence Map
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {regions.map(region => (
          <div key={region.id} className="bg-[#111111] border border-[#2A2A30] rounded-xl p-4 group hover:border-brand-blue/50 transition-colors cursor-pointer">
             <div className="flex justify-between items-start mb-4">
               <h3 className="text-xs font-bold text-white uppercase tracking-wider">{region.name}</h3>
               {region.riskLevel === 'High' && <AlertTriangle size={14} className="text-danger" />}
               {region.riskLevel === 'Medium' && <AlertTriangle size={14} className="text-warning" />}
             </div>
             
             <div className="space-y-2">
               <div className="flex justify-between items-center">
                 <span className="text-[10px] text-[#71717A]">Revenue</span>
                 <span className="text-sm font-bold text-white">₹{region.revenue} Cr</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-[10px] text-[#71717A]">Occupancy</span>
                 <span className="text-sm font-bold text-white">{region.occupancy}%</span>
               </div>
             </div>

             <div className="w-full h-1 bg-[#1A1A1A] rounded-full mt-4 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${region.riskLevel === 'High' ? 'bg-danger' : region.riskLevel === 'Medium' ? 'bg-warning' : 'bg-success'}`} 
                  style={{ width: `${region.occupancy}%` }}
                ></div>
             </div>
          </div>
        ))}
      </div>

      {/* Styled Mock Map */}
      <div className="w-full h-64 bg-[#111111] border border-[#2A2A30] rounded-xl relative overflow-hidden flex items-center justify-center group cursor-crosshair">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        
        {/* Abstract Region Polygons */}
        <svg className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 800 400">
           {/* West */}
           <polygon points="100,200 200,100 300,150 250,300 150,280" fill="rgba(79,132,255,0.1)" stroke="#4F84FF" strokeWidth="2" />
           <circle cx="200" cy="200" r="4" fill="#4F84FF" />
           
           {/* South */}
           <polygon points="350,250 450,200 500,300 400,380 300,320" fill="rgba(245,158,11,0.1)" stroke="#F59E0B" strokeWidth="2" />
           <circle cx="400" cy="280" r="4" fill="#F59E0B" />

           {/* North */}
           <polygon points="300,100 400,50 500,100 450,180 350,150" fill="rgba(245,158,11,0.1)" stroke="#F59E0B" strokeWidth="2" />
           <circle cx="400" cy="110" r="4" fill="#F59E0B" />

           {/* East */}
           <polygon points="550,150 650,100 750,200 650,300 500,250" fill="rgba(239,68,68,0.1)" stroke="#EF4444" strokeWidth="2" />
           <circle cx="600" cy="200" r="4" fill="#EF4444" />
        </svg>
      </div>

    </div>
  );
}
