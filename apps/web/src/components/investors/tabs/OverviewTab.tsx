'use client';

import { useInvestorStore } from '@/store/investorStore';
import { Activity, TrendingUp, BarChart, ShieldCheck, ArrowUpRight, DollarSign } from 'lucide-react';

export function OverviewTab() {
  const { investors, activeInvestorId } = useInvestorStore();
  
  if (!activeInvestorId) return null;
  const activeInvestor = investors.find(r => r.id === activeInvestorId);
  if (!activeInvestor) return null;

  return (
    <div className="p-8 space-y-6">
      
      {/* Top KPIs - Bloomberg Terminal Style */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-[#00E5FF]/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <BarChart size={14} className="text-[#00E5FF]" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">AUM Valuation</span>
           </div>
           <div className="flex items-end gap-2">
             <p className="text-4xl font-black text-white">${activeInvestor.portfolioValue}</p>
             <span className="text-sm font-bold text-[#71717A] mb-1">Million</span>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-success/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <TrendingUp size={14} className="text-success" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Internal Rate of Return</span>
           </div>
           <div className="flex items-end gap-2">
             <p className="text-4xl font-black text-success">{activeInvestor.irr}%</p>
             <span className="text-[10px] font-bold bg-success/10 text-success border border-success/30 px-2 py-0.5 rounded uppercase mb-2">Alpha</span>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-warning/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <DollarSign size={14} className="text-warning" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Capital Invested</span>
           </div>
           <div className="flex items-end gap-2">
             <p className="text-4xl font-black text-white">${activeInvestor.investedCapital}</p>
             <span className="text-sm font-bold text-[#71717A] mb-1">Million</span>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-brand-blue/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <ShieldCheck size={14} className="text-brand-blue" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Portfolio Health</span>
           </div>
           <div className="flex items-end gap-2">
             <p className={`text-4xl font-black ${
               activeInvestor.healthScore >= 90 ? 'text-[#00E5FF]' : 
               activeInvestor.healthScore >= 70 ? 'text-warning' : 'text-danger'
             }`}>{activeInvestor.healthScore}</p>
             <span className="text-sm font-bold text-[#71717A] mb-1">/ 100</span>
           </div>
        </div>

      </div>

      <div className="grid grid-cols-3 gap-6">
        
        {/* Core Allocation Summary */}
        <div className="col-span-1 bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
          <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest mb-6 flex items-center gap-2">
            <Activity size={14} className="text-white" /> Asset Allocation
          </h3>
          <div className="space-y-4">
            {activeInvestor.allocations.map(allocation => (
              <div key={allocation.id} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white">{allocation.sector}</span>
                  <span className="text-xs font-bold text-[#00E5FF]">{allocation.percentage}%</span>
                </div>
                <div className="w-full bg-[#111111] h-1.5 rounded-full overflow-hidden border border-[#2A2A30]">
                  <div 
                    className="h-full bg-[linear-gradient(90deg,#00E5FF,#0066FF)] rounded-full" 
                    style={{ width: `${allocation.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Financial Activity */}
        <div className="col-span-2 bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest flex items-center gap-2">
              <DollarSign size={14} className="text-[#00E5FF]" /> Financial Activity
            </h3>
            <button className="text-[10px] text-brand-blue font-bold hover:underline">View Ledger</button>
          </div>
          
          <div className="flex-1 space-y-3">
            <div className="flex justify-between items-center p-4 bg-[#111111] border border-[#2A2A30] rounded-lg hover:border-[#3F3F46] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-success/10 border border-success/30 flex items-center justify-center text-success"><ArrowUpRight size={14}/></div>
                <div>
                  <p className="text-sm font-bold text-white">Quarterly Distribution Released</p>
                  <p className="text-[10px] text-[#71717A] mt-0.5">June 15, 2026 • Fund II</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-success">+$45.5M</p>
                <p className="text-[10px] text-success bg-success/10 px-1.5 py-0.5 rounded mt-1 inline-block">Settled</p>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-[#111111] border border-[#2A2A30] rounded-lg hover:border-[#3F3F46] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-warning/10 border border-warning/30 flex items-center justify-center text-warning"><DollarSign size={14}/></div>
                <div>
                  <p className="text-sm font-bold text-white">Capital Call: Cyber City Phase 2</p>
                  <p className="text-[10px] text-[#71717A] mt-0.5">May 28, 2026 • Construction Fund</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-warning">-$120.0M</p>
                <p className="text-[10px] text-warning bg-warning/10 px-1.5 py-0.5 rounded mt-1 inline-block">Committed</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-[#111111] border border-[#2A2A30] rounded-lg hover:border-[#3F3F46] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#2A2A30] border border-[#3F3F46] flex items-center justify-center text-white"><ShieldCheck size={14}/></div>
                <div>
                  <p className="text-sm font-bold text-white">Risk Audit Report Published</p>
                  <p className="text-[10px] text-[#71717A] mt-0.5">June 18, 2026 • Portfolio Wide</p>
                </div>
              </div>
              <div className="text-right">
                <button className="text-[10px] font-bold text-[#0A0C10] bg-[#00E5FF] px-3 py-1.5 rounded transition-colors hover:bg-[#00B3CC]">View Report</button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
