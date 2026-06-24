'use client';

import { Activity, PieChart, Landmark, Building2, HardHat, TrendingUp, DollarSign, ArrowRightLeft, Scale, FileText, ShieldAlert, Leaf, LineChart, Clock, GitBranch, BarChart3 } from 'lucide-react';

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function InvestorTabs({ activeTab, setActiveTab }: TabProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart },
    { id: 'investments', label: 'Investments', icon: Landmark },
    { id: 'properties', label: 'Properties', icon: Building2 },
    { id: 'projects', label: 'Projects', icon: HardHat },
    { id: 'returns', label: 'Returns', icon: TrendingUp },
    { id: 'cashflow', label: 'Cash Flow', icon: DollarSign },
    { id: 'distributions', label: 'Distributions', icon: ArrowRightLeft },
    { id: 'valuations', label: 'Valuations', icon: Scale },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'risk', label: 'Risk', icon: ShieldAlert },
    { id: 'esg', label: 'ESG', icon: Leaf },
    { id: 'forecasts', label: 'Forecasts', icon: LineChart },
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
