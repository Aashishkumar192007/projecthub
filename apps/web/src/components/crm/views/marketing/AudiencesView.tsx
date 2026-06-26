'use client';

import { useCrmStore } from '@/store/crmStore';
import { UsersRound, Plus, Filter, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';


export function AudiencesView() {
  const { audiences } = useCrmStore();

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">Audience Segments</h2>
        <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0A1A2A] px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Create Segment</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {audiences.map(aud => (
          <div key={aud.id} className="bg-[#121212] border border-neutral-800 rounded p-5 hover:border-neutral-700 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                  <UsersRound className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{aud.name}</h3>
                  <div className="text-[10px] text-neutral-500 mt-1 uppercase tracking-widest flex items-center gap-1">
                    <Filter className="w-3 h-3" /> Custom Segment
                  </div>
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="text-neutral-500 hover:text-white"><MoreVertical className="w-4 h-4" /></button>
            </div>
            
            <p className="text-xs text-neutral-400 mb-6 h-8">{aud.description}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
              <div>
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">TOTAL LEADS</div>
                <div className="text-xl font-medium text-white">{aud.leadCount.toLocaleString()}</div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="text-xs font-medium text-[#00E5FF] hover:underline">View Leads</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
