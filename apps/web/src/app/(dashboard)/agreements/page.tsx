'use client';

import React, { useState } from 'react';
import { useAgreementStore } from '@/store/agreementStore';
import { BookCheck, Search, Filter, FileSignature, Plus } from 'lucide-react';
import Link from 'next/link';
import { QuickFilterMenu } from '@/components/ui/QuickFilterMenu';

export default function AgreementManagementSystem() {
  const { agreements } = useAgreementStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  const filteredAgreements = agreements.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      a.id.toLowerCase().includes(searchTerm.toLowerCase());
    if (statusFilter === 'All Statuses') return matchesSearch;
    return matchesSearch && a.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookCheck className="text-brand-blue" />
            Agreement Management System
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">Manage, review, and track all real estate agreements and contracts.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/document-generator" className="px-4 py-2 bg-[#1A2533] border border-brand-blue/30 text-brand-blue font-semibold rounded hover:bg-brand-blue hover:text-[#111111] transition-colors flex items-center gap-2">
            <FileSignature size={16} />
            Document Generator
          </Link>
          <button className="px-4 py-2 bg-brand-blue text-[#111111] font-bold rounded hover:bg-white transition-colors flex items-center gap-2">
            <Plus size={18} />
            New Agreement
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#161616] border border-[#2A2A30] rounded-xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[#2A2A30] flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
            <input 
              type="text" 
              placeholder="Search agreements..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111111] border border-[#2A2A30] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>
          <QuickFilterMenu value={statusFilter} onChange={setStatusFilter} options={['All Statuses', 'Completed', 'Sent for Signature', 'Pending Review']} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1E1E22] text-[#A1A1AA] font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">ID / Title</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Version</th>
                <th className="px-6 py-4">Updated</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A30]">
              {filteredAgreements.map((agreement) => (
                <tr key={agreement.id} className="hover:bg-[#1E1E22]/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/agreements/${agreement.id}`} className="text-brand-blue hover:underline font-bold block mb-0.5">
                      {agreement.title}
                    </Link>
                    <span className="text-xs text-[#A1A1AA]">{agreement.id}</span>
                  </td>
                  <td className="px-6 py-4 text-white font-medium">{agreement.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${
                      agreement.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' :
                      agreement.status === 'Sent for Signature' ? 'bg-brand-blue/20 text-brand-blue' :
                      agreement.status === 'Pending Review' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-[#2A2A30] text-[#A1A1AA]'
                    }`}>
                      {agreement.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#A1A1AA]">v{agreement.version}</td>
                  <td className="px-6 py-4 text-[#A1A1AA]" suppressHydrationWarning>{agreement.updatedAt ? agreement.updatedAt.split('T')[0] : ''}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/agreements/${agreement.id}`} className="px-3 py-1.5 bg-[#2A2A30] text-white text-xs font-semibold rounded hover:bg-[#3A3A40] transition-colors">
                      Open Workspace
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredAgreements.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#A1A1AA]">
                    <BookCheck size={48} className="mx-auto mb-4 text-[#2A2A30]" />
                    <p>No agreements found.</p>
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
