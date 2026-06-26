'use client';

import React from 'react';
import { Users, Key, UserPlus, LogOut, CheckCircle, Clock, ShieldAlert, XCircle } from 'lucide-react';

const groups = [
  { id: 'all', label: 'All Residents', icon: Users, count: 850 },
  { id: 'owners', label: 'Owners', icon: Key, count: 420 },
  { id: 'tenants', label: 'Tenants', icon: Users, count: 210 },
  { id: 'family', label: 'Family Members', icon: Users, count: 220 },
  { id: 'pending', label: 'Move-In Pending', icon: Clock, count: 15 },
  { id: 'moveout', label: 'Move-Out Scheduled', icon: LogOut, count: 8 },
  { id: 'inactive', label: 'Inactive', icon: XCircle, count: 25 },
  { id: 'verified', label: 'Verified', icon: CheckCircle, count: 810 },
  { id: 'unverified', label: 'Unverified', icon: ShieldAlert, count: 40 },
];

export function ResidentNavigator() {
  const [activeGroup, setActiveGroup] = React.useState('all');

  return (
    <div className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl flex flex-col h-full overflow-y-auto shrink-0">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-sm font-semibold text-white/90 tracking-wide uppercase">Resident Registry</h2>
      </div>
      
      <div className="p-2 space-y-1 flex-1">
        {groups.map((group) => {
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
