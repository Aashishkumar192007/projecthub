'use client';

import { Lead } from '@/lib/crmMockData';
import { useCrmStore } from '@/store/crmStore';
import { ArrowRight, MoreHorizontal, UserCheck, Calendar, Briefcase, FileCheck } from 'lucide-react';
import { toast } from 'sonner';


export function LeadHeader({ lead }: { lead: Lead }) {
  const { moveLeadStage } = useCrmStore();

  const stages = [
    { id: 'NEW', label: 'New' },
    { id: 'CONTACTED', label: 'Contacted' },
    { id: 'QUALIFIED', label: 'Qualified' },
    { id: 'VISIT SCHEDULED', label: 'Visit Sched.' },
    { id: 'VISIT COMPLETED', label: 'Visit Done' },
    { id: 'NEGOTIATION', label: 'Negotiation' },
    { id: 'BOOKING', label: 'Booking' },
    { id: 'WON', label: 'Won' }
  ];

  const currentIdx = stages.findIndex(s => s.id === lead.stage);

  return (
    <div className="h-32 shrink-0 bg-[#0A0C10] border-b border-neutral-800 p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-white">{lead.name}</h1>
          <div className="text-xs text-neutral-500 mt-1">Lead ID: {lead.id} • Created {new Date(lead.createdAt).toLocaleDateString()}</div>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-9 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm font-medium rounded transition-colors" onClick={() => moveLeadStage(lead.id, 'LOST')}>
            Mark Lost
          </button>
          <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="h-9 w-9 bg-[#121212] border border-neutral-800 rounded flex items-center justify-center text-neutral-400 hover:text-white transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1 w-full mt-4">
        {stages.map((stage, idx) => (
          <div key={stage.id} className="flex-1 flex items-center">
            <button 
              onClick={() => moveLeadStage(lead.id, stage.id as any)}
              className={`flex-1 h-8 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center transition-colors rounded ${
                idx === currentIdx 
                  ? 'bg-[#00E5FF] text-[#0A0C10]' 
                  : idx < currentIdx 
                    ? 'bg-[#00E5FF]/20 text-[#00E5FF]' 
                    : 'bg-neutral-800 text-neutral-500 hover:bg-neutral-700 hover:text-neutral-300'
              }`}
            >
              {stage.label}
            </button>
            {idx < stages.length - 1 && (
              <div className={`w-1 h-px mx-1 ${idx < currentIdx ? 'bg-[#00E5FF]/30' : 'bg-neutral-800'}`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
