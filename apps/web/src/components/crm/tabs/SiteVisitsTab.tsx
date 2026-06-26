'use client';

import { CalendarPlus, MapPin, Clock, User, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';


export function SiteVisitsTab() {
  return (
    <div className="p-8 space-y-6">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><CalendarPlus size={16} className="text-[#00E5FF]"/> Site Visit Schedule</h3>
        <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="text-[10px] text-[#00E5FF] uppercase font-bold px-3 py-1 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded hover:bg-[#00E5FF]/20 transition-colors">
          Schedule Visit
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        
        {/* Calendar Overview */}
        <div className="col-span-1 bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
           <h4 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest mb-6">Today's Overview</h4>
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">Scheduled</span>
                <span className="text-lg font-black text-brand-blue">14</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">Completed</span>
                <span className="text-lg font-black text-success">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">No-Shows</span>
                <span className="text-lg font-black text-danger">2</span>
              </div>
           </div>
           
           <div className="mt-8 pt-6 border-t border-[#2A2A30]">
             <h4 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest mb-4">Availability</h4>
             <div className="space-y-2">
               <div className="bg-[#111111] p-3 rounded flex justify-between border border-[#2A2A30]">
                 <span className="text-xs font-bold text-[#71717A]">Rahul Sharma</span>
                 <span className="text-xs font-bold text-success">Available 2PM+</span>
               </div>
               <div className="bg-[#111111] p-3 rounded flex justify-between border border-[#2A2A30]">
                 <span className="text-xs font-bold text-[#71717A]">Priya Patel</span>
                 <span className="text-xs font-bold text-warning">Fully Booked</span>
               </div>
             </div>
           </div>
        </div>

        {/* Visit List */}
        <div className="col-span-2 bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 flex flex-col">
          <h4 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest mb-6">Upcoming Visits</h4>
          
          <div className="flex-1 space-y-3">
            <div className="flex justify-between items-center p-4 bg-[#111111] border border-[#2A2A30] rounded-lg hover:border-[#3F3F46] transition-colors border-l-4 border-l-brand-blue">
              <div className="flex gap-4">
                <div className="flex flex-col items-center justify-center bg-[#1A1A1A] px-4 py-2 rounded border border-[#2A2A30]">
                  <span className="text-[10px] font-bold text-[#A1A1AA] uppercase">Tomorrow</span>
                  <span className="text-lg font-black text-white">14:00</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1">Vikram Singh</p>
                  <p className="text-[10px] text-[#71717A] flex items-center gap-1 mb-0.5"><MapPin size={10}/> Cyber City Phase 2 - Tower B</p>
                  <p className="text-[10px] text-[#71717A] flex items-center gap-1"><User size={10}/> Broker: Rahul Sharma</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-[9px] font-bold bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded border border-brand-blue/30 uppercase">Confirmed</span>
                <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="text-[10px] font-bold text-white bg-[#2A2A30] px-3 py-1.5 rounded hover:bg-[#3F3F46] transition-colors">Reschedule</button>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-[#111111] border border-[#2A2A30] rounded-lg hover:border-[#3F3F46] transition-colors border-l-4 border-l-success opacity-75">
              <div className="flex gap-4">
                <div className="flex flex-col items-center justify-center bg-[#1A1A1A] px-4 py-2 rounded border border-[#2A2A30]">
                  <span className="text-[10px] font-bold text-[#A1A1AA] uppercase">Today</span>
                  <span className="text-lg font-black text-white">09:15</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1">Anjali Desai</p>
                  <p className="text-[10px] text-[#71717A] flex items-center gap-1 mb-0.5"><MapPin size={10}/> Golf Course Extension - Villa 42</p>
                  <p className="text-[10px] text-[#71717A] flex items-center gap-1"><User size={10}/> Broker: Amit Kumar</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-[9px] font-bold bg-success/10 text-success px-2 py-0.5 rounded border border-success/30 uppercase flex items-center gap-1"><CheckCircle2 size={10}/> Completed</span>
                <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="text-[10px] font-bold text-brand-blue hover:underline">View Feedback</button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
