'use client';

import { 
  Zap, 
  AlertTriangle, 
  TrendingUp, 
  Lightbulb, 
  Clock, 
  UserX, 
  MessageCircle, 
  FileText 
} from 'lucide-react';

export function CrmCopilot() {
  return (
    <div className="w-[320px] bg-[#111111] border-l border-neutral-800 flex flex-col h-full shrink-0">
      
      {/* Header */}
      <div className="h-[72px] px-6 border-b border-neutral-800 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-[#00E5FF] text-[10px] font-bold tracking-widest uppercase">INTELLIGENCE COPILOT</h2>
          <p className="text-neutral-500 text-[10px]">AI Assistant & Real-time Alerts</p>
        </div>
        <Zap className="w-4 h-4 text-amber-500" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* PRIORITY ALERTS */}
        <section>
          <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">PRIORITY ALERTS</h3>
          
          <div className="bg-[#2A1616] border border-red-900/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-red-400">Hot Lead Risk</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed mb-4">
              Lead #4928 (Mr. Kapoor) hasn't been contacted in 24h. Booking probability dropped by 14%.
            </p>
            <button className="w-full bg-red-900/50 hover:bg-red-900/80 text-red-200 text-xs font-medium py-2 rounded transition-colors">
              Remind Manager
            </button>
          </div>
        </section>

        {/* REVENUE FORECAST */}
        <section>
          <div className="bg-[#12231A] border border-green-900/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">Revenue Forecast</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Tower A inventory selling 15% faster than projected. Recommended price adjustment: +3%.
            </p>
          </div>
        </section>

        {/* AI INSIGHT */}
        <section>
          <div className="bg-[#161616] border border-neutral-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-sm font-medium text-[#00E5FF]">AI Insight</span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-300 list-disc pl-4">
              <li>18 leads require immediate follow-up</li>
              <li>Booking probability +12% this week</li>
              <li>Campaign 'Luxury Living' has best ROI</li>
            </ul>
          </div>
        </section>

        {/* RECOMMENDED ACTIONS */}
        <section>
          <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">RECOMMENDED ACTIONS</h3>
          <div className="space-y-2">
            
            <button className="w-full flex items-center gap-3 p-3 bg-[#161616] border border-neutral-800 rounded hover:bg-[#1E1E1E] transition-colors text-left group">
              <Clock className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
              <span className="text-xs text-neutral-300 group-hover:text-white transition-colors">Schedule Follow-Ups (18)</span>
            </button>

            <button className="w-full flex items-center gap-3 p-3 bg-[#161616] border border-neutral-800 rounded hover:bg-[#1E1E1E] transition-colors text-left group">
              <UserX className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
              <span className="text-xs text-neutral-300 group-hover:text-white transition-colors">Re-assign Inactive Leads</span>
            </button>

            <button className="w-full flex items-center gap-3 p-3 bg-[#161616] border border-neutral-800 rounded hover:bg-[#1E1E1E] transition-colors text-left group">
              <MessageCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs text-neutral-300 group-hover:text-white transition-colors">Launch WhatsApp Broadcast</span>
            </button>

            <button className="w-full flex items-center gap-3 p-3 bg-[#161616] border border-neutral-800 rounded hover:bg-[#1E1E1E] transition-colors text-left group">
              <FileText className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-neutral-300 group-hover:text-white transition-colors">Generate Sales Report</span>
            </button>

          </div>
        </section>

      </div>

      {/* Footer System Status */}
      <div className="p-4 border-t border-neutral-800 bg-[#111111] shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">SYSTEM STATUS: OPTIMAL</span>
        </div>
        <p className="text-[10px] text-neutral-500">Global Pipeline sync complete 2m ago.</p>
      </div>

    </div>
  );
}
