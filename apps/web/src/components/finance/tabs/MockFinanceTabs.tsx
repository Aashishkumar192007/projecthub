'use client';

import { BookOpen, Target, Vault, Handshake, Receipt, Building2, HardHat, Users, FileText, ShieldCheck, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';

export function GeneralLedgerTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><BookOpen size={16} className="text-[#00E5FF]"/> General Ledger (GL)</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Total Assets</p><p className="text-2xl font-black text-brand-blue mt-1">₹142.5Cr</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Total Liabilities</p><p className="text-2xl font-black text-warning mt-1">₹48.2Cr</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Total Equity</p><p className="text-2xl font-black text-success mt-1">₹94.3Cr</p></div>
      </div>
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-48 flex items-center justify-center relative overflow-hidden"><div className="text-center z-10"><h4 className="text-sm font-bold text-white mb-2">Chart of Accounts</h4><p className="text-xs text-[#71717A]">Journal Entries and Trial Balance syncing...</p></div></div>
    </div>
  );
}

export function BudgetingTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Target size={16} className="text-[#00E5FF]"/> Corporate Budgets</h3>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Allocated Budget</p><p className="text-2xl font-black text-white mt-1">₹400Cr</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Consumed (YTD)</p><p className="text-2xl font-black text-warning mt-1">₹312Cr</p></div>
        <div className="col-span-2 bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex items-center justify-between">
          <div><p className="text-[10px] text-[#A1A1AA] uppercase">Variance Forecast</p><p className="text-2xl font-black text-danger mt-1">+4.2% Over</p></div>
          <button className="px-4 py-2 bg-warning/10 text-warning border border-warning/30 font-bold rounded-lg transition-colors h-full">Re-allocate</button>
        </div>
      </div>
    </div>
  );
}

export function TreasuryTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Vault size={16} className="text-[#00E5FF]"/> Treasury & Cash Management</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30] border-l-4 border-l-success"><h4 className="text-xs font-bold text-white mb-2">Operating Cash Flow</h4><p className="text-3xl font-black text-success">₹12.5Cr</p><p className="text-[10px] text-[#A1A1AA] mt-2">+12% from last month</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30] border-l-4 border-l-brand-blue"><h4 className="text-xs font-bold text-white mb-2">Escrow Reserves</h4><p className="text-3xl font-black text-brand-blue">₹45.2Cr</p><p className="text-[10px] text-[#A1A1AA] mt-2">Locked across 3 projects</p></div>
      </div>
    </div>
  );
}

export function CollectionsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Handshake size={16} className="text-[#00E5FF]"/> Debt Collections</h3>
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-64 flex items-center justify-center relative overflow-hidden"><div className="text-center z-10"><h4 className="text-sm font-bold text-white mb-2">Collection Recovery Tracker</h4><p className="text-xs text-[#71717A]">Defaulters and legal case status tracking.</p></div></div>
    </div>
  );
}

export function TaxationTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Receipt size={16} className="text-[#00E5FF]"/> Taxation Compliance</h3>
      <div className="space-y-3">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><div className="flex items-center gap-3"><span className="text-sm font-bold text-white">GST Returns (June)</span></div><span className="text-sm font-black text-warning">Pending Filing</span></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><div className="flex items-center gap-3"><span className="text-sm font-bold text-white">TDS Deductions (Q2)</span></div><span className="text-sm font-black text-success">Filed & Reconciled</span></div>
      </div>
    </div>
  );
}

export function AssetsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Building2 size={16} className="text-[#00E5FF]"/> Fixed Asset Register</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-[#A1A1AA] uppercase mb-1">Capitalized Assets</h4><p className="text-2xl font-black text-white">₹85.4Cr</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30] border-l-4 border-l-danger"><h4 className="text-xs font-bold text-[#A1A1AA] uppercase mb-1">YTD Depreciation</h4><p className="text-2xl font-black text-danger">₹4.2Cr</p></div>
      </div>
    </div>
  );
}

export function ProjectsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><HardHat size={16} className="text-[#00E5FF]"/> Project Accounting</h3>
      <div className="space-y-3">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">Project Alpha (Cyber City)</span><span className="text-sm font-black text-warning">12% Over Budget</span></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">Project Beta (Golf Course)</span><span className="text-sm font-black text-success">On Budget</span></div>
      </div>
    </div>
  );
}

export function InvestorsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Users size={16} className="text-[#00E5FF]"/> Investor Accounting</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Fund Assets</h4><p className="text-xl font-black text-success">₹142Cr</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Distributions</h4><p className="text-xl font-black text-brand-blue">₹14Cr</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Capital Calls</h4><p className="text-xl font-black text-warning">₹25Cr</p></div>
      </div>
    </div>
  );
}

export function ReportingTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><FileText size={16} className="text-[#00E5FF]"/> Statutory Reporting</h3>
      <div className="space-y-4 border-l-2 border-[#2A2A30] ml-4 pl-6 relative pt-2">
        <div className="relative bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 hover:border-brand-blue transition-colors cursor-pointer">
           <div className="absolute -left-[35px] top-5 w-4 h-4 rounded-full bg-brand-blue border-4 border-[#0A0C10]"></div>
           <p className="text-sm font-bold text-white mb-1">Generate P&L Statement</p>
           <p className="text-[10px] text-[#A1A1AA]">Q2 2026 - Ready for board review.</p>
        </div>
      </div>
    </div>
  );
}

export function AuditTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><ShieldCheck size={16} className="text-[#00E5FF]"/> Audit & Compliance</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase mb-1">Open Exceptions</p><p className="text-2xl font-black text-danger">4</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase mb-1">Approvals Overdue</p><p className="text-2xl font-black text-warning">14</p></div>
      </div>
    </div>
  );
}

export function AnalyticsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><BarChart3 size={16} className="text-[#00E5FF]"/> FP&A Intelligence</h3>
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-64 flex items-center justify-center relative overflow-hidden"><div className="text-center z-10"><h4 className="text-sm font-bold text-white mb-2">Predictive Profitability Models</h4><p className="text-xs text-[#71717A]">Variance analysis and Monte Carlo simulations active.</p></div></div>
    </div>
  );
}
