'use client';

import { ArrowDownRight, Search, Filter, CheckCircle, AlertTriangle } from 'lucide-react';

export function AccountsPayableTab() {
  return (
    <div className="p-8 space-y-6">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><ArrowDownRight size={16} className="text-[#00E5FF]"/> Accounts Payable Ledger</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A30] rounded text-[10px] font-bold text-white hover:bg-[#1E1E22] transition-colors"><Search size={12}/> Search Vendor</button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A30] rounded text-[10px] font-bold text-white hover:bg-[#1E1E22] transition-colors"><Filter size={12}/> Filter</button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded text-[10px] font-bold transition-colors shadow-[0_0_15px_rgba(79,132,255,0.3)] border border-brand-blue/50"><CheckCircle size={12}/> Batch Approve (3)</button>
        </div>
      </div>

      {/* AP Summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1">Total Outstanding</p>
           <p className="text-xl font-black text-white">₹1.85Cr</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-danger">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1 flex items-center gap-1"><AlertTriangle size={10}/> Due &lt; 7 Days</p>
           <p className="text-xl font-black text-danger">₹42.5L</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-warning">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1">Pending Approval</p>
           <p className="text-xl font-black text-warning">₹18.2L</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1">Paid (MTD)</p>
           <p className="text-xl font-black text-brand-blue">₹3.4Cr</p>
        </div>
      </div>

      {/* Vendor Bills List */}
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl overflow-hidden mt-6">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#161616] border-b border-[#2A2A30]">
                  <th className="p-4 w-12"><input type="checkbox" className="rounded border-[#3F3F46] bg-[#111111]" /></th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Bill #</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Vendor / Supplier</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Due Date</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Amount</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Status</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A30]">
                
                <tr className="hover:bg-[#111111] transition-colors">
                  <td className="p-4"><input type="checkbox" className="rounded border-[#3F3F46] bg-[#111111]" /></td>
                  <td className="p-4 text-xs font-bold text-white">BILL-4492</td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-white">L&T Construction</p>
                    <p className="text-[10px] text-[#71717A]">Project Alpha - Milestone 3</p>
                  </td>
                  <td className="p-4 text-xs text-danger font-bold">Today</td>
                  <td className="p-4 text-xs font-black text-white">₹42,50,000</td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-warning/10 text-warning border border-warning/30 px-2 py-0.5 rounded uppercase">Pending Approval</span></td>
                  <td className="p-4 text-right"><button className="text-[10px] font-bold text-brand-blue bg-brand-blue/10 border border-brand-blue/30 px-3 py-1.5 rounded hover:bg-brand-blue/20">Approve</button></td>
                </tr>

                <tr className="hover:bg-[#111111] transition-colors">
                  <td className="p-4"><input type="checkbox" className="rounded border-[#3F3F46] bg-[#111111]" /></td>
                  <td className="p-4 text-xs font-bold text-white">BILL-4495</td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-white">Otis Elevators</p>
                    <p className="text-[10px] text-[#71717A]">AMC Contract - Cyber City</p>
                  </td>
                  <td className="p-4 text-xs text-[#A1A1AA]">Jun 28, 2026</td>
                  <td className="p-4 text-xs font-black text-white">₹8,40,000</td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-success/10 text-success border border-success/30 px-2 py-0.5 rounded uppercase">Approved</span></td>
                  <td className="p-4 text-right"><button className="text-[10px] font-bold text-[#00E5FF] hover:underline">Pay Now</button></td>
                </tr>

                <tr className="hover:bg-[#111111] transition-colors">
                  <td className="p-4"><input type="checkbox" className="rounded border-[#3F3F46] bg-[#111111]" /></td>
                  <td className="p-4 text-xs font-bold text-white">BILL-4480</td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-white">JLL Facilities</p>
                    <p className="text-[10px] text-[#71717A]">Manpower Services - May</p>
                  </td>
                  <td className="p-4 text-xs text-[#A1A1AA]">Jun 15, 2026</td>
                  <td className="p-4 text-xs font-black text-[#A1A1AA] line-through">₹12,10,000</td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-[#2A2A30] text-[#71717A] border border-[#3F3F46] px-2 py-0.5 rounded uppercase">Paid</span></td>
                  <td className="p-4 text-right"><button className="text-[10px] font-bold text-[#A1A1AA] hover:text-white">Receipt</button></td>
                </tr>

              </tbody>
            </table>
         </div>
      </div>

    </div>
  );
}
