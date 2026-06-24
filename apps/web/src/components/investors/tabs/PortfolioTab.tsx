'use client';

import { useInvestorStore } from '@/store/investorStore';
import { PieChart, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function PortfolioTab() {
  const { investors, activeInvestorId } = useInvestorStore();
  
  if (!activeInvestorId) return null;
  const activeInvestor = investors.find(r => r.id === activeInvestorId);
  if (!activeInvestor) return null;

  return (
    <div className="p-8 space-y-6">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><PieChart size={16} className="text-[#00E5FF]"/> Portfolio Allocation Breakdown</h3>
        <button className="text-[10px] text-[#00E5FF] uppercase font-bold px-3 py-1 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded hover:bg-[#00E5FF]/20 transition-colors">
          Download Analysis
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        
        {/* The Allocation Cards */}
        {activeInvestor.allocations.map(allocation => (
          <div key={allocation.id} className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-[#3F3F46] transition-all group relative overflow-hidden">
             
             {/* Subtle background sector coloring */}
             <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] opacity-10 pointer-events-none bg-[#00E5FF] group-hover:opacity-20 transition-opacity"></div>
             
             <div className="relative z-10 flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{allocation.sector}</h4>
                  <span className="text-[10px] text-[#A1A1AA] uppercase font-bold tracking-widest">{allocation.percentage}% of Portfolio</span>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  allocation.trend === 'Up' ? 'bg-success/10 text-success border border-success/30' :
                  allocation.trend === 'Down' ? 'bg-danger/10 text-danger border border-danger/30' :
                  'bg-warning/10 text-warning border border-warning/30'
                }`}>
                  {allocation.trend === 'Up' ? <TrendingUp size={14} /> : allocation.trend === 'Down' ? <TrendingDown size={14} /> : <Minus size={14} />}
                </div>
             </div>

             <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="bg-[#111111] p-3 rounded border border-[#2A2A30]">
                  <p className="text-[9px] text-[#71717A] font-bold uppercase tracking-widest mb-1">Valuation</p>
                  <p className="text-lg font-black text-white">${allocation.value}M</p>
                </div>
                <div className="bg-[#111111] p-3 rounded border border-[#2A2A30]">
                  <p className="text-[9px] text-[#71717A] font-bold uppercase tracking-widest mb-1">Sector ROI</p>
                  <p className={`text-lg font-black ${allocation.roi >= 15 ? 'text-success' : 'text-white'}`}>{allocation.roi}%</p>
                </div>
             </div>
          </div>
        ))}

      </div>

      <div className="mt-8 bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-64 flex items-center justify-center relative overflow-hidden">
        {/* Placeholder for complex charting library (Recharts/Chart.js) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
        <div className="text-center z-10">
          <PieChart size={48} className="mx-auto text-[#3F3F46] mb-4" />
          <h4 className="text-sm font-bold text-white mb-2">Interactive Visual Breakdown</h4>
          <p className="text-xs text-[#71717A] max-w-md mx-auto">Render high-fidelity Recharts or D3 pie charts mapping the sector allocation here.</p>
        </div>
      </div>

    </div>
  );
}
