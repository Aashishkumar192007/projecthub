'use client';

import React from 'react';
import { Users, UserPlus, Home, User, Briefcase, Star, AlertTriangle, CreditCard, Activity } from 'lucide-react';

const navGroups = [
  { id: 'all', label: 'All Customers', icon: Users, count: 1240 },
  { id: 'new', label: 'New Customers', icon: UserPlus, count: 45 },
  { id: 'owners', label: 'Owners', icon: Home, count: 850 },
  { id: 'residents', label: 'Residents', icon: User, count: 620 },
  { id: 'investors', label: 'Investors', icon: Activity, count: 180 },
  { id: 'corporate', label: 'Corporate Clients', icon: Briefcase, count: 32 },
  { id: 'vip', label: 'VIP Customers', icon: Star, count: 15 },
  { id: 'inactive', label: 'Inactive', icon: Users, count: 120 },
  { id: 'high-risk', label: 'High Risk', icon: AlertTriangle, count: 28 },
  { id: 'outstanding', label: 'Outstanding Payments', icon: CreditCard, count: 145 },
];

export function CustomerNavigator() {
  const [activeGroup, setActiveGroup] = React.useState('all');

  return (
    <div className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl flex flex-col h-full overflow-y-auto shrink-0">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-sm font-semibold text-white/90 tracking-wide uppercase">Customer Navigator</h2>
      </div>
      
      <div className="p-2 space-y-1 flex-1">
        {navGroups.map((group) => {
          const Icon = group.icon;
          const isActive = activeGroup === group.id;
          return (
            <button
              key={group.id}
              onClick={() => setActiveGroup(group.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white/90'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-white/40'}`} />
                <span className="text-sm font-medium">{group.label}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isActive ? 'bg-blue-500/20 text-blue-300' : 'bg-white/5 text-white/40'
              }`}>
                {group.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
