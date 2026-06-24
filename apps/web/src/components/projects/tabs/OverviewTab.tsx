'use client';

import { useProjectStore } from '@/store/projectStore';
import { Users, Truck, HardHat, Store, Activity, AlertTriangle } from 'lucide-react';

export function OverviewTab() {
  const { projects, activeProjectId } = useProjectStore();
  
  if (!activeProjectId) return null;
  const activeProject = projects.find(p => p.id === activeProjectId);
  if (!activeProject) return null;

  return (
    <div className="p-8 space-y-6">
      
      {/* Resource Command Center Widget */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 flex items-center justify-between hover:border-brand-blue/50 transition-colors">
           <div>
             <div className="flex items-center gap-2 mb-2">
               <Users size={12} className="text-[#A1A1AA]" />
               <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Site Labor</span>
             </div>
             <p className="text-2xl font-black text-white">{activeProject.resources.labor}</p>
           </div>
           <div className="w-12 h-12 rounded-full bg-[#111111] border border-[#2A2A30] flex items-center justify-center">
             <span className="text-xs font-bold text-success">+12%</span>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 flex items-center justify-between hover:border-brand-blue/50 transition-colors">
           <div>
             <div className="flex items-center gap-2 mb-2">
               <Truck size={12} className="text-[#A1A1AA]" />
               <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Equipment</span>
             </div>
             <p className="text-2xl font-black text-white">{activeProject.resources.equipment}</p>
           </div>
           <div className="w-12 h-12 rounded-full bg-[#111111] border border-[#2A2A30] flex items-center justify-center">
             <span className="text-xs font-bold text-[#71717A]">Idle 2</span>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 flex items-center justify-between hover:border-brand-blue/50 transition-colors">
           <div>
             <div className="flex items-center gap-2 mb-2">
               <HardHat size={12} className="text-[#A1A1AA]" />
               <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Contractors</span>
             </div>
             <p className="text-2xl font-black text-white">{activeProject.resources.contractors}</p>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 flex items-center justify-between hover:border-brand-blue/50 transition-colors">
           <div>
             <div className="flex items-center gap-2 mb-2">
               <Store size={12} className="text-[#A1A1AA]" />
               <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Vendors</span>
             </div>
             <p className="text-2xl font-black text-white">{activeProject.resources.vendors}</p>
           </div>
        </div>
      </div>

      {/* Progress & Health */}
      <div className="grid grid-cols-2 gap-6">
        
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
           <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest mb-6 flex items-center gap-2">
             <Activity size={14} className="text-brand-blue" /> Project Progress
           </h3>
           
           <div className="space-y-6">
             <div>
               <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-bold text-white">Completion</span>
                 <span className="text-xs font-bold text-brand-blue">{activeProject.completionPercentage}%</span>
               </div>
               <div className="w-full h-2 bg-[#111111] rounded-full overflow-hidden border border-[#2A2A30]">
                  <div className="h-full bg-brand-blue" style={{ width: `${activeProject.completionPercentage}%` }}></div>
               </div>
             </div>

             <div>
               <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-bold text-white">Budget Utilization</span>
                 <span className="text-xs font-bold text-warning">{activeProject.budgetUtilization}%</span>
               </div>
               <div className="w-full h-2 bg-[#111111] rounded-full overflow-hidden border border-[#2A2A30]">
                  <div className="h-full bg-warning" style={{ width: `${activeProject.budgetUtilization}%` }}></div>
               </div>
             </div>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
           <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest mb-6 flex items-center gap-2">
             <AlertTriangle size={14} className="text-danger" /> Open Risks
           </h3>
           <div className="space-y-4">
             {activeProject.escalations.map(esc => (
               <div key={esc.id} className="flex items-start gap-3 p-3 bg-[#111111] border border-[#2A2A30] rounded-lg">
                 <div className="w-2 h-2 rounded-full bg-danger mt-1.5 shrink-0"></div>
                 <div>
                   <p className="text-xs font-bold text-white">{esc.title}</p>
                   <p className="text-[10px] text-[#A1A1AA] mt-0.5">Impact: {esc.metric}</p>
                 </div>
               </div>
             ))}
             {activeProject.escalations.length === 0 && (
               <p className="text-xs text-[#71717A]">No open risks detected.</p>
             )}
           </div>
        </div>

      </div>

    </div>
  );
}
