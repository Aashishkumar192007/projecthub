'use client';

import { useCrmStore, selectFilteredLeads } from '@/store/crmStore';
import { Search, Filter, Phone, Mail, User, Clock, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';


export function HotLeadsView() {
  const state = useCrmStore();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  const hotLeads = selectFilteredLeads(state);
  const filteredLeads = hotLeads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    lead.phone.includes(searchQuery) || 
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (lead.interestedProjectId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.stage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">Hot Leads Priority Queue</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search hot leads..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
          <button onClick={(e) => { e.stopPropagation(); useCrmStore.getState().openGlobalModal('Requested Action'); }} className="h-9 px-4 bg-[#121212] border border-neutral-800 rounded flex items-center gap-2 text-sm text-white hover:bg-neutral-800">
            <Filter className="w-4 h-4 text-neutral-400" />
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#121212] border border-neutral-800 rounded p-4 flex flex-col justify-center">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Total Hot Leads</div>
          <div className="text-2xl font-medium text-white">{hotLeads.length}</div>
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] border-b border-neutral-800">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">LEAD NAME</th>
                <th className="px-6 py-4 font-medium">SCORE</th>
                <th className="px-6 py-4 font-medium">SOURCE</th>
                <th className="px-6 py-4 font-medium">PROJECT</th>
                <th className="px-6 py-4 font-medium">EXECUTIVE</th>
                <th className="px-6 py-4 font-medium">LAST FOLLOWUP</th>
                <th className="px-6 py-4 font-medium">NEXT ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(lead => (
                <tr 
                  key={lead.id} 
                  onClick={() => router.push(`/crm/leads/${lead.id}`)}
                  className="border-b border-neutral-800/50 hover:bg-[#1A1C20] cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{lead.name}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{lead.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center text-red-500 font-bold">
                        {lead.score}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-400">{lead.source}</td>
                  <td className="px-6 py-4 text-neutral-300">{lead.interestedProjectId || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-neutral-300">
                      <User className="w-3 h-3 text-neutral-500" />
                      {lead.assignedExecutive}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(lead.lastContactAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-amber-400 text-xs">
                      <Target className="w-3 h-3" />
                      Schedule Visit
                    </div>
                  </td>
                </tr>
              ))}
              {hotLeads.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-neutral-500">
                    No hot leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
