'use client';

import { Lead } from '@/lib/crmMockData';
import { Target, Zap, AlertTriangle, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';


export function LeadCopilot({ lead }: { lead: Lead }) {
  return (
    <div className="w-[320px] h-full bg-[#0A0C10] border-l border-neutral-800 flex flex-col font-sans shrink-0">
      <div className="h-[72px] flex items-center px-6 border-b border-neutral-800 shrink-0 gap-3">
        <Zap className="w-5 h-5 text-amber-400" />
        <div>
          <div className="text-white font-medium text-sm">Lead Copilot</div>
          <div className="text-neutral-500 text-[10px] uppercase tracking-widest mt-0.5">AI Assistant</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Win Probability */}
        <div className="bg-[#121212] border border-neutral-800 rounded p-4 relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-1 h-full ${lead.winProbability > 70 ? 'bg-green-400' : lead.winProbability > 30 ? 'bg-amber-400' : 'bg-red-400'}`}></div>
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Win Probability</div>
          <div className="flex items-end gap-2">
            <span className={`text-3xl font-medium ${lead.winProbability > 70 ? 'text-green-400' : lead.winProbability > 30 ? 'text-amber-400' : 'text-red-400'}`}>
              {lead.winProbability}%
            </span>
          </div>
          <div className="text-xs text-neutral-400 mt-2">
            {lead.winProbability > 70 ? 'Highly likely to convert based on engagement.' : 'Requires immediate follow up to build interest.'}
          </div>
        </div>

        {/* Next Best Action */}
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-[#00E5FF]" />
            <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Next Best Action</div>
          </div>
          <div className="text-sm text-neutral-300 font-medium mb-3">
            {lead.stage === 'NEW' ? 'Schedule a discovery call to qualify requirements.' : 
             lead.stage === 'QUALIFIED' ? 'Propose a site visit to top matched properties.' :
             lead.stage === 'VISIT COMPLETED' ? 'Send a customized quote and start negotiation.' :
             'Follow up to close the booking.'}
          </div>
          <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="w-full py-2 bg-[#00E5FF]/10 text-[#00E5FF] hover:bg-[#00E5FF]/20 rounded text-xs font-medium transition-colors">
            Execute Action
          </button>
        </div>

        {/* Risk Analysis */}
        {lead.winProbability < 40 && lead.stage !== 'LOST' && (
          <div className="bg-[#1A1010] border border-red-900/50 rounded p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <div className="text-[10px] font-bold text-red-400/80 uppercase tracking-widest">Risk Factor</div>
            </div>
            <div className="text-xs text-red-300/80">
              Lead has not engaged in the last 7 days. Risk of dropping off is high.
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
