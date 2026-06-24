'use client';

import { useResidentStore } from '@/store/residentStore';
import { Clock } from 'lucide-react';

export function TimelineTab() {
  const { events, activeResidentId } = useResidentStore();
  const activeEvents = events.filter(e => e.residentId === activeResidentId);
  
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2">
        <Clock size={16} className="text-[#00E5FF]"/> Live Activity Feed
      </h3>
      
      {activeEvents.length > 0 ? (
        <div className="space-y-4 border-l-2 border-[#2A2A30] ml-4 pl-6 relative pt-2">
          {activeEvents.map(event => (
            <div key={event.id} className="relative bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 group hover:border-[#3F3F46] transition-colors">
               <div className="absolute -left-[35px] top-5 w-4 h-4 rounded-full bg-[#00E5FF] border-4 border-[#0A0C10] group-hover:bg-white transition-colors"></div>
               <div className="flex justify-between items-start mb-1">
                 <p className="text-xs font-bold text-white">{event.message}</p>
                 <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-[#2A2A30] bg-[#111111] text-[#A1A1AA] uppercase tracking-widest">{event.type}</span>
               </div>
               <p className="text-[10px] font-bold text-[#71717A]">{event.time}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center border border-dashed border-[#2A2A30] rounded-xl bg-[#1A1A1A]">
          <Clock size={32} className="mx-auto text-[#3F3F46] mb-4" />
          <p className="text-sm font-bold text-white mb-2">No Recent Activity</p>
          <p className="text-xs text-[#71717A]">Activity records will appear here.</p>
        </div>
      )}
    </div>
  );
}
