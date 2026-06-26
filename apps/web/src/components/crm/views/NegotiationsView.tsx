'use client';

import { useCrmStore } from '@/store/crmStore';
import { Briefcase, CheckCircle, XCircle, Search } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';


export function NegotiationsView() {
  const { negotiations, leads, updateNegotiationStatus, startNegotiation } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNegotiations = negotiations.filter(neg => {
    const lead = leads.find(l => l.id === neg.leadId);
    const searchString = `${lead?.name} ${neg.unitId} ${neg.status} ${neg.id}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  const totalValue = filteredNegotiations.reduce((sum, n) => sum + n.quotedPrice, 0);
  const pendingValue = filteredNegotiations.filter(n => n.status === 'PENDING').reduce((sum, n) => sum + n.quotedPrice, 0);

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">Negotiation Pipeline</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search negotiations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Total Value in Negotiation</div>
          <div className="text-2xl font-medium text-white">${(totalValue / 1000000).toFixed(2)}M</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Pending Approvals</div>
          <div className="text-2xl font-medium text-amber-400">${(pendingValue / 1000000).toFixed(2)}M</div>
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] border-b border-neutral-800">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">LEAD / NEG ID</th>
                <th className="px-6 py-4 font-medium">UNIT</th>
                <th className="px-6 py-4 font-medium text-right">ASKING PRICE</th>
                <th className="px-6 py-4 font-medium text-right">OFFERED PRICE</th>
                <th className="px-6 py-4 font-medium text-right">DISCOUNT %</th>
                <th className="px-6 py-4 font-medium text-right">STATUS</th>
                <th className="px-6 py-4 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredNegotiations.map(neg => {
                const lead = leads.find(l => l.id === neg.leadId);
                return (
                  <tr key={neg.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{lead?.name || 'Unknown Lead'}</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">{neg.id}</div>
                    </td>
                    <td className="px-6 py-4 text-neutral-300">
                      <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-neutral-500"/>{neg.unitId}</div>
                    </td>
                    <td className="px-6 py-4 text-right text-neutral-300">${(neg.quotedPrice / 1000000).toFixed(2)}M</td>
                    <td className="px-6 py-4 text-right text-white font-medium">${(neg.offerPrice / 1000000).toFixed(2)}M</td>
                    <td className="px-6 py-4 text-right text-red-400 font-medium">{neg.discountPercentage.toFixed(1)}%</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${
                        neg.status === 'APPROVED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                        neg.status === 'REJECTED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {neg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {neg.status === 'PENDING' && (
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => updateNegotiationStatus(neg.id, 'APPROVED')} className="px-3 py-1 text-xs font-medium rounded bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-colors">
                            Approve
                          </button>
                          <button onClick={() => updateNegotiationStatus(neg.id, 'REJECTED')} className="px-3 py-1 text-xs font-medium rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors">
                            Reject
                          </button>
                        </div>
                      )}
                      {neg.status === 'APPROVED' && (
                        <button onClick={(e) => { e.stopPropagation(); useCrmStore.getState().openGlobalModal('Requested Action'); }} className="px-3 py-1 text-xs font-medium rounded bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 text-[#00E5FF] transition-colors">
                          Convert to Booking
                        </button>
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
