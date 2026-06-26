'use client';

import { useCrmStore } from '@/store/crmStore';
import { Search, Filter, Phone, Mail, User, Trash, Copy, Edit, MoreHorizontal, CheckSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useState } from 'react';

export function AllLeadsView() {
  const { leads } = useCrmStore();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    lead.phone.includes(searchQuery) || 
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (lead.interestedProjectId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.stage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">All Leads Database</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search database..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
          <button onClick={() => toast('Filters opened', { description: 'Advanced filtering modal would appear here.'})} className="h-9 px-4 bg-[#121212] border border-neutral-800 rounded flex items-center gap-2 text-sm text-white hover:bg-neutral-800 transition-colors">
            <Filter className="w-4 h-4 text-neutral-400" />
            Filters
          </button>
        </div>
      </div>

      {/* Bulk Actions Bar (Mocked UI) */}
      <div className="bg-[#1A1C20] border border-neutral-800 rounded-t p-3 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-neutral-400">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-neutral-600" />
            <span>0 selected</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => toast.info('Bulk Assign Initiated', { description: 'Select an executive to assign selected leads.'})} className="px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 rounded border border-neutral-800 transition-colors">Bulk Assign</button>
          <button onClick={() => toast.info('Status Change Initiated', { description: 'Select a new pipeline stage for the selected leads.'})} className="px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 rounded border border-neutral-800 transition-colors">Change Status</button>
          <button onClick={() => toast.error('Bulk Delete', { description: 'Are you sure you want to delete these leads?'})} className="px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded border border-red-500/20 transition-colors">Bulk Delete</button>
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border-x border-b border-neutral-800 rounded-b overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] sticky top-0 z-10">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest border-b border-neutral-800">
                <th className="px-4 py-4 w-10"><CheckSquare className="w-4 h-4 text-neutral-600 cursor-pointer hover:text-white" onClick={() => toast('Select All toggled')} /></th>
                <th className="px-6 py-4 font-medium">LEAD NAME</th>
                <th className="px-6 py-4 font-medium">CONTACT</th>
                <th className="px-6 py-4 font-medium">SOURCE</th>
                <th className="px-6 py-4 font-medium">PROJECT</th>
                <th className="px-6 py-4 font-medium">BUDGET</th>
                <th className="px-6 py-4 font-medium">STATUS</th>
                <th className="px-6 py-4 font-medium">EXECUTIVE</th>
                <th className="px-6 py-4 font-medium">SCORE</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.slice((page - 1) * 20, page * 20).map(lead => (
                <tr 
                  key={lead.id} 
                  onClick={() => router.push(`/crm/leads/${lead.id}`)}
                  className="border-b border-neutral-800/50 hover:bg-[#1A1C20] cursor-pointer transition-colors"
                >
                  <td className="px-4 py-4" onClick={(e) => { e.stopPropagation(); toast('Row selected'); }}><CheckSquare className="w-4 h-4 text-neutral-700 hover:text-neutral-500 cursor-pointer transition-colors" /></td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{lead.name}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{lead.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-neutral-300 text-xs"><Phone className="w-3 h-3 text-neutral-500" /> {lead.phone}</div>
                      <div className="flex items-center gap-2 text-neutral-500 text-xs"><Mail className="w-3 h-3" /> {lead.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-400">{lead.source}</td>
                  <td className="px-6 py-4 text-neutral-300">{lead.interestedProjectId || 'N/A'}</td>
                  <td className="px-6 py-4 text-white font-medium">${(lead.budget / 1000000).toFixed(1)}M</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                      {lead.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-neutral-300">
                      <User className="w-3 h-3 text-neutral-500" />
                      {lead.assignedExecutive}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#00E5FF] font-medium">{lead.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
          <div>Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, filteredLeads.length)} of {filteredLeads.length} leads</div>
          <div className="flex gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1.5 rounded border border-neutral-800 hover:bg-neutral-800 transition-colors">Previous</button>
            <button onClick={() => setPage(p => Math.min(Math.ceil(filteredLeads.length/20), p + 1))} className="px-3 py-1.5 rounded border border-neutral-800 hover:bg-neutral-800 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
