'use client';

import { useRevenueIntelligenceStore } from '@/store/revenueIntelligenceStore';
import { Target, Users, Building, Plus, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function DynamicSalesTargets() {
  const { kpis } = useRevenueIntelligenceStore();
  const [searchQuery, setSearchQuery] = useState('');

  const targets = [
    { id: '1', name: 'Q3 Global Revenue', type: 'Organization', assignee: 'All Regions', target: 500000000, achieved: 425000000, status: 'ON_TRACK', daysLeft: 14 },
    { id: '2', name: 'West Region Sales', type: 'Region', assignee: 'West Region Head', target: 200000000, achieved: 185000000, status: 'ON_TRACK', daysLeft: 14 },
    { id: '3', name: 'Project Orion Sellout', type: 'Project', assignee: 'Project Manager', target: 150000000, achieved: 90000000, status: 'AT_RISK', daysLeft: 14 },
    { id: '4', name: 'Elite Brokers Quarter Bonus', type: 'Broker', assignee: 'Elite Brokers Inc', target: 20000000, achieved: 22000000, status: 'ACHIEVED', daysLeft: 0 },
    { id: '5', name: 'Collections Q3', type: 'Organization', assignee: 'Finance Team', target: 300000000, achieved: 210000000, status: 'AT_RISK', daysLeft: 14 },
  ];

  const filteredTargets = targets.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.assignee.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-8 h-full overflow-y-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-white tracking-wide">Dynamic Sales Targets</h1>
          <p className="text-neutral-500 mt-2">Set, track, and manage performance targets across the organization.</p>
        </div>
        <button onClick={() => toast.success('Target Wizard', { description: 'Opening target creation wizard...' })} className="h-10 px-4 bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0A1A2A] rounded flex items-center gap-2 text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Create New Target
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#121212] border border-neutral-800 rounded p-5">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <Target className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Active Targets</span>
          </div>
          <div className="text-3xl font-medium text-white">24</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-5">
          <div className="flex items-center gap-3 text-green-400 mb-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Achieved</span>
          </div>
          <div className="text-3xl font-medium text-white">8</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-5">
          <div className="flex items-center gap-3 text-amber-400 mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">At Risk</span>
          </div>
          <div className="text-3xl font-medium text-white">5</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-5">
          <div className="flex items-center gap-3 text-blue-400 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Global Pacing</span>
          </div>
          <div className="text-3xl font-medium text-white">85%</div>
        </div>
      </div>

      <div className="bg-[#121212] border border-neutral-800 rounded overflow-hidden flex flex-col">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search targets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-9 bg-neutral-900 border border-neutral-800 rounded px-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] border-b border-neutral-800">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">TARGET NAME</th>
                <th className="px-6 py-4 font-medium">TYPE</th>
                <th className="px-6 py-4 font-medium">ASSIGNEE</th>
                <th className="px-6 py-4 font-medium text-right">GOAL</th>
                <th className="px-6 py-4 font-medium w-64">PROGRESS</th>
                <th className="px-6 py-4 font-medium text-center">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredTargets.map(target => {
                const percentage = Math.min((target.achieved / target.target) * 100, 100);
                return (
                  <tr key={target.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{target.name}</div>
                      {target.daysLeft > 0 && <div className="text-[10px] text-neutral-500">{target.daysLeft} days remaining</div>}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-neutral-400">{target.type}</span>
                    </td>
                    <td className="px-6 py-4 text-neutral-300">
                      {target.assignee}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-[#00E5FF] font-medium">${(target.target / 1000000).toFixed(1)}M</div>
                      <div className="text-[10px] text-neutral-500">Achieved: ${(target.achieved / 1000000).toFixed(1)}M</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-neutral-800 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${target.status === 'ACHIEVED' ? 'bg-green-400' : target.status === 'AT_RISK' ? 'bg-red-400' : 'bg-blue-400'}`} 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-white w-8">{percentage.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${
                        target.status === 'ACHIEVED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        target.status === 'AT_RISK' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {target.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
