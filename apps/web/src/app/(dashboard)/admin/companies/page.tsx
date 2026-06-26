'use client';

import React, { useState } from 'react';
import { AdminNav } from '@/components/admin/AdminNav';
import { useEnterpriseStore } from '@/store/enterpriseStore';
import { 
  Building2, Layers, GitBranch, DollarSign, Globe, CheckCircle2, 
  Plus, ArrowRight, ShieldCheck, Sparkles, BarChart3
} from 'lucide-react';

export default function EnterpriseMultiCompanyPage() {
  const { companies, currentCompanyId, setCompany } = useEnterpriseStore();

  const entityHierarchy = [
    { name: 'Global REIT Holdings Group', type: 'Parent Group', juris: 'Cayman Islands', taxId: 'KY-992019', aum: '$14.8 Billion', curr: 'USD' },
    { name: 'EMEA Properties Syndicate Ltd', type: 'Holding Co', juris: 'London, UK', taxId: 'GB-440192', aum: '£4.2 Billion', curr: 'GBP' },
    { name: 'APAC Real Estate Trust', type: 'Operating Co', juris: 'Singapore', taxId: 'SG-109288', aum: 'S$6.5 Billion', curr: 'SGD' },
    { name: 'Dubai Marina Towers SPV', type: 'SPV Entity', juris: 'Dubai, UAE', taxId: 'AE-884102', aum: 'AED 3.8 Billion', curr: 'AED' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-16">
      <AdminNav activeTitle="MULTI-COMPANY & INSTITUTIONAL SYNDICATES" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-1 flex items-center gap-3">
              <Building2 className="text-brand-blue" /> True Multi-Entity Corporate Fabric
            </h2>
            <p className="text-xs text-[#A1A1AA]">Manage international REIT structures, inter-company billing, and consolidated institutional FX accounting.</p>
          </div>
          <button 
            onClick={() => alert('New Special Purpose Vehicle (SPV) registration wizard initialized across multi-cloud network.')}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-blue text-[#111111] rounded-lg text-xs font-bold hover:opacity-90 transition-all shadow-lg"
          >
            <Plus size={14} /> Register Sub-Entity
          </button>
        </div>

        {/* Hierarchy Tree Cards */}
        <div className="space-y-4 mb-12">
          <span className="text-xs font-bold text-[#71717A] uppercase tracking-wider block px-1">Institutional Ownership Tree</span>
          <div className="space-y-3 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-brand-blue/30">
            {entityHierarchy.map((item, idx) => {
              const margin = idx === 0 ? 'ml-0' : idx === 1 || idx === 2 ? 'ml-8' : 'ml-16';
              return (
                <div key={item.name} className={`${margin} relative z-10 flex items-center gap-4 transition-all hover:translate-x-1`}>
                  <div className="w-12 font-mono text-[10px] font-bold text-center py-1 rounded bg-[#1A1A24] border border-brand-blue/30 text-brand-blue">
                    TIER {idx+1}
                  </div>
                  <div className="flex-1 p-5 rounded-2xl bg-[#111111] border border-[#2A2A30] hover:border-[#3F3F46] flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white text-base">{item.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">{item.type}</span>
                      </div>
                      <div className="text-xs text-[#71717A] space-x-4 font-mono">
                        <span>Jurisdiction: <strong className="text-white font-sans">{item.juris}</strong></span>
                        <span>Tax ID: <strong className="text-neutral-300">{item.taxId}</strong></span>
                      </div>
                    </div>

                    <div className="text-right bg-[#16161C] px-4 py-2 rounded-xl border border-[#2A2A30]">
                      <span className="text-[10px] text-[#71717A] uppercase block font-mono">Consolidated AUM</span>
                      <span className="text-base font-extrabold text-emerald-400 font-mono">{item.aum}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Workspace Companies Selector */}
        <div className="bg-[#111111] rounded-2xl border border-[#2A2A30] p-8">
          <h3 className="text-lg font-bold text-white mb-6">Switch Active Portal Entity Scope</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {companies.map(c => (
              <div 
                key={c.id}
                onClick={() => setCompany(c.id)}
                className={`p-5 rounded-xl border cursor-pointer transition-all ${
                  c.id === currentCompanyId 
                    ? 'bg-[#1A1A24] border-brand-blue shadow-lg shadow-brand-blue/10' 
                    : 'bg-[#16161C] border-[#2A2A30] hover:border-[#3F3F46]'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-xs font-bold text-[#A1A1AA]">{c.id.toUpperCase()}</span>
                  {c.id === currentCompanyId && <CheckCircle2 size={16} className="text-brand-blue" />}
                </div>
                <div className="font-bold text-white text-base mb-1">{c.name}</div>
                <div className="text-xs text-[#71717A]">Base Currency: <strong className="text-white font-mono">{c.currency}</strong></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
