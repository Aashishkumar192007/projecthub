'use client';

import { useInvestorStore } from '@/store/investorStore';
import { Briefcase, Download, CalendarPlus, TrendingUp, BarChart3, FileText, ArrowUpRight } from 'lucide-react';

export function InvestorHeader() {
  const { investors, activeInvestorId } = useInvestorStore();
  
  if (!activeInvestorId) return null;
  const activeInvestor = investors.find(f => f.id === activeInvestorId);
  if (!activeInvestor) return null;

  return (
    <div className="bg-[#161616] border-b border-[#2A2A30] p-8 shrink-0 relative overflow-hidden">
      
      {/* Decorative background glow based on Health Score */}
      <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none transition-colors ${
        activeInvestor.healthScore >= 90 ? 'bg-[#00E5FF]/5' : 
        activeInvestor.healthScore >= 70 ? 'bg-warning/5' : 'bg-danger/5'
      }`}></div>

      <div className="flex items-start justify-between relative z-10">
        
        {/* Investor Info */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-[#1A1A1A] border-2 border-[#2A2A30] shadow-2xl flex items-center justify-center relative overflow-hidden">
            <Briefcase size={32} className="text-[#A1A1AA]" />
            <div className={`absolute bottom-2 right-2 w-3 h-3 rounded-full border-2 border-[#161616] ${
              activeInvestor.riskRating === 'Low' ? 'bg-success' : 
              activeInvestor.riskRating === 'Moderate' ? 'bg-warning' : 'bg-danger'
            }`}></div>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-black text-white tracking-tight">{activeInvestor.name}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border bg-[#2A2A30] text-[#A1A1AA] border-[#3F3F46]">
                {activeInvestor.type}
              </span>
            </div>
            
            <div className="flex items-center gap-6 mt-3">
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider">AUM:</span>
                 <span className="text-sm font-black text-white">${activeInvestor.portfolioValue}M</span>
               </div>
               <div className="w-px h-4 bg-[#2A2A30]"></div>
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Capital:</span>
                 <span className="text-sm font-black text-white">${activeInvestor.investedCapital}M</span>
               </div>
               <div className="w-px h-4 bg-[#2A2A30]"></div>
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Net Worth Contrib:</span>
                 <span className="text-sm font-black text-[#00E5FF]">{activeInvestor.netWorthContribution}%</span>
               </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col items-end gap-3">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <BarChart3 size={12} /> Analysis
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <CalendarPlus size={12} /> Review
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <Download size={12} /> Export
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded text-[11px] font-bold transition-colors shadow-[0_0_15px_rgba(79,132,255,0.3)] border border-brand-blue/50">
              <FileText size={12} /> Generate Report
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-bold mt-2">
            <span className="text-[#71717A] uppercase tracking-wider">Current ROI:</span>
            <span className="flex items-center gap-1 text-success bg-success/10 border border-success/30 px-2 py-0.5 rounded">
               <ArrowUpRight size={10} /> {activeInvestor.currentRoi}%
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
