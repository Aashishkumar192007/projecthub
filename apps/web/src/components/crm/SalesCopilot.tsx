'use client';

import { useCrmStore } from '@/store/crmStore';
import { Bot, Sparkles, TrendingUp, AlertTriangle, ArrowRight, Target, ShieldAlert, CheckCircle2 } from 'lucide-react';

export function SalesCopilot() {
  const { entities, activeEntityId } = useCrmStore();
  
  if (!activeEntityId) return null;
  const activeEntity = entities.find(r => r.id === activeEntityId);
  if (!activeEntity) return null;

  return (
    <div className="w-80 border-l border-[#2A2A30] bg-[#111111] h-full flex flex-col shrink-0 overflow-y-auto z-10">
      
      {/* Header */}
      <div className="p-5 border-b border-[#2A2A30] bg-[#161616] flex items-center gap-3 sticky top-0 z-10">
        <div className="w-8 h-8 rounded bg-[#1A1A1A] border border-[#2A2A30] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(0,229,255,0.1),transparent)]"></div>
          <Bot size={16} className="text-[#00E5FF] relative z-10" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">Sales Copilot <Sparkles size={12} className="text-[#00E5FF]"/></h2>
          <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-bold">Deal Intelligence</p>
        </div>
      </div>

      <div className="p-5 space-y-6">
        
        {/* Deal Health Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-lg p-3">
            <p className="text-[9px] text-[#A1A1AA] font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
              <Target size={10} className="text-[#00E5FF]"/> Probability
            </p>
            <p className={`text-2xl font-black ${
              activeEntity.probability >= 80 ? 'text-success' : 
              activeEntity.probability >= 40 ? 'text-warning' : 'text-danger'
            }`}>{activeEntity.probability}%</p>
          </div>
          <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-lg p-3">
            <p className="text-[9px] text-[#A1A1AA] font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
              <ShieldAlert size={10} className={
                activeEntity.probability >= 80 ? 'text-success' : 
                activeEntity.probability >= 40 ? 'text-warning' : 'text-danger'
              }/> Deal Risk
            </p>
            <p className={`text-sm font-black mt-2 uppercase ${
              activeEntity.probability >= 80 ? 'text-success' : 
              activeEntity.probability >= 40 ? 'text-warning' : 'text-danger'
            }`}>
              {activeEntity.probability >= 80 ? 'Low' : activeEntity.probability >= 40 ? 'Moderate' : 'High'}
            </p>
          </div>
        </div>

        {/* AI Insights */}
        <div>
          <p className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase mb-3 flex items-center gap-2">
            <Bot size={12} className="text-[#00E5FF]" /> Recommended Actions
          </p>
          <div className="space-y-3">
            {activeEntity.insights.length > 0 ? (
              activeEntity.insights.map((insight) => (
                <div key={insight.id} className={`bg-[#1A1A1A] border rounded-xl p-4 relative overflow-hidden group ${
                  insight.isUrgent ? 'border-danger/30' : 'border-[#2A2A30] hover:border-[#3F3F46]'
                }`}>
                  {insight.isUrgent && (
                    <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-danger/10 blur-[20px] pointer-events-none group-hover:bg-danger/20 transition-colors"></div>
                  )}
                  
                  <div className="flex justify-between items-start mb-2">
                     <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                       insight.type === 'Action' ? 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30' :
                       insight.type === 'Forecast' ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/30' :
                       insight.type === 'Risk' ? 'bg-danger/10 text-danger border-danger/30' :
                       'bg-[#2A2A30] text-[#E4E4E7] border-[#3F3F46]'
                     }`}>
                       {insight.type}
                     </span>
                     {insight.metric && (
                       <span className="text-[10px] font-black text-white">{insight.metric}</span>
                     )}
                  </div>

                  <div className="flex items-start gap-3 mb-3 mt-3">
                    <p className={`text-xs font-bold leading-relaxed ${insight.isUrgent ? 'text-white' : 'text-[#A1A1AA]'}`}>
                      {insight.message}
                    </p>
                  </div>

                  {insight.actionLabel && (
                    <button className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-[10px] font-bold ${
                      insight.isUrgent 
                        ? 'bg-danger/10 hover:bg-danger/20 text-danger border border-danger/30' 
                        : 'bg-[#111111] hover:bg-[#1E1E22] text-white border border-[#3F3F46]'
                    }`}>
                      <span>{insight.actionLabel}</span>
                      <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 text-center">
                <CheckCircle2 size={24} className="mx-auto text-success mb-2 opacity-50" />
                <p className="text-xs font-bold text-success">Deal is on track.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Follow-ups */}
        <div className="pt-4 border-t border-[#2A2A30]">
           <p className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-3">Quick Follow-Up</p>
           <div className="grid grid-cols-2 gap-2">
             <button className="p-3 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] rounded-lg text-left transition-colors">
               <p className="text-xs font-bold text-white">Call Lead</p>
               <p className="text-[9px] text-[#71717A] mt-1">Log Activity</p>
             </button>
             <button className="p-3 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] rounded-lg text-left transition-colors">
               <p className="text-xs font-bold text-white">Email</p>
               <p className="text-[9px] text-[#71717A] mt-1">Send Brochure</p>
             </button>
             <button className="p-3 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] rounded-lg text-left transition-colors">
               <p className="text-xs font-bold text-white">WhatsApp</p>
               <p className="text-[9px] text-[#71717A] mt-1">Message Directly</p>
             </button>
             <button className="p-3 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] rounded-lg text-left transition-colors">
               <p className="text-xs font-bold text-white">Schedule Visit</p>
               <p className="text-[9px] text-[#71717A] mt-1">Calendar Invite</p>
             </button>
           </div>
        </div>

      </div>
    </div>
  );
}
