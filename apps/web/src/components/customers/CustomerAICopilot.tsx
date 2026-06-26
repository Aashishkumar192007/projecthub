'use client';

import React, { useMemo, useState } from 'react';
import { useCustomerStore, computeKPIs } from '@/store/customerStore';
import {
  Brain, Sparkles, TrendingUp, AlertCircle, ShieldAlert,
  CheckCircle, ChevronRight, Activity, Zap, Clock, Users, CreditCard, Target
} from 'lucide-react';

function formatCurrency(v: number): string {
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)}Cr`;
  if (v >= 100000)   return `₹${(v / 100000).toFixed(1)}L`;
  return `₹${v.toLocaleString('en-IN')}`;
}

export function CustomerAICopilot() {
  // Read only stable primitives from the store
  const customers        = useCustomerStore(s => s.customers);
  const activeCustomerId = useCustomerStore(s => s.activeCustomerId);
  const [query, setQuery] = useState('');

  // Compute KPIs stably
  const kpis = useMemo(() => computeKPIs(customers), [customers]);

  // Active customer by ID – cheap find, no selector object
  const activeCustomer = useMemo(
    () => activeCustomerId ? customers.find(c => c.id === activeCustomerId) ?? null : null,
    [customers, activeCustomerId]
  );

  return (
    <div className="w-80 shrink-0 border-l border-[#2A2A30] bg-[#161616] flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#2A2A30] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#93A5CF]/30 to-[#00E5FF]/30 flex items-center justify-center">
            <Brain size={13} className="text-[#00E5FF]" />
          </div>
          <div>
            <h2 className="text-xs font-black tracking-widest uppercase text-white">AI Copilot</h2>
            <p className="text-[9px] text-[#71717A] font-bold tracking-wider">Customer Intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[10px] text-[#10B981] font-bold">Live</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Active Customer Context */}
        {activeCustomer && (
          <div className="p-4 border-b border-[#2A2A30]/50">
            <div className="flex items-center gap-2 mb-3">
              <Target size={12} className="text-[#93A5CF]" />
              <span className="text-[10px] font-black tracking-widest uppercase text-[#71717A]">Viewing Customer</span>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border mb-2"
              style={{ backgroundColor: activeCustomer.avatarColor + '33', borderColor: activeCustomer.avatarColor + '55', color: activeCustomer.avatarColor }}>
              {activeCustomer.avatarInitials}
            </div>
            <p className="text-sm font-black text-white">{activeCustomer.name}</p>
            <p className="text-xs text-[#71717A] font-mono">{activeCustomer.customerCode}</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-[#121212] rounded-lg p-2 border border-[#2A2A30]">
                <p className="text-[9px] text-[#71717A] font-bold uppercase tracking-wider">Health</p>
                <p className="text-lg font-black font-mono text-white">{activeCustomer.healthScore}</p>
              </div>
              <div className="bg-[#121212] rounded-lg p-2 border border-[#2A2A30]">
                <p className="text-[9px] text-[#71717A] font-bold uppercase tracking-wider">Risk</p>
                <p className={`text-lg font-black font-mono ${activeCustomer.riskScore > 70 ? 'text-red-400' : activeCustomer.riskScore > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {activeCustomer.riskScore}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 space-y-4">
          {/* AI Query Input */}
          <div className="flex items-center gap-2 bg-[#121212] border border-[#2A2A30] hover:border-[#93A5CF]/40 focus-within:border-[#93A5CF]/60 rounded-xl p-3 transition-colors">
            <Sparkles size={14} className="text-[#93A5CF] shrink-0" />
            <input
              type="text"
              placeholder="Ask AI about customers..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-xs text-white placeholder:text-[#4A4A50] focus:outline-none font-bold"
            />
          </div>

          {/* Insight cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} className="text-emerald-400" />
                <h3 className="text-[10px] font-black tracking-widest uppercase text-[#71717A]">Portfolio</h3>
              </div>
              <p className="text-xl font-black text-white font-mono">{formatCurrency(kpis.avgLifetimeValue)}</p>
              <p className="text-xs mt-1 font-bold text-emerald-400">Avg LTV</p>
            </div>
            <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={14} className="text-amber-400" />
                <h3 className="text-[10px] font-black tracking-widest uppercase text-[#71717A]">At Risk</h3>
              </div>
              <p className="text-xl font-black text-white font-mono">{kpis.delinquentCount}</p>
              <p className="text-xs mt-1 font-bold text-amber-400">Require attention</p>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-[#121212] border border-[#2A2A30] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity size={13} className="text-[#93A5CF]" />
                <span className="text-[10px] font-black tracking-widest uppercase text-[#71717A]">System Health</span>
              </div>
              <span className="text-[#93A5CF] font-black font-mono text-sm">{kpis.avgHealthScore}/100</span>
            </div>
            <div className="w-full h-1.5 bg-[#2A2A30] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#93A5CF] to-[#00E5FF] rounded-full" style={{ width: `${kpis.avgHealthScore}%` }} />
            </div>
            <p className="text-xs text-[#71717A] mt-2 font-bold">
              Ecosystem is {kpis.avgHealthScore >= 80 ? 'healthy ✓' : kpis.avgHealthScore >= 60 ? 'moderate' : 'critical ⚠'}
            </p>
          </div>

          {/* Recommended Actions */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={12} className="text-[#93A5CF]" />
              <span className="text-[10px] font-black tracking-widest uppercase text-[#71717A]">Recommended Actions</span>
            </div>
            {[
              { icon: Sparkles,   title: 'Cross-Sell',       desc: `${kpis.totalOwners} owners show high propensity for parking upgrades.`, action: 'Generate Campaign', color: 'text-blue-400',    bg: 'bg-blue-500/8',   border: 'border-blue-500/20' },
              { icon: ShieldAlert, title: 'KYC Compliance',  desc: '12 corporate clients have pending KYC renewals.',                        action: 'Send Reminders',  color: 'text-amber-400',   bg: 'bg-amber-500/8',  border: 'border-amber-500/20' },
              { icon: CheckCircle, title: 'Retention',       desc: `Schedule reviews with ${kpis.vipCount} VIP investors.`,                 action: 'Auto-Schedule',   color: 'text-emerald-400', bg: 'bg-emerald-500/8',border: 'border-emerald-500/20' },
              { icon: CreditCard,  title: 'Collection Alert',desc: `${kpis.delinquentCount} accounts overdue. Trigger reminders now.`,      action: 'Send Alerts',     color: 'text-red-400',     bg: 'bg-red-500/8',    border: 'border-red-500/20' },
            ].map(a => (
              <div key={a.title} className={`${a.bg} ${a.border} border rounded-xl p-3 cursor-pointer hover:opacity-90 transition-all`}>
                <div className="flex gap-3">
                  <div className={`w-7 h-7 rounded-full ${a.bg} border ${a.border} flex items-center justify-center shrink-0`}>
                    <a.icon size={13} className={a.color} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-white font-bold mb-0.5">{a.title}</p>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">{a.desc}</p>
                    <button className={`text-xs font-bold mt-1.5 flex items-center gap-1 ${a.color}`}>
                      {a.action} <ChevronRight size={11} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={12} className="text-[#71717A]" />
              <span className="text-[10px] font-black tracking-widest uppercase text-[#71717A]">Quick Stats</span>
            </div>
            {[
              { label: 'New This Month', value: kpis.newThisMonth, icon: Users,    color: 'text-[#93A5CF]' },
              { label: 'Collection Rate', value: `${kpis.collectionRate}%`, icon: TrendingUp, color: kpis.collectionRate >= 90 ? 'text-emerald-400' : 'text-amber-400' },
              { label: 'Hot Customers',   value: kpis.hotCount,       icon: Zap,       color: 'text-orange-400' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center justify-between py-2 border-b border-[#2A2A30]/50 last:border-0">
                <div className="flex items-center gap-2">
                  <stat.icon size={12} className={stat.color} />
                  <span className="text-xs text-[#A1A1AA] font-bold">{stat.label}</span>
                </div>
                <span className={`text-xs font-black font-mono ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
