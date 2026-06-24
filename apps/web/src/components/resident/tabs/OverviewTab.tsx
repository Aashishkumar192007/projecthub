'use client';

import { useResidentStore } from '@/store/residentStore';
import { Star, MessageSquareWarning, CalendarPlus, UserCheck, CreditCard, Activity } from 'lucide-react';

export function OverviewTab({ resident }: { resident?: any }) {
  if (!resident) return null;

  const communityScore = 95; // Mock score
  const openComplaints = 0; // Mock complaints
  const activeBookings = 0; // Mock bookings
  const activeVisitors = 0; // Mock visitors

  let pendingDues = 0;
  if (resident.ownedUnits?.[0]?.maintenanceBills) {
    pendingDues = resident.ownedUnits[0].maintenanceBills.reduce((acc: number, bill: any) => acc + Number(bill.amount), 0);
  }

  return (
    <div className="p-8 space-y-6">
      
      {/* Top KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-[#00E5FF]/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <Star size={14} className="text-[#00E5FF]" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Community Score</span>
           </div>
           <div className="flex items-end gap-2">
             <p className={`text-4xl font-black ${
                communityScore >= 90 ? 'text-success' : 
                communityScore >= 60 ? 'text-warning' : 'text-danger'
             }`}>{communityScore}</p>
             <span className="text-sm font-bold text-[#71717A] mb-1">/ 100</span>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-warning/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <MessageSquareWarning size={14} className="text-warning" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Open Complaints</span>
           </div>
           <p className="text-4xl font-black text-white">{openComplaints}</p>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-brand-blue/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <CalendarPlus size={14} className="text-brand-blue" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Active Bookings</span>
           </div>
           <p className="text-4xl font-black text-white">{activeBookings}</p>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-success/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <UserCheck size={14} className="text-success" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Expected Visitors</span>
           </div>
           <p className="text-4xl font-black text-white">{activeVisitors}</p>
        </div>

      </div>

      <div className="grid grid-cols-3 gap-6">
        
        {/* Dues Status */}
        <div className={`col-span-1 border rounded-xl p-6 ${
          pendingDues > 0 ? 'bg-danger/5 border-danger/30' : 'bg-[#1A1A1A] border-[#2A2A30]'
        }`}>
          <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest mb-6 flex items-center gap-2">
            <CreditCard size={14} className={pendingDues > 0 ? 'text-danger' : 'text-success'} />
            Payment Status
          </h3>
          <div className="text-center py-4">
            {pendingDues > 0 ? (
              <>
                <p className="text-5xl font-black text-danger mb-2">₹{pendingDues.toLocaleString()}</p>
                <p className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">Pending Dues</p>
                <button className="mt-6 w-full py-3 bg-danger hover:bg-red-600 text-white font-bold rounded-lg transition-colors">
                  Pay Now
                </button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center mx-auto mb-4">
                  <CreditCard size={24} className="text-success" />
                </div>
                <p className="text-xl font-black text-white mb-2">All Dues Cleared</p>
                <p className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">Thank you for timely payments</p>
              </>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-2 bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
          <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest mb-6 flex items-center gap-2">
            <Activity size={14} className="text-[#00E5FF]" /> Community Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#111111] border border-[#2A2A30] rounded-lg">
              <div>
                <p className="text-sm font-bold text-white">Clubhouse Booked</p>
                <p className="text-xs text-[#A1A1AA]">Today at 18:00</p>
              </div>
              <span className="text-[10px] font-bold text-success bg-success/10 border border-success/30 px-2 py-0.5 rounded uppercase">Confirmed</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#111111] border border-[#2A2A30] rounded-lg">
              <div>
                <p className="text-sm font-bold text-white">Maintenance Complaint Raised</p>
                <p className="text-xs text-[#A1A1AA]">Leaking Tap in Kitchen</p>
              </div>
              <span className="text-[10px] font-bold text-warning bg-warning/10 border border-warning/30 px-2 py-0.5 rounded uppercase">In Progress</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#111111] border border-[#2A2A30] rounded-lg">
              <div>
                <p className="text-sm font-bold text-white">Visitor Approved</p>
                <p className="text-xs text-[#A1A1AA]">Amazon Delivery</p>
              </div>
              <span className="text-[10px] font-bold text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/30 px-2 py-0.5 rounded uppercase">Completed</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
