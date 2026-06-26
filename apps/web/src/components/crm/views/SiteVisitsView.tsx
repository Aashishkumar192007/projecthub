'use client';

import { useCrmStore } from '@/store/crmStore';
import { MapPin, Clock, CalendarIcon, CheckCircle, XCircle, Search } from 'lucide-react';

import { useState } from 'react';

export function SiteVisitsView() {
  const { siteVisits, leads, updateSiteVisitStatus } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVisits = siteVisits.filter(visit => {
    const lead = leads.find(l => l.id === visit.leadId);
    const searchString = `${lead?.name} ${visit.projectId} ${visit.executive} ${visit.id}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  const total = filteredVisits.length;
  const completed = filteredVisits.filter(v => v.status === 'COMPLETED').length;
  const noShows = filteredVisits.filter(v => v.status === 'CANCELLED').length;
  const convRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;
  const noShowRate = total > 0 ? ((noShows / total) * 100).toFixed(1) : 0;

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">Site Visits Management</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search visits..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Visit Conversion Rate</div>
          <div className="text-2xl font-medium text-green-400">{convRate}%</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">No Show Rate</div>
          <div className="text-2xl font-medium text-red-400">{noShowRate}%</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Today's Visits</div>
          <div className="text-2xl font-medium text-white">
            {siteVisits.filter(v => new Date(v.date).toDateString() === new Date().toDateString()).length}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] border-b border-neutral-800">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">VISIT ID / LEAD</th>
                <th className="px-6 py-4 font-medium">PROJECT</th>
                <th className="px-6 py-4 font-medium text-right">DATE & TIME</th>
                <th className="px-6 py-4 font-medium text-right">EXECUTIVE</th>
                <th className="px-6 py-4 font-medium text-right">STATUS</th>
                <th className="px-6 py-4 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisits.map(visit => {
                const lead = leads.find(l => l.id === visit.leadId);
                return (
                  <tr key={visit.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{lead?.name || 'Unknown Lead'}</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">{visit.id}</div>
                    </td>
                    <td className="px-6 py-4 text-neutral-300">
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-neutral-500"/>{visit.projectId}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 text-white"><CalendarIcon className="w-3 h-3 text-neutral-500"/>{new Date(visit.date).toLocaleDateString()}</div>
                      <div className="flex items-center justify-end gap-2 text-neutral-400 mt-0.5"><Clock className="w-3 h-3 text-neutral-500"/>{visit.time}</div>
                    </td>
                    <td className="px-6 py-4 text-right text-neutral-300">{visit.executive}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${
                        visit.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                        visit.status === 'CANCELLED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {visit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {visit.status === 'SCHEDULED' && (
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => updateSiteVisitStatus(visit.id, 'COMPLETED')} className="w-7 h-7 rounded bg-green-500/10 hover:bg-green-500/20 text-green-400 flex items-center justify-center transition-colors">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button onClick={() => updateSiteVisitStatus(visit.id, 'CANCELLED')} className="w-7 h-7 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
