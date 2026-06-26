'use client';

import React, { useState } from 'react';
import { useCustomerStore } from '@/store/customerStore';
import {
  Sparkles, TrendingUp, AlertCircle, ShieldAlert, CheckCircle,
  ChevronRight, Activity, Brain, Target, Zap, Clock, Users, CreditCard
} from 'lucide-react';

function formatCurrency(v: number): string {
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)}Cr`;
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
  return `₹${v.toLocaleString('en-IN')}`;
}

interface InsightCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  sub: string;
  color: string;
}

function InsightCard({ icon: Icon, title, value, sub, color }: InsightCardProps) {
  return (
    <div className={`bg-[#161616] border border-[#2A2A30] rounded-xl p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className={color} />
        <h3 className="text-[10px] font-black tracking-widest uppercase text-[#71717A]">{title}</h3>
      </div>
      <p className="text-2xl font-black text-white font-mono leading-none">{value}</p>
      <p className={`text-xs mt-1 font-bold ${color}`}>{sub}</p>
    </div>
  );
}

interface ActionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  action: string;
  color: string;
  bg: string;
  border: string;
  actionColor: string;
}

function ActionCard({ icon: Icon, title, description, action, color, bg, border, actionColor }: ActionCardProps) {
  return (
    <div className={`${bg} ${border} border rounded-xl p-3 cursor-pointer hover:opacity-90 transition-all group`}>
      <div className="flex gap-3">
        <div className={`w-8 h-8 rounded-full ${bg} border ${border} flex items-center justify-center shrink-0`}>
          <Icon size={14} className={color} />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-white font-bold mb-1">{title}</p>
          <p className="text-xs text-[#A1A1AA] leading-relaxed">{description}</p>
          <button className={`text-xs font-bold mt-2 flex items-center gap-1 ${actionColor} hover:opacity-80`}>
            {action} <ChevronRight size={11} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function CustomerAICopilot() {
  const kpis = useCustomerStore(s => s.getKPIs());
  const activeCustomerId = useCustomerStore(s => s.activeCustomerId);
  const getCustomerById = useCustomerStore(s => s.getCustomerById);
  const [query, setQuery] = useState('');

  const activeCustomer = activeCustomerId ? getCustomerById(activeCustomerId) : null;

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
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black border mb-2"
              style={{ backgroundColor: activeCustomer.avatarColor + '33', borderColor: activeCustomer.avatarColor + '55' }}
            >
              <span style={{ color: activeCustomer.avatarColor }}>{activeCustomer.avatarInitials}</span>
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
          {/* AI Query */}
          <div className="relative">
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
          </div>

          {/* Portfolio Insight */}
          <div className="grid grid-cols-2 gap-2">
            <InsightCard
              icon={TrendingUp}
              title="Portfolio"
              value={formatCurrency(kpis.avgLifetimeValue)}
              sub="+12.4% vs last qtr"
              color="text-emerald-400"
            />
            <InsightCard
              icon={AlertCircle}
              title="At Risk"
              value={kpis.delinquentCount}
              sub="Require attention"
              color="text-amber-400"
            />
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
              <div
                className="h-full bg-gradient-to-r from-[#93A5CF] to-[#00E5FF] rounded-full transition-all"
                style={{ width: `${kpis.avgHealthScore}%` }}
              />
            </div>
            <p className="text-xs text-[#71717A] mt-2 font-bold">Customer ecosystem is {kpis.avgHealthScore >= 80 ? 'healthy' : kpis.avgHealthScore >= 60 ? 'moderate' : 'critical'}</p>
          </div>

          {/* AI Recommendations */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={12} className="text-[#93A5CF]" />
              <span className="text-[10px] font-black tracking-widest uppercase text-[#71717A]">Recommended Actions</span>
            </div>

            <ActionCard
              icon={Sparkles}
              title="Cross-Sell Opportunity"
              description={`${kpis.totalOwners} owners in Marina Heights show high propensity for parking upgrades.`}
              action="Generate Campaign"
              color="text-blue-400"
              bg="bg-blue-500/8"
              border="border-blue-500/20"
              actionColor="text-blue-400"
            />
            <ActionCard
              icon={ShieldAlert}
              title="KYC Compliance"
              description="12 corporate clients have pending KYC renewals this month."
              action="Send Reminders"
              color="text-amber-400"
              bg="bg-amber-500/8"
              border="border-amber-500/20"
              actionColor="text-amber-400"
            />
            <ActionCard
              icon={CheckCircle}
              title="Retention Strategy"
              description={`Schedule annual reviews with top ${kpis.vipCount} VIP investors.`}
              action="Auto-Schedule"
              color="text-emerald-400"
              bg="bg-emerald-500/8"
              border="border-emerald-500/20"
              actionColor="text-emerald-400"
            />
            <ActionCard
              icon={CreditCard}
              title="Collection Alert"
              description={`${kpis.delinquentCount} accounts overdue. Trigger payment reminders now.`}
              action="Send Alerts"
              color="text-red-400"
              bg="bg-red-500/8"
              border="border-red-500/20"
              actionColor="text-red-400"
            />
          </div>

          {/* Quick Stats */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={12} className="text-[#71717A]" />
              <span className="text-[10px] font-black tracking-widest uppercase text-[#71717A]">Quick Stats</span>
            </div>
            {[
              { label: 'New This Month', value: kpis.newThisMonth, icon: Users, color: 'text-[#93A5CF]' },
              { label: 'Collection Rate', value: `${kpis.collectionRate}%`, icon: TrendingUp, color: kpis.collectionRate >= 90 ? 'text-emerald-400' : 'text-amber-400' },
              { label: 'Hot Customers', value: kpis.hotCount, icon: Zap, color: 'text-orange-400' },
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
