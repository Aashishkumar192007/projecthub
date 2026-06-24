'use client';

import { usePropertyStore } from '@/store/propertyStore';
import { LayoutDashboard, FileText, Map, Settings, Users, FolderOpen, Banknote, Activity } from 'lucide-react';

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function WorkspaceTabs({ activeTab, setActiveTab }: TabProps) {
  const { getActiveNode } = usePropertyStore();
  const activeNode = getActiveNode();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'details', label: 'Details', icon: FileText },
    { id: 'management', label: 'Management', icon: Settings }, // Manages children
    { id: 'map', label: 'Map View', icon: Map },
    { id: 'people', label: 'Owners & Tenants', icon: Users },
    { id: 'vault', label: 'Document Vault', icon: FolderOpen },
    { id: 'financials', label: 'Financials', icon: Banknote },
    { id: 'analytics', label: 'Analytics', icon: Activity },
  ];

  if (!activeNode) return null;

  return (
    <div className="flex flex-col border-b border-[#2A2A30] bg-[#161616]">
      {/* Header showing active node name */}
      <div className="px-8 py-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-[#2A2A30] text-[#A1A1AA] rounded text-[10px] font-bold uppercase tracking-wider">
            {activeNode.type}
          </span>
          {activeNode.status && (
            <span className={`w-2 h-2 rounded-full ${
              activeNode.status === 'nominal' || activeNode.status === 'occupied' ? 'bg-success' :
              activeNode.status === 'warning' || activeNode.status === 'maintenance' ? 'bg-warning' :
              activeNode.status === 'available' ? 'bg-brand-blue' : 'bg-danger'
            }`} />
          )}
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">{activeNode.name}</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 px-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 pb-4 text-xs font-bold transition-colors relative ${
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
    </div>
  );
}
