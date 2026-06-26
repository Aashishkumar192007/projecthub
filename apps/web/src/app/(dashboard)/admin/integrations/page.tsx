'use client';

import React, { useState } from 'react';
import { AdminNav } from '@/components/admin/AdminNav';
import { 
  Plug, Key, Shield, CheckCircle2, AlertCircle, RefreshCw, 
  ExternalLink, Sparkles, Zap, Lock, Database, Globe
} from 'lucide-react';

export default function EnterpriseIntegrationHubPage() {
  const [integrations, setIntegrations] = useState([
    { name: 'Stripe Institutional Connect', cat: 'Payment Gateway', status: 'Connected', uptime: '99.99%', lastSync: '1 min ago' },
    { name: 'Salesforce Enterprise Sync', cat: 'CRM Bi-Directional', status: 'Connected', uptime: '99.95%', lastSync: '5 mins ago' },
    { name: 'SAP S/4HANA Ledger', cat: 'ERP Financials', status: 'Connected', uptime: '100%', lastSync: '12 mins ago' },
    { name: 'DocuSign eSignature Vault', cat: 'Legal & Contracts', status: 'Connected', uptime: '99.98%', lastSync: 'Instant' },
    { name: 'Twilio WhatsApp API', cat: 'Omnichannel SMS', status: 'Connected', uptime: '99.99%', lastSync: 'Active' },
    { name: 'AWS KMS Key Vault', cat: 'Cryptographic Security', status: 'Connected', uptime: '100%', lastSync: 'Active' },
    { name: 'Azure Active Directory (SAML)', cat: 'Identity & SSO', status: 'Connected', uptime: '100%', lastSync: 'Active' },
    { name: 'Google Maps Places Engine', cat: 'Geospatial GIS', status: 'Connected', uptime: '99.99%', lastSync: 'Active' }
  ]);

  const toggleStatus = (idx: number) => {
    const next = [...integrations];
    next[idx].status = next[idx].status === 'Connected' ? 'Paused' : 'Connected';
    setIntegrations(next);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-16">
      <AdminNav activeTitle="API HUB & ENTERPRISE INTEGRATIONS" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-1 flex items-center gap-3">
              <Plug className="text-brand-blue" /> Institutional API & Webhook Fabric
            </h2>
            <p className="text-xs text-[#A1A1AA]">Manage OAuth connectors, API keys, and bi-directional sync pipelines.</p>
          </div>
          <button 
            onClick={() => alert('New Cryptographic API Secret generated. Please store in secure KMS Vault.')}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-blue text-[#111111] rounded-lg text-xs font-bold hover:opacity-90 transition-all shadow-lg"
          >
            <Key size={14} /> Generate API Key
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {integrations.map((item, idx) => (
            <div key={item.name} className="p-6 rounded-2xl bg-[#111111] border border-[#2A2A30] flex flex-col justify-between hover:border-[#3F3F46] transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#A1A1AA]">
                    {item.cat}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1 ${item.status === 'Connected' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
                    {item.status === 'Connected' && <CheckCircle2 size={10} />} {item.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base mb-1">{item.name}</h3>
                <p className="text-xs text-[#71717A] font-mono mt-3">Uptime: <strong className="text-emerald-400">{item.uptime}</strong></p>
                <p className="text-xs text-[#71717A] font-mono">Last Sync: {item.lastSync}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2A2A30] flex gap-2">
                <button 
                  onClick={() => toggleStatus(idx)}
                  className="flex-1 py-1.5 rounded bg-[#1A1A24] hover:bg-[#2A2A30] text-xs font-bold text-white border border-[#3F3F46] transition-colors"
                >
                  {item.status === 'Connected' ? 'Pause Sync' : 'Connect'}
                </button>
                <button 
                  onClick={() => alert(`Inspecting live Webhook JSON payload logs for ${item.name}`)}
                  title="Webhook Telemetry"
                  className="p-1.5 rounded bg-[#16161C] hover:bg-[#2A2A30] text-[#A1A1AA] hover:text-white transition-colors"
                >
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
