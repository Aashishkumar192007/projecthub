'use client';

import { useCrmStore } from '@/store/crmStore';
import { Search, TrendingUp, TrendingDown, Target, BarChart2 } from 'lucide-react';
import { useState } from 'react';

export function BrokerPerformanceView() {
  const { brokers, commissions } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');

  const enrichedBrokers = brokers.map(broker => {
    const brokerComms = commissions.filter(c => c.brokerId === broker.id && c.status === 'PAID');
    const totalPaidComms = brokerComms.reduce((acc, c) => acc + c.amount, 0);
    const conversionRate = broker.dealsClosed > 0 ? (broker.dealsClosed / 100) * 100 : 0; // Simplified calculation for UI prototype
    
    return {
      ...broker,
      totalPaidComms,
      conversionRate
    };
  }).sort((a, b) => b.revenueGenerated - a.revenueGenerated);

  const topPerformer = enrichedBrokers[0];

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-white tracking-wide">Partner Performance</h2>
          <p className="text-sm text-neutral-500 mt-1">Analytics and leaderboards for the partner ecosystem</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Top Performer Highlight */}
        <div className="col-span-1 bg-gradient-to-br from-[#1A1C20] to-[#111111] border border-[#00E5FF]/20 rounded p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp className="w-24 h-24 text-[#00E5FF]" />
          </div>
          <div className="text-xs font-bold text-[#00E5FF] uppercase tracking-widest mb-4">Top Performing Partner</div>
          {topPerformer ? (
            <>
              <div className="text-2xl font-medium text-white mb-1">{topPerformer.name}</div>
              <div className="text-sm text-neutral-400 mb-6">{topPerformer.company}</div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-neutral-500 mb-1">Revenue Generated</div>
                  <div className="text-lg text-green-400 font-medium">${(topPerformer.revenueGenerated / 1000000).toFixed(2)}M</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500 mb-1">Deals Closed</div>
                  <div className="text-lg text-white font-medium">{topPerformer.dealsClosed} units</div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-neutral-500">No data available.</div>
          )}
        </div>

        {/* Aggregate Stats */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
           <div className="bg-[#121212] border border-neutral-800 rounded p-4 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-neutral-400 mb-2">
              <Target className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Avg Conversion Rate</span>
            </div>
            <div className="text-3xl font-medium text-white">4.2%</div>
            <div className="text-xs text-green-400 mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +0.5% from last month</div>
          </div>
          <div className="bg-[#121212] border border-neutral-800 rounded p-4 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-neutral-400 mb-2">
              <BarChart2 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Network Revenue Contribution</span>
            </div>
            <div className="text-3xl font-medium text-white">68%</div>
            <div className="text-xs text-neutral-500 mt-2">Percentage of total CRM sales</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Global Leaderboard</h3>
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search partners..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
          />
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] border-b border-neutral-800">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium w-16 text-center">RANK</th>
                <th className="px-6 py-4 font-medium">PARTNER</th>
                <th className="px-6 py-4 font-medium text-right">DEALS CLOSED</th>
                <th className="px-6 py-4 font-medium text-right">CONVERSION RATE</th>
                <th className="px-6 py-4 font-medium text-right">REVENUE GENERATED</th>
                <th className="px-6 py-4 font-medium text-right">TREND</th>
              </tr>
            </thead>
            <tbody>
              {enrichedBrokers.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase())).map((broker, index) => (
                <tr key={broker.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      index === 0 ? 'bg-amber-500/20 text-amber-400' :
                      index === 1 ? 'bg-neutral-300/20 text-neutral-300' :
                      index === 2 ? 'bg-orange-800/30 text-orange-400' :
                      'text-neutral-500'
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{broker.name}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{broker.company}</div>
                  </td>
                  <td className="px-6 py-4 text-right text-white font-medium">{broker.dealsClosed}</td>
                  <td className="px-6 py-4 text-right text-neutral-400">{broker.conversionRate.toFixed(1)}%</td>
                  <td className="px-6 py-4 text-right text-green-400 font-medium">${(broker.revenueGenerated / 1000000).toFixed(2)}M</td>
                  <td className="px-6 py-4 text-right">
                    {index % 3 === 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-400 ml-auto" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400 ml-auto" />
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
