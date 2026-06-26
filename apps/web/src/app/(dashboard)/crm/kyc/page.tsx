'use client';

import React, { useState } from 'react';
import { useComplianceStore } from '@/store/complianceStore';
import { ShieldCheck, Clock, CheckCircle2, AlertTriangle, FileWarning, Search, Filter, MoreVertical, Download } from 'lucide-react';
import Link from 'next/link';
import { QuickFilterMenu } from '@/components/ui/QuickFilterMenu';

export default function KYCCommandCenter() {
  const { kycRecords } = useComplianceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  const stats = {
    pending: kycRecords.filter(r => r.status === 'Pending').length,
    verified: kycRecords.filter(r => r.status === 'Verified').length,
    rejected: kycRecords.filter(r => r.status === 'Rejected').length,
    highRisk: kycRecords.filter(r => r.riskLevel === 'High' || r.riskLevel === 'Critical').length,
    avgScore: Math.round(kycRecords.reduce((acc, curr) => acc + curr.complianceScore, 0) / (kycRecords.length || 1)),
  };

  const filteredRecords = (kycRecords || []).filter(r => {
    const matchesSearch = (r.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
      (r.id || '').toLowerCase().includes(searchTerm.toLowerCase());
    if (statusFilter === 'All Statuses') return matchesSearch;
    return matchesSearch && (r.status || '').toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="text-brand-blue" />
            KYC Command Center
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">Centralized KYC management and compliance tracking.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#1A2533] border border-brand-blue/30 text-brand-blue font-semibold rounded hover:bg-brand-blue hover:text-[#111111] transition-colors flex items-center gap-2">
            <Download size={16} />
            Export Report
          </button>
          <button className="px-4 py-2 bg-brand-blue text-[#111111] font-bold rounded hover:bg-white transition-colors">
            + New KYC Request
          </button>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'Pending KYC', value: stats.pending, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Verified KYC', value: stats.verified, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'High Risk', value: stats.highRisk, icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
          { label: 'Rejected', value: stats.rejected, icon: FileWarning, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Avg Compliance Score', value: `${stats.avgScore}%`, icon: ShieldCheck, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
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

      {/* Grid */}
      <div className="flex-1 bg-[#161616] border border-[#2A2A30] rounded-xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[#2A2A30] flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
            <input 
              type="text" 
              placeholder="Search KYC records..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111111] border border-[#2A2A30] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>
          <QuickFilterMenu value={statusFilter} onChange={setStatusFilter} options={['All Statuses', 'Verified', 'Pending', 'Rejected']} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1E1E22] text-[#A1A1AA] font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Risk Level</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Verification</th>
                <th className="px-6 py-4">Assigned To</th>
                <th className="px-6 py-4">Updated</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A30]">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-[#1E1E22]/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/crm/kyc/${record.id}`} className="text-brand-blue hover:underline font-medium">
                      {record.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                      record.status === 'Verified' ? 'bg-emerald-500/20 text-emerald-400' :
                      record.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-[#2A2A30] text-[#A1A1AA]'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                      record.riskLevel === 'Low' ? 'text-emerald-400' :
                      record.riskLevel === 'Medium' ? 'text-amber-400' :
                      'text-rose-400'
                    }`}>
                      {record.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-white">{record.complianceScore}%</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-[#2A2A30] h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${record.verificationPercentage === 100 ? 'bg-emerald-500' : 'bg-brand-blue'}`}
                          style={{ width: `${record.verificationPercentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#A1A1AA]">{record.verificationPercentage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#A1A1AA]">{record.assignedOfficer}</td>
                  <td className="px-6 py-4 text-[#A1A1AA]" suppressHydrationWarning>{record.lastUpdated ? record.lastUpdated.split('T')[0] : ''}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-[#2A2A30] rounded text-[#A1A1AA] transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-[#A1A1AA]">
                    No KYC records found.
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
