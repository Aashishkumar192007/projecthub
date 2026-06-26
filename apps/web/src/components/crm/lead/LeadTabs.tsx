'use client';

export function LeadTabs({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'activities', label: 'Activities' },
    { id: 'visits', label: 'Site Visits' },
    { id: 'negotiations', label: 'Negotiations' },
    { id: 'bookings', label: 'Bookings' }
  ];

  return (
    <div className="h-12 shrink-0 bg-[#0A0C10] border-b border-neutral-800 px-6 flex items-end">
      <div className="flex gap-6 h-full">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`h-full flex items-center text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id 
                ? 'text-[#00E5FF] border-[#00E5FF]' 
                : 'text-neutral-500 border-transparent hover:text-neutral-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
