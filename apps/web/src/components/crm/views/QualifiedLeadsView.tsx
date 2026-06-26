'use client';

import { useCrmStore, selectFilteredLeads } from '@/store/crmStore';
import { Search, MapPin, Briefcase, RefreshCw, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { toast } from 'sonner';


export function QualifiedLeadsView() {
  const state = useCrmStore();
  const qualifiedLeads = selectFilteredLeads(state);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = qualifiedLeads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    lead.phone.includes(searchQuery) || 
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (lead.interestedProjectId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.stage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">Qualified Leads</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search qualified leads..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] sticky top-0 z-10">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest border-b border-neutral-800">
                <th className="px-6 py-4 font-medium">LEAD NAME</th>
                <th className="px-6 py-4 font-medium">QUALIFICATION DATE</th>
                <th className="px-6 py-4 font-medium">BUDGET</th>
                <th className="px-6 py-4 font-medium">INTERESTED PROJECT</th>
                <th className="px-6 py-4 font-medium">PREFERRED UNIT</th>
                <th className="px-6 py-4 font-medium text-right">QUICK ACTIONS</th>
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
                  <td className="px-6 py-4 text-neutral-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-neutral-500" />
                      {new Date(lead.updatedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white font-medium">${(lead.budget / 1000000).toFixed(1)}M</td>
                  <td className="px-6 py-4 text-neutral-300">{lead.interestedProjectId || 'N/A'}</td>
                  <td className="px-6 py-4 text-neutral-300">{lead.interestedUnitType || 'N/A'}</td>
                  <td className="px-6 py-4 text-right" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={(e) => { e.stopPropagation(); useCrmStore.getState().openGlobalModal('Requested Action'); }} className="px-3 py-1.5 bg-[#00E5FF]/10 text-[#00E5FF] hover:bg-[#00E5FF]/20 text-[10px] uppercase tracking-widest font-bold rounded flex items-center gap-1 transition-colors">
                        <MapPin className="w-3 h-3" /> Visit
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); useCrmStore.getState().openGlobalModal('Requested Action'); }} className="px-3 py-1.5 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 text-[10px] uppercase tracking-widest font-bold rounded flex items-center gap-1 transition-colors">
                        <Briefcase className="w-3 h-3" /> Negotiate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {qualifiedLeads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-500">
                    No qualified leads found.
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
