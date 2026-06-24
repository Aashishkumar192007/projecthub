'use client';

import { useExecutiveStore } from '@/store/executiveStore';
import { Activity, ArrowRight, Download, FileText, Target, ShieldAlert, BarChart3, Presentation } from 'lucide-react';
import Link from 'next/link';

export function PortfolioHealthWidget() {
  const { getPortfolioHealthIndex } = useExecutiveStore();
  const index = getPortfolioHealthIndex();

  return (
    <div className="space-y-6">
      
      {/* Portfolio Command Deck */}
      <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#2A2A30] flex items-center justify-center">
            <Presentation size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Executive Command Deck</h3>
            <p className="text-[10px] text-[#A1A1AA]">Quick actions and report generation.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
            <FileText size={12} /> Board Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
            <BarChart3 size={12} /> Investor Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
            <Target size={12} /> Portfolio Review
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
            <ShieldAlert size={12} /> Risk Analysis
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 rounded text-[11px] font-bold text-white transition-colors shadow-[0_0_10px_rgba(79,132,255,0.3)]">
            <Download size={12} /> Export KPIs
          </button>
        </div>
      </div>

      {/* Health Index */}
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 relative overflow-hidden group">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-success/10 transition-colors"></div>

        <div className="flex justify-between items-center relative z-10 mb-8">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Activity size={24} className="text-success" />
              Portfolio Health Index
            </h2>
            <p className="text-xs text-[#71717A] mt-1">Aggregated from Occupancy, Revenue Growth, Collections, ESG, and Tenant Health.</p>
          </div>
          <div className="text-right">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black text-success tracking-tighter">{index}</span>
              <span className="text-xl font-bold text-[#71717A]">/ 100</span>
            </div>
            <p className="text-[10px] font-bold text-success uppercase tracking-widest mt-1">Extremely Healthy</p>
          </div>
        </div>

        {/* KPI Drilldowns */}
        <div className="grid grid-cols-5 gap-4">
          
          <Link href="/properties" className="block bg-[#111111] border border-[#2A2A30] hover:border-brand-blue/50 rounded-xl p-4 transition-colors group/kpi cursor-pointer">
             <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-2">Total Assets</p>
             <div className="flex items-end justify-between">
               <span className="text-2xl font-black text-white">412</span>
               <ArrowRight size={14} className="text-[#3F3F46] group-hover/kpi:text-brand-blue transition-colors" />
             </div>
          </Link>

          <Link href="/portfolio" className="block bg-[#111111] border border-[#2A2A30] hover:border-brand-blue/50 rounded-xl p-4 transition-colors group/kpi cursor-pointer">
             <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-2">Occupancy</p>
             <div className="flex items-end justify-between">
               <span className="text-2xl font-black text-white">91%</span>
               <ArrowRight size={14} className="text-[#3F3F46] group-hover/kpi:text-brand-blue transition-colors" />
             </div>
          </Link>

          <div className="bg-[#111111] border border-[#2A2A30] rounded-xl p-4">
             <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-2">Total Revenue</p>
             <div className="flex items-end justify-between">
               <span className="text-2xl font-black text-success">₹148 Cr</span>
             </div>
          </div>

          <div className="bg-[#111111] border border-[#2A2A30] rounded-xl p-4">
             <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-2">Collections</p>
             <div className="flex items-end justify-between">
               <span className="text-2xl font-black text-white">94.2%</span>
             </div>
          </div>

          <Link href="/tenants" className="block bg-[#111111] border border-[#2A2A30] hover:border-brand-blue/50 rounded-xl p-4 transition-colors group/kpi cursor-pointer">
             <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-2">Tenant Health</p>
             <div className="flex items-end justify-between">
               <span className="text-2xl font-black text-white">88%</span>
               <ArrowRight size={14} className="text-[#3F3F46] group-hover/kpi:text-brand-blue transition-colors" />
             </div>
          </Link>

        </div>

      </div>
    </div>
  );
}
