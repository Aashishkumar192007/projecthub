'use client';

import { useProjectStore } from '@/store/projectStore';
import { Map, Hammer, ClipboardCheck, Building2, PaintBucket, ShieldCheck, Key } from 'lucide-react';

export function MilestonesTab() {
  const { milestones, activeProjectId } = useProjectStore();
  
  if (!activeProjectId) return null;
  const activeMilestones = milestones.filter(m => m.projectId === activeProjectId);

  const stages = [
    { id: 'Land Acquisition', icon: Map, label: 'Land Acquisition' },
    { id: 'Planning', icon: ClipboardCheck, label: 'Planning' },
    { id: 'Approvals', icon: ShieldCheck, label: 'Approvals' },
    { id: 'Construction', icon: Hammer, label: 'Construction' },
    { id: 'Finishing', icon: PaintBucket, label: 'Finishing' },
    { id: 'QA/QC', icon: ShieldCheck, label: 'QA/QC' },
    { id: 'Handover', icon: Key, label: 'Handover' }
  ];

  return (
    <div className="p-8 space-y-10">
      
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8">
        <h3 className="text-lg font-bold text-white mb-10">Project Lifecycle Roadmap</h3>

        {/* Linear Style Roadmap Timeline */}
        <div className="relative">
          {/* Connecting Background Line */}
          <div className="absolute top-5 left-[5%] right-[5%] h-0.5 bg-[#2A2A30]"></div>
          
          <div className="relative flex justify-between">
            {stages.map((stage) => {
              const milestone = activeMilestones.find(m => m.stage === stage.id);
              const status = milestone?.status || 'Pending';
              
              const isCompleted = status === 'Completed';
              const isActive = status === 'Active';
              const isDelayed = status === 'Delayed';
              
              return (
                <div key={stage.id} className="flex flex-col items-center gap-3 w-20 relative group">
                  
                  {/* Connecting Progress Line Segment */}
                  {isCompleted && (
                    <div className="absolute top-5 left-1/2 w-full h-0.5 bg-brand-blue -z-10 shadow-[0_0_10px_rgba(79,132,255,0.5)]"></div>
                  )}

                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 ${
                    isActive ? 'bg-[#1A2533] border-brand-blue text-brand-blue scale-110 shadow-[0_0_15px_rgba(79,132,255,0.3)]' : 
                    isDelayed ? 'bg-danger/20 border-danger text-danger scale-110 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse' :
                    isCompleted ? 'bg-brand-blue border-brand-blue text-white' : 'bg-[#161616] border-[#3F3F46] text-[#71717A]'
                  }`}>
                    <stage.icon size={16} />
                  </div>
                  
                  <span className={`text-[10px] font-bold text-center ${
                    isActive ? 'text-brand-blue' : isDelayed ? 'text-danger' : isCompleted ? 'text-white' : 'text-[#71717A]'
                  }`}>
                    {stage.label}
                  </span>
                  
                  <span className="text-[9px] text-[#71717A] text-center mt-1">
                    {milestone?.date || 'TBD'}
                  </span>

                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
