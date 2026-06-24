'use client';

import { useProjectStore } from '@/store/projectStore';
import { Clock, HardHat, FileText, ShoppingCart, ShieldCheck, Wrench, CheckCircle2 } from 'lucide-react';

export function TimelineTab() {
  const { events, activeProjectId } = useProjectStore();
  
  if (!activeProjectId) return null;
  const activeEvents = events.filter(e => e.projectId === activeProjectId);

  const getIcon = (type: string) => {
    switch(type) {
      case 'DPR': return <FileText size={14} className="text-brand-blue" />;
      case 'Safety': return <ShieldCheck size={14} className="text-success" />;
      case 'Procurement': return <ShoppingCart size={14} className="text-warning" />;
      case 'Snag': return <Wrench size={14} className="text-danger" />;
      default: return <Clock size={14} className="text-[#A1A1AA]" />;
    }
  };

  return (
    <div className="p-8 space-y-6">
      
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><Clock size={16} className="text-brand-blue"/> Complete Activity Feed</h3>
        <span className="text-[10px] text-[#71717A] uppercase tracking-widest font-bold">Today</span>
      </div>

      <div className="relative border-l-2 border-[#2A2A30] ml-4 pl-8 space-y-8">
        
        {activeEvents.map((event) => (
          <div key={event.id} className="relative">
            {/* Timeline Dot */}
            <div className="absolute -left-[41px] top-1 w-8 h-8 rounded-full bg-[#161616] border-2 border-[#2A2A30] flex items-center justify-center">
              {getIcon(event.type)}
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 hover:border-brand-blue/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                  event.type === 'DPR' ? 'border-brand-blue/30 text-brand-blue bg-brand-blue/10' :
                  event.type === 'Safety' ? 'border-success/30 text-success bg-success/10' :
                  event.type === 'Procurement' ? 'border-warning/30 text-warning bg-warning/10' :
                  'border-danger/30 text-danger bg-danger/10'
                }`}>
                  {event.type}
                </span>
                <span className="text-[10px] font-bold text-[#A1A1AA] flex items-center gap-1.5">
                  <Clock size={12} className="text-[#71717A]"/> {event.time}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                 {event.message}
                 {event.type === 'Safety' && <CheckCircle2 size={14} className="text-success" />}
              </h4>
            </div>
          </div>
        ))}

        {activeEvents.length === 0 && (
          <p className="text-xs text-[#71717A]">No recent activity found for this project.</p>
        )}

      </div>

    </div>
  );
}
