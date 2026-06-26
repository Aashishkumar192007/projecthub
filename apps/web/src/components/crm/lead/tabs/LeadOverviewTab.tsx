'use client';

import { Lead } from '@/lib/crmMockData';

export function LeadOverviewTab({ lead }: { lead: Lead }) {
  return (
    <div className="p-6 text-white space-y-6">
      <div className="bg-[#1A1C20] border border-neutral-800 rounded p-6">
        <h3 className="text-sm font-medium mb-4 text-[#00E5FF]">Lead Notes</h3>
        <p className="text-sm text-neutral-300 leading-relaxed">{lead.notes || 'No notes available for this lead.'}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#1A1C20] border border-neutral-800 rounded p-6">
          <h3 className="text-sm font-medium mb-4 text-white">Source Information</h3>
          <div className="space-y-4">
            <div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Source</div>
              <div className="text-sm text-neutral-300">{lead.source}</div>
            </div>
            <div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Campaign ID</div>
              <div className="text-sm text-neutral-300">{lead.campaignId || 'N/A'}</div>
            </div>
          </div>
        </div>

        <div className="bg-[#1A1C20] border border-neutral-800 rounded p-6">
          <h3 className="text-sm font-medium mb-4 text-white">Preferences</h3>
          <div className="space-y-4">
            <div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Interested Project</div>
              <div className="text-sm text-neutral-300">{lead.interestedProjectId || 'Any'}</div>
            </div>
            <div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Unit Type</div>
              <div className="text-sm text-neutral-300">{lead.interestedUnitType || 'Any'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
