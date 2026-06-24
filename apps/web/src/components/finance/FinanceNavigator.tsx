'use client';

import { useFinanceStore, LedgerCategory } from '@/store/financeStore';
import { Landmark, ArrowDownRight, ArrowUpRight, BookOpen, Target, Vault, Handshake, Receipt, Building2, HardHat, Users, FileText, ShieldCheck } from 'lucide-react';

export function FinanceNavigator() {
  const { ledgers, activeCategoryId, setActiveCategory } = useFinanceStore();

  const getIcon = (category: LedgerCategory) => {
    switch (category) {
      case 'Accounts Receivable': return <ArrowUpRight size={14} className="text-success" />;
      case 'Accounts Payable': return <ArrowDownRight size={14} className="text-warning" />;
      case 'General Ledger': return <BookOpen size={14} className="text-brand-blue" />;
      case 'Budgets': return <Target size={14} className="text-purple-400" />;
      case 'Treasury': return <Vault size={14} className="text-[#00E5FF]" />;
      case 'Collections': return <Handshake size={14} className="text-danger" />;
      case 'Taxation': return <Receipt size={14} className="text-[#A1A1AA]" />;
      case 'Fixed Assets': return <Building2 size={14} className="text-success" />;
      case 'Project Accounting': return <HardHat size={14} className="text-warning" />;
      case 'Investor Accounting': return <Users size={14} className="text-brand-blue" />;
      case 'Financial Reports': return <FileText size={14} className="text-pink-400" />;
      case 'Audits': return <ShieldCheck size={14} className="text-purple-400" />;
      default: return <Landmark size={14} />;
    }
  };

  const categories: LedgerCategory[] = [
    'Accounts Receivable', 'Accounts Payable', 'General Ledger', 
    'Budgets', 'Treasury', 'Collections', 'Taxation', 
    'Fixed Assets', 'Project Accounting', 'Investor Accounting', 
    'Financial Reports', 'Audits'
  ];

  return (
    <div className="w-80 border-r border-[#2A2A30] bg-[#111111] h-full flex flex-col shrink-0 z-10 overflow-y-auto no-scrollbar">
      
      <div className="p-5 border-b border-[#2A2A30] bg-[#161616] sticky top-0 z-10">
        <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Landmark size={16} className="text-[#00E5FF]" /> ERP Navigator
        </h2>
      </div>

      <div className="p-4 space-y-6">
        {categories.map((category) => {
          const groupLedgers = ledgers.filter(l => l.category === category);
          const isActiveGroup = activeCategoryId === category;
          
          return (
            <div key={category}>
              <h3 
                onClick={() => setActiveCategory(category)}
                className={`text-[10px] font-bold tracking-widest uppercase mb-3 px-2 flex items-center gap-2 cursor-pointer transition-colors ${
                  isActiveGroup ? 'text-white' : 'text-[#71717A] hover:text-[#A1A1AA]'
                }`}
              >
                {getIcon(category)} {category}
              </h3>
              
              {groupLedgers.length > 0 && (
                <div className="space-y-1.5">
                  {groupLedgers.map((ledger) => {
                    return (
                      <div 
                        key={ledger.id}
                        className={`p-3 rounded-lg border bg-[#1A1A1A] border-[#2A2A30]`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-xs font-bold leading-tight text-white">
                              {ledger.name}
                            </h4>
                            <p className="text-[10px] text-[#71717A] font-bold mt-1 uppercase tracking-wider">{ledger.owner}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-[10px] mt-2 pt-2 border-t border-[#2A2A30]">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#71717A] font-bold uppercase">Balance:</span>
                            <span className="font-black text-white">₹{(ledger.balance / 10000000).toFixed(2)}Cr</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={`font-bold px-1.5 py-0.5 rounded border ${
                              ledger.status === 'Healthy' || ledger.status === 'Cleared' ? 'bg-success/10 text-success border-success/30' :
                              ledger.status === 'At Risk' || ledger.status === 'Overdue' ? 'bg-danger/10 text-danger border-danger/30' :
                              'bg-warning/10 text-warning border-warning/30'
                            }`}>
                              {ledger.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
