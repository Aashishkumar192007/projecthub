'use client';

import { Activity, Settings, Wrench, ClipboardList, LayoutDashboard, Zap, ShieldAlert, CheckSquare, Users, UserCheck, Calendar, Globe, Map, GitBranch, Clock, BarChart3 } from 'lucide-react';

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function FacilityTabs({ activeTab, setActiveTab }: TabProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'assets', label: 'Assets', icon: Settings },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'workorders', label: 'Work Orders', icon: ClipboardList },
    { id: 'space', label: 'Space', icon: LayoutDashboard },
    { id: 'utilities', label: 'Utilities', icon: Zap },
    { id: 'energy', label: 'Energy', icon: Globe },
    { id: 'inspections', label: 'Inspections', icon: ShieldAlert },
    { id: 'vendors', label: 'Vendors', icon: Users },
    { id: 'visitors', label: 'Visitors', icon: UserCheck },
    { id: 'reservations', label: 'Reservations', icon: Calendar },
    { id: 'esg', label: 'ESG', icon: Globe },
    { id: 'digitaltwin', label: 'Digital Twin', icon: Map },
    { id: 'relations', label: 'Relations', icon: GitBranch },
    { id: 'timeline', label: 'Timeline', icon: Clock },
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
