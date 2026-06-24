'use client';

import { Activity, LayoutList, FileSpreadsheet, ShoppingCart, FileText, CheckSquare, ShieldAlert, Wrench, Banknote, FolderOpen, Clock, GitBranch, BarChart3, Map } from 'lucide-react';

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function ProjectTabs({ activeTab, setActiveTab }: TabProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'milestones', label: 'Milestones', icon: LayoutList },
    { id: 'boq', label: 'BOQ', icon: FileSpreadsheet },
    { id: 'procurement', label: 'Procurement', icon: ShoppingCart },
    { id: 'dpr', label: 'DPR', icon: FileText },
    { id: 'quality', label: 'Quality', icon: CheckSquare },
    { id: 'safety', label: 'Safety', icon: ShieldAlert },
    { id: 'snagging', label: 'Snagging', icon: Wrench },
    { id: 'financials', label: 'Financials', icon: Banknote },
    { id: 'documents', label: 'Documents', icon: FolderOpen },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'relations', label: 'Relations', icon: GitBranch },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'siteview', label: 'Site View', icon: Map },
  ];

  return (
    <div className="flex items-center gap-6 px-8 border-b border-[#2A2A30] bg-[#161616] overflow-x-auto no-scrollbar shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 py-4 text-[11px] font-bold transition-colors relative whitespace-nowrap ${
            activeTab === tab.id ? 'text-brand-blue' : 'text-[#A1A1AA] hover:text-white'
          }`}
        >
          <tab.icon size={14} />
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue shadow-[0_0_8px_rgba(147,165,207,0.5)]" />
          )}
        </button>
      ))}
    </div>
  );
}
