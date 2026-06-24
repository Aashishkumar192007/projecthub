'use client';

import { useResidentStore } from '@/store/residentStore';
import { Users, UserCheck, CalendarPlus, MessageSquareWarning, FileText, Car, Heart, ShoppingBag, Calendar, Bell, MessageCircle } from 'lucide-react';

export function CommunityTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Users size={16} className="text-[#00E5FF]"/> Community Network</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Active Polls</p><p className="text-2xl font-black text-brand-blue mt-1">2</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Discussions</p><p className="text-2xl font-black text-success mt-1">14 New</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Committee Members</p><p className="text-2xl font-black text-white mt-1">8</p></div>
      </div>
    </div>
  );
}

export function VisitorsTab() {
  const { residents, activeResidentId } = useResidentStore();
  const activeResident = residents.find(r => r.id === activeResidentId);
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><UserCheck size={16} className="text-[#00E5FF]"/> Visitor Management</h3>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Active Visitors</p><p className="text-2xl font-black text-white mt-1">{activeResident?.activeVisitors || 0}</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Expected Today</p><p className="text-2xl font-black text-brand-blue mt-1">2</p></div>
        <div className="col-span-2 bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex items-center justify-center">
          <button className="px-4 py-2 bg-[#00E5FF] hover:bg-[#00B3CC] text-[#0A0C10] font-bold rounded-lg transition-colors w-full">
            Generate QR Gate Pass
          </button>
        </div>
      </div>
    </div>
  );
}

export function FacilitiesTab() {
  const { residents, activeResidentId } = useResidentStore();
  const activeResident = residents.find(r => r.id === activeResidentId);
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><CalendarPlus size={16} className="text-[#00E5FF]"/> Amenity Bookings</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Active Bookings</h4><p className="text-3xl font-black text-brand-blue">{activeResident?.activeBookings || 0}</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30] flex items-center justify-center">
          <button className="px-4 py-2 bg-[#1A2533] hover:bg-[#1E2D40] text-brand-blue border border-brand-blue/30 font-bold rounded-lg transition-colors w-full h-full">
            Book Clubhouse / Pool / Gym
          </button>
        </div>
      </div>
    </div>
  );
}

export function ComplaintsTab() {
  const { residents, activeResidentId } = useResidentStore();
  const activeResident = residents.find(r => r.id === activeResidentId);
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><MessageSquareWarning size={16} className="text-[#00E5FF]"/> Help Desk & Complaints</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Open Tickets</p><p className="text-2xl font-black text-warning mt-1">{activeResident?.openComplaints || 0}</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Resolved (MTD)</p><p className="text-2xl font-black text-success mt-1">2</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">SLA Breached</p><p className="text-2xl font-black text-danger mt-1">0</p></div>
      </div>
    </div>
  );
}

export function DocumentsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><FileText size={16} className="text-[#00E5FF]"/> Resident Vault</h3>
      <div className="space-y-3">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">Lease Agreement</span><span className="text-[10px] text-success border border-success/30 px-2 py-0.5 rounded bg-success/10 uppercase">Verified</span></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">KYC Documents</span><span className="text-[10px] text-success border border-success/30 px-2 py-0.5 rounded bg-success/10 uppercase">Verified</span></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">Vehicle Registration</span><span className="text-[10px] text-warning border border-warning/30 px-2 py-0.5 rounded bg-warning/10 uppercase">Pending Review</span></div>
      </div>
    </div>
  );
}

export function VehiclesTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Car size={16} className="text-[#00E5FF]"/> Registered Vehicles</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-1">MH 01 AB 1234</h4><p className="text-[10px] text-[#71717A] uppercase mb-4">Honda City (Sedan)</p><p className="text-xs font-bold text-success">RFID Tag: Active • Slot: B2-45</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-1">MH 01 XY 9876</h4><p className="text-[10px] text-[#71717A] uppercase mb-4">Royal Enfield (Two-Wheeler)</p><p className="text-xs font-bold text-success">RFID Tag: Active • Slot: B2-46</p></div>
      </div>
    </div>
  );
}

export function FamilyTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Heart size={16} className="text-[#00E5FF]"/> Family Members</h3>
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-64 flex items-center justify-center relative overflow-hidden"><div className="text-center z-10"><h4 className="text-sm font-bold text-white mb-2">3 Family Members Registered</h4><p className="text-xs text-[#71717A]">Add family members to grant them app access and amenity privileges.</p></div></div>
    </div>
  );
}

export function MarketplaceTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><ShoppingBag size={16} className="text-[#00E5FF]"/> Community Marketplace</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Buy & Sell</h4><p className="text-xl font-black text-brand-blue">14 Listings</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Local Services</h4><p className="text-xl font-black text-success">8 Vendors</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Offers</h4><p className="text-xl font-black text-warning">3 Deals</p></div>
      </div>
    </div>
  );
}

export function EventsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Calendar size={16} className="text-[#00E5FF]"/> Community Events</h3>
      <div className="space-y-4 border-l-2 border-[#2A2A30] ml-4 pl-6 relative pt-2">
        <div className="relative bg-[#1A1A1A] border border-[#00E5FF]/30 rounded-xl p-4">
           <div className="absolute -left-[35px] top-5 w-4 h-4 rounded-full bg-[#00E5FF] border-4 border-[#0A0C10]"></div>
           <p className="text-sm font-bold text-white mb-1">Weekend Yoga Workshop</p>
           <p className="text-[10px] text-[#A1A1AA]">Sat, 24 June • 07:00 AM • Clubhouse Lawn</p>
           <button className="mt-4 text-[10px] font-bold text-[#0A0C10] bg-[#00E5FF] px-3 py-1.5 rounded transition-colors hover:bg-[#00B3CC]">RSVP Going</button>
        </div>
      </div>
    </div>
  );
}

export function NoticesTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Bell size={16} className="text-[#00E5FF]"/> Digital Notice Board</h3>
      <div className="space-y-3">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><span className="text-[10px] text-danger border border-danger/30 px-2 py-0.5 rounded bg-danger/10 uppercase font-bold mb-2 inline-block">Important</span><p className="text-sm font-bold text-white">Water Supply Interruption in Tower A</p><p className="text-xs text-[#71717A] mt-1">Scheduled maintenance on 23 June from 14:00 to 16:00.</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><span className="text-[10px] text-[#A1A1AA] border border-[#3F3F46] px-2 py-0.5 rounded bg-[#2A2A30] uppercase font-bold mb-2 inline-block">General</span><p className="text-sm font-bold text-white">Annual General Meeting (AGM) Minutes Published</p><p className="text-xs text-[#71717A] mt-1">Check the documents vault to review the Q2 AGM minutes.</p></div>
      </div>
    </div>
  );
}

export function CommunicationTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><MessageCircle size={16} className="text-[#00E5FF]"/> Communication Hub</h3>
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-64 flex items-center justify-center relative overflow-hidden"><div className="text-center z-10"><h4 className="text-sm font-bold text-white mb-2">Tower A Discussion Group</h4><p className="text-xs text-[#71717A]">Chat interface loading...</p></div></div>
    </div>
  );
}
