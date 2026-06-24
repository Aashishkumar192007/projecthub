'use client';

import { useFacilityStore } from '@/store/facilityStore';
import { Activity, ShieldAlert, Wrench, Zap, Users, AlertTriangle, ArrowRight, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export function OverviewTab() {
  const { facilities, activeFacilityId } = useFacilityStore();
  
  if (!activeFacilityId) return null;
  const activeFacility = facilities.find(f => f.id === activeFacilityId);
  if (!activeFacility) return null;

  return (
    <div className="p-8 space-y-6">
      
      {/* Top KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-[#00E5FF]/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <Activity size={14} className="text-[#00E5FF]" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Facility Health</span>
           </div>
           <div className="flex items-end gap-2">
             <p className={`text-4xl font-black ${
                activeFacility.healthScore >= 90 ? 'text-success' : 
                activeFacility.healthScore >= 70 ? 'text-warning' : 'text-danger'
             }`}>{activeFacility.healthScore}</p>
             <span className="text-sm font-bold text-[#71717A] mb-1">/ 100</span>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-warning/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <Wrench size={14} className="text-warning" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Open Work Orders</span>
           </div>
           <p className="text-4xl font-black text-white">{activeFacility.openWorkOrders}</p>
           <div className="flex items-center gap-1.5 mt-2">
             <span className="text-[10px] font-bold text-warning flex items-center gap-1"><ArrowUpRight size={10}/> +4 today</span>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-[#00E5FF]/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <Users size={14} className="text-[#00E5FF]" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Occupancy</span>
           </div>
           <p className="text-4xl font-black text-white">{activeFacility.occupancy}%</p>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-danger/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <Zap size={14} className="text-danger" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Energy Variance</span>
           </div>
           <p className="text-4xl font-black text-danger">{activeFacility.energyUsageVariance > 0 ? '+' : ''}{activeFacility.energyUsageVariance}%</p>
           <div className="flex items-center gap-1.5 mt-2">
             <span className="text-[10px] font-bold text-[#A1A1AA]">Vs Baseline</span>
           </div>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* Active Escalations */}
        <div className="col-span-2 bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
           <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest mb-6 flex items-center gap-2">
             <ShieldAlert size={14} className="text-danger" /> Critical Operations
           </h3>
           
           <div className="space-y-4">
             {activeFacility.escalations.map(esc => (
               <div key={esc.id} className="flex items-start justify-between p-4 bg-[#111111] border border-[#2A2A30] rounded-lg group hover:border-danger/30 transition-colors">
                 <div className="flex items-start gap-3">
                   <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${esc.severity === 'Critical' ? 'bg-danger animate-pulse' : 'bg-warning'}`}></div>
                   <div>
                     <p className="text-sm font-bold text-white">{esc.title}</p>
                     <p className="text-xs text-[#A1A1AA] mt-1">{esc.reason} <span className={`font-bold ${esc.severity === 'Critical' ? 'text-danger' : 'text-warning'}`}>({esc.metric})</span></p>
                   </div>
                 </div>
                 <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[10px] font-bold text-white transition-colors">
                   {esc.action} <ArrowRight size={12} className="text-[#00E5FF]" />
                 </button>
               </div>
             ))}
             {activeFacility.escalations.length === 0 && (
               <div className="p-8 text-center border border-dashed border-[#2A2A30] rounded-lg">
                 <p className="text-xs font-bold text-success">All critical operations normal.</p>
               </div>
             )}
           </div>
        </div>

        {/* Maintenance Backlog Widget */}
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 flex flex-col justify-between">
           <div>
             <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest mb-6 flex items-center gap-2">
               <Wrench size={14} className="text-warning" /> Maintenance Backlog
             </h3>
             <div className="text-center py-6">
               <p className="text-6xl font-black text-warning mb-2">{activeFacility.maintenanceBacklog}</p>
               <p className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">Overdue Tasks</p>
             </div>
           </div>
           
           {activeFacility.maintenanceBacklog > 0 && (
             <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-warning/10 hover:bg-warning/20 border border-warning/30 rounded-lg text-xs font-bold text-warning transition-colors">
               Dispatch Engineering Team
             </button>
           )}
        </div>

      </div>

    </div>
  );
}
