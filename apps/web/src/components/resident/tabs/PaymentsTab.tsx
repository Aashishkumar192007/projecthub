'use client';

import { useResidentStore } from '@/store/residentStore';
import { CreditCard, Download, Clock, CheckCircle2, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';

export function PaymentsTab() {
  const { residents, activeResidentId } = useResidentStore();
  
  if (!activeResidentId) return null;
  const activeResident = residents.find(r => r.id === activeResidentId);
  if (!activeResident) return null;

  return (
    <div className="p-8 space-y-8">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><CreditCard size={16} className="text-[#00E5FF]"/> Payments & Billing</h3>
        <span className="text-[10px] text-[#A1A1AA] uppercase font-bold px-3 py-1 bg-[#1A1A1A] border border-[#2A2A30] rounded-lg">
          Billing Cycle: June 2026
        </span>
      </div>

      <div className="grid grid-cols-3 gap-6">
        
        {/* Main Billing Card */}
        <div className={`col-span-1 rounded-2xl p-6 relative overflow-hidden ${
          activeResident.pendingDues > 0 
            ? 'bg-[linear-gradient(135deg,#1A1A1A,#3b0707)] border border-danger/30' 
            : 'bg-[linear-gradient(135deg,#1A1A1A,#052b1b)] border border-success/30'
        }`}>
          {/* Decorative Glow */}
          <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[40px] pointer-events-none ${
            activeResident.pendingDues > 0 ? 'bg-danger/20' : 'bg-success/20'
          }`}></div>

          <div className="relative z-10">
            <h4 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest flex items-center gap-2 mb-6">
              {activeResident.pendingDues > 0 ? <AlertTriangle size={14} className="text-danger"/> : <CheckCircle2 size={14} className="text-success"/>}
              Total Outstanding
            </h4>

            {activeResident.pendingDues > 0 ? (
              <>
                <p className="text-5xl font-black text-white mb-2">₹{activeResident.pendingDues.toLocaleString()}</p>
                <p className="text-xs font-bold text-danger bg-danger/10 border border-danger/20 px-2 py-1 rounded inline-block">Due Immediately</p>
                
                <button className="w-full mt-8 py-3 bg-danger hover:bg-red-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <CreditCard size={16} /> Pay Full Amount
                </button>
              </>
            ) : (
              <>
                <p className="text-4xl font-black text-white mb-2">₹0</p>
                <p className="text-xs font-bold text-success bg-success/10 border border-success/20 px-2 py-1 rounded inline-block">All Clear</p>
                
                <button className="w-full mt-8 py-3 bg-[#111111] hover:bg-[#1A1A1A] text-white border border-[#3F3F46] font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Download size={16} /> Download NOC
                </button>
              </>
            )}
          </div>
        </div>

        {/* Breakdown & Analytics */}
        <div className="col-span-2 flex flex-col gap-6">
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-5">
              <h5 className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest mb-1">Last Payment</h5>
              <p className="text-xl font-black text-white">₹8,500</p>
              <p className="text-[10px] text-[#A1A1AA] mt-1">Paid on 15 May 2026</p>
            </div>
            <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-5">
              <h5 className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest mb-1">Utility Average</h5>
              <div className="flex items-center justify-between">
                <p className="text-xl font-black text-white">₹3,240</p>
                <span className="text-[10px] font-bold text-warning flex items-center gap-1"><TrendingUp size={10}/> +5%</span>
              </div>
              <p className="text-[10px] text-[#A1A1AA] mt-1">Per month</p>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 flex-1">
             <h4 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest mb-4">Pending Breakdown</h4>
             {activeResident.pendingDues > 0 ? (
               <div className="space-y-3">
                 <div className="flex justify-between items-center p-3 bg-[#111111] border border-[#2A2A30] rounded-lg">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded bg-[#2A2A30] flex items-center justify-center text-[#A1A1AA]"><CreditCard size={14}/></div>
                     <div>
                       <p className="text-sm font-bold text-white">Maintenance Dues</p>
                       <p className="text-[10px] text-[#71717A]">June 2026</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="text-sm font-bold text-white">₹15,000</p>
                     <button className="text-[10px] text-brand-blue font-bold hover:underline mt-0.5">Pay Item</button>
                   </div>
                 </div>
                 <div className="flex justify-between items-center p-3 bg-[#111111] border border-[#2A2A30] rounded-lg">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded bg-warning/10 border border-warning/30 flex items-center justify-center text-warning"><AlertTriangle size={14}/></div>
                     <div>
                       <p className="text-sm font-bold text-white">Late Payment Penalty</p>
                       <p className="text-[10px] text-[#71717A]">Applied 05 June 2026</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="text-sm font-bold text-white">₹3,500</p>
                     <button className="text-[10px] text-brand-blue font-bold hover:underline mt-0.5">Pay Item</button>
                   </div>
                 </div>
               </div>
             ) : (
               <div className="h-full flex items-center justify-center py-6">
                 <p className="text-xs font-bold text-[#71717A]">No pending line items.</p>
               </div>
             )}
          </div>

        </div>
      </div>

    </div>
  );
}
