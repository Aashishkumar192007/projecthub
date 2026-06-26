'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useResidentStore } from '@/store/residentStore';
import { ResidentNavigator } from '@/components/residents/ResidentNavigator';
import { ResidentAICopilot } from '@/components/residents/ResidentAICopilot';
import { Search, Filter, Download, MoreHorizontal, UserPlus, FileSpreadsheet, Loader2 } from 'lucide-react';
import { QuickFilterMenu } from '@/components/ui/QuickFilterMenu';

export default function ResidentsCommandCenter() {
  const router = useRouter();
  const { residents, fetchResidents, isLoading } = useResidentStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');

  useEffect(() => {
    fetchResidents();
  }, [fetchResidents]);

  const filteredResidents = residents.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.unitNumber.toLowerCase().includes(searchQuery.toLowerCase());
    if (typeFilter === 'All Types') return matchesSearch;
    return matchesSearch && r.type.toLowerCase() === typeFilter.toLowerCase();
  });

  return (
    <div className="flex h-[calc(100vh-64px)] bg-black text-white overflow-hidden">
      {/* Left Panel: Resident Navigator */}
      <ResidentNavigator />

      {/* Center Workspace: Enterprise Data Grid */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <div className="h-16 border-b border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-light tracking-wide text-white">Resident Command Center</h1>
            <div className="h-4 w-px bg-white/20"></div>
            <div className="text-sm text-white/50">{residents.length} Total Residents</div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search residents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all"
              />
            </div>
            <QuickFilterMenu value={typeFilter} onChange={setTypeFilter} options={['All Types', 'Owner', 'Tenant', 'Family']} />
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all">
              <FileSpreadsheet className="w-4 h-4" /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <UserPlus className="w-4 h-4" /> Add Resident
            </button>
          </div>
        </div>

        {/* Data Grid Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-white/50 uppercase bg-black/40 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 font-medium tracking-wider">Resident</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Unit & Building</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Type</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Move In Date</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Outstanding</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Health</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                  <th className="px-6 py-4 font-medium tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-white/50">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
                        <div>Loading residents...</div>
                      </div>
                    </td>
                  </tr>
                ) : filteredResidents.map((resident) => (
                  <tr 
                    key={resident.id} 
                    className="hover:bg-white/5 transition-colors group cursor-pointer"
                    onClick={() => router.push(`/residents/${resident.id}`)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-white/10 flex items-center justify-center text-emerald-300 font-medium shrink-0">
                          {resident.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white/90 font-medium group-hover:text-emerald-400 transition-colors">
                            {resident.name}
                          </div>
                          <div className="text-xs text-white/40 mt-0.5">{resident.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white/80 font-medium">{resident.unitNumber}</div>
                      <div className="text-xs text-white/40">{resident.buildingName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded border border-white/10 bg-white/5 text-xs text-white/70">
                        {resident.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/80" suppressHydrationWarning>
                      {resident.moveInDate ? resident.moveInDate.split('T')[0] : ''}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`font-medium ${resident.outstandingDues > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        ₹{resident.outstandingDues.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${resident.healthScore > 80 ? 'bg-emerald-500' : resident.healthScore > 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${resident.healthScore}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/60">{resident.healthScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          resident.status === 'Verified' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 
                          resident.status === 'Move-In Pending' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 
                          'bg-white/40'
                        }`} />
                        <span className="text-white/70">{resident.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        className="text-white/40 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Action menu
                        }}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredResidents.length === 0 && (
              <div className="p-12 text-center text-white/40">
                No residents found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel: AI Copilot */}
      <ResidentAICopilot />
    </div>
  );
}
