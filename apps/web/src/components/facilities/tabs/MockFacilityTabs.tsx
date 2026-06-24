'use client';

import { useFacilityStore } from '@/store/facilityStore';
import { Clock, ClipboardList, Zap, ShieldAlert, Users, UserCheck, Calendar, CheckCircle2 } from 'lucide-react';

export function MaintenanceTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Clock size={16} className="text-[#00E5FF]"/> Maintenance Calendar</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Upcoming</p><p className="text-2xl font-black text-white mt-1">12 Tasks</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Overdue</p><p className="text-2xl font-black text-warning mt-1">4 Tasks</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Completed (MTD)</p><p className="text-2xl font-black text-success mt-1">48 Tasks</p></div>
      </div>
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-64 flex items-center justify-center relative overflow-hidden"><div className="text-center z-10"><h4 className="text-sm font-bold text-white mb-2">Preventive Maintenance Schedule</h4><p className="text-xs text-[#71717A] max-w-sm">Full Calendar UI implementation scheduled for Phase 3.</p></div></div>
    </div>
  );
}

export function WorkOrdersTab() {
  const { facilities, activeFacilityId } = useFacilityStore();
  const activeFacility = facilities.find(f => f.id === activeFacilityId);
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><ClipboardList size={16} className="text-[#00E5FF]"/> Service Desk</h3>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Open</p><p className="text-2xl font-black text-white mt-1">{activeFacility?.openWorkOrders || 0}</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">In Progress</p><p className="text-2xl font-black text-brand-blue mt-1">8</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Escalated</p><p className="text-2xl font-black text-danger mt-1">2</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">SLA Breached</p><p className="text-2xl font-black text-warning mt-1">0</p></div>
      </div>
    </div>
  );
}

export function UtilitiesTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Zap size={16} className="text-[#00E5FF]"/> Utility Management</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Electricity</h4><p className="text-3xl font-black text-brand-blue">45,210 <span className="text-sm text-[#71717A]">kWh</span></p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Water</h4><p className="text-3xl font-black text-[#00E5FF]">1,420 <span className="text-sm text-[#71717A]">kL</span></p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Gas</h4><p className="text-3xl font-black text-warning">840 <span className="text-sm text-[#71717A]">m3</span></p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Waste</h4><p className="text-3xl font-black text-[#A1A1AA]">4.2 <span className="text-sm text-[#71717A]">Tons</span></p></div>
      </div>
    </div>
  );
}

export function EnergyTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Zap size={16} className="text-danger"/> Energy Dashboard</h3>
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-64 flex items-center justify-center relative overflow-hidden"><div className="text-center z-10"><h4 className="text-sm font-bold text-white mb-2">Energy Consumption Trends</h4><p className="text-xs text-[#71717A]">Connecting to smart meters...</p></div></div>
    </div>
  );
}

export function InspectionsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><ShieldAlert size={16} className="text-[#00E5FF]"/> Compliance & Inspections</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Fire Safety Audit</p><p className="text-xs font-bold text-success mt-1">Passed (May 2026)</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">HVAC Inspection</p><p className="text-xs font-bold text-warning mt-1">Pending Corrective Action</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Elevator Certification</p><p className="text-xs font-bold text-success mt-1">Valid until Dec 2026</p></div>
      </div>
    </div>
  );
}

export function VendorManagementTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Users size={16} className="text-[#00E5FF]"/> Active Vendors</h3>
      <div className="space-y-3">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">Johnson Controls</span><span className="text-xs text-success">98% SLA Compliance</span></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">Schindler Lifts</span><span className="text-xs text-success">100% SLA Compliance</span></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">EcoClean Services</span><span className="text-xs text-warning">82% SLA Compliance</span></div>
      </div>
    </div>
  );
}

export function VisitorOperationsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><UserCheck size={16} className="text-[#00E5FF]"/> Visitor Operations</h3>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Expected Today</p><p className="text-2xl font-black text-white mt-1">142</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Active Now</p><p className="text-2xl font-black text-brand-blue mt-1">45</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Pending Approval</p><p className="text-2xl font-black text-warning mt-1">12</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Security Alerts</p><p className="text-2xl font-black text-danger mt-1">0</p></div>
      </div>
    </div>
  );
}

export function ReservationsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Calendar size={16} className="text-[#00E5FF]"/> Resource Reservations</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Meeting Rooms</h4><p className="text-xl font-black text-white">84% Utilized</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Parking</h4><p className="text-xl font-black text-white">92% Utilized</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Clubhouse</h4><p className="text-xl font-black text-white">45% Utilized</p></div>
      </div>
    </div>
  );
}

export function TimelineTab() {
  const { events, activeFacilityId } = useFacilityStore();
  const activeEvents = events.filter(e => e.facilityId === activeFacilityId);
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Clock size={16} className="text-[#00E5FF]"/> Live Activity Feed</h3>
      <div className="space-y-4 border-l-2 border-[#2A2A30] ml-4 pl-6">
        {activeEvents.map(event => (
          <div key={event.id} className="relative bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4">
             <div className="absolute -left-[35px] top-4 w-4 h-4 rounded-full bg-[#00E5FF] border-4 border-[#0A0C10]"></div>
             <p className="text-[10px] text-[#71717A] mb-1">{event.time}</p>
             <p className="text-xs font-bold text-white">{event.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
