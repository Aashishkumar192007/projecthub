'use client';

import { MailOpen, Plus, Send, BarChart2 } from 'lucide-react';
import { toast } from 'sonner';


export function EmailMarketingView() {
  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">Email Marketing Campaigns</h2>
        <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0A1A2A] px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Create Mass Email</span>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#121212] border border-neutral-800 rounded p-4 border-l-2 border-l-[#00E5FF]">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">EMAILS SENT</div>
          <div className="text-2xl font-medium text-white">45,200</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4 border-l-2 border-l-green-400">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">AVG OPEN RATE</div>
          <div className="text-2xl font-medium text-white">32.4%</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4 border-l-2 border-l-blue-400">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">CLICK RATE</div>
          <div className="text-2xl font-medium text-white">12.1%</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4 border-l-2 border-l-red-400">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">UNSUBSCRIBE</div>
          <div className="text-2xl font-medium text-white">0.8%</div>
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded p-6">
        <div className="flex items-center justify-center h-full flex-col text-neutral-500">
          <MailOpen className="w-12 h-12 mb-4 text-neutral-700" />
          <p>No active email campaigns at the moment.</p>
        </div>
      </div>
    </div>
  );
}
