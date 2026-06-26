'use client';

import { MapPin, TrendingUp, TrendingDown, DollarSign, Target, Activity } from 'lucide-react';
import { useState } from 'react';

export function RegionalIntelligence() {
  const [selectedRegion, setSelectedRegion] = useState('West');

  const regions = [
    { id: '1', name: 'West', revenue: 185000000, target: 200000000, leads: 4200, bookings: 120, conversion: 2.8, growth: 12, marketShare: 34, status: 'ON_TRACK' },
    { id: '2', name: 'South', revenue: 95000000, target: 120000000, leads: 3100, bookings: 85, conversion: 2.7, growth: -5, marketShare: 22, status: 'AT_RISK' },
    { id: '3', name: 'North', revenue: 110000000, target: 100000000, leads: 2800, bookings: 95, conversion: 3.4, growth: 18, marketShare: 28, status: 'OVER_PERFORMING' },
    { id: '4', name: 'East', revenue: 35000000, target: 80000000, leads: 1500, bookings: 30, conversion: 2.0, growth: -12, marketShare: 16, status: 'CRITICAL' },
  ];

  const currentRegion = regions.find(r => r.name === selectedRegion) || regions[0];

  return (
    <div className="p-8 h-full overflow-y-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-white tracking-wide">Regional Intelligence</h1>
          <p className="text-neutral-500 mt-2">Geographic breakdown of revenue, market share, and sales performance.</p>
        </div>
        <div className="flex bg-[#121212] rounded p-1 border border-neutral-800">
          {regions.map(r => (
            <button 
              key={r.id}
              className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${selectedRegion === r.name ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white'}`}
              onClick={() => setSelectedRegion(r.name)}
            >
              {r.name} Region
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Regional Revenue</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">${(currentRegion.revenue / 1000000).toFixed(1)}M</div>
          <div className={`text-xs flex items-center ${currentRegion.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {currentRegion.growth > 0 ? <TrendingUp className="w-3 h-3 mr-1"/> : <TrendingDown className="w-3 h-3 mr-1"/>}
            {Math.abs(currentRegion.growth)}% YoY Growth
          </div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <Target className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Target Achievement</span>
          </div>
          <div className="text-3xl font-medium text-[#00E5FF] mb-2">{((currentRegion.revenue / currentRegion.target) * 100).toFixed(1)}%</div>
          <div className="text-xs text-neutral-500 mt-2">Target: ${(currentRegion.target / 1000000).toFixed(1)}M</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <Activity className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Conversion Rate</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">{currentRegion.conversion}%</div>
          <div className="text-xs text-neutral-500 mt-2">From {currentRegion.leads.toLocaleString()} Leads</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <MapPin className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Est. Market Share</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">{currentRegion.marketShare}%</div>
          <div className="w-full bg-neutral-800 rounded-full h-1.5 mt-3">
             <div className="bg-purple-400 h-1.5 rounded-full" style={{ width: `${currentRegion.marketShare}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        
        {/* Mock Map / Heatmap Area */}
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[400px]">
          <MapPin className="w-16 h-16 text-neutral-700 mb-4" />
          <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Interactive Demand Heatmap</p>
          <p className="text-xs text-neutral-600 mt-2 text-center max-w-sm">
            Geospatial visualization of lead origin, site visit concentration, and booking clusters for the {currentRegion.name} Region.
          </p>
          <div className="mt-6 px-4 py-2 bg-[#1A1C20] border border-neutral-800 text-xs text-[#00E5FF] rounded">
            Live integration active in production build
          </div>
        </div>

        {/* AI Regional Insights */}
        <div className="bg-[#1A1C20] border border-neutral-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-[#00E5FF] uppercase tracking-widest mb-6">AI Regional Insights</h3>
          
          <div className="space-y-4">
            {currentRegion.status === 'OVER_PERFORMING' && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded text-sm text-green-400 leading-relaxed">
                <strong className="block mb-1 text-white">Demand Surge Detected</strong>
                The North region is exhibiting a 18% YoY growth, driven by IT corridor expansions. Recommend accelerating Phase 2 launch for Tech Park Alpha to capture unmet demand.
              </div>
            )}

            {currentRegion.status === 'AT_RISK' && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded text-sm text-amber-400 leading-relaxed">
                <strong className="block mb-1 text-white">Conversion Bottleneck</strong>
                Lead generation is stable (3,100 leads), but the conversion rate has dropped to 2.7%. AI analysis of call logs suggests high price sensitivity in the current market. Consider flexible payment plans.
              </div>
            )}

            {currentRegion.status === 'CRITICAL' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-400 leading-relaxed">
                <strong className="block mb-1 text-white">Critical Performance Alert</strong>
                The East region is missing target by a wide margin (currently at {((currentRegion.revenue / currentRegion.target) * 100).toFixed(1)}%). Primary driver is a 40% drop in site visits. Immediate marketing intervention required.
              </div>
            )}

            {currentRegion.status === 'ON_TRACK' && (
              <div className="p-4 bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded text-sm text-[#00E5FF] leading-relaxed">
                <strong className="block mb-1 text-white">Steady Growth Maintained</strong>
                The West region continues its strong performance. Market share has increased to 34%. Recommend focusing on premium inventory upselling as buyer confidence in this region is high.
              </div>
            )}
            
            <div className="p-4 bg-black/40 border border-neutral-800/50 rounded">
              <h4 className="text-xs font-bold text-neutral-400 uppercase mb-2">Top Micro-Markets</h4>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex justify-between"><span>Downtown Metro</span> <span className="text-white font-medium">32% of regional sales</span></li>
                <li className="flex justify-between"><span>Airport Corridor</span> <span className="text-white font-medium">28% of regional sales</span></li>
                <li className="flex justify-between"><span>Tech Suburbs</span> <span className="text-white font-medium">15% of regional sales</span></li>
              </ul>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
