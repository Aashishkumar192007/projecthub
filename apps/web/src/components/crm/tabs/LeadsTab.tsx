'use client';

import { useCrmStore } from '@/store/crmStore';
import { Search, Filter, ArrowUpDown, MoreHorizontal, User, Mail, Phone, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


export function LeadsTab() {
  const { leads, activeFolder } = useCrmStore();
  const router = useRouter();

  // Apply activeFolder filter
  const filteredLeads = leads.filter(l => {
    if (activeFolder === 'hot_leads') return l.isHot && l.stage !== 'WON' && l.stage !== 'LOST';
    if (activeFolder === 'qualified_leads') return l.stage === 'QUALIFIED';
    return l.stage !== 'WON' && l.stage !== 'LOST'; // all_leads
  });

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">
          {activeFolder === 'hot_leads' ? 'Hot Leads' : activeFolder === 'qualified_leads' ? 'Qualified Leads' : 'All Leads'}
        </h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="w-64 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
          <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="h-9 px-4 bg-[#121212] border border-neutral-800 rounded flex items-center gap-2 text-sm text-white hover:bg-neutral-800">
            <Filter className="w-4 h-4 text-neutral-400" />
            Filters
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] sticky top-0 z-10">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest border-b border-neutral-800">
                <th className="px-6 py-4 font-medium flex items-center gap-2">LEAD NAME <ArrowUpDown className="w-3 h-3" /></th>
                <th className="px-6 py-4 font-medium">CONTACT</th>
                <th className="px-6 py-4 font-medium">SOURCE</th>
                <th className="px-6 py-4 font-medium">BUDGET</th>
                <th className="px-6 py-4 font-medium">EXECUTIVE</th>
                <th className="px-6 py-4 font-medium">SCORE</th>
                <th className="px-6 py-4 font-medium">STAGE</th>
                <th className="px-6 py-4 font-medium text-right">ACTIONS</th>
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
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-[#00E5FF] font-medium text-xs">
                        {lead.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-white">{lead.name}</div>
                        <div className="text-[10px] text-neutral-500 mt-0.5">ID: {lead.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-neutral-300 text-xs">
                        <Phone className="w-3 h-3 text-neutral-500" /> {lead.phone}
                      </div>
                      <div className="flex items-center gap-2 text-neutral-500 text-xs">
                        <Mail className="w-3 h-3" /> {lead.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-400">{lead.source}</td>
                  <td className="px-6 py-4 text-white font-medium">${(lead.budget / 1000000).toFixed(1)}M</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-neutral-300">
                      <User className="w-3 h-3 text-neutral-500" />
                      {lead.assignedExecutive}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-neutral-800 rounded-full h-1.5 max-w-[60px]">
                        <div className="bg-[#00E5FF] h-1.5 rounded-full" style={{ width: `${lead.score}%` }}></div>
                      </div>
                      <span className="text-xs text-[#00E5FF] font-medium">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                      {lead.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="p-1.5 hover:bg-neutral-700 rounded text-neutral-400 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-neutral-500">
                    No leads found matching current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
          <div>Showing 1 to {Math.min(filteredLeads.length, 20)} of {filteredLeads.length} leads</div>
          <div className="flex gap-1">
            <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="px-3 py-1.5 rounded border border-neutral-800 hover:bg-neutral-800 disabled:opacity-50">Previous</button>
            <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="px-3 py-1.5 rounded border border-neutral-800 hover:bg-neutral-800 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
