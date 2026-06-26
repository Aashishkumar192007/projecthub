'use client';

import { useCrmStore } from '@/store/crmStore';
import { Megaphone, TrendingUp, Search, DollarSign, Target, MousePointerClick } from 'lucide-react';
import { useState } from 'react';

export function CampaignIntelligence() {
  const { campaigns } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Enhance campaign data with AI mock predictions
  const intelligenceCampaigns = campaigns.map(c => {
    const revenueGenerated = c.bookings * 450000; // Mock average ticket size
    const roi = c.budget > 0 ? ((revenueGenerated - c.budget) / c.budget) * 100 : 0;
    const futureLeads = Math.round(c.leadsGenerated * 1.3); // Mock AI prediction
    const futureRevenue = futureLeads * (c.conversionRate / 100) * 450000;
    
    return { ...c, revenueGenerated, roi, futureLeads, futureRevenue };
  });

  const filteredCampaigns = intelligenceCampaigns.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalBudget = campaigns.reduce((acc, c) => acc + c.budget, 0);
  const totalCampaignRevenue = intelligenceCampaigns.reduce((acc, c) => acc + c.revenueGenerated, 0);
  const globalROI = totalBudget > 0 ? ((totalCampaignRevenue - totalBudget) / totalBudget) * 100 : 0;

  return (
    <div className="p-8 h-full overflow-y-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-white tracking-wide">Campaign Intelligence</h1>
          <p className="text-neutral-500 mt-2">Marketing ROI analytics and AI predictions for future lead generation.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Total Spend</span>
          </div>
          <div className="text-3xl font-medium text-white mb-1">${(totalBudget / 1000).toFixed(0)}K</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-green-400 mb-3">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Attributed Revenue</span>
          </div>
          <div className="text-3xl font-medium text-green-400 mb-1">${(totalCampaignRevenue / 1000000).toFixed(1)}M</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-[#00E5FF] mb-3">
            <Target className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Global ROI</span>
          </div>
          <div className="text-3xl font-medium text-white mb-1">{globalROI.toFixed(0)}%</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-purple-400 mb-3">
            <MousePointerClick className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Avg Cost Per Lead</span>
          </div>
          <div className="text-3xl font-medium text-white mb-1">
            ${(totalBudget / Math.max(1, campaigns.reduce((acc, c) => acc + c.leadsGenerated, 0))).toFixed(0)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Campaign Predictions Matrix</h3>
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search campaigns..." 
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
                <th className="px-6 py-4 font-medium">CAMPAIGN</th>
                <th className="px-6 py-4 font-medium text-right">SPEND</th>
                <th className="px-6 py-4 font-medium text-right">REVENUE</th>
                <th className="px-6 py-4 font-medium text-right">ROI</th>
                <th className="px-6 py-4 font-medium text-right">PREDICTED LEADS (Next 30D)</th>
                <th className="px-6 py-4 font-medium w-64">AI RECOMMENDATION</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((camp) => (
                <tr key={camp.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{camp.name}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{camp.platform}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-neutral-400 font-medium">${(camp.budget / 1000).toFixed(1)}K</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-white font-medium">${(camp.revenueGenerated / 1000000).toFixed(2)}M</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={`font-bold ${camp.roi > 500 ? 'text-[#00E5FF]' : camp.roi > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {camp.roi.toFixed(0)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <TrendingUp className="w-3 h-3 text-purple-400" />
                      <span className="text-white font-medium">{camp.futureLeads}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {camp.roi > 1000 ? (
                       <span className="text-xs text-[#00E5FF]">Scale budget by 50%. High saturation limit.</span>
                    ) : camp.roi > 300 ? (
                       <span className="text-xs text-green-400">Performing well. Maintain current spend.</span>
                    ) : (
                       <span className="text-xs text-red-400">High CPL. Pause and revise creative assets.</span>
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
