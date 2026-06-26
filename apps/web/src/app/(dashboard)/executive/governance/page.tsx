'use client';

import React, { useState } from 'react';
import { 
  Shield, Activity, Building2, DollarSign, CheckCircle2, 
  AlertTriangle, Lock, Sparkles, Presentation, Layers, Globe
} from 'lucide-react';
import Link from 'next/link';

export default function CSuiteGovernanceDashboardPage() {
  const [governancePillars] = useState([
    { title: 'SOX Financial Controls', compliance: '100% Enforced', auditor: 'PwC Global', nextAudit: 'Q4 2026', status: 'Cleared' },
    { title: 'GDPR Privacy & Minimization', compliance: '99.9% Enforced', auditor: 'EU Data DPO', nextAudit: 'Rolling', status: 'Cleared' },
    { title: 'AML / KYC Background Vault', compliance: '100% Cleared', auditor: 'Interpol AML', nextAudit: 'Daily Auto', status: 'Cleared' },
    { title: 'WORM Immutable Audit Vault', compliance: 'SHA-256 Valid', auditor: 'KMS CrypLedger', nextAudit: 'Real-time', status: 'Cleared' }
  ]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#2A2A30] mb-8 gap-4">
          <div>
            <span className="text-xs font-mono text-brand-blue uppercase font-bold tracking-wider block mb-1">C-SUITE & BOARD GOVERNANCE DECK</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              Executive Governance & Risk Dashboard 360
            </h1>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/crm-audit" className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#111111] font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5">
              <Shield size={16} /> Final CRM Audit Verification
            </Link>
          </div>
        </div>

        {/* Big Executive KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 font-mono">
          <div className="p-6 rounded-2xl bg-[#111111] border border-[#2A2A30] relative overflow-hidden">
            <div className="flex justify-between items-center text-[#71717A] mb-2 font-sans text-xs font-bold uppercase">
              <span>Consolidated REIT AUM</span>
              <Building2 className="text-brand-blue" size={18} />
            </div>
            <div className="text-3xl font-extrabold text-white">$14.8 Billion</div>
            <span className="text-emerald-400 text-xs mt-1 block font-semibold">+8.4% YoY Valuation</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-[#2A2A30] relative overflow-hidden">
            <div className="flex justify-between items-center text-[#71717A] mb-2 font-sans text-xs font-bold uppercase">
              <span>Institutional Compliance</span>
              <Shield className="text-emerald-400" size={18} />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400">99.98%</div>
            <span className="text-neutral-400 text-xs mt-1 block">Zero statutory penalties</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-[#2A2A30] relative overflow-hidden">
            <div className="flex justify-between items-center text-[#71717A] mb-2 font-sans text-xs font-bold uppercase">
              <span>Active Entities</span>
              <Globe className="text-purple-400" size={18} />
            </div>
            <div className="text-3xl font-extrabold text-white">12 Groups</div>
            <span className="text-purple-400 text-xs mt-1 block font-semibold">4 Jurisdictions Synced</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-[#2A2A30] relative overflow-hidden">
            <div className="flex justify-between items-center text-[#71717A] mb-2 font-sans text-xs font-bold uppercase">
              <span>Platform Resilience</span>
              <Activity className="text-amber-400" size={18} />
            </div>
            <div className="text-3xl font-extrabold text-white">99.999%</div>
            <span className="text-amber-400 text-xs mt-1 block font-semibold">Multi-Cloud WORM Ledger</span>
          </div>
        </div>

        {/* Regulatory Pillars Matrix */}
        <div className="bg-[#111111] rounded-2xl border border-[#2A2A30] p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Statutory Governance & Audit Assurance Matrix</h2>
              <p className="text-xs text-[#71717A]">External third-party auditing telemetry validating SOX, GDPR, and AML controls.</p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              BOARD SIGNED OFF
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {governancePillars.map((pil) => (
              <div key={pil.title} className="p-5 rounded-xl bg-[#16161C] border border-[#2A2A30] flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base mb-1">{pil.title}</h3>
                  <div className="text-xs text-[#A1A1AA] space-x-3 font-mono mt-2">
                    <span>Auditor: <strong className="text-white font-sans">{pil.auditor}</strong></span>
                    <span>Cycle: {pil.nextAudit}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold text-sm block mb-1 flex items-center justify-end gap-1"><CheckCircle2 size={16} /> {pil.status}</span>
                  <span className="text-[10px] font-mono text-[#71717A]">{pil.compliance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
