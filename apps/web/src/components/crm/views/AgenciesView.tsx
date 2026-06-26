'use client';

import { useCrmStore } from '@/store/crmStore';
import { Search, Building2, Users, DollarSign, Award, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function AgenciesView() {
  const { agencies, brokers } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgencies = agencies.filter(agency => 
    agency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalAgencies = agencies.length;
  const networkSize = brokers.filter(b => b.agencyId).length;
  const totalRevenue = agencies.reduce((acc, a) => acc + a.totalRevenue, 0);
  const activeAgencies = agencies.filter(a => a.status === 'ACTIVE').length;

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-white tracking-wide">Agency Command Center</h2>
          <p className="text-sm text-neutral-500 mt-1">Manage corporate channel partners and brokerages</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.info('Add Agency', { description: 'Opening add agency form...' })} className="h-9 px-4 bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0A1A2A] rounded flex items-center gap-2 text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            Add Agency
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <Building2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Agencies</span>
          </div>
          <div className="text-2xl font-medium text-white">{totalAgencies}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-blue-400 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Network Size</span>
          </div>
          <div className="text-2xl font-medium text-white">{networkSize} <span className="text-sm text-neutral-500 font-normal">brokers</span></div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-green-400 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Pipeline Value</span>
          </div>
          <div className="text-2xl font-medium text-white">${(totalRevenue / 1000000).toFixed(1)}M</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-amber-400 mb-2">
            <Award className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Active Partners</span>
          </div>
          <div className="text-2xl font-medium text-white">{activeAgencies}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search agencies..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
          />
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] border-b border-neutral-800">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">AGENCY NAME</th>
                <th className="px-6 py-4 font-medium">TIER</th>
                <th className="px-6 py-4 font-medium">BROKERS</th>
                <th className="px-6 py-4 font-medium">COMMISSION SPLIT</th>
                <th className="px-6 py-4 font-medium">REVENUE</th>
                <th className="px-6 py-4 font-medium">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgencies.map(agency => {
                const agencyBrokersCount = brokers.filter(b => b.agencyId === agency.id).length;
                return (
                  <tr key={agency.id} onClick={() => toast.info('Agency Details', { description: `Opening details for ${agency.name}`})} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{agency.name}</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">{agency.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded ${
                        agency.tier === 'PLATINUM' ? 'text-[#E5E4E2] bg-[#E5E4E2]/10 border border-[#E5E4E2]/20' :
                        agency.tier === 'GOLD' ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' :
                        'text-neutral-300 bg-neutral-700/50 border border-neutral-600'
                      }`}>
                        {agency.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white font-medium flex items-center gap-2">
                      <Users className="w-3 h-3 text-neutral-500" />
                      {agencyBrokersCount}
                    </td>
                    <td className="px-6 py-4 text-[#00E5FF] font-medium">{agency.commissionSplit}%</td>
                    <td className="px-6 py-4 text-green-400 font-medium">
                      ${(agency.totalRevenue / 1000000).toFixed(2)}M
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${
                        agency.status === 'ACTIVE' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-neutral-800 text-neutral-500 border-neutral-700'
                      }`}>
                        {agency.status}
                      </span>
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
