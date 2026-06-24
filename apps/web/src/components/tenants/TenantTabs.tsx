'use client';

import { Activity, FileText, Banknote, AlertTriangle, FolderOpen, Car, Users, MessageSquare, GitBranch, Clock } from 'lucide-react';

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function TenantTabs({ activeTab, setActiveTab }: TabProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'lease', label: 'Lease', icon: FileText },
    { id: 'payments', label: 'Payments', icon: Banknote },
    { id: 'communication', label: 'Comms', icon: MessageSquare },
    { id: 'complaints', label: 'Complaints', icon: AlertTriangle },
    { id: 'documents', label: 'Documents', icon: FolderOpen },
    { id: 'relationships', label: 'Relations', icon: GitBranch },
    { id: 'vehicles', label: 'Vehicles', icon: Car },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'timeline', label: 'Timeline', icon: Clock },
  ];

  return (
    <div className="flex items-center gap-6 px-8 border-b border-[#2A2A30] bg-[#161616] overflow-x-auto no-scrollbar">
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
