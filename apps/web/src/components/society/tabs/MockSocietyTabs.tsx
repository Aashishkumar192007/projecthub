'use client';

import { Users, UserPlus, Shield, Map, Calendar, MessageSquare, Megaphone, PieChart, Vote, IndianRupee, FileCheck, FileText, BarChart3 } from 'lucide-react';

export function CommitteeTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Users size={16} className="text-[#00E5FF]"/> Management Committee (MC)</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Total Members</p><p className="text-2xl font-black text-brand-blue mt-1">12</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Open Action Items</p><p className="text-2xl font-black text-warning mt-1">4</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Next Meeting</p><p className="text-sm font-black text-success mt-1">14th July, 2026</p></div>
      </div>
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-48 flex items-center justify-center relative overflow-hidden"><div className="text-center z-10"><h4 className="text-sm font-bold text-white mb-2">Committee Decisions & Minutes</h4><p className="text-xs text-[#71717A]">Access AGM and Monthly Meeting minutes.</p></div></div>
    </div>
  );
}

export function VisitorsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><UserPlus size={16} className="text-[#00E5FF]"/> Visitor Management</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30] border-l-4 border-l-brand-blue"><h4 className="text-xs font-bold text-white mb-2">Active Visitors</h4><p className="text-3xl font-black text-brand-blue">42</p><p className="text-[10px] text-[#A1A1AA] mt-2">Currently inside premises</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30] border-l-4 border-l-success"><h4 className="text-xs font-bold text-white mb-2">Deliveries Today</h4><p className="text-3xl font-black text-success">184</p><p className="text-[10px] text-[#A1A1AA] mt-2">Swiggy, Amazon, Flipkart</p></div>
      </div>
    </div>
  );
}

export function StaffTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Shield size={16} className="text-[#00E5FF]"/> Facility Staff & Security</h3>
      <div className="space-y-3">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><div className="flex items-center gap-3"><span className="text-sm font-bold text-white">Security Agency (SIS)</span></div><span className="text-sm font-black text-success">42 Active Guards</span></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><div className="flex items-center gap-3"><span className="text-sm font-bold text-white">Housekeeping (JLL)</span></div><span className="text-sm font-black text-warning">3 Short Staffed</span></div>
      </div>
    </div>
  );
}

export function FacilitiesTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Map size={16} className="text-[#00E5FF]"/> Facility Bookings</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-[#A1A1AA] uppercase mb-1">Clubhouse Party Hall</h4><p className="text-2xl font-black text-white">Booked</p><p className="text-[10px] text-danger mt-1">Unavailable this weekend</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30] border-l-4 border-l-success"><h4 className="text-xs font-bold text-[#A1A1AA] uppercase mb-1">Badminton Court 1</h4><p className="text-2xl font-black text-success">Available</p><p className="text-[10px] text-success mt-1">Slot: 6:00 PM - 7:00 PM</p></div>
      </div>
    </div>
  );
}

export function EventsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Calendar size={16} className="text-[#00E5FF]"/> Community Events</h3>
      <div className="space-y-3">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">Summer Kids Camp</span><span className="text-sm font-black text-success">84 RSVPs</span></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">Yoga Workshop</span><span className="text-sm font-black text-warning">Registration Open</span></div>
      </div>
    </div>
  );
}

export function CommunicationTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><MessageSquare size={16} className="text-[#00E5FF]"/> Community Chat & Broadcasts</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Resident Forums</h4><p className="text-xl font-black text-brand-blue">4 Active Threads</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Broadcast Reach</h4><p className="text-xl font-black text-success">92% Read Rate</p></div>
      </div>
    </div>
  );
}

export function NoticesTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Megaphone size={16} className="text-[#00E5FF]"/> Digital Notice Board</h3>
      <div className="space-y-4 border-l-2 border-[#2A2A30] ml-4 pl-6 relative pt-2">
        <div className="relative bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 hover:border-danger transition-colors cursor-pointer">
           <div className="absolute -left-[35px] top-5 w-4 h-4 rounded-full bg-danger border-4 border-[#0A0C10]"></div>
           <p className="text-sm font-bold text-white mb-1">Water Supply Interruption - Tower B</p>
           <p className="text-[10px] text-[#A1A1AA]">Due to overhead tank cleaning tomorrow 10AM-2PM.</p>
        </div>
      </div>
    </div>
  );
}

export function PollsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><PieChart size={16} className="text-[#00E5FF]"/> Resident Polls</h3>
      <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-[#A1A1AA] uppercase mb-4">Should we upgrade the Gym Equipment?</h4>
         <div className="space-y-3">
           <div>
             <div className="flex justify-between text-xs font-bold text-white mb-1"><span>Yes, upgrade immediately.</span><span>78%</span></div>
             <div className="w-full bg-[#111111] h-2 rounded overflow-hidden"><div className="bg-success h-full w-[78%]"></div></div>
           </div>
           <div>
             <div className="flex justify-between text-xs font-bold text-white mb-1"><span>No, current is fine.</span><span>22%</span></div>
             <div className="w-full bg-[#111111] h-2 rounded overflow-hidden"><div className="bg-danger h-full w-[22%]"></div></div>
           </div>
         </div>
      </div>
    </div>
  );
}

export function ElectionsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Vote size={16} className="text-[#00E5FF]"/> Society Elections</h3>
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-48 flex items-center justify-center relative overflow-hidden"><div className="text-center z-10"><h4 className="text-sm font-bold text-white mb-2">Next Election Cycle</h4><p className="text-xs text-[#71717A]">Scheduled for March 2027.</p></div></div>
    </div>
  );
}

export function AccountingTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><IndianRupee size={16} className="text-[#00E5FF]"/> Society Accounting</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Collections (Q2)</p><p className="text-2xl font-black text-success mt-1">₹42L</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Defaulters</p><p className="text-2xl font-black text-danger mt-1">14</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Society Funds</p><p className="text-sm font-black text-brand-blue mt-1">₹1.2Cr Reserves</p></div>
      </div>
    </div>
  );
}

export function ComplianceTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><FileCheck size={16} className="text-[#00E5FF]"/> Statutory Compliance</h3>
      <div className="space-y-3">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">Fire NOC Renewal</span><span className="text-sm font-black text-success">Valid till 2028</span></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">Elevator Lift License</span><span className="text-sm font-black text-warning">Expires in 45 Days</span></div>
      </div>
    </div>
  );
}

export function DocumentsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><FileText size={16} className="text-[#00E5FF]"/> Document Repository</h3>
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-48 flex items-center justify-center relative overflow-hidden"><div className="text-center z-10"><h4 className="text-sm font-bold text-white mb-2">Society Bylaws & Audit Reports</h4><p className="text-xs text-[#71717A]">All documents digitized and securely stored.</p></div></div>
    </div>
  );
}

export function AnalyticsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><BarChart3 size={16} className="text-[#00E5FF]"/> Governance Intelligence</h3>
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-64 flex items-center justify-center relative overflow-hidden"><div className="text-center z-10"><h4 className="text-sm font-bold text-white mb-2">Community Analytics Matrix</h4><p className="text-xs text-[#71717A]">Complaint resolution trends and facility usage tracking.</p></div></div>
    </div>
  );
}
