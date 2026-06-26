'use client';

import React, { useMemo } from 'react';
import { useCustomerStore, computeKPIs } from '@/store/customerStore';
import { Users, Home, User, Briefcase, CreditCard, TrendingUp, Activity, Star } from 'lucide-react';

function formatCurrency(v: number): string {
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)}Cr`;
  if (v >= 100000)   return `₹${(v / 100000).toFixed(1)}L`;
  return `₹${v.toLocaleString('en-IN')}`;
}

interface KPICardProps {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
}

function KPICard({ label, value, sub, icon: Icon, color, borderColor }: KPICardProps) {
  return (
    <div className={`flex-1 min-w-[160px] bg-[#161616] border ${borderColor} rounded-xl p-4 flex items-start gap-3 hover:bg-[#1A1A1A] transition-colors`}>
      <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center shrink-0 mt-0.5`}>
        <Icon size={15} className="opacity-80" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[#71717A] mb-1 truncate">{label}</p>
        <p className="text-2xl font-black text-white font-mono leading-none">{value}</p>
        {sub && <p className="text-[11px] text-[#71717A] mt-1">{sub}</p>}
      </div>
    </div>
  );
}

export function CustomerKPIs() {
  // Read only raw stable state from the store
  const customers = useCustomerStore(s => s.customers);

  // Compute KPIs once per customers change – NO new object per render
  const kpis = useMemo(() => computeKPIs(customers), [customers]);

  return (
    <div className="flex gap-3 px-6 py-4 border-b border-[#2A2A30]/50 overflow-x-auto no-scrollbar shrink-0">
      <KPICard label="Total Customers" value={String(kpis.totalCustomers)} sub={`${kpis.newThisMonth} new this month`} icon={Users} color="bg-[#93A5CF]/15 text-[#93A5CF]" borderColor="border-[#93A5CF]/20" />
      <KPICard label="Owners" value={String(kpis.totalOwners)} sub="Properties & investors" icon={Home} color="bg-blue-500/15 text-blue-400" borderColor="border-blue-500/20" />
      <KPICard label="Residents" value={String(kpis.totalResidents)} sub="Tenants & residents" icon={User} color="bg-violet-500/15 text-violet-400" borderColor="border-violet-500/20" />
      <KPICard label="Corporate" value={String(kpis.totalCorporate)} sub="Institutional clients" icon={Briefcase} color="bg-cyan-500/15 text-cyan-400" borderColor="border-cyan-500/20" />
      <KPICard label="Outstanding" value={formatCurrency(kpis.totalOutstanding)} sub={`${kpis.delinquentCount} delinquent`} icon={CreditCard} color="bg-amber-500/15 text-amber-400" borderColor="border-amber-500/20" />
      <KPICard
        label="Collection Rate"
        value={`${kpis.collectionRate}%`}
        sub="30-day rolling average"
        icon={TrendingUp}
        color={kpis.collectionRate >= 90 ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}
        borderColor={kpis.collectionRate >= 90 ? 'border-emerald-500/20' : 'border-red-500/20'}
      />
      <KPICard
        label="Avg Health"
        value={`${kpis.avgHealthScore}/100`}
        sub="Customer ecosystem"
        icon={Activity}
        color={kpis.avgHealthScore >= 70 ? 'bg-emerald-500/15 text-emerald-400' : 'bg-orange-500/15 text-orange-400'}
        borderColor={kpis.avgHealthScore >= 70 ? 'border-emerald-500/20' : 'border-orange-500/20'}
      />
      <KPICard label="VIP Accounts" value={String(kpis.vipCount)} sub="Priority relationships" icon={Star} color="bg-yellow-500/15 text-yellow-400" borderColor="border-yellow-500/20" />
    </div>
  );
}
