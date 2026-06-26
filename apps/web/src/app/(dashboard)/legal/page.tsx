'use client';

import React, { useState } from 'react';
import { useLegalStore } from '@/store/legalStore';
import { ShieldCheck, Search, Filter, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';
import { QuickFilterMenu } from '@/components/ui/QuickFilterMenu';

export default function LegalReviewWorkspace() {
  const { legalCases } = useLegalStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  const filteredCases = legalCases.filter(lc => {
    const matchesSearch = lc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      lc.type.toLowerCase().includes(searchTerm.toLowerCase());
    if (statusFilter === 'All Statuses') return matchesSearch;
    return matchesSearch && lc.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="text-brand-blue" />
            Legal Review Workspace
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">Manage pending legal reviews, agreements, disputes, and approvals.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending Reviews', value: legalCases.filter(c => c.status === 'Open' || c.status === 'Under Review').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Exceptions', value: legalCases.filter(c => c.type === 'Exception Approval').length, icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
          { label: 'Approved Cases', value: legalCases.filter(c => c.status === 'Approved').length, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Total Cases', value: legalCases.length, icon: ShieldCheck, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#161616] border border-[#2A2A30] rounded-lg p-4 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-[#161616] border border-[#2A2A30] rounded-xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[#2A2A30] flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
            <input 
              type="text" 
              placeholder="Search legal cases..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111111] border border-[#2A2A30] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>
          <QuickFilterMenu value={statusFilter} onChange={setStatusFilter} options={['All Statuses', 'Open', 'In Review', 'Resolved']} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1E1E22] text-[#A1A1AA] font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Case ID</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Assigned To</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A30]">
              {filteredCases.map((lc) => (
                <tr key={lc.id} className="hover:bg-[#1E1E22]/50 transition-colors">
                  <td className="px-6 py-4 text-brand-blue font-medium">{lc.id}</td>
                  <td className="px-6 py-4 text-white font-medium">{lc.title}</td>
                  <td className="px-6 py-4 text-[#A1A1AA]">{lc.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${
                      lc.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' :
                      lc.status === 'Under Review' || lc.status === 'Open' ? 'bg-amber-500/20 text-amber-400' :
                      lc.status === 'Closed' ? 'bg-[#2A2A30] text-[#A1A1AA]' :
                      'bg-rose-500/20 text-rose-400'
                    }`}>
                      {lc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#A1A1AA]">{lc.assignedLawyer || 'Unassigned'}</td>
                  <td className="px-6 py-4 text-[#A1A1AA]" suppressHydrationWarning>{lc.dueDate ? lc.dueDate.split('T')[0] : ''}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-3 py-1.5 bg-[#2A2A30] text-white text-xs font-semibold rounded hover:bg-[#3A3A40] transition-colors">
                      Review Case
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCases.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#A1A1AA]">
                    <ShieldCheck size={48} className="mx-auto mb-4 text-[#2A2A30]" />
                    <p>No legal cases found.</p>
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
