'use client';

import { useResidentStore } from '@/store/residentStore';
import { Bot, Sparkles, BellRing, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

export function ResidentAssistant() {
  const { residents, activeResidentId } = useResidentStore();
  
  if (!activeResidentId) return null;
  const activeResident = residents.find(r => r.id === activeResidentId);
  if (!activeResident) return null;

  return (
    <div className="w-80 border-l border-[#2A2A30] bg-[#111111] h-full flex flex-col shrink-0 overflow-y-auto z-10">
      
      {/* Header */}
      <div className="p-5 border-b border-[#2A2A30] bg-[#161616] flex items-center gap-3 sticky top-0 z-10">
        <div className="w-8 h-8 rounded-full bg-[linear-gradient(45deg,#00E5FF,#0066FF)] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]">
          <Bot size={16} className="text-[#0A0C10]" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">AI Assistant <Sparkles size={12} className="text-[#00E5FF]"/></h2>
          <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-bold">Personalized Suggestions</p>
        </div>
      </div>

      <div className="p-5 space-y-6">
        
        {/* Urgent Recommendations */}
        <div>
          <p className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase mb-3 flex items-center gap-2">
            <BellRing size={12} className="text-brand-blue" /> Smart Alerts
          </p>
          <div className="space-y-3">
            {activeResident.recommendations.length > 0 ? (
              activeResident.recommendations.map((rec) => (
                <div key={rec.id} className={`bg-[#1A1A1A] border rounded-xl p-4 relative overflow-hidden group ${
                  rec.isUrgent ? 'border-danger/30' : 'border-[#2A2A30] hover:border-[#3F3F46]'
                }`}>
                  {rec.isUrgent && (
                    <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-danger/10 blur-[20px] pointer-events-none group-hover:bg-danger/20 transition-colors"></div>
                  )}
                  
                  <div className="flex items-start gap-3 mb-3">
                    <div className="mt-0.5">
                      {rec.type === 'Alert' ? <ShieldAlert size={14} className="text-danger" /> :
                       rec.type === 'Suggestion' ? <Sparkles size={14} className="text-[#00E5FF]" /> :
                       <BellRing size={14} className="text-brand-blue" />}
                    </div>
                    <p className={`text-sm font-bold ${rec.isUrgent ? 'text-white' : 'text-[#E4E4E7]'}`}>
                      {rec.message}
                    </p>
                  </div>

                  {rec.actionLabel && (
                    <button className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-[10px] font-bold ${
                      rec.isUrgent 
                        ? 'bg-danger/10 hover:bg-danger/20 text-danger border border-danger/30' 
                        : 'bg-[#111111] hover:bg-[#1E1E22] text-white border border-[#3F3F46]'
                    }`}>
                      <span>{rec.actionLabel}</span>
                      <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 text-center">
                <CheckCircle2 size={24} className="mx-auto text-success mb-2 opacity-50" />
                <p className="text-xs font-bold text-success">You're all caught up!</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="pt-4 border-t border-[#2A2A30]">
           <p className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-3">Common Actions</p>
           <div className="grid grid-cols-2 gap-2">
             <button className="p-3 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] rounded-lg text-left transition-colors">
               <p className="text-xs font-bold text-white">Book Pool</p>
               <p className="text-[9px] text-[#71717A] mt-1">Available at 6PM</p>
             </button>
             <button className="p-3 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] rounded-lg text-left transition-colors">
               <p className="text-xs font-bold text-white">Marketplace</p>
               <p className="text-[9px] text-[#71717A] mt-1">2 New Items</p>
             </button>
             <button className="p-3 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] rounded-lg text-left transition-colors">
               <p className="text-xs font-bold text-white">Help Desk</p>
               <p className="text-[9px] text-[#71717A] mt-1">SLA: 2 Hours</p>
             </button>
             <button className="p-3 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] rounded-lg text-left transition-colors">
               <p className="text-xs font-bold text-white">My Visitors</p>
               <p className="text-[9px] text-[#71717A] mt-1">Generate Gate Pass</p>
             </button>
           </div>
        </div>

      </div>
    </div>
  );
}
