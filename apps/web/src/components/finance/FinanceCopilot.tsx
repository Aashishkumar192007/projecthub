'use client';

import { useFinanceStore } from '@/store/financeStore';
import { Bot, Sparkles, AlertTriangle, ArrowRight, Activity, ShieldAlert, CheckCircle2, DollarSign } from 'lucide-react';

export function FinanceCopilot() {
  const { ledgers, activeCategoryId } = useFinanceStore();
  
  if (!activeCategoryId) return null;
  const activeLedgers = ledgers.filter(r => r.category === activeCategoryId);

  return (
    <div className="w-80 border-l border-[#2A2A30] bg-[#111111] h-full flex flex-col shrink-0 overflow-y-auto z-10">
      
      {/* Header */}
      <div className="p-5 border-b border-[#2A2A30] bg-[#161616] flex items-center gap-3 sticky top-0 z-10">
        <div className="w-8 h-8 rounded bg-[#1A1A1A] border border-[#2A2A30] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(0,229,255,0.1),transparent)]"></div>
          <Bot size={16} className="text-[#00E5FF] relative z-10" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">Finance AI <Sparkles size={12} className="text-[#00E5FF]"/></h2>
          <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-bold">FP&A Analyst</p>
        </div>
      </div>

      <div className="p-5 space-y-6">
        
        {/* Real-time Category Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-lg p-3">
            <p className="text-[9px] text-[#A1A1AA] font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
              <DollarSign size={10} className="text-[#00E5FF]"/> Category Bal
            </p>
            <p className="text-sm font-black text-white mt-2">
              ₹{(activeLedgers.reduce((acc, curr) => acc + curr.balance, 0) / 10000000).toFixed(2)}Cr
            </p>
          </div>
          <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-lg p-3">
            <p className="text-[9px] text-[#A1A1AA] font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
              <Activity size={10} className="text-brand-blue"/> Active Ledgers
            </p>
            <p className="text-2xl font-black text-white">{activeLedgers.length}</p>
          </div>
        </div>

        {/* AI Insights Aggregated for the Category */}
        <div>
          <p className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase mb-3 flex items-center gap-2">
            <Bot size={12} className="text-[#00E5FF]" /> Financial Intelligence
          </p>
          <div className="space-y-3">
            {activeLedgers.length > 0 ? (
              activeLedgers.flatMap(ledger => ledger.insights.map((insight) => (
                <div key={insight.id} className={`bg-[#1A1A1A] border rounded-xl p-4 relative overflow-hidden group ${
                  insight.isUrgent ? 'border-danger/30' : 'border-[#2A2A30] hover:border-[#3F3F46]'
                }`}>
                  {insight.isUrgent && (
                    <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-danger/10 blur-[20px] pointer-events-none group-hover:bg-danger/20 transition-colors"></div>
                  )}
                  
                  <div className="flex justify-between items-start mb-2">
                     <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                       insight.type === 'Forecast' ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/30' :
                       insight.type === 'Risk' ? 'bg-danger/10 text-danger border-danger/30' :
                       insight.type === 'Anomaly' ? 'bg-warning/10 text-warning border-warning/30' :
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
              )))
            ) : (
              <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 text-center">
                <CheckCircle2 size={24} className="mx-auto text-success mb-2 opacity-50" />
                <p className="text-xs font-bold text-success">Ledgers are balanced.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Follow-ups */}
        <div className="pt-4 border-t border-[#2A2A30]">
           <p className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-3">Quick Actions</p>
           <div className="grid grid-cols-2 gap-2">
             <button className="p-3 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] rounded-lg text-left transition-colors">
               <p className="text-xs font-bold text-white">Generate PDF</p>
               <p className="text-[9px] text-[#71717A] mt-1">Export Ledger</p>
             </button>
             <button className="p-3 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] rounded-lg text-left transition-colors">
               <p className="text-xs font-bold text-white">Reconcile</p>
               <p className="text-[9px] text-[#71717A] mt-1">Run AI Match</p>
             </button>
             <button className="p-3 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] rounded-lg text-left transition-colors">
               <p className="text-xs font-bold text-white">Journal</p>
               <p className="text-[9px] text-[#71717A] mt-1">New Entry</p>
             </button>
             <button className="p-3 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] rounded-lg text-left transition-colors">
               <p className="text-xs font-bold text-white">Alert</p>
               <p className="text-[9px] text-[#71717A] mt-1">Notify Owner</p>
             </button>
           </div>
        </div>

      </div>
    </div>
  );
}
