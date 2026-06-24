'use client';

import { useFinanceStore } from '@/store/financeStore';
import { Target, Activity, ArrowUpRight, ArrowDownRight, DollarSign, PieChart, BarChart } from 'lucide-react';

export function OverviewTab() {
  const { stats } = useFinanceStore();

  return (
    <div className="p-8 space-y-6">
      
      {/* Top Corporate KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-brand-blue/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <Activity size={14} className="text-brand-blue" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Gross Revenue (YTD)</span>
           </div>
           <div className="flex items-end gap-2">
             <p className="text-4xl font-black text-white">₹{(stats.revenue / 10000000).toFixed(1)}</p>
             <span className="text-sm font-bold text-[#71717A] mb-1">Cr</span>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-danger/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <ArrowDownRight size={14} className="text-danger" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Total Expenses (YTD)</span>
           </div>
           <div className="flex items-end gap-2">
             <p className="text-4xl font-black text-white">₹{(stats.expenses / 10000000).toFixed(1)}</p>
             <span className="text-sm font-bold text-[#71717A] mb-1">Cr</span>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-success/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <DollarSign size={14} className="text-success" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Net Profit</span>
           </div>
           <div className="flex items-end gap-2">
             <p className="text-4xl font-black text-success">₹{(stats.profit / 10000000).toFixed(1)}</p>
             <span className="text-[10px] font-bold bg-success/10 text-success border border-success/30 px-2 py-0.5 rounded uppercase mb-2 flex items-center gap-1"><ArrowUpRight size={10}/> 18.2% Margin</span>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-[#00E5FF]/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <Target size={14} className="text-[#00E5FF]" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Budget Utilization</span>
           </div>
           <div className="flex items-end gap-2">
             <p className="text-4xl font-black text-[#00E5FF]">{stats.budgetUtilization}%</p>
           </div>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-6">
        
        {/* AR / AP Summary */}
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest flex items-center gap-2">
              <PieChart size={14} className="text-white" /> Liquidity Snapshot
            </h3>
          </div>
          
          <div className="space-y-6">
             <div className="bg-[#111111] p-4 rounded-lg border border-[#2A2A30] border-l-4 border-l-success">
                <div className="flex justify-between items-end mb-2">
                   <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest">Accounts Receivable (Outstanding)</p>
                   <p className="text-2xl font-black text-white">₹{(stats.outstandingReceivables / 10000000).toFixed(2)}Cr</p>
                </div>
                <div className="w-full bg-[#1A1A1A] h-2 rounded overflow-hidden">
                  <div className="h-full bg-success w-[70%]"></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-[#A1A1AA]">
                  <span>70% Current</span>
                  <span className="text-danger">30% Overdue</span>
                </div>
             </div>

             <div className="bg-[#111111] p-4 rounded-lg border border-[#2A2A30] border-l-4 border-l-danger">
                <div className="flex justify-between items-end mb-2">
                   <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest">Accounts Payable (Outstanding)</p>
                   <p className="text-2xl font-black text-white">₹{(stats.outstandingPayables / 10000000).toFixed(2)}Cr</p>
                </div>
                <div className="w-full bg-[#1A1A1A] h-2 rounded overflow-hidden">
                  <div className="h-full bg-danger w-[45%]"></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-[#A1A1AA]">
                  <span>45% Due &lt; 30 Days</span>
                  <span>55% Due &gt; 30 Days</span>
                </div>
             </div>
          </div>
        </div>

        {/* Financial Forecasting Graph Placeholder */}
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest flex items-center gap-2">
              <BarChart size={14} className="text-[#00E5FF]" /> Cash Flow Forecast
            </h3>
            <button className="text-[10px] text-brand-blue font-bold hover:underline">View Treasury</button>
          </div>
          <div className="flex-1 bg-[#111111] rounded-lg border border-[#2A2A30] flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
             <div className="text-center z-10">
                <h4 className="text-sm font-bold text-white mb-2">Oracle Financials Integration Active</h4>
                <p className="text-xs text-[#71717A]">Predictive Cash Flow Chart loading...</p>
             </div>
          </div>
        </div>

      </div>

    </div>
  );
}
