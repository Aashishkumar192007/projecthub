'use client';

import { useCrmStore } from '@/store/crmStore';
import { MapPin, Clock, CalendarIcon } from 'lucide-react';

export function GlobalSiteVisitsTab() {
  const { siteVisits, leads } = useCrmStore();

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">All Site Visits</h2>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-[#1A1C20] border-b border-neutral-800">
            <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              <th className="px-6 py-4 font-medium">VISIT ID / LEAD</th>
              <th className="px-6 py-4 font-medium">PROJECT</th>
              <th className="px-6 py-4 font-medium text-right">DATE & TIME</th>
              <th className="px-6 py-4 font-medium text-right">EXECUTIVE</th>
              <th className="px-6 py-4 font-medium text-right">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {siteVisits.map(visit => {
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
