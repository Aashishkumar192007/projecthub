'use client';

import { useCrmStore } from '@/store/crmStore';

export function CrmTabs() {
  const { activeTab, setActiveTab } = useCrmStore();

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'pipeline', label: 'Pipeline' },
    { id: 'leads', label: 'Leads' },
    { id: 'site_visits', label: 'Site Visits' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'customers', label: 'Customers' },
    { id: 'brokers', label: 'Brokers' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'analytics', label: 'Analytics' },
  ];

  return (
    <div className="bg-[#0A0A0A] border-b border-neutral-800 px-6 shrink-0 flex items-center overflow-x-auto no-scrollbar">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors relative ${
            activeTab === tab.id
              ? 'text-white'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-400 rounded-t" />
          )}
        </button>
      ))}
    </div>
  );
}
