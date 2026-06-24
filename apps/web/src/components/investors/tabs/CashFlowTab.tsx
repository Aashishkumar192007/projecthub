'use client';

import { DollarSign, ArrowUpRight, ArrowDownRight, RefreshCcw } from 'lucide-react';

export function CashFlowTab() {
  return (
    <div className="p-8 space-y-6">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><DollarSign size={16} className="text-[#00E5FF]"/> Cash Flow Tracking</h3>
        <span className="text-[10px] text-[#A1A1AA] uppercase font-bold px-3 py-1 bg-[#1A1A1A] border border-[#2A2A30] rounded-lg flex items-center gap-2">
          <RefreshCcw size={10} className="text-brand-blue" /> Live Sync Active
        </span>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1A1A1A] p-5 rounded-xl border border-[#2A2A30] border-l-4 border-l-success">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-2 flex items-center gap-1.5"><ArrowUpRight size={12} className="text-success"/> Inflows (MTD)</p>
           <p className="text-2xl font-black text-white">$14.2M</p>
        </div>
        <div className="bg-[#1A1A1A] p-5 rounded-xl border border-[#2A2A30] border-l-4 border-l-danger">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-2 flex items-center gap-1.5"><ArrowDownRight size={12} className="text-danger"/> Outflows (MTD)</p>
           <p className="text-2xl font-black text-white">$3.8M</p>
        </div>
        <div className="bg-[#1A1A1A] p-5 rounded-xl border border-[#2A2A30] border-l-4 border-l-[#00E5FF]">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-2">Net Cash Flow</p>
           <p className="text-2xl font-black text-[#00E5FF]">+$10.4M</p>
        </div>
        <div className="bg-[#1A1A1A] p-5 rounded-xl border border-[#2A2A30] border-l-4 border-l-warning">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-2">Available Liquidity</p>
           <p className="text-2xl font-black text-white">$125.0M</p>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 mt-6">
         <h4 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest mb-6">Monthly Ledger</h4>
         <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-[#111111] border border-[#2A2A30] rounded-lg">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Rental Income Distribution</span>
                <span className="text-[10px] text-[#71717A]">Residential Portfolio Phase 1</span>
              </div>
              <span className="text-sm font-black text-success">+$2.4M</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#111111] border border-[#2A2A30] rounded-lg">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Maintenance CapEx Drawdown</span>
                <span className="text-[10px] text-[#71717A]">Commercial Towers B & C</span>
              </div>
              <span className="text-sm font-black text-danger">-$0.8M</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#111111] border border-[#2A2A30] rounded-lg">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">New Lease Upfront Capital</span>
                <span className="text-[10px] text-[#71717A]">Industrial Park West</span>
              </div>
              <span className="text-sm font-black text-success">+$11.8M</span>
            </div>
         </div>
      </div>
    </div>
  );
}
