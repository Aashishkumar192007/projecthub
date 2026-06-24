'use client';

import { useProcurementStore } from '@/store/procurementStore';
import { Target, Activity, ArrowUpRight, ArrowDownRight, Package, PieChart, BarChart } from 'lucide-react';

export function OverviewTab() {
  const { stats } = useProcurementStore();

  return (
    <div className="p-8 space-y-6">
      
      {/* Top Supply Chain KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-brand-blue/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <Activity size={14} className="text-brand-blue" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Total Spend (YTD)</span>
           </div>
           <div className="flex items-end gap-2">
             <p className="text-4xl font-black text-white">₹{(stats.totalSpend / 10000000).toFixed(1)}</p>
             <span className="text-sm font-bold text-[#71717A] mb-1">Cr</span>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-warning/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <Package size={14} className="text-warning" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Inventory Valuation</span>
           </div>
           <div className="flex items-end gap-2">
             <p className="text-4xl font-black text-white">₹{(stats.inventoryValue / 10000000).toFixed(1)}</p>
             <span className="text-sm font-bold text-[#71717A] mb-1">Cr</span>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-success/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <Target size={14} className="text-success" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Budget Utilization</span>
           </div>
           <div className="flex items-end gap-2">
             <p className="text-4xl font-black text-success">{stats.budgetConsumption}%</p>
             <span className="text-[10px] font-bold bg-success/10 text-success border border-success/30 px-2 py-0.5 rounded uppercase mb-2 flex items-center gap-1"><ArrowDownRight size={10}/> 4.2% Savings</span>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-[#00E5FF]/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <Activity size={14} className="text-[#00E5FF]" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Supply Chain Health</span>
           </div>
           <div className="flex items-end gap-2">
             <p className="text-4xl font-black text-[#00E5FF]">{stats.supplyChainHealth}/100</p>
           </div>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-6">
        
        {/* Open Procurement Summary */}
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest flex items-center gap-2">
              <PieChart size={14} className="text-white" /> Open Procurement Pipeline
            </h3>
          </div>
          
          <div className="space-y-6">
             <div className="bg-[#111111] p-4 rounded-lg border border-[#2A2A30] border-l-4 border-l-brand-blue">
                <div className="flex justify-between items-end mb-2">
                   <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest">Open Purchase Orders ({stats.openPOs})</p>
                   <p className="text-2xl font-black text-white">₹14.2Cr</p>
                </div>
                <div className="w-full bg-[#1A1A1A] h-2 rounded overflow-hidden">
                  <div className="h-full bg-brand-blue w-[60%]"></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-[#A1A1AA]">
                  <span>60% Dispatched</span>
                  <span className="text-warning">40% Pending Vendor</span>
                </div>
             </div>

             <div className="bg-[#111111] p-4 rounded-lg border border-[#2A2A30] border-l-4 border-l-purple-400">
                <div className="flex justify-between items-end mb-2">
                   <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest">Active RFQs (12)</p>
                   <p className="text-2xl font-black text-white">₹8.5Cr</p>
                </div>
                <div className="w-full bg-[#1A1A1A] h-2 rounded overflow-hidden">
                  <div className="h-full bg-purple-400 w-[30%]"></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-[#A1A1AA]">
                  <span>30% Bids Received</span>
                  <span>70% Awaiting Bids</span>
                </div>
             </div>
          </div>
        </div>

        {/* Spend Analysis Graph Placeholder */}
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest flex items-center gap-2">
              <BarChart size={14} className="text-[#00E5FF]" /> Spend by Category
            </h3>
            <button className="text-[10px] text-brand-blue font-bold hover:underline">View Analytics</button>
          </div>
          <div className="flex-1 bg-[#111111] rounded-lg border border-[#2A2A30] flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
             <div className="text-center z-10">
                <h4 className="text-sm font-bold text-white mb-2">SAP Ariba Spend Engine</h4>
                <p className="text-xs text-[#71717A]">Construction, Facilities, IT, and Marketing Spend.</p>
             </div>
          </div>
        </div>

      </div>

    </div>
  );
}
