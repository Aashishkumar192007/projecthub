'use client';

import { ArrowUpRight, Search, Filter, Download, AlertTriangle } from 'lucide-react';

export function AccountsReceivableTab() {
  return (
    <div className="p-8 space-y-6">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><ArrowUpRight size={16} className="text-[#00E5FF]"/> Accounts Receivable Ledger</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A30] rounded text-[10px] font-bold text-white hover:bg-[#1E1E22] transition-colors"><Search size={12}/> Search Inv</button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A30] rounded text-[10px] font-bold text-white hover:bg-[#1E1E22] transition-colors"><Filter size={12}/> Filter</button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 rounded text-[10px] font-bold hover:bg-[#00E5FF]/20 transition-colors"><Download size={12}/> Export Aging Report</button>
        </div>
      </div>

      {/* AR Aging Summary */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1">Current</p>
           <p className="text-xl font-black text-white">₹24.5M</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1">1-30 Days</p>
           <p className="text-xl font-black text-warning">₹12.2M</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1">31-60 Days</p>
           <p className="text-xl font-black text-warning">₹4.1M</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-danger">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1">61-90 Days</p>
           <p className="text-xl font-black text-danger">₹0.8M</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-danger">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1 flex items-center gap-1"><AlertTriangle size={10}/> 90+ Days</p>
           <p className="text-xl font-black text-danger">₹0.4M</p>
        </div>
      </div>

      {/* Outstanding Invoices List */}
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl overflow-hidden mt-6">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#161616] border-b border-[#2A2A30]">
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Invoice #</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Customer / Tenant</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Due Date</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Amount</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Status</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A30]">
                
                <tr className="hover:bg-[#111111] transition-colors">
                  <td className="p-4 text-xs font-bold text-white">INV-2026-0842</td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-white">TechCorp India</p>
                    <p className="text-[10px] text-[#71717A]">Commercial Rent - Tower B</p>
                  </td>
                  <td className="p-4 text-xs text-[#A1A1AA]">Jun 15, 2026</td>
                  <td className="p-4 text-xs font-black text-white">₹12,50,000</td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-danger/10 text-danger border border-danger/30 px-2 py-0.5 rounded uppercase">7 Days Overdue</span></td>
                  <td className="p-4 text-right"><button className="text-[10px] font-bold text-[#00E5FF] hover:underline">Send Reminder</button></td>
                </tr>

                <tr className="hover:bg-[#111111] transition-colors">
                  <td className="p-4 text-xs font-bold text-white">INV-2026-0845</td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-white">Global Retailers Ltd</p>
                    <p className="text-[10px] text-[#71717A]">CAM Charges - Q2</p>
                  </td>
                  <td className="p-4 text-xs text-[#A1A1AA]">Jun 30, 2026</td>
                  <td className="p-4 text-xs font-black text-white">₹4,25,000</td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-[#2A2A30] text-[#A1A1AA] border border-[#3F3F46] px-2 py-0.5 rounded uppercase">Current</span></td>
                  <td className="p-4 text-right"><button className="text-[10px] font-bold text-[#00E5FF] hover:underline">View</button></td>
                </tr>

                <tr className="hover:bg-[#111111] transition-colors">
                  <td className="p-4 text-xs font-bold text-white">INV-2026-0812</td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-white">Sunrise Traders</p>
                    <p className="text-[10px] text-[#71717A]">Warehouse Lease - Zone 4</p>
                  </td>
                  <td className="p-4 text-xs text-[#A1A1AA]">May 01, 2026</td>
                  <td className="p-4 text-xs font-black text-white">₹8,10,000</td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-danger border border-danger px-2 py-0.5 rounded uppercase text-white">45 Days Overdue</span></td>
                  <td className="p-4 text-right"><button className="text-[10px] font-bold text-danger hover:underline">Initiate Legal</button></td>
                </tr>

              </tbody>
            </table>
         </div>
      </div>

    </div>
  );
}
