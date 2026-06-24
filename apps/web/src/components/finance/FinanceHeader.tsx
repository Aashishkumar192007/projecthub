'use client';

import { useFinanceStore } from '@/store/financeStore';
import { Landmark, CheckCircle, FileText, ArrowUpRight, DollarSign, Activity, FilePlus, Download } from 'lucide-react';

export function FinanceHeader() {
  const { stats, activeCategoryId } = useFinanceStore();
  
  if (!activeCategoryId) return null;

  return (
    <div className="bg-[#161616] border-b border-[#2A2A30] p-8 shrink-0 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none transition-colors ${
        stats.financialHealth >= 90 ? 'bg-success/5' : 
        stats.financialHealth >= 70 ? 'bg-warning/5' : 'bg-danger/5'
      }`}></div>

      <div className="flex items-start justify-between relative z-10">
        
        {/* Category Info */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-xl bg-[#1A1A1A] border-2 border-[#2A2A30] shadow-2xl flex items-center justify-center relative overflow-hidden">
            <Landmark size={32} className="text-[#A1A1AA]" />
            <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${
              stats.financialHealth >= 90 ? 'bg-success' : 
              stats.financialHealth >= 70 ? 'bg-warning' : 'bg-danger'
            }`}></div>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-black text-white tracking-tight">{activeCategoryId}</h1>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border bg-[#2A2A30] text-[#E4E4E7] border-[#3F3F46]`}>
                ERP Ledger
              </span>
            </div>
            
            <div className="flex items-center gap-6 mt-3">
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Health:</span>
                 <span className={`text-sm font-black ${
                   stats.financialHealth >= 90 ? 'text-success' : 
                   stats.financialHealth >= 70 ? 'text-warning' : 'text-danger'
                 }`}>{stats.financialHealth}/100</span>
               </div>
               <div className="w-px h-4 bg-[#2A2A30]"></div>
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Gross Rev:</span>
                 <span className="text-sm font-black text-[#00E5FF]">₹{(stats.revenue / 10000000).toFixed(1)}Cr</span>
               </div>
               <div className="w-px h-4 bg-[#2A2A30]"></div>
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Net Profit:</span>
                 <span className="text-sm font-black text-white">₹{(stats.profit / 10000000).toFixed(1)}Cr</span>
               </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col items-end gap-3">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <FilePlus size={12} /> Create Invoice
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <CheckCircle size={12} /> Approve Expense
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <Download size={12} /> Gen Report
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded text-[11px] font-bold transition-colors shadow-[0_0_15px_rgba(79,132,255,0.3)] border border-brand-blue/50">
              <Activity size={12} /> Close Period
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-bold mt-2">
            <span className="text-[#71717A] uppercase tracking-wider">Cash Position:</span>
            <span className="flex items-center gap-1 text-success bg-success/10 border border-success/30 px-2 py-0.5 rounded">
               <ArrowUpRight size={10} /> ₹{(stats.cashPosition / 10000000).toFixed(1)}Cr
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
