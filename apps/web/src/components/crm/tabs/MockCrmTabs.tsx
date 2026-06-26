'use client';

import { Users, Target, CheckSquare, Building2, Briefcase, Handshake, Megaphone, MessageCircle, FileText, BarChart3, TrendingUp, AlertTriangle, Send } from 'lucide-react';
import { toast } from 'sonner';


export function CustomersTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Users size={16} className="text-[#00E5FF]"/> Customer Profiles</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Total Customers</p><p className="text-2xl font-black text-brand-blue mt-1">4,280</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Repeat Buyers</p><p className="text-2xl font-black text-success mt-1">12%</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Avg. Deal Size</p><p className="text-2xl font-black text-white mt-1">₹1.4 Cr</p></div>
      </div>
    </div>
  );
}

export function OpportunitiesTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Target size={16} className="text-[#00E5FF]"/> Sales Opportunities</h3>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Open Opps</p><p className="text-2xl font-black text-white mt-1">142</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Win Rate</p><p className="text-2xl font-black text-success mt-1">18.4%</p></div>
        <div className="col-span-2 bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex items-center justify-between">
          <div><p className="text-[10px] text-[#A1A1AA] uppercase">Expected Value</p><p className="text-2xl font-black text-brand-blue mt-1">₹42.5 Cr</p></div>
          <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="px-4 py-2 bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 font-bold rounded-lg transition-colors h-full">Run Forecast</button>
        </div>
      </div>
    </div>
  );
}

export function BookingsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><CheckSquare size={16} className="text-[#00E5FF]"/> Booking Records</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30] border-l-4 border-l-success"><h4 className="text-xs font-bold text-white mb-2">Bookings MTD</h4><p className="text-3xl font-black text-success">84 Units</p><p className="text-[10px] text-[#A1A1AA] mt-2">+12% from last month</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30] border-l-4 border-l-brand-blue"><h4 className="text-xs font-bold text-white mb-2">Token Value</h4><p className="text-3xl font-black text-brand-blue">₹4.2 Cr</p><p className="text-[10px] text-[#A1A1AA] mt-2">Held in Escrow</p></div>
      </div>
    </div>
  );
}

export function LeasingTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Building2 size={16} className="text-[#00E5FF]"/> Leasing Pipeline</h3>
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-64 flex items-center justify-center relative overflow-hidden"><div className="text-center z-10"><h4 className="text-sm font-bold text-white mb-2">Corporate & Retail Leasing</h4><p className="text-xs text-[#71717A]">Lease expiry tracking and renewal forecasts.</p></div></div>
    </div>
  );
}

export function BrokersTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Briefcase size={16} className="text-[#00E5FF]"/> Broker Directory</h3>
      <div className="space-y-3">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-brand-blue rounded-full"></div><span className="text-sm font-bold text-white">Rahul Sharma</span></div><span className="text-sm font-black text-success">14 Deals Closed</span></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-purple-400 rounded-full"></div><span className="text-sm font-bold text-white">Priya Patel</span></div><span className="text-sm font-black text-success">9 Deals Closed</span></div>
      </div>
    </div>
  );
}

export function ChannelPartnersTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Handshake size={16} className="text-[#00E5FF]"/> Channel Partner Network</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-[#A1A1AA] uppercase mb-1">Active CP Network</h4><p className="text-2xl font-black text-white">142 Agencies</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30] border-l-4 border-l-success"><h4 className="text-xs font-bold text-[#A1A1AA] uppercase mb-1">Revenue Contribution</h4><p className="text-2xl font-black text-success">42%</p></div>
      </div>
    </div>
  );
}

export function MarketingTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Megaphone size={16} className="text-[#00E5FF]"/> Marketing ROI</h3>
      <div className="space-y-3">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">Facebook Ads (Summer Launch)</span><span className="text-sm font-black text-brand-blue">420 Leads</span></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">Google Search (Cyber City)</span><span className="text-sm font-black text-brand-blue">185 Leads</span></div>
      </div>
    </div>
  );
}

export function CommunicationsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><MessageCircle size={16} className="text-[#00E5FF]"/> Omni-Channel Comms</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">WhatsApp</h4><p className="text-xl font-black text-success">2,410 Msgs</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Emails</h4><p className="text-xl font-black text-brand-blue">1,840 Sent</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Calls</h4><p className="text-xl font-black text-warning">842 Logged</p></div>
      </div>
    </div>
  );
}

export function TasksTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><CheckSquare size={16} className="text-[#00E5FF]"/> Follow-Up Tasks</h3>
      <div className="space-y-4 border-l-2 border-[#2A2A30] ml-4 pl-6 relative pt-2">
        <div className="relative bg-[#1A1A1A] border border-warning/30 rounded-xl p-4">
           <div className="absolute -left-[35px] top-5 w-4 h-4 rounded-full bg-warning border-4 border-[#0A0C10]"></div>
           <p className="text-sm font-bold text-white mb-1">Send updated pricing to Anjali Desai</p>
           <p className="text-[10px] text-[#A1A1AA]">Due in 2 hours.</p>
        </div>
      </div>
    </div>
  );
}

export function DocumentsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><FileText size={16} className="text-[#00E5FF]"/> CRM Documents</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase mb-1">Proposals Sent</p><p className="text-2xl font-black text-brand-blue">48</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase mb-1">Contracts Signed</p><p className="text-2xl font-black text-success">14</p></div>
      </div>
    </div>
  );
}

export function AnalyticsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><BarChart3 size={16} className="text-[#00E5FF]"/> Sales Intelligence</h3>
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-64 flex items-center justify-center relative overflow-hidden"><div className="text-center z-10"><h4 className="text-sm font-bold text-white mb-2">Revenue Forecast Modeling</h4><p className="text-xs text-[#71717A]">Predictive analytics and conversion trending active.</p></div></div>
    </div>
  );
}
