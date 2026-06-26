'use client';

import { Users, TrendingUp, Search, Star, Award, AlertTriangle, PhoneCall, Calendar, Target } from 'lucide-react';
import { useState } from 'react';

export function SalesExecutiveIntelligence() {
  const [searchQuery, setSearchQuery] = useState('');

  const executives = [
    { id: '1', name: 'Sarah Jenkins', role: 'Senior Sales Director', leads: 420, calls: 1250, meetings: 85, visits: 60, bookings: 18, revenue: 12500000, conversion: 4.2, responseTime: 12, status: 'TOP_PERFORMER' },
    { id: '2', name: 'Michael Chang', role: 'Sales Manager', leads: 380, calls: 980, meetings: 65, visits: 45, bookings: 12, revenue: 8200000, conversion: 3.1, responseTime: 24, status: 'SOLID' },
    { id: '3', name: 'Priya Patel', role: 'Sales Executive', leads: 510, calls: 1800, meetings: 110, visits: 75, bookings: 22, revenue: 15800000, conversion: 4.3, responseTime: 8, status: 'TOP_PERFORMER' },
    { id: '4', name: 'David Miller', role: 'Sales Executive', leads: 290, calls: 450, meetings: 25, visits: 15, bookings: 3, revenue: 1500000, conversion: 1.0, responseTime: 140, status: 'NEEDS_COACHING' },
    { id: '5', name: 'Elena Rodriguez', role: 'Sales Manager', leads: 340, calls: 820, meetings: 55, visits: 40, bookings: 10, revenue: 6800000, conversion: 2.9, responseTime: 35, status: 'SOLID' },
  ];

  const filteredExecs = executives.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const sortedExecs = [...filteredExecs].sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="p-8 h-full overflow-y-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-white tracking-wide">Sales Team Intelligence</h1>
          <p className="text-neutral-500 mt-2">Monitor workforce performance, conversion rates, and AI-driven coaching suggestions.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Active Executives</span>
          </div>
          <div className="text-3xl font-medium text-white mb-1">42</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center gap-3 text-amber-400 mb-2">
            <Award className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Avg Conversion</span>
          </div>
          <div className="text-3xl font-medium text-white mb-1">3.1%</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center gap-3 text-[#00E5FF] mb-2">
            <Target className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Avg Response Time</span>
          </div>
          <div className="text-3xl font-medium text-white mb-1">38 min</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center gap-3 text-green-400 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Revenue per Exec (Avg)</span>
          </div>
          <div className="text-3xl font-medium text-white mb-1">$8.9M</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Executive Leaderboard & Diagnostics</h3>
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search executive..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
          />
        </div>
      </div>

      <div className="bg-[#121212] border border-neutral-800 rounded-xl overflow-hidden flex flex-col mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] border-b border-neutral-800">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium w-16 text-center">RANK</th>
                <th className="px-6 py-4 font-medium">EXECUTIVE</th>
                <th className="px-6 py-4 font-medium text-right">LEADS</th>
                <th className="px-6 py-4 font-medium text-center">ACTIVITIES</th>
                <th className="px-6 py-4 font-medium text-right">CONVERSION</th>
                <th className="px-6 py-4 font-medium text-right">REVENUE GENERATED</th>
                <th className="px-6 py-4 font-medium w-64">AI DIAGNOSTIC</th>
              </tr>
            </thead>
            <tbody>
              {sortedExecs.map((exec, idx) => (
                <tr key={exec.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      idx === 0 ? 'bg-amber-500/20 text-amber-400' :
                      idx === 1 ? 'bg-neutral-300/20 text-neutral-300' :
                      idx === 2 ? 'bg-orange-800/30 text-orange-400' :
                      'text-neutral-500'
                    }`}>
                      {idx + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-white flex items-center gap-2">
                      {exec.name}
                      {idx === 0 && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{exec.role}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-white font-medium">{exec.leads}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{exec.responseTime}m avg response</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-3 text-xs text-neutral-400">
                      <span className="flex items-center gap-1" title="Calls"><PhoneCall className="w-3 h-3"/> {exec.calls}</span>
                      <span className="flex items-center gap-1" title="Meetings"><Calendar className="w-3 h-3"/> {exec.meetings}</span>
                      <span className="flex items-center gap-1" title="Visits"><TrendingUp className="w-3 h-3"/> {exec.visits}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={`font-bold ${exec.conversion >= 4.0 ? 'text-[#00E5FF]' : exec.conversion < 2.0 ? 'text-red-400' : 'text-white'}`}>
                      {exec.conversion}%
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{exec.bookings} Bookings</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-green-400 font-medium">${(exec.revenue / 1000000).toFixed(1)}M</div>
                  </td>
                  <td className="px-6 py-4">
                    {exec.status === 'TOP_PERFORMER' && (
                      <div className="flex items-center gap-2 text-xs text-[#00E5FF]">
                        <Star className="w-4 h-4 shrink-0" />
                        <span className="truncate">Promotion Candidate. Excellent velocity.</span>
                      </div>
                    )}
                    {exec.status === 'NEEDS_COACHING' && (
                      <div className="flex items-center gap-2 text-xs text-red-400">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span className="truncate">Low activity volume. Slow response time (140m).</span>
                      </div>
                    )}
                    {exec.status === 'SOLID' && (
                      <div className="flex items-center gap-2 text-xs text-neutral-400">
                        <CheckCircle className="w-4 h-4 shrink-0" />
                        <span className="truncate">Meeting targets consistently.</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
