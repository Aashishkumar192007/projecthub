'use client';

import { useProjectStore } from '@/store/projectStore';
import { Bot, Sparkles, AlertTriangle, ArrowRight, ShieldAlert, TrendingDown } from 'lucide-react';

export function ProjectCopilot() {
  const { projects, activeProjectId } = useProjectStore();
  
  if (!activeProjectId) return null;
  const activeProject = projects.find(p => p.id === activeProjectId);
  if (!activeProject) return null;

  return (
    <div className="w-80 border-l border-[#2A2A30] bg-[#111111] h-full flex flex-col shrink-0 overflow-y-auto z-10">
      
      {/* Header */}
      <div className="p-5 border-b border-[#2A2A30] bg-[#161616] flex items-center gap-3 sticky top-0 z-10">
        <div className="w-8 h-8 rounded-full bg-[linear-gradient(45deg,#00E5FF,#0066FF)] flex items-center justify-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
          <Bot size={16} className="text-white" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">AI Project Copilot <Sparkles size={12} className="text-[#00E5FF]"/></h2>
          <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-bold">Risk & Intelligence</p>
        </div>
      </div>

      <div className="p-5 space-y-8">
        
        {/* Executive Escalation Engine */}
        <div>
          <p className="text-[10px] font-bold text-danger tracking-widest uppercase mb-3 flex items-center gap-2">
            <AlertTriangle size={12} /> Executive Escalations
          </p>
          <div className="space-y-3">
            {activeProject.escalations.length > 0 ? (
              activeProject.escalations.map((esc) => (
                <div key={esc.id} className="bg-[#1A1A1A] border border-danger/30 rounded-xl p-4 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-danger/10 rounded-full blur-[20px] pointer-events-none group-hover:bg-danger/20 transition-colors"></div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-danger uppercase bg-danger/10 px-2 py-0.5 rounded border border-danger/20">
                      {esc.severity}
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-bold text-white">{esc.title}</h4>
                  <p className="text-lg font-black text-danger mt-1 mb-2">{esc.metric}</p>
                  
                  <div className="bg-[#111111] border border-[#2A2A30] rounded p-2">
                    <p className="text-[10px] text-[#71717A] uppercase font-bold mb-0.5">Primary Reason</p>
                    <p className="text-xs font-medium text-[#A1A1AA]">{esc.reason}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 text-center">
                <p className="text-xs font-bold text-success">No critical escalations.</p>
              </div>
            )}
          </div>
        </div>

        {/* Risk Assessment Layer */}
        <div>
          <p className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-3">AI Risk Assessment</p>
          <div className="space-y-3">
            
            <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#A1A1AA] flex items-center gap-2"><TrendingDown size={14} className={activeProject.delayProbability > 50 ? 'text-danger' : 'text-warning'}/> Delay Probability</span>
                <span className="text-sm font-black text-white">{activeProject.delayProbability}%</span>
              </div>
              <div className="w-full h-1 bg-[#111111] rounded-full mt-2 overflow-hidden">
                <div className={`h-full rounded-full ${activeProject.delayProbability > 50 ? 'bg-danger' : 'bg-warning'}`} style={{ width: `${activeProject.delayProbability}%` }}></div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#A1A1AA] flex items-center gap-2"><ShieldAlert size={14} className={activeProject.budgetRisk > 50 ? 'text-danger' : 'text-warning'}/> Budget Risk</span>
                <span className="text-sm font-black text-white">{activeProject.budgetRisk}%</span>
              </div>
              <div className="w-full h-1 bg-[#111111] rounded-full mt-2 overflow-hidden">
                <div className={`h-full rounded-full ${activeProject.budgetRisk > 50 ? 'bg-danger' : 'bg-warning'}`} style={{ width: `${activeProject.budgetRisk}%` }}></div>
              </div>
            </div>

          </div>
        </div>

        {/* Action Engine */}
        <div>
          <p className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-3">Suggested Actions</p>
          <div className="space-y-2">
            
            {activeProject.delayProbability > 30 && (
              <button className="w-full flex items-center justify-between px-4 py-3 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] hover:border-brand-blue/50 rounded-xl transition-all group">
                <span className="text-xs font-bold text-white">Accelerate Procurement</span>
                <ArrowRight size={14} className="text-[#71717A] group-hover:text-brand-blue" />
              </button>
            )}

            {activeProject.budgetRisk > 30 && (
              <button className="w-full flex items-center justify-between px-4 py-3 bg-danger/10 hover:bg-danger/20 border border-danger/30 rounded-xl transition-all group">
                <span className="text-xs font-bold text-danger">Issue Budget Warning</span>
                <ArrowRight size={14} className="text-danger" />
              </button>
            )}

            <button className="w-full flex items-center justify-between px-4 py-3 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] hover:border-brand-blue/50 rounded-xl transition-all group">
              <span className="text-xs font-bold text-white">Schedule Project Review</span>
              <ArrowRight size={14} className="text-[#71717A] group-hover:text-brand-blue" />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
