'use client';

import { useCrmStore } from '@/store/crmStore';
import { Layout, Plus, Search, Eye, Users, MousePointer2 } from 'lucide-react';
import { toast } from 'sonner';


export function LandingPagesView() {
  const { landingPages } = useCrmStore();

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">Landing Pages</h2>
        <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0A1A2A] px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Create Page</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {landingPages.map(page => (
          <div key={page.id} className="bg-[#121212] border border-neutral-800 rounded flex flex-col overflow-hidden hover:border-neutral-700 transition-colors">
            <div className="h-32 bg-neutral-900 border-b border-neutral-800 flex items-center justify-center">
              <Layout className="w-10 h-10 text-neutral-700" />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-medium text-white">{page.name}</h3>
                  <p className="text-[10px] text-neutral-500 mt-1">{page.url}</p>
                </div>
                <span className={`px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase rounded border ${
                  page.status === 'PUBLISHED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-neutral-800 text-neutral-500 border-neutral-700'
                }`}>
                  {page.status}
                </span>
              </div>
              
              <div className="mt-auto pt-4 grid grid-cols-3 gap-2 border-t border-neutral-800">
                <div>
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1 mb-1"><Eye className="w-3 h-3"/> VISITS</div>
                  <div className="text-sm font-medium text-white">{page.visitors.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1 mb-1"><Users className="w-3 h-3"/> LEADS</div>
                  <div className="text-sm font-medium text-white">{page.leadsGenerated.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1 mb-1"><MousePointer2 className="w-3 h-3"/> CONV</div>
                  <div className="text-sm font-medium text-green-400">{page.conversionRate}%</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
