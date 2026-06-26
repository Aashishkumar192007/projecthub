'use client';
import { useState, useEffect } from 'react';
import { 
  Zap, 
  AlertTriangle, 
  TrendingUp, 
  Lightbulb, 
  Clock, 
  UserX, 
  MessageCircle, 
  FileText,
  Users,
  LayoutTemplate
} from 'lucide-react';

import { useCrmStore } from '@/store/crmStore';
import { toast } from 'sonner';


export function CrmCopilot() {
  const { leads, siteVisits, negotiations } = useCrmStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-[320px] bg-[#111111] border-l border-neutral-800 flex flex-col h-full shrink-0"></div>;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const inactiveLeads = leads.filter(l => l.stage !== 'WON' && l.stage !== 'LOST' && new Date(l.lastContactAt) < sevenDaysAgo);
  const stuckVisits = siteVisits.filter(v => v.status === 'COMPLETED' && !negotiations.some(n => n.leadId === v.leadId));

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
          <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">AI INTELLIGENCE</h3>
          
          <div className="bg-[#121212] border border-neutral-800 rounded-lg p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-400">BEST CAMPAIGN</span>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-sm font-medium text-[#00E5FF] mb-1">Meta Ads - Diwali Promo</div>
            <div className="text-xs text-neutral-500">Highest ROI (312%). Low CPL ($24).</div>
          </div>

          <div className="bg-[#2A1616] border border-red-900/50 rounded-lg p-4 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-red-400">Budget Waste Risk</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed mb-4">
              Google Ads "Broad Match" campaign is burning budget ($5K spent) with 0 bookings.
            </p>
            <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="w-full bg-red-900/50 hover:bg-red-900/80 text-red-200 text-xs font-medium py-2 rounded transition-colors">
              Pause Campaign
            </button>
          </div>

          {inactiveLeads.length > 0 && (
            <div className="bg-[#2A2316] border border-amber-900/50 rounded-lg p-4 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">Lead Quality Risk</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                {inactiveLeads.length} leads generated from 'Walk-in' have a high bounce rate and low score.
              </p>
              <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="w-full bg-amber-900/50 hover:bg-amber-900/80 text-amber-200 text-xs font-medium py-2 rounded transition-colors">
                Retarget Hot Leads
              </button>
            </div>
          )}

          <div className="bg-[#121212] border border-neutral-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-400">PARTNER INTELLIGENCE</span>
              <TrendingUp className="w-4 h-4 text-[#00E5FF]" />
            </div>
            <div className="text-sm font-medium text-white mb-1">Elite Brokers Inc. is scaling up</div>
            <div className="text-xs text-neutral-500 mb-3">They closed 3 deals this week. Consider allocating exclusive inventory to maintain momentum.</div>
            <button onClick={(e) => { e.stopPropagation(); toast.success('Allocation Suggested', { description: 'Drafting exclusive inventory allocation for Elite Brokers Inc.' }); }} className="w-full bg-[#1A1C20] hover:bg-[#2A2D35] text-white border border-neutral-700 text-xs font-medium py-2 rounded transition-colors">
              Review Allocation
            </button>
          </div>
        </section>

        {/* RECOMMENDED ACTIONS */}
        <section>
          <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">MARKETING RECOMMENDATIONS</h3>
          <div className="space-y-2">
            
            <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="w-full flex items-center gap-3 p-3 bg-[#161616] border border-neutral-800 rounded hover:bg-[#1E1E1E] transition-colors text-left group">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-neutral-300 group-hover:text-white transition-colors">Increase Meta Ads Budget</span>
            </button>

            <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="w-full flex items-center gap-3 p-3 bg-[#161616] border border-neutral-800 rounded hover:bg-[#1E1E1E] transition-colors text-left group">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-neutral-300 group-hover:text-white transition-colors">Launch New Audience</span>
            </button>

            <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="w-full flex items-center gap-3 p-3 bg-[#161616] border border-neutral-800 rounded hover:bg-[#1E1E1E] transition-colors text-left group">
              <LayoutTemplate className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-neutral-300 group-hover:text-white transition-colors">Optimize Landing Page</span>
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
