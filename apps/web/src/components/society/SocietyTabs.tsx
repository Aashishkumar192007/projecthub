'use client';

import { Activity, UserSquare2, Users, Headset, UserPlus, Shield, Map, Calendar, MessageSquare, Megaphone, PieChart, Vote, IndianRupee, FileCheck, FileText, Clock, GitBranch, BarChart3 } from 'lucide-react';

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function SocietyTabs({ activeTab, setActiveTab }: TabProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'residents', label: 'Residents', icon: UserSquare2 },
    { id: 'committee', label: 'Committee', icon: Users },
    { id: 'complaints', label: 'Complaints', icon: Headset },
    { id: 'visitors', label: 'Visitors', icon: UserPlus },
    { id: 'staff', label: 'Staff', icon: Shield },
    { id: 'facilities', label: 'Facilities', icon: Map },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'notices', label: 'Notices', icon: Megaphone },
    { id: 'polls', label: 'Polls', icon: PieChart },
    { id: 'elections', label: 'Elections', icon: Vote },
    { id: 'accounting', label: 'Accounting', icon: IndianRupee },
    { id: 'compliance', label: 'Compliance', icon: FileCheck },
    { id: 'documents', label: 'Documents', icon: FileText },
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
