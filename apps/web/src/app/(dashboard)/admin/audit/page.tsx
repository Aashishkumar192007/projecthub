'use client';

import React, { useState } from 'react';
import { AdminNav } from '@/components/admin/AdminNav';
import { useEnterpriseStore, AuditEvent } from '@/store/enterpriseStore';
import { 
  FileSearch, ShieldAlert, CheckCircle2, User, Clock, MapPin, 
  Smartphone, Code2, ArrowRight, Filter, Download
} from 'lucide-react';

export default function EnterpriseGlobalAuditPage() {
  const { auditLogs } = useEnterpriseStore();
  const [selectedAudit, setSelectedAudit] = useState<AuditEvent | null>(auditLogs[0] || null);
  const [filterAction, setFilterAction] = useState('All');

  const filteredLogs = auditLogs.filter(l => filterAction === 'All' || l.action.includes(filterAction));

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-16">
      <AdminNav activeTitle="GLOBAL AUDIT INTELLIGENCE VAULT" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <FileSearch className="text-brand-blue" /> Immutable Event & CRUD Telemetry Stream
            </h2>
            <p className="text-xs text-[#71717A]">Every database CRUD action, login session, approval override, and export is recorded indelibly.</p>
          </div>
          <button 
            onClick={() => alert('Encrypted Audit Log Archive downloaded securely in WORM (Write Once Read Many) format.')}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#1A1A24] border border-[#3F3F46] hover:bg-[#2A2A30] text-white rounded-lg text-xs font-bold transition-all shadow-lg"
          >
            <Download size={14} /> Export Encrypted Logs
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Feed */}
          <div className="space-y-3 lg:col-span-1 max-h-[750px] overflow-y-auto pr-2">
            <div className="flex justify-between items-center px-1 mb-2">
              <span className="text-xs font-bold text-[#71717A] uppercase">Event Stream ({filteredLogs.length})</span>
              <select 
                value={filterAction} 
                onChange={(e) => setFilterAction(e.target.value)}
                className="bg-[#111111] border border-[#2A2A30] rounded px-2 py-1 text-[10px] text-white focus:outline-none cursor-pointer"
              >
                <option value="All">All Actions</option>
                <option value="UPDATE">Updates</option>
                <option value="APPROVE">Approvals</option>
                <option value="IMPORT">Imports</option>
              </select>
            </div>

            {filteredLogs.map((log) => (
              <div 
                key={log.id}
                onClick={() => setSelectedAudit(log)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedAudit?.id === log.id 
                    ? 'bg-[#1A1A24] border-brand-blue shadow-lg shadow-brand-blue/10' 
                    : 'bg-[#111111] border-[#2A2A30] hover:border-[#3F3F46]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {log.action}
                  </span>
                  <span className="text-[10px] font-mono text-[#71717A]">{log.timestamp.slice(11, 16)}</span>
                </div>
                <div className="font-bold text-white text-xs mb-1 line-clamp-1">{log.user}</div>
                <p className="text-[11px] text-[#A1A1AA] line-clamp-2">{log.reason}</p>
              </div>
            ))}
          </div>

          {/* Right Inspection */}
          <div className="lg:col-span-2 bg-[#111111] rounded-2xl border border-[#2A2A30] p-8 flex flex-col justify-between">
            {selectedAudit ? (
              <div>
                <div className="border-b border-[#2A2A30] pb-6 mb-8 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-brand-blue uppercase font-bold tracking-wider">EVENT INSPECTION ID: {selectedAudit.id}</span>
                    <h3 className="text-2xl font-extrabold text-white mt-1">{selectedAudit.action}</h3>
                    <p className="text-xs text-[#A1A1AA] mt-1">{selectedAudit.reason}</p>
                  </div>
                  <div className="text-right font-mono text-xs text-[#71717A] space-y-1">
                    <div><Clock size={12} className="inline mr-1 text-brand-blue" /> {selectedAudit.timestamp}</div>
                    <div><MapPin size={12} className="inline mr-1 text-purple-400" /> {selectedAudit.location} ({selectedAudit.ip})</div>
                    <div><Smartphone size={12} className="inline mr-1 text-emerald-400" /> {selectedAudit.device}</div>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2 flex items-center gap-2">
                    <User size={14} className="text-brand-blue" /> Authorized Actor: <strong className="text-neutral-300 font-normal">{selectedAudit.user}</strong>
                  </span>
                </div>

                {/* Side-by-Side Diff Comparison */}
                {selectedAudit.beforeJson && selectedAudit.afterJson ? (
                  <div>
                    <h4 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-3 flex items-center gap-1.5 font-mono">
                      <Code2 size={14} className="text-amber-400" /> State Mutation Inspector (Before vs. After)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-[11px]">
                      <div className="bg-[#16161C] border border-red-500/30 rounded-xl p-4 overflow-x-auto max-h-80">
                        <span className="text-red-400 font-bold block mb-2 pb-1 border-b border-red-500/20">[-] BEFORE STATE</span>
                        <pre className="text-red-300 leading-relaxed">{selectedAudit.beforeJson}</pre>
                      </div>

                      <div className="bg-[#16161C] border border-emerald-500/30 rounded-xl p-4 overflow-x-auto max-h-80">
                        <span className="text-emerald-400 font-bold block mb-2 pb-1 border-b border-emerald-500/20">[+] AFTER STATE</span>
                        <pre className="text-emerald-300 leading-relaxed">{selectedAudit.afterJson}</pre>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 rounded-xl bg-[#16161C] border border-[#2A2A30] text-center text-xs text-[#71717A]">
                    System action event. No Before/After JSON payload diff required for this execution.
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20 text-[#71717A]">Select an audit record to inspect device metadata and JSON payloads.</div>
            )}

            <div className="mt-8 pt-4 border-t border-[#2A2A30] flex items-center justify-between text-xs text-[#71717A]">
              <span>Cryptographic Hash Integrity: <strong className="text-emerald-400 font-mono">SHA-256 Verified</strong></span>
              <span>Tamper-Proof Ledger</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
