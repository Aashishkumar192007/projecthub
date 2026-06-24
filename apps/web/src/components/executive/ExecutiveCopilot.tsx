'use client';

import { useExecutiveStore } from '@/store/executiveStore';
import { Bot, TrendingUp, AlertTriangle, ArrowRight, Target, Sparkles, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export function ExecutiveCopilot() {
  const { isWarRoomMode } = useExecutiveStore();
  const [chatInput, setChatInput] = useState('');

  return (
    <div className={`border-l border-[#2A2A30] bg-[#111111] h-full flex flex-col shrink-0 overflow-hidden z-10 transition-all ${
      isWarRoomMode ? 'w-96' : 'w-80'
    }`}>
      
      {/* Header */}
      <div className="p-5 border-b border-[#2A2A30] bg-[#161616] flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-full bg-[linear-gradient(45deg,#00E5FF,#0066FF)] flex items-center justify-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
          <Bot size={16} className="text-white" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">Executive Copilot 3.0 <Sparkles size={12} className="text-[#00E5FF]"/></h2>
          <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-bold">Strategic Advisor</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        
        {/* Strategic Summary */}
        <div>
          <p className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-3">AI Strategic Summary</p>
          <div className="space-y-3">
            
            <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 border-l-2 border-l-success">
              <p className="text-[10px] font-bold text-success uppercase tracking-wider mb-1">Growth Indicator</p>
              <h4 className="text-sm font-bold text-white">Revenue Growth: +8.2%</h4>
              <p className="text-[10px] text-[#A1A1AA] mt-1">Driven by West Region commercial leasing.</p>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 border-l-2 border-l-danger">
              <p className="text-[10px] font-bold text-danger uppercase tracking-wider mb-1">Biggest Risk</p>
              <h4 className="text-sm font-bold text-white">Tower B Lease Cluster</h4>
              <p className="text-[10px] text-[#A1A1AA] mt-1">17 leases expiring within 90 days. High churn probability.</p>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 border-l-2 border-l-brand-blue">
              <p className="text-[10px] font-bold text-brand-blue uppercase tracking-wider mb-1">Top Opportunity</p>
              <h4 className="text-sm font-bold text-white">West Region Expansion</h4>
              <p className="text-[10px] text-[#A1A1AA] mt-1">Occupancy at 95%. Recommend acquisition review.</p>
            </div>

          </div>
        </div>

        {/* Action Engine */}
        <div>
          <p className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-3">Recommended Actions</p>
          <div className="space-y-2">
            
            <button className="w-full flex items-center justify-between px-4 py-3 bg-[#1A2533] hover:bg-[#1E2D40] border border-brand-blue/30 hover:border-brand-blue/60 rounded-xl transition-all group">
              <div className="text-left">
                <span className="text-xs font-bold text-brand-blue block">Deploy Renewal Taskforce</span>
                <span className="text-[10px] text-brand-blue/70">Target: Tower B Leases</span>
              </div>
              <ArrowRight size={14} className="text-brand-blue" />
            </button>

            <button className="w-full flex items-center justify-between px-4 py-3 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] hover:border-[#3F3F46] rounded-xl transition-all group">
              <span className="text-xs font-bold text-white">Initiate Region Review</span>
              <ArrowRight size={14} className="text-[#71717A] group-hover:text-white" />
            </button>

          </div>
        </div>

      </div>

      {/* Mock Chat Input */}
      <div className="p-4 border-t border-[#2A2A30] bg-[#161616] shrink-0">
         <p className="text-[10px] font-bold text-[#71717A] mb-2 px-1">Ask Copilot...</p>
         <div className="flex flex-wrap gap-2 mb-3">
           <span className="text-[10px] bg-[#1A1A1A] border border-[#2A2A30] text-[#A1A1AA] px-2 py-1 rounded cursor-pointer hover:bg-[#2A2A30] hover:text-white transition-colors">What caused revenue decline?</span>
           <span className="text-[10px] bg-[#1A1A1A] border border-[#2A2A30] text-[#A1A1AA] px-2 py-1 rounded cursor-pointer hover:bg-[#2A2A30] hover:text-white transition-colors">Which asset is underperforming?</span>
         </div>
         <div className="relative">
           <MessageSquare size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#71717A]" />
           <input 
              type="text"
              placeholder="Type an executive query..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#3F3F46] rounded-lg px-3 py-2.5 pl-9 text-xs text-white placeholder:text-[#71717A] focus:outline-none focus:border-brand-blue transition-colors"
           />
         </div>
      </div>
    </div>
  );
}
