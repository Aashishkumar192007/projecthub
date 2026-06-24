'use client';

import { Activity, ArrowUpRight, ArrowDownRight, BookOpen, Target, Vault, Handshake, Receipt, Building2, HardHat, Users, FileText, ShieldCheck, Clock, GitBranch, BarChart3 } from 'lucide-react';

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function FinanceTabs({ activeTab, setActiveTab }: TabProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'ar', label: 'Accounts Receivable', icon: ArrowUpRight },
    { id: 'ap', label: 'Accounts Payable', icon: ArrowDownRight },
    { id: 'gl', label: 'General Ledger', icon: BookOpen },
    { id: 'budgets', label: 'Budgeting', icon: Target },
    { id: 'treasury', label: 'Treasury', icon: Vault },
    { id: 'collections', label: 'Collections', icon: Handshake },
    { id: 'taxation', label: 'Taxation', icon: Receipt },
    { id: 'assets', label: 'Assets', icon: Building2 },
    { id: 'projects', label: 'Projects', icon: HardHat },
    { id: 'investors', label: 'Investors', icon: Users },
    { id: 'reporting', label: 'Reporting', icon: FileText },
    { id: 'audit', label: 'Audit', icon: ShieldCheck },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'relations', label: 'Relations', icon: GitBranch },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="flex items-center gap-6 px-8 border-b border-[#2A2A30] bg-[#161616] overflow-x-auto no-scrollbar shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 py-4 text-[11px] font-bold transition-colors relative whitespace-nowrap ${
            activeTab === tab.id ? 'text-[#00E5FF]' : 'text-[#A1A1AA] hover:text-white'
          }`}
        >
          <tab.icon size={14} />
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00E5FF] shadow-[0_0_8px_rgba(0,229,255,0.5)]" />
          )}
        </button>
      ))}
    </div>
  );
}
