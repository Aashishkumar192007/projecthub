'use client';

import { Activity, Users, UserCheck, CalendarPlus, MessageSquareWarning, CreditCard, FileText, Car, Heart, ShoppingBag, Calendar, Bell, MessageCircle, Home, Clock, GitBranch } from 'lucide-react';

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function ResidentTabs({ activeTab, setActiveTab }: TabProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'visitors', label: 'Visitors', icon: UserCheck },
    { id: 'facilities', label: 'Facilities', icon: CalendarPlus },
    { id: 'complaints', label: 'Complaints', icon: MessageSquareWarning },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'vehicles', label: 'Vehicles', icon: Car },
    { id: 'family', label: 'Family', icon: Heart },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'notices', label: 'Notices', icon: Bell },
    { id: 'communication', label: 'Communication', icon: MessageCircle },
    { id: 'smarthome', label: 'Smart Home', icon: Home },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'relations', label: 'Relations', icon: GitBranch },
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
