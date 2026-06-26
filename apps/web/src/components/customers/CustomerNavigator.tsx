'use client';

import React from 'react';
import { useCustomerStore, CustomerCategory } from '@/store/customerStore';
import {
  Users, UserCheck, Home, User, Briefcase, Star,
  AlertTriangle, CreditCard, Archive, TrendingUp, Flame
} from 'lucide-react';

const NAV_GROUPS: { id: CustomerCategory; label: string; icon: React.ElementType; description: string }[] = [
  { id: 'all',        label: 'All Customers',       icon: Users,         description: 'Full customer registry' },
  { id: 'owners',     label: 'Owners',               icon: Home,          description: 'Property & unit owners' },
  { id: 'residents',  label: 'Residents',            icon: User,          description: 'Active residents & tenants' },
  { id: 'corporate',  label: 'Corporate',            icon: Briefcase,     description: 'Corporate & institutional clients' },
  { id: 'vip',        label: 'VIP',                  icon: Star,          description: 'High-value relationships' },
  { id: 'hot',        label: 'Hot Customers',         icon: Flame,         description: 'Active buyers & leads' },
  { id: 'delinquent', label: 'Delinquent',           icon: AlertTriangle, description: 'Outstanding balance accounts' },
  { id: 'archived',   label: 'Archived',             icon: Archive,       description: 'Inactive records' },
];

export function CustomerNavigator() {
  const activeCategory = useCustomerStore(s => s.activeCategory);
  const setActiveCategory = useCustomerStore(s => s.setActiveCategory);
  const getCategoryCount = useCustomerStore(s => s.getCategoryCount);
  const kpis = useCustomerStore(s => s.getKPIs());

  return (
    <div className="w-64 shrink-0 border-r border-[#2A2A30] bg-[#161616] flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[#2A2A30]/60">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded bg-[#1A2533] border border-[#93A5CF]/30 flex items-center justify-center shrink-0">
            <UserCheck size={15} className="text-[#93A5CF]" />
          </div>
          <div>
            <p className="text-sm font-bold text-white tracking-wide leading-tight">Customer 360</p>
            <p className="text-[10px] text-[#71717A] font-bold tracking-widest uppercase mt-0.5">Command Center</p>
          </div>
        </div>
        {/* Mini Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#121212] border border-[#2A2A30] rounded-lg p-2.5">
            <p className="text-[10px] text-[#71717A] font-bold tracking-widest uppercase mb-1">Total</p>
            <p className="text-lg font-black text-white font-mono">{kpis.totalCustomers}</p>
          </div>
          <div className="bg-[#121212] border border-[#2A2A30] rounded-lg p-2.5">
            <p className="text-[10px] text-[#71717A] font-bold tracking-widest uppercase mb-1">Health</p>
            <p className="text-lg font-black text-[#10B981] font-mono">{kpis.avgHealthScore}</p>
          </div>
        </div>
      </div>

      {/* Nav Groups */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        <p className="px-4 text-[10px] font-bold tracking-widest text-[#71717A] uppercase mb-2">Categories</p>
        {NAV_GROUPS.map(({ id, label, icon: Icon, description }) => {
          const count = getCategoryCount(id);
          const isActive = activeCategory === id;
          return (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              aria-label={`Filter by ${label}`}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-150 group relative ${
                isActive
                  ? 'bg-[#1A2533] text-[#93A5CF]'
                  : 'text-[#A1A1AA] hover:bg-[#1E1E22] hover:text-white'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 bg-[#93A5CF] rounded-full shadow-[0_0_6px_rgba(147,165,207,0.6)]" />
              )}
              <div className="flex items-center gap-3">
                <Icon
                  size={16}
                  className={isActive ? 'text-[#93A5CF]' : 'text-[#71717A] group-hover:text-[#A1A1AA]'}
                />
                <span className="text-sm font-bold">{label}</span>
              </div>
              <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                isActive
                  ? 'bg-[#93A5CF]/20 text-[#93A5CF]'
                  : 'bg-[#2A2A30] text-[#71717A] group-hover:text-[#A1A1AA]'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-[#2A2A30]/60 space-y-2">
        <div className="flex items-center gap-2 px-2 py-2">
          <TrendingUp size={14} className="text-[#10B981]" />
          <p className="text-xs text-[#71717A] font-bold">
            <span className="text-[#10B981]">{kpis.newThisMonth}</span> new this month
          </p>
        </div>
        <div className="flex items-center gap-2 px-2 py-2">
          <CreditCard size={14} className="text-[#F59E0B]" />
          <p className="text-xs text-[#71717A] font-bold">
            <span className="text-[#F59E0B]">{kpis.delinquentCount}</span> delinquent
          </p>
        </div>
      </div>
    </div>
  );
}
