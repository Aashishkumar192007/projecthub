'use client';

import React, { useState } from 'react';
import { useAgreementStore } from '@/store/agreementStore';
import { FileSignature, Send, Filter, Search, CheckCircle2, Clock, XCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { QuickFilterMenu } from '@/components/ui/QuickFilterMenu';

export default function ESignatureEngine() {
  const { signatureRequests } = useAgreementStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  const stats = {
    total: signatureRequests.length,
    completed: signatureRequests.filter(r => r.status === 'Completed').length,
    pending: signatureRequests.filter(r => ['Sent', 'Viewed', 'Partially Signed'].includes(r.status)).length,
    expired: signatureRequests.filter(r => r.status === 'Expired').length,
  };

  const filteredRequests = signatureRequests.filter(r => {
    const matchesSearch = r.documentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.signerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    if (statusFilter === 'All Statuses') return matchesSearch;
    return matchesSearch && r.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileSignature className="text-brand-blue" />
            E-Signature Engine
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">Track and manage all electronic signature requests.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/agreements" className="px-4 py-2 bg-[#1A2533] border border-brand-blue/30 text-brand-blue font-semibold rounded hover:bg-brand-blue hover:text-[#111111] transition-colors flex items-center gap-2">
            View Agreements
          </Link>
          <button className="px-4 py-2 bg-brand-blue text-[#111111] font-bold rounded hover:bg-white transition-colors flex items-center gap-2">
            <Send size={16} />
            New Signature Request
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Requests', value: stats.total, icon: FileSignature, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Expired', value: stats.expired, icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
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
              placeholder="Search signature requests..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111111] border border-[#2A2A30] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>
          <QuickFilterMenu value={statusFilter} onChange={setStatusFilter} options={['All Statuses', 'Completed', 'Sent', 'Viewed', 'Expired']} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1E1E22] text-[#A1A1AA] font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Request ID</th>
                <th className="px-6 py-4">Document</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Sent At</th>
                <th className="px-6 py-4">Expires</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A30]">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-[#1E1E22]/50 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{req.id}</td>
                  <td className="px-6 py-4">
                    <Link href={`/agreements/${req.agreementId}`} className="text-brand-blue hover:underline">
                      {req.documentName}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${
                      req.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' :
                      req.status === 'Sent' || req.status === 'Viewed' ? 'bg-brand-blue/20 text-brand-blue' :
                      req.status === 'Partially Signed' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-rose-500/20 text-rose-400'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#A1A1AA]" suppressHydrationWarning>{req.sentAt ? req.sentAt.split('T')[0] : ''}</td>
                  <td className="px-6 py-4 text-[#A1A1AA]" suppressHydrationWarning>{req.expiresAt ? req.expiresAt.split('T')[0] : ''}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="px-3 py-1 bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20 text-xs font-semibold rounded transition-colors">
                      Remind
                    </button>
                    <button className="px-3 py-1 bg-[#2A2A30] hover:bg-[#3A3A40] text-white text-xs font-semibold rounded transition-colors">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#A1A1AA]">
                    <FileSignature size={48} className="mx-auto mb-4 text-[#2A2A30]" />
                    <p>No signature requests found.</p>
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
