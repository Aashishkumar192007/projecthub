'use client';

import { useInvestorStore } from '@/store/investorStore';
import { Clock, Landmark, ArrowRightLeft, FileText, Briefcase } from 'lucide-react';

export function TimelineTab() {
  const { events, activeInvestorId } = useInvestorStore();
  const activeEvents = events.filter(e => e.investorId === activeInvestorId);
  
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'Capital Call': return <Briefcase size={14} className="text-warning" />;
      case 'Distribution': return <ArrowRightLeft size={14} className="text-success" />;
      case 'Acquisition': return <Landmark size={14} className="text-brand-blue" />;
      case 'Report': return <FileText size={14} className="text-[#A1A1AA]" />;
      default: return <Clock size={14} className="text-[#00E5FF]" />;
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2">
        <Clock size={16} className="text-[#00E5FF]"/> Investment Activity Ledger
      </h3>
      
      {activeEvents.length > 0 ? (
        <div className="space-y-4 border-l-2 border-[#2A2A30] ml-4 pl-6 relative pt-2">
          {activeEvents.map(event => (
            <div key={event.id} className="relative bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-5 group hover:border-[#3F3F46] transition-colors">
               <div className="absolute -left-[35px] top-6 w-4 h-4 rounded-full bg-[#2A2A30] border-4 border-[#0A0C10] group-hover:bg-[#00E5FF] transition-colors"></div>
               
               <div className="flex justify-between items-start mb-2">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded bg-[#111111] border border-[#2A2A30] flex items-center justify-center">
                     {getEventIcon(event.type)}
                   </div>
                   <div>
                     <p className="text-sm font-bold text-white">{event.message}</p>
                     <p className="text-[10px] font-bold text-[#71717A] mt-0.5">{event.date}</p>
                   </div>
                 </div>
                 
                 <div className="flex flex-col items-end gap-2">
                   <span className="text-[9px] font-bold px-2 py-0.5 rounded border border-[#2A2A30] bg-[#111111] text-[#A1A1AA] uppercase tracking-widest">{event.type}</span>
                   {event.amount && (
                     <span className={`text-sm font-black ${event.type === 'Distribution' ? 'text-success' : 'text-warning'}`}>
                       {event.type === 'Distribution' ? '+' : '-'}${event.amount}M
                     </span>
                   )}
                 </div>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center border border-dashed border-[#2A2A30] rounded-xl bg-[#1A1A1A]">
          <Clock size={32} className="mx-auto text-[#3F3F46] mb-4" />
          <p className="text-sm font-bold text-white mb-2">No Recent Ledger Activity</p>
          <p className="text-xs text-[#71717A]">Capital events and acquisitions will appear here.</p>
        </div>
      )}
    </div>
  );
}
