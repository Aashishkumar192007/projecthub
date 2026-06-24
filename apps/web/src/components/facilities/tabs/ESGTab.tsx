'use client';

import { useFacilityStore } from '@/store/facilityStore';
import { Globe, Leaf, Droplets, Trash2, TrendingDown, Award } from 'lucide-react';

export function ESGTab() {
  const { facilities, activeFacilityId } = useFacilityStore();
  
  if (!activeFacilityId) return null;
  const activeFacility = facilities.find(f => f.id === activeFacilityId);
  if (!activeFacility) return null;

  return (
    <div className="p-8 space-y-8">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><Globe size={16} className="text-[#00E5FF]"/> Sustainability Intelligence</h3>
        <span className="text-[10px] text-[#A1A1AA] uppercase font-bold px-3 py-1 bg-[#1A1A1A] border border-[#2A2A30] rounded-lg">
          Monthly Aggregation
        </span>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
           <div className="flex items-center justify-between mb-4">
             <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center border border-success/30">
               <Award size={18} className="text-success" />
             </div>
             <span className="text-[10px] font-bold text-success uppercase px-2 py-0.5 rounded bg-success/10 border border-success/20">Platinum</span>
           </div>
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">ESG Rating</p>
           <p className="text-2xl font-black text-white">94<span className="text-sm text-[#71717A]">/100</span></p>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
           <div className="flex items-center gap-2 mb-4">
             <Leaf size={14} className="text-[#00E5FF]" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Carbon Footprint</span>
           </div>
           <p className="text-2xl font-black text-white">12.4 <span className="text-sm font-bold text-[#71717A]">tCO2e</span></p>
           <div className="flex items-center gap-1.5 mt-2">
             <span className="text-[10px] font-bold text-success flex items-center gap-1"><TrendingDown size={10}/> -4.2% Trend</span>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
           <div className="flex items-center gap-2 mb-4">
             <Droplets size={14} className="text-brand-blue" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Water Usage</span>
           </div>
           <p className="text-2xl font-black text-white">840 <span className="text-sm font-bold text-[#71717A]">kL</span></p>
           <div className="flex items-center gap-1.5 mt-2">
             <span className="text-[10px] font-bold text-success flex items-center gap-1"><TrendingDown size={10}/> -1.8% Trend</span>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
           <div className="flex items-center gap-2 mb-4">
             <Trash2 size={14} className="text-warning" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Waste Diversion</span>
           </div>
           <p className="text-2xl font-black text-white">88%</p>
           <div className="flex items-center gap-1.5 mt-2">
             <span className="text-[10px] font-bold text-[#A1A1AA]">Recycled or Composted</span>
           </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-64 flex items-center justify-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50"></div>
         <div className="text-center z-10">
           <h4 className="text-sm font-bold text-white mb-2">Monthly Environmental Trends</h4>
           <p className="text-xs text-[#71717A] max-w-sm mx-auto">This module integrates with the ESG Data Engine. Advanced charting visualizations are scheduled for Phase 4 deployment.</p>
         </div>
      </div>

    </div>
  );
}
