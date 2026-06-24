'use client';

import { useProjectStore } from '@/store/projectStore';
import { Banknote, TrendingUp, AlertTriangle, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export function FinancialsTab() {
  const { projects, activeProjectId } = useProjectStore();
  
  if (!activeProjectId) return null;
  const activeProject = projects.find(p => p.id === activeProjectId);
  if (!activeProject) return null;

  return (
    <div className="p-8 space-y-6">
      
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><Banknote size={16} className="text-success"/> Project Accounting Dashboard</h3>
        <span className="text-[10px] text-[#A1A1AA] uppercase font-bold px-3 py-1 bg-[#1A1A1A] border border-[#2A2A30] rounded-lg">Fiscal Year 2026</span>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-2">Total Budget</p>
           <p className="text-2xl font-black text-white">₹ 450 Cr</p>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-2">Actual Cost</p>
           <p className="text-2xl font-black text-brand-blue">₹ 324 Cr</p>
           <div className="flex items-center gap-2 mt-2">
             <span className="text-xs font-bold text-success flex items-center gap-1"><ArrowDownRight size={12}/> Under Run</span>
           </div>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 relative overflow-hidden group hover:border-danger/50 transition-colors cursor-pointer">
           <div className="absolute top-0 right-0 w-16 h-16 bg-danger/5 rounded-full blur-[20px] pointer-events-none group-hover:bg-danger/10 transition-colors"></div>
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-2 flex items-center gap-1"><AlertTriangle size={12} className="text-danger"/> Forecast Cost</p>
           <p className="text-2xl font-black text-white">₹ 472 Cr</p>
           <div className="flex items-center gap-2 mt-2">
             <span className="text-xs font-bold text-danger flex items-center gap-1"><ArrowUpRight size={12}/> +4.8% Variance</span>
           </div>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-2">Cash Flow (MTD)</p>
           <p className="text-2xl font-black text-white">₹ -12.4 Cr</p>
           <div className="flex items-center gap-2 mt-2">
             <span className="text-xs font-bold text-success flex items-center gap-1"><TrendingUp size={12}/> Within Limits</span>
           </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-64 flex items-center justify-center relative overflow-hidden group">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50"></div>
         <div className="text-center z-10">
           <h4 className="text-sm font-bold text-white mb-2">Budget Consumption Curve</h4>
           <p className="text-xs text-[#71717A] max-w-sm">This module integrates directly with the Enterprise ERP system. Visualization implementation scheduled for Phase 11.</p>
         </div>
      </div>

    </div>
  );
}
