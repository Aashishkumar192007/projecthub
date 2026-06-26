'use client';

import { useCrmStore } from '@/store/crmStore';
import { Target, Zap, Search, Activity, UserCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export function AILeadConversionPrediction() {
  const { leads } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Enhance leads with AI conversion probability
  const aiLeads = leads.map(l => {
    // Generate a mock probability based on score and stage
    let baseProb = l.score; 
    if (l.stage === 'NEGOTIATION') baseProb += 30;
    if (l.stage === 'SITE_VISIT') baseProb += 20;
    if (l.stage === 'CONTACTED') baseProb += 10;
    
    // Cap at 99
    const conversionProbability = Math.min(Math.max(baseProb, 5), 99);
    
    // Assign an AI action
    const aiAction = conversionProbability > 80 
      ? 'Push for closing meeting immediately'
      : conversionProbability > 50
      ? 'Schedule personalized site visit'
      : 'Nurture with targeted email campaign';
      
    return { ...l, conversionProbability, aiAction };
  });

  const activeAiLeads = aiLeads.filter(l => l.stage !== 'LOST' && l.stage !== 'BOOKED');
  const sortedLeads = [...activeAiLeads].sort((a, b) => b.conversionProbability - a.conversionProbability);
  const filteredLeads = sortedLeads.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const highIntentLeads = activeAiLeads.filter(l => l.conversionProbability >= 75).length;
  const mediumIntentLeads = activeAiLeads.filter(l => l.conversionProbability >= 40 && l.conversionProbability < 75).length;

  return (
    <div className="p-8 h-full overflow-y-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-white tracking-wide">AI Lead Conversion Engine</h1>
          <p className="text-neutral-500 mt-2">Machine learning predictions on lead closure probability and recommended next actions.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <UserCheck className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Active Pipeline</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">{activeAiLeads.length}</div>
          <div className="text-xs text-neutral-500">Total active leads analyzed</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-green-400 mb-3">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">High Intent (>75%)</span>
          </div>
          <div className="text-3xl font-medium text-green-400 mb-2">{highIntentLeads}</div>
          <div className="text-xs text-green-400">Immediate focus required</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <Activity className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Nurture Zone (40-75%)</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">{mediumIntentLeads}</div>
          <div className="text-xs text-neutral-500">Requires marketing touches</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-[#00E5FF] mb-3">
            <Zap className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Conversion Lift</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">+18%</div>
          <div className="text-xs text-[#00E5FF]">Using AI prioritization</div>
        </div>
      </div>

      <div className="bg-[#121212] border border-neutral-800 rounded-xl overflow-hidden flex flex-col mb-8">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Ranked Conversion Probabilities</h3>
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-9 bg-neutral-900 border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] border-b border-neutral-800">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">LEAD</th>
                <th className="px-6 py-4 font-medium">CURRENT STAGE</th>
                <th className="px-6 py-4 font-medium text-right">BUDGET</th>
                <th className="px-6 py-4 font-medium text-right">CONVERSION PROBABILITY</th>
                <th className="px-6 py-4 font-medium w-64">AI RECOMMENDED NEXT ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{lead.name}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{lead.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-neutral-400">{lead.stage}</span>
                  </td>
                  <td className="px-6 py-4 text-right text-neutral-300 font-medium">
                    ${(lead.budget / 1000).toFixed(0)}K
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <div className="w-24 bg-neutral-800 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${lead.conversionProbability >= 75 ? 'bg-green-400' : lead.conversionProbability >= 40 ? 'bg-amber-400' : 'bg-red-400'}`} 
                          style={{ width: `${lead.conversionProbability}%` }}
                        ></div>
                      </div>
                      <span className={`font-bold w-10 text-right ${lead.conversionProbability >= 75 ? 'text-green-400' : lead.conversionProbability >= 40 ? 'text-amber-400' : 'text-red-400'}`}>
                        {lead.conversionProbability}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Zap className={`w-3 h-3 ${lead.conversionProbability >= 75 ? 'text-green-400' : lead.conversionProbability >= 40 ? 'text-amber-400' : 'text-neutral-500'}`} />
                      <span className={`text-xs ${lead.conversionProbability >= 75 ? 'text-white' : 'text-neutral-400'}`}>
                        {lead.aiAction}
                      </span>
                    </div>
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
