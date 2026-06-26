'use client';

import React, { useState } from 'react';
import { AdminNav } from '@/components/admin/AdminNav';
import { useEnterpriseStore, ApprovalRequest } from '@/store/enterpriseStore';
import { 
  CheckSquare, CheckCircle2, XCircle, Clock, ArrowRight, DollarSign, 
  ShieldAlert, UserCheck, Layers, Filter, Sparkles
} from 'lucide-react';

export default function EnterpriseApprovalManagementPage() {
  const { approvals, processApproval } = useEnterpriseStore();
  const [filterType, setFilterType] = useState('All');

  const approvalTypes = [
    'Discount Approval', 'Booking Approval', 'Broker Approval', 
    'Commission Approval', 'Refund Approval', 'Agreement Approval', 'Expense Approval'
  ];

  const filteredApprovals = approvals.filter(a => filterType === 'All' || a.type === filterType);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-16">
      <AdminNav activeTitle="MULTI-TIER APPROVAL MANAGEMENT SYSTEM" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Visual Hierarchy Pipeline Flow Header */}
        <div className="bg-[#111111] border border-[#2A2A30] rounded-2xl p-6 mb-8 relative overflow-hidden">
          <span className="text-[10px] font-mono text-brand-blue uppercase font-bold tracking-wider block mb-2">ENTERPRISE SIGN-OFF HIERARCHY PIPELINE</span>
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 text-xs font-bold">
            <div className="flex items-center gap-2 bg-[#1A1A24] px-4 py-2.5 rounded-xl border border-brand-blue/30 text-brand-blue shadow-lg">
              <span className="w-5 h-5 rounded-full bg-brand-blue text-[#111111] flex items-center justify-center text-[10px]">1</span>
              Initial Request
            </div>

            <ArrowRight size={18} className="text-[#71717A] hidden md:block" />

            <div className="flex items-center gap-2 bg-[#16161C] px-4 py-2.5 rounded-xl border border-[#3F3F46] text-neutral-300">
              <span className="w-5 h-5 rounded-full bg-[#2A2A30] text-white flex items-center justify-center text-[10px]">2</span>
              Sales Manager
            </div>

            <ArrowRight size={18} className="text-[#71717A] hidden md:block" />

            <div className="flex items-center gap-2 bg-[#16161C] px-4 py-2.5 rounded-xl border border-[#3F3F46] text-purple-400">
              <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px]">3</span>
              CRM Director
            </div>

            <ArrowRight size={18} className="text-[#71717A] hidden md:block" />

            <div className="flex items-center gap-2 bg-[#16161C] px-4 py-2.5 rounded-xl border border-[#3F3F46] text-amber-400">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px]">4</span>
              Finance Officer
            </div>

            <ArrowRight size={18} className="text-[#71717A] hidden md:block" />

            <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2.5 rounded-xl border border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/5">
              <CheckCircle2 size={16} /> Fully Approved
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckSquare className="text-brand-blue" size={18} /> Pending & Processed Approvals ({filteredApprovals.length})
          </h2>

          <div className="flex items-center gap-2 text-xs">
            <Filter size={14} className="text-[#71717A]" />
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-[#111111] border border-[#2A2A30] rounded-lg px-3 py-1.5 text-xs text-white font-semibold focus:outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              {approvalTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Approvals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApprovals.map((app) => (
            <div key={app.id} className="bg-[#111111] border border-[#2A2A30] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3F3F46] transition-all group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-neutral-300">
                    {app.type}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    app.currentLevel === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                    app.currentLevel === 'Rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-blue-500/10 text-blue-400 border border-blue-500/30 animate-pulse'
                  }`}>
                    {app.currentLevel === 'Approved' || app.currentLevel === 'Rejected' ? app.currentLevel.toUpperCase() : `PENDING ${app.currentLevel.toUpperCase()}`}
                  </span>
                </div>

                <h3 className="font-bold text-white text-base mb-2 group-hover:text-brand-blue transition-colors">{app.title}</h3>
                
                <div className="space-y-1.5 text-xs text-[#A1A1AA] py-3 border-y border-[#2A2A30] my-4 font-mono">
                  <div className="flex justify-between"><span>Requested By:</span> <strong className="text-white font-sans">{app.requestedBy}</strong></div>
                  <div className="flex justify-between"><span>Fiscal Impact:</span> <strong className="text-emerald-400">${app.amount.toLocaleString()}</strong></div>
                  <div className="flex justify-between"><span>Target Entity:</span> <span className="text-white">{app.entityRef}</span></div>
                  <div className="flex justify-between"><span>Submitted:</span> <span className="text-[#71717A]">{app.createdAt}</span></div>
                </div>
              </div>

              {app.currentLevel !== 'Approved' && app.currentLevel !== 'Rejected' ? (
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => processApproval(app.id, 'reject')}
                    className="flex-1 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <XCircle size={14} /> Reject
                  </button>
                  <button 
                    onClick={() => processApproval(app.id, 'approve')}
                    className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#111111] font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 size={14} /> Authorize Sign-off
                  </button>
                </div>
              ) : (
                <div className="text-center text-xs text-[#71717A] py-2 bg-[#16161C] rounded-lg border border-[#2A2A30]">
                  Record archived securely in Audit Intelligence Vault.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
