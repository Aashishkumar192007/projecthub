'use client';

import React, { useState } from 'react';
import { AdminNav } from '@/components/admin/AdminNav';
import { 
  Lock, ShieldCheck, FileKey, Database, CheckCircle2, 
  AlertTriangle, Sparkles, UserX, RefreshCw, EyeOff
} from 'lucide-react';

export default function EnterpriseDataGovernancePage() {
  const [retentionPolicies] = useState([
    { entity: 'Customer KYC & AML Background Checks', duration: '7 Years (Statutory AML compliance limit)', encryption: 'KMS AES-256 Field Level', status: 'Enforced' },
    { entity: 'Financial Accounting Ledgers & Wire Invoices', duration: '10 Years (REIT Institutional Tax Law)', encryption: 'KMS AES-256 Table Level', status: 'Enforced' },
    { entity: 'Unconverted Sales Leads & Inquiries', duration: '3 Years (GDPR Data Minimization Rule)', encryption: 'Standard TLS 1.3', status: 'Enforced' },
    { entity: 'Resident Facility Booking Telemetry Logs', duration: '1 Year (Rolling purge window)', encryption: 'Standard TLS 1.3', status: 'Enforced' }
  ]);

  const sensitiveFields = [
    { field: 'National ID / SSN / Passport Number', policy: 'Indelible Field Masking (e.g. •••-••-4421)', access: 'Compliance Officers Only' },
    { field: 'Bank IBAN / Wire Routing Number', policy: 'Tokenized Vault Storage via Stripe Connect', access: 'Finance Officers Only' },
    { field: 'Corporate Tax Identification Number', policy: 'AES-256 KMS Vault Lock', access: 'Super Admin & Finance Only' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-16">
      <AdminNav activeTitle="DATA GOVERNANCE & COMPLIANCE CENTER" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-1 flex items-center gap-3">
              <Lock className="text-brand-blue" /> GDPR, CCPA & Statutory Compliance Hub
            </h2>
            <p className="text-xs text-[#A1A1AA]">Institutional data governance policies, automated record lifecycle purging, and field tokenization.</p>
          </div>
          <button 
            onClick={() => alert('GDPR Article 17 "Right to be Forgotten" Anonymization Job dispatched across all 12 databases.')}
            className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-xs font-bold transition-all shadow-lg"
          >
            <UserX size={14} /> Execute GDPR Purge
          </button>
        </div>

        <div className="space-y-8 font-mono text-xs">
          {/* Retention Table */}
          <div className="bg-[#111111] rounded-2xl border border-[#2A2A30] p-6">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider font-sans flex items-center gap-2">
              <Database size={16} className="text-brand-blue" /> Automated Data Retention & Lifecycle Purge Policies
            </h3>
            <div className="space-y-3">
              {retentionPolicies.map((pol) => (
                <div key={pol.entity} className="p-4 rounded-xl bg-[#16161C] border border-[#2A2A30] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <strong className="text-white font-sans text-sm block mb-1">{pol.entity}</strong>
                    <span className="text-[#71717A]">Retention Window: <strong className="text-amber-400 font-normal">{pol.duration}</strong></span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-2.5 py-1 rounded bg-[#2A2A30] text-neutral-300">{pol.encryption}</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 size={14} /> {pol.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sensitive Fields Protection */}
          <div className="bg-[#111111] rounded-2xl border border-[#2A2A30] p-6">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider font-sans flex items-center gap-2">
              <EyeOff size={16} className="text-purple-400" /> PII (Personally Identifiable Information) Field Tokenization
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sensitiveFields.map((fld) => (
                <div key={fld.field} className="p-5 rounded-xl bg-[#16161C] border border-purple-500/20 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-purple-400 font-bold block mb-2 font-sans">ENCRYPTED PII BOUNDARY</span>
                    <strong className="text-white font-sans text-sm block mb-2">{fld.field}</strong>
                    <p className="text-[#A1A1AA] text-xs mb-4">{fld.policy}</p>
                  </div>
                  <div className="pt-3 border-t border-[#2A2A30] text-[10px] text-[#71717A]">
                    Access Lock: <strong className="text-white">{fld.access}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
