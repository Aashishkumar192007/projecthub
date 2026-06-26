'use client';

import { BarChart3, TrendingUp, MessageCircle, Clock, CheckCheck, Award, Flame, Banknote } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function WhatsAppAnalyticsPage() {
  const kpis = [
    { label: 'Messages Dispatched', val: '1,428', change: '+18.2%', positive: true, icon: MessageCircle, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Avg Executive Response Time', val: '1m 45s', change: '-32s faster', positive: true, icon: Clock, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Hot Leads Conversions', val: '84 Won', change: '+12.4%', positive: true, icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Revenue Influenced via WA', val: '₹32.8 Cr', change: '+24.5%', positive: true, icon: Banknote, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ];

  const chartData = [
    { name: 'Mon', sent: 140, received: 180 },
    { name: 'Tue', sent: 220, received: 260 },
    { name: 'Wed', sent: 310, received: 340 },
    { name: 'Thu', sent: 280, received: 310 },
    { name: 'Fri', sent: 390, received: 430 },
    { name: 'Sat', sent: 480, received: 520 },
    { name: 'Sun', sent: 210, received: 190 },
  ];

  return (
    <div className="h-full overflow-y-auto p-8 bg-slate-950 text-slate-100 font-sans">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-emerald-400" />
          Executive WhatsApp Intelligence & ROI Analytics
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Real-time metrics tracking communication efficiency, customer velocity, and institutional pipeline conversion.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl backdrop-blur relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">{kpi.label}</span>
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white tracking-tight">{kpi.val}</div>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>{kpi.change} vs last week</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Panel */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl backdrop-blur">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold text-white">Weekly Traffic Distribution (Dispatched vs Inbound)</h3>
            <p className="text-[11px] text-slate-400">End-to-end encrypted messaging load per day</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span> Sent
            </span>
            <span className="flex items-center gap-1.5 text-blue-400">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span> Received
            </span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRecv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
              <Area type="monotone" dataKey="received" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRecv)" strokeWidth={2} />
              <Area type="monotone" dataKey="sent" stroke="#10b981" fillOpacity={1} fill="url(#colorSent)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
