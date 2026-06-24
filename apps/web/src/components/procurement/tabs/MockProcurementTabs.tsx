'use client';

import { FileText, ClipboardList, PackageCheck, Warehouse, Users, FileSignature, Target, ShieldCheck, BarChart3 } from 'lucide-react';

export function RequisitionsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><FileText size={16} className="text-[#00E5FF]"/> Purchase Requisitions (PR)</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Pending Approval</p><p className="text-2xl font-black text-warning mt-1">14</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">In Procurement</p><p className="text-2xl font-black text-brand-blue mt-1">42</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Approved (MTD)</p><p className="text-2xl font-black text-success mt-1">185</p></div>
      </div>
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-48 flex items-center justify-center relative overflow-hidden"><div className="text-center z-10"><h4 className="text-sm font-bold text-white mb-2">Department Requests</h4><p className="text-xs text-[#71717A]">IT, Facilities, and Construction PRs loaded.</p></div></div>
    </div>
  );
}

export function RfqsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><ClipboardList size={16} className="text-[#00E5FF]"/> Request For Quotation (RFQ)</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30] border-l-4 border-l-brand-blue"><h4 className="text-xs font-bold text-white mb-2">Active RFQs</h4><p className="text-3xl font-black text-brand-blue">12</p><p className="text-[10px] text-[#A1A1AA] mt-2">Awaiting vendor bids</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30] border-l-4 border-l-success"><h4 className="text-xs font-bold text-white mb-2">Bids Received</h4><p className="text-3xl font-black text-success">48</p><p className="text-[10px] text-[#A1A1AA] mt-2">Ready for evaluation</p></div>
      </div>
    </div>
  );
}

export function GoodsReceiptsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><PackageCheck size={16} className="text-[#00E5FF]"/> Goods Receipt Notes (GRN)</h3>
      <div className="space-y-3">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><div className="flex items-center gap-3"><span className="text-sm font-bold text-white">GRN-112 (Cement 500 Bags)</span></div><span className="text-sm font-black text-success">Inspected & Received</span></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><div className="flex items-center gap-3"><span className="text-sm font-bold text-white">GRN-115 (IT Equipment)</span></div><span className="text-sm font-black text-warning">Pending Inspection</span></div>
      </div>
    </div>
  );
}

export function WarehousesTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Warehouse size={16} className="text-[#00E5FF]"/> Warehouse Management</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-[#A1A1AA] uppercase mb-1">Cyber City Central Hub</h4><p className="text-2xl font-black text-white">85% Capacity</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30] border-l-4 border-l-warning"><h4 className="text-xs font-bold text-[#A1A1AA] uppercase mb-1">Project Alpha On-Site</h4><p className="text-2xl font-black text-warning">92% Capacity</p></div>
      </div>
    </div>
  );
}

export function VendorsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Users size={16} className="text-[#00E5FF]"/> Vendor Registry</h3>
      <div className="space-y-3">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">Otis Elevators</span><span className="text-sm font-black text-warning">SLA Warning: 82%</span></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">L&T Construction</span><span className="text-sm font-black text-success">Tier 1 Partner</span></div>
      </div>
    </div>
  );
}

export function ContractsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><FileSignature size={16} className="text-[#00E5FF]"/> Contract Management</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Active AMCs</h4><p className="text-xl font-black text-success">142</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Expiring (30 Days)</h4><p className="text-xl font-black text-warning">14</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Contract Value</h4><p className="text-xl font-black text-brand-blue">₹45Cr</p></div>
      </div>
    </div>
  );
}

export function BudgetsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Target size={16} className="text-[#00E5FF]"/> Procurement Budgets</h3>
      <div className="space-y-4 border-l-2 border-[#2A2A30] ml-4 pl-6 relative pt-2">
        <div className="relative bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 hover:border-danger transition-colors cursor-pointer">
           <div className="absolute -left-[35px] top-5 w-4 h-4 rounded-full bg-danger border-4 border-[#0A0C10]"></div>
           <p className="text-sm font-bold text-white mb-1">Project Alpha Overrun Alert</p>
           <p className="text-[10px] text-[#A1A1AA]">Material costs exceeding budget by 4%.</p>
        </div>
      </div>
    </div>
  );
}

export function ApprovalsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><ShieldCheck size={16} className="text-[#00E5FF]"/> Approval Workflows</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase mb-1">Pending My Approval</p><p className="text-2xl font-black text-warning">12</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase mb-1">Escalated Requests</p><p className="text-2xl font-black text-danger">3</p></div>
      </div>
    </div>
  );
}

export function AnalyticsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><BarChart3 size={16} className="text-[#00E5FF]"/> Supply Chain Intelligence</h3>
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-64 flex items-center justify-center relative overflow-hidden"><div className="text-center z-10"><h4 className="text-sm font-bold text-white mb-2">SAP Analytics Cloud Matrix</h4><p className="text-xs text-[#71717A]">Spend Intelligence and Vendor Risk Scoring active.</p></div></div>
    </div>
  );
}
