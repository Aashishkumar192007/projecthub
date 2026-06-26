'use client';

import { useCrmStore } from '@/store/crmStore';
import { Search, FolderKanban, CheckCircle, Target, Percent, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function ProjectAllocationsView() {
  const { projectAllocations, brokers, agencies } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');

  const enrichedAllocations = projectAllocations.map(alloc => {
    const broker = alloc.brokerId ? brokers.find(b => b.id === alloc.brokerId) : null;
    const agency = alloc.agencyId ? agencies.find(a => a.id === alloc.agencyId) : null;
    
    return {
      ...alloc,
      partnerName: broker?.name || agency?.name || 'Unknown Partner',
      partnerType: broker ? 'Broker' : agency ? 'Agency' : 'Unknown',
    };
  }).filter(a => a.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) || a.projectId.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalAllocations = projectAllocations.length;
  const activeAllocations = projectAllocations.filter(a => a.status === 'ACTIVE').length;
  const totalQuota = projectAllocations.reduce((acc, a) => acc + a.inventoryQuota, 0);

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-white tracking-wide">Project Allocations</h2>
          <p className="text-sm text-neutral-500 mt-1">Manage exclusive inventory and special commissions for top partners</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.info('New Allocation', { description: 'Opening project allocation wizard...' })} className="h-9 px-4 bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0A1A2A] rounded flex items-center gap-2 text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            New Allocation
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <FolderKanban className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Allocations</span>
          </div>
          <div className="text-2xl font-medium text-white">{totalAllocations}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-green-400 mb-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Active</span>
          </div>
          <div className="text-2xl font-medium text-white">{activeAllocations}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-amber-400 mb-2">
            <Target className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Unit Quota</span>
          </div>
          <div className="text-2xl font-medium text-white">{totalQuota}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-[#00E5FF] mb-2">
            <Percent className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Max Bonus Bracket</span>
          </div>
          <div className="text-2xl font-medium text-white">4.5%</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search partners or projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-80 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
          />
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] border-b border-neutral-800">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">PARTNER</th>
                <th className="px-6 py-4 font-medium">PROJECT</th>
                <th className="px-6 py-4 font-medium text-right">QUOTA (UNITS)</th>
                <th className="px-6 py-4 font-medium text-right">SPECIAL COMMISSION</th>
                <th className="px-6 py-4 font-medium">VALIDITY</th>
                <th className="px-6 py-4 font-medium text-center">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {enrichedAllocations.map(alloc => (
                <tr key={alloc.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{alloc.partnerName}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{alloc.partnerType}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-neutral-300">{alloc.projectId}</div>
                  </td>
                  <td className="px-6 py-4 text-right text-white font-medium">{alloc.inventoryQuota}</td>
                  <td className="px-6 py-4 text-right text-[#00E5FF] font-medium">{alloc.specialCommissionRate}%</td>
                  <td className="px-6 py-4 text-neutral-400">
                    <div className="text-xs">From: {new Date(alloc.validFrom).toLocaleDateString()}</div>
                    <div className="text-xs">To: {new Date(alloc.validUntil).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${
                      alloc.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      alloc.status === 'EXPIRED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      'bg-neutral-800 text-neutral-500 border-neutral-700'
                    }`}>
                      {alloc.status}
                    </span>
                  </td>
                </tr>
              ))}
              {enrichedAllocations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">
                    No project allocations found.
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
