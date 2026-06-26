'use client';

import React, { useState } from 'react';
import { useComplianceStore } from '@/store/complianceStore';
import { AlertTriangle, ShieldAlert, CheckCircle2, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { QuickFilterMenu } from '@/components/ui/QuickFilterMenu';

export default function ComplianceRiskAssessment() {
  const { kycRecords, exceptions } = useComplianceStore();
  const [activeTab, setActiveTab] = useState<'risk' | 'exceptions'>('risk');
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('All Risk Levels');

  const filteredRecords = kycRecords.filter(record => {
    const matchesSearch = !searchTerm || record.id.toLowerCase().includes(searchTerm.toLowerCase()) || record.status.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'All Risk Levels' || record.riskLevel.toLowerCase() === riskFilter.toLowerCase();
    return matchesSearch && matchesRisk;
  });

  const highRiskRecords = kycRecords.filter(r => r.riskLevel === 'High' || r.riskLevel === 'Critical');

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldAlert className="text-brand-blue" />
            Compliance & Risk Management
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">Customer risk assessment engine and exception management.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-[#1A2533] p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('risk')}
          className={`px-6 py-2 rounded-md text-sm font-bold transition-colors ${
            activeTab === 'risk' ? 'bg-brand-blue text-[#111111]' : 'text-[#A1A1AA] hover:text-white'
          }`}
        >
          Risk Engine
        </button>
        <button
          onClick={() => setActiveTab('exceptions')}
          className={`px-6 py-2 rounded-md text-sm font-bold transition-colors ${
            activeTab === 'exceptions' ? 'bg-brand-blue text-[#111111]' : 'text-[#A1A1AA] hover:text-white'
          }`}
        >
          Exceptions Management
        </button>
      </div>

      <div className="flex-1 bg-[#161616] border border-[#2A2A30] rounded-xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[#2A2A30] flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${activeTab}...`}
              className="w-full bg-[#111111] border border-[#2A2A30] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>
          <QuickFilterMenu value={riskFilter} onChange={setRiskFilter} options={['All Risk Levels', 'Low', 'Medium', 'High', 'Critical']} />
        </div>

        <div className="overflow-x-auto flex-1">
          {activeTab === 'risk' && (
            <table className="w-full text-left text-sm">
              <thead className="bg-[#1E1E22] text-[#A1A1AA] font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">KYC ID</th>
                  <th className="px-6 py-4">Risk Level</th>
                  <th className="px-6 py-4">Compliance Score</th>
                  <th className="px-6 py-4">Status</th>
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
                        record.riskLevel === 'Low' ? 'text-emerald-400' :
                        record.riskLevel === 'Medium' ? 'text-amber-400' :
                        'text-rose-400'
                      }`}>
                        {record.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-white">{record.complianceScore}%</td>
                    <td className="px-6 py-4 text-[#A1A1AA]">{record.status}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-3 py-1 bg-[#2A2A30] hover:bg-[#3A3A40] text-white text-xs font-semibold rounded transition-colors">
                        Assess Risk
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'exceptions' && (
            <table className="w-full text-left text-sm">
              <thead className="bg-[#1E1E22] text-[#A1A1AA] font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Exception ID</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A30]">
                {exceptions.map((exc) => (
                  <tr key={exc.id} className="hover:bg-[#1E1E22]/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{exc.id}</td>
                    <td className="px-6 py-4 text-[#A1A1AA]">{exc.type}</td>
                    <td className="px-6 py-4 text-[#A1A1AA]">{exc.description}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        exc.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' :
                        exc.status === 'Resolved' || exc.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' :
                        'bg-rose-500/20 text-rose-400'
                      }`}>
                        {exc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="px-3 py-1 bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20 text-xs font-semibold rounded transition-colors">
                        Override
                      </button>
                      <button className="px-3 py-1 bg-[#2A2A30] hover:bg-[#3A3A40] text-white text-xs font-semibold rounded transition-colors">
                        Escalate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
