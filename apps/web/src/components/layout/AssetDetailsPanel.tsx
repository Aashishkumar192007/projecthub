'use client';

import { Cpu, Send, Bot, Lightbulb, AlertTriangle, ArrowRight, Activity, Leaf, PlayCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { facilityInsights, ownerCopilotInsights, procurementCopilotInsights } from '@/lib/mockData';

export function AssetDetailsPanel() {
  const pathname = usePathname();
  const isFacilities = pathname.startsWith('/facilities');
  const isProcurement = pathname.startsWith('/procurement');

  const hasDedicatedCopilot = 
    pathname.startsWith('/tenants') || 
    pathname.startsWith('/society') || 
    pathname.startsWith('/finance') ||
    pathname.startsWith('/resident') ||
    pathname.startsWith('/projects') ||
    pathname.startsWith('/investors') ||
    pathname.startsWith('/crm') ||
    pathname.startsWith('/facilities') ||
    pathname.startsWith('/procurement');

  if (hasDedicatedCopilot) return null;

  if (isFacilities) {
    return (
      <div className="w-80 lg:w-[340px] border-l border-[#2A2A30] bg-[#111111] h-full flex flex-col relative z-20">
        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-center gap-2 mb-1">
            <Cpu size={18} className="text-amber-500" />
            <h2 className="text-lg font-bold text-amber-500 tracking-wide">AI Copilot</h2>
          </div>
          <p className="text-[11px] font-bold tracking-wide text-[#A1A1AA] mb-6">Real-time Intelligence</p>
          
          <div className="flex items-center gap-6 border-b border-[#2A2A30] text-xs font-bold text-[#A1A1AA]">
            <div className="pb-3 text-amber-500 border-b-2 border-amber-500 cursor-pointer">INSIGHTS</div>
            <div className="pb-3 cursor-pointer hover:text-white transition-colors">ACTIONS</div>
            <div className="pb-3 cursor-pointer hover:text-white transition-colors">HISTORY</div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {facilityInsights.map(insight => (
            <div key={insight.id} className="border border-[#333] rounded overflow-hidden bg-[#1A1A1A] relative p-4 group hover:border-[#444] transition-colors cursor-pointer">
              <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-${insight.type}`}></div>
              <div className={`flex items-center gap-2 text-[9px] font-bold tracking-widest text-${insight.type} uppercase mb-3`}>
                {insight.label === 'PREDICTIVE ALERT' && <Activity size={12} />}
                {insight.label === 'ENERGY OPPORTUNITY' && <Leaf size={12} />}
                {insight.label === 'ESG INSIGHT' && <Leaf size={12} />}
                {insight.label}
              </div>
              <p className="text-xs text-[#E5E7EB] leading-relaxed mb-4 font-medium">
                {insight.title}
              </p>
              <button className="w-full py-2 bg-transparent border border-[#333] rounded text-[11px] font-bold text-[#E5E7EB] hover:bg-[#222] transition-colors">
                {insight.action}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="p-6 border-t border-[#2A2A30] bg-[#1E1E1E]">
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#FBBF24] hover:bg-[#F59E0B] text-black rounded text-xs font-bold transition-colors">
            <PlayCircle size={16} /> Run Diagnostics
          </button>
        </div>
      </div>
    );
  }

  if (isProcurement) {
    return (
      <div className="w-80 lg:w-[360px] border-l border-[#2A2A30] bg-[#1A1A1A] h-full flex flex-col relative z-20">
        {/* Header */}
        <div className="p-6 border-b border-[#2A2A30] bg-[#161616]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-amber-500/30 flex items-center justify-center bg-[#332200]">
              <Bot size={18} className="text-amber-500" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-amber-500 tracking-wide">Copilot Advisor</h2>
              <p className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase mt-0.5">REAL-TIME INSIGHTS</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4 mb-8">
            {procurementCopilotInsights.map(insight => (
              <div key={insight.id} className="bg-[#161616] border border-[#2A2A30] rounded-lg p-4 relative overflow-hidden group hover:border-[#3F3F46] transition-colors">
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${insight.type}`}></div>
                
                <div className="flex items-start gap-2 mb-2">
                  {insight.icon === 'AlertTriangle' && <AlertTriangle size={14} className={`text-${insight.type} mt-0.5`} />}
                  {insight.icon === 'Activity' && <Activity size={14} className={`text-${insight.type} mt-0.5`} />}
                  <h4 className={`text-[11px] font-bold text-${insight.type} tracking-widest uppercase leading-snug`}>{insight.title}</h4>
                </div>
                
                <p className="text-[12px] text-[#D4D4D8] leading-relaxed mb-4">
                  {insight.description}
                </p>
                <button className={`text-[11px] font-bold text-${insight.type} flex items-center gap-1 hover:brightness-125 transition-all`}>
                  {insight.action}
                </button>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-[10px] font-bold tracking-widest text-[#A1A1AA] uppercase mb-4">QUICK PROMPTS</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 bg-[#111111] border border-[#2A2A30] hover:border-[#3F3F46] hover:bg-[#1A1A1A] rounded text-[12px] text-[#D4D4D8] transition-colors">
                Forecast Q3 Lighting Demand
              </button>
              <button className="w-full text-left px-4 py-3 bg-[#111111] border border-[#2A2A30] hover:border-[#3F3F46] hover:bg-[#1A1A1A] rounded text-[12px] text-[#D4D4D8] transition-colors">
                Review Contract Risk Profile
              </button>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-[#2A2A30] bg-[#161616]">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask Copilot..." 
              className="w-full bg-[#111111] border border-[#2A2A30] rounded py-2.5 pl-4 pr-10 text-xs text-[#E5E7EB] placeholder-[#52525B] focus:outline-none focus:border-amber-500/50 transition-colors"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500 transition-colors">
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT / OWNER WORKSPACE UI
  return (
    <div className="w-80 lg:w-[360px] border-l border-[#2A2A30] bg-[#161616] h-full flex flex-col relative z-20">
      
      {/* Header */}
      <div className="p-6 border-b border-[#2A2A30]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-amber-500/30 flex items-center justify-center bg-[#332200]">
            <Bot size={18} className="text-amber-500" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-amber-500 tracking-wide">Copilot Advisor</h2>
            <p className="text-[11px] font-bold text-[#A1A1AA] mt-0.5">Real-time Insights</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        
        {/* Intelligence Stream */}
        <div className="mb-8">
          <h3 className="text-[10px] font-bold tracking-widest text-[#A1A1AA] uppercase mb-4">Intelligence Stream</h3>
          
          <div className="space-y-4">
            {ownerCopilotInsights.map(insight => (
              <div key={insight.id} className="bg-[#1A1A1A] border border-[#2A2A30] rounded-lg p-4 relative overflow-hidden group hover:border-[#3F3F46] transition-colors">
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${insight.type}`}></div>
                
                <div className="flex items-start gap-2 mb-2">
                  {insight.type === 'warning' ? (
                    <Lightbulb size={14} className="text-amber-500 mt-0.5" />
                  ) : (
                    <AlertTriangle size={14} className="text-danger mt-0.5" />
                  )}
                  <h4 className="text-xs font-bold text-white leading-snug">{insight.title}</h4>
                </div>
                
                <p className="text-[11px] text-[#A1A1AA] leading-relaxed ml-6">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Execution */}
        <div>
          <h3 className="text-[10px] font-bold tracking-widest text-[#A1A1AA] uppercase mb-4">Quick Execution</h3>
          
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between px-4 py-3 bg-[#111111] border border-[#2A2A30] hover:border-[#3F3F46] hover:bg-[#1A1A1A] rounded-lg transition-colors group">
              <span className="text-xs font-bold text-white">Analyze Portfolio</span>
              <ArrowRight size={14} className="text-[#A1A1AA] group-hover:text-white transition-colors" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 bg-[#111111] border border-[#2A2A30] hover:border-[#3F3F46] hover:bg-[#1A1A1A] rounded-lg transition-colors group">
              <span className="text-xs font-bold text-white">Forecast Income</span>
              <ArrowRight size={14} className="text-[#A1A1AA] group-hover:text-white transition-colors" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 bg-[#111111] border border-[#2A2A30] hover:border-[#3F3F46] hover:bg-[#1A1A1A] rounded-lg transition-colors group">
              <span className="text-xs font-bold text-white">Generate Investor Report</span>
              <ArrowRight size={14} className="text-[#A1A1AA] group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-[#2A2A30] bg-[#111111]">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ask Copilot..." 
            className="w-full bg-[#1A1A1A] border border-[#2A2A30] rounded py-2.5 pl-4 pr-10 text-xs text-[#E5E7EB] placeholder-[#52525B] focus:outline-none focus:border-amber-500/50 transition-colors"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-amber-500 transition-colors">
            <Send size={14} />
          </button>
        </div>
      </div>

    </div>
  );
}
