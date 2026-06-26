'use client';

import { useCrmStore } from '@/store/crmStore';
import { Search, Plus, Megaphone, Target, DollarSign, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';


export function CampaignsView() {
  const { campaigns } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = campaigns.filter(camp => 
    camp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    camp.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leadsGenerated, 0);
  const totalBookings = campaigns.reduce((sum, c) => sum + c.bookings, 0);
  const avgRoi = totalSpend > 0 ? ((totalRevenue - totalSpend) / totalSpend) * 100 : 0;
  const avgCpl = totalLeads > 0 ? totalSpend / totalLeads : 0;

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">Campaign Command Center</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
          <button onClick={(e) => { e.stopPropagation(); useCrmStore.getState().openGlobalModal('Requested Action'); }} className="bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0A1A2A] px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-6">
        <div className="bg-[#121212] border border-neutral-800 rounded p-4 border-l-2 border-l-[#00E5FF]">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-1"><Megaphone className="w-3 h-3"/> ACTIVE</div>
          <div className="text-2xl font-medium text-white">{campaigns.filter(c => c.status === 'ACTIVE').length}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4 border-l-2 border-l-blue-400">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-1"><Target className="w-3 h-3"/> LEADS</div>
          <div className="text-2xl font-medium text-white">{totalLeads.toLocaleString()}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4 border-l-2 border-l-amber-400">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-1"><BarChart3 className="w-3 h-3"/> BOOKINGS</div>
          <div className="text-2xl font-medium text-white">{totalBookings.toLocaleString()}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4 border-l-2 border-l-green-400">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-1"><DollarSign className="w-3 h-3"/> REVENUE</div>
          <div className="text-2xl font-medium text-white">${(totalRevenue / 1000000).toFixed(1)}M</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4 border-l-2 border-l-purple-400">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-1">AVG ROI</div>
          <div className="text-2xl font-medium text-white">{avgRoi.toFixed(0)}%</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4 border-l-2 border-l-red-400">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-1">AVG CPL</div>
          <div className="text-2xl font-medium text-white">${avgCpl.toFixed(0)}</div>
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-[#1A1C20] border-b border-neutral-800">
            <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              <th className="px-6 py-4 font-medium">CAMPAIGN NAME</th>
              <th className="px-6 py-4 font-medium">TYPE</th>
              <th className="px-6 py-4 font-medium text-right">SPEND</th>
              <th className="px-6 py-4 font-medium text-right">LEADS</th>
              <th className="px-6 py-4 font-medium text-right">BOOKINGS</th>
              <th className="px-6 py-4 font-medium text-right">REVENUE</th>
              <th className="px-6 py-4 font-medium text-right">ROI</th>
              <th className="px-6 py-4 font-medium text-right">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns.map(camp => (
              <tr key={camp.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors cursor-pointer">
                <td className="px-6 py-4">
                  <div className="font-medium text-[#00E5FF] hover:underline">{camp.name}</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">{camp.id}</div>
                </td>
                <td className="px-6 py-4 text-neutral-300">{camp.platform}</td>
                <td className="px-6 py-4 text-right text-red-400 font-medium">${camp.spend.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-white">{camp.leadsGenerated}</td>
                <td className="px-6 py-4 text-right text-white">{camp.bookings}</td>
                <td className="px-6 py-4 text-right text-green-400 font-medium">${(camp.revenue / 1000000).toFixed(2)}M</td>
                <td className="px-6 py-4 text-right text-amber-400">{camp.roi.toFixed(1)}%</td>
                <td className="px-6 py-4 text-right">
                  <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${
                    camp.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                    camp.status === 'PAUSED' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-neutral-800 text-neutral-500 border-neutral-700'
                  }`}>
                    {camp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
