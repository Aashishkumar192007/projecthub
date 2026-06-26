'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, ArrowUpRight, ArrowDownRight, MoreHorizontal, Sparkles, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { QuickFilterMenu } from './QuickFilterMenu';

export interface StatMetric {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  statusColor?: string;
  date: string;
  metric?: string;
}

export interface ModuleCommandCenterProps {
  title: string;
  subtitle: string;
  badge?: string;
  stats: StatMetric[];
  chartData?: { name: string; value: number; benchmark?: number }[];
  chartTitle?: string;
  items?: CommandItem[];
  itemSectionTitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const ModuleCommandCenter: React.FC<ModuleCommandCenterProps> = ({
  title,
  subtitle,
  badge = "INSTITUTIONAL CLOUD",
  stats,
  chartData,
  chartTitle = "Performance Trajectory",
  items = [],
  itemSectionTitle = "Recent Records & Operations",
  actionLabel = "Create New Record",
  onAction
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [sortBy, setSortBy] = useState('Newest First');

  const filteredItems = items.filter(item => {
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (activeTab === 'ALL') return matchesSearch;
    const s = item.status.toUpperCase();
    if (activeTab === 'ACTIVE') return matchesSearch && (s.includes('ACTIVE') || s.includes('VERIFIED') || s.includes('COMPLETED') || s.includes('PAID') || s.includes('APPROVED') || s.includes('OCCUPIED') || s.includes('IN PROGRESS') || s.includes('RENEWED'));
    if (activeTab === 'PENDING') return matchesSearch && (s.includes('PENDING') || s.includes('DRAFT') || s.includes('SENT') || s.includes('REVIEW') || s.includes('OPEN') || s.includes('OVERDUE') || s.includes('WARNING') || s.includes('EXPIRING') || s.includes('INVESTIGATION'));
    if (activeTab === 'ARCHIVED') return matchesSearch && (s.includes('ARCHIVED') || s.includes('CLOSED') || s.includes('TERMINATED') || s.includes('VACANT') || s.includes('REJECTED'));
    return matchesSearch && s.includes(activeTab);
  }).sort((a, b) => {
    if (sortBy === 'Title (A-Z)') return a.title.localeCompare(b.title);
    if (sortBy === 'Status') return a.status.localeCompare(b.status);
    return 0; // Default order
  });

  return (
    <div className="flex-1 bg-[#0F0F12] text-white overflow-y-auto p-8 h-full min-h-screen">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest bg-brand-blue/10 text-brand-blue uppercase border border-brand-blue/20 flex items-center gap-1">
              <Sparkles size={10} /> {badge}
            </span>
            <span className="text-xs text-[#71717A] font-medium">• Live Synced</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">{title}</h1>
          <p className="text-sm text-[#A1A1AA] mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-[#A1A1AA] hover:text-white transition-all">
            <RefreshCw size={16} />
          </button>
          <button 
            onClick={onAction}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#93A5CF] to-[#E4EfE9] text-[#0F0F12] font-black text-sm shadow-[0_0_20px_rgba(147,165,207,0.3)] hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus size={16} /> {actionLabel}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="p-5 rounded-xl bg-[#18181B]/60 backdrop-blur border border-[#27272A]/80 relative overflow-hidden group hover:border-brand-blue/40 transition-all"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-brand-blue/10 transition-all"></div>
            <p className="text-xs font-bold text-[#71717A] uppercase tracking-wider">{stat.label}</p>
            <div className="flex items-baseline justify-between mt-2">
              <h3 className="text-2xl font-black tracking-tight text-white">{stat.value}</h3>
              {stat.change && (
                <span className={`text-xs font-bold flex items-center gap-0.5 px-2 py-0.5 rounded ${
                  stat.isPositive !== false ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {stat.isPositive !== false ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.change}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart & Analytics Section */}
      {chartData && chartData.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-[#18181B]/40 border border-[#27272A] mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">{chartTitle}</h3>
              <p className="text-xs text-[#71717A]">30-Day automated rolling window analysis</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-bold text-brand-blue bg-brand-blue/10 px-2.5 py-1 rounded border border-brand-blue/20">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></span> Primary Metric
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#93A5CF" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#93A5CF" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                <XAxis dataKey="name" stroke="#71717A" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717A" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181B', borderColor: '#27272A', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="value" stroke="#93A5CF" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-1 bg-[#18181B] p-1 rounded-xl border border-[#27272A]">
          {['ALL', 'ACTIVE', 'PENDING', 'ARCHIVED'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab ? 'bg-brand-blue text-[#0F0F12] shadow' : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" size={16} />
            <input 
              type="text"
              placeholder="Filter records..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#18181B] border border-[#27272A] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-brand-blue transition-all"
            />
          </div>
          <QuickFilterMenu value={sortBy} onChange={setSortBy} options={['Newest First', 'Title (A-Z)', 'Status']} label="Sort" />
        </div>
      </div>

      {/* Items List / Table */}
      <div className="rounded-2xl bg-[#18181B]/40 border border-[#27272A] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#27272A] flex items-center justify-between bg-[#18181B]/60">
          <h4 className="text-sm font-bold text-white">{itemSectionTitle}</h4>
          <span className="text-xs text-[#71717A] font-bold">{filteredItems.length} Records found</span>
        </div>

        <div className="divide-y divide-[#27272A]/60">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-[#1E1E24]/50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#27272A]/60 border border-[#3F3F46]/50 flex items-center justify-center font-black text-xs text-brand-blue group-hover:scale-105 transition-transform">
                    {item.title.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white group-hover:text-brand-blue transition-colors">{item.title}</h5>
                    <p className="text-xs text-[#71717A]">{item.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-black tracking-wider uppercase border ${
                    item.statusColor || 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                  }`}>
                    {item.status}
                  </span>
                  {item.metric && (
                    <span className="text-sm font-black text-white">{item.metric}</span>
                  )}
                  <span className="text-xs text-[#71717A] hidden md:inline">{item.date}</span>
                  <button className="text-[#71717A] hover:text-white p-1 rounded hover:bg-[#27272A]">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-[#71717A]">
              <p className="text-sm font-bold">No records matching query.</p>
              <p className="text-xs mt-1">Try clearing your search filters or create a new entry.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
