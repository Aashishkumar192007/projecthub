'use client';

import { useFacilityStore } from '@/store/facilityStore';
import { MapPin, Building2, Plus, Calendar, FileText, Settings, ShieldCheck, Activity } from 'lucide-react';

export function FacilityHeader() {
  const { facilities, activeFacilityId, assets } = useFacilityStore();
  
  if (!activeFacilityId) return null;
  const activeFacility = facilities.find(f => f.id === activeFacilityId);
  if (!activeFacility) return null;

  const facilityAssetsCount = assets.filter(a => a.facilityId === activeFacilityId).length;

  return (
    <div className="bg-[#161616] border-b border-[#2A2A30] p-8 shrink-0 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex items-start justify-between relative z-10">
        
        {/* Facility Info */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-[#1A1A1A] border-2 border-[#2A2A30] shadow-2xl flex items-center justify-center relative">
            <Building2 size={32} className="text-[#00E5FF]" />
            {/* Health Dot */}
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#161616] ${
              activeFacility.healthScore >= 90 ? 'bg-success' : 
              activeFacility.healthScore >= 70 ? 'bg-warning' : 'bg-danger'
            }`}></div>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-white tracking-tight">{activeFacility.name}</h1>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border bg-[#2A2A30] text-[#A1A1AA] border-[#3F3F46]`}>
                {activeFacility.type}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-bold text-[#71717A] mt-2">
              <span className="flex items-center gap-1.5"><MapPin size={12}/> {activeFacility.campus} • {activeFacility.location}</span>
              <span className="flex items-center gap-1.5"><Settings size={12}/> {facilityAssetsCount} Core Assets</span>
              <span className="flex items-center gap-1.5"><Activity size={12}/> {activeFacility.healthScore}/100 Health</span>
            </div>
          </div>
        </div>

        {/* Quick Actions (Command Center Widget) */}
        <div className="flex flex-col items-end gap-3">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <Plus size={12} /> Work Order
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <ShieldCheck size={12} /> Inspection
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <Calendar size={12} /> Book Facility
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A2533] hover:bg-[#1E2D40] border border-brand-blue/30 rounded text-[11px] font-bold text-brand-blue transition-colors shadow-[0_0_10px_rgba(79,132,255,0.1)]">
              <FileText size={12} /> Report
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
