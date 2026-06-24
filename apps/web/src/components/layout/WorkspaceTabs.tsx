'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function WorkspaceTabs({ tabs }: { tabs: string[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex space-x-1 border-b border-gray-800 px-6 pt-4 bg-background">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-text-primary ${
            activeTab === tab ? 'text-text-primary' : 'text-text-secondary'
          }`}
        >
          {tab}
          {activeTab === tab && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              initial={false}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
