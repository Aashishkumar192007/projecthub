'use client';

import { useRevenueIntelligenceStore } from '@/store/revenueIntelligenceStore';
import { TrendingUp, Activity, BarChart2, DollarSign, Calendar, Filter } from 'lucide-react';
import { useState } from 'react';

export function RevenueForecastEngine() {
  const { revenueForecasts } = useRevenueIntelligenceStore();
  const [viewMode, setViewMode] = useState<'MONTHLY' | 'QUARTERLY'>('MONTHLY');

  // Simple aggregation for total forecast
  const totalForecast = revenueForecasts.reduce((acc, f) => acc + f.forecast, 0);
  const totalBestCase = revenueForecasts.reduce((acc, f) => acc + f.bestCase, 0);
  const totalWorstCase = revenueForecasts.reduce((acc, f) => acc + f.worstCase, 0);

  return (
    <div className="p-8 h-full overflow-y-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-white tracking-wide">Revenue Forecast Engine</h1>
          <p className="text-neutral-500 mt-2">AI-driven predictive revenue modeling based on historical data, pipeline, and market trends.</p>
        </div>
        <div className="flex gap-2">
          <button 
            className={`px-4 py-2 text-sm font-medium rounded transition-colors ${viewMode === 'MONTHLY' ? 'bg-[#00E5FF] text-[#0A1A2A]' : 'bg-neutral-900 text-neutral-400 hover:text-white'}`}
            onClick={() => setViewMode('MONTHLY')}
          >
            Monthly
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded transition-colors ${viewMode === 'QUARTERLY' ? 'bg-[#00E5FF] text-[#0A1A2A]' : 'bg-neutral-900 text-neutral-400 hover:text-white'}`}
            onClick={() => setViewMode('QUARTERLY')}
          >
            Quarterly
          </button>
        </div>
      </div>

      {/* Aggregate Forecast Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Base Forecast (H1)</span>
          </div>
          <div className="text-3xl font-medium text-[#00E5FF] mb-2">
            ${totalForecast}M
          </div>
          <p className="text-xs text-neutral-500">Expected revenue based on current pipeline velocity.</p>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-2 text-green-400 mb-3">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Best Case (H1)</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">
            ${totalBestCase}M
          </div>
          <p className="text-xs text-neutral-500">Requires 15% improvement in conversion rate.</p>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-2 text-red-400 mb-3">
            <Activity className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Worst Case (H1)</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">
            ${totalWorstCase}M
          </div>
          <p className="text-xs text-neutral-500">Factoring 20% drop in market demand.</p>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <BarChart2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">AI Confidence</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">
            86%
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-1.5 mt-3">
            <div className="bg-[#00E5FF] h-1.5 rounded-full" style={{ width: `86%` }}></div>
          </div>
        </div>
      </div>

      {/* Main Forecast Chart / Table Area */}
      <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6 mb-8 flex flex-col h-[400px]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Revenue Trajectory Model</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-neutral-700 rounded-sm"></div>
              <span className="text-neutral-400">Actual</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-[#00E5FF] rounded-sm"></div>
              <span className="text-neutral-400">Forecast</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <span className="text-neutral-400">Best Case</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-end gap-2 px-4 relative">
          {revenueForecasts.map((data, idx) => (
            <div key={idx} className="flex-1 flex flex-col justify-end items-center group">
              <div className="w-full max-w-[40px] flex flex-col justify-end gap-1 relative h-full">
                
                {/* Simulated Chart Bars */}
                <div className="absolute bottom-0 w-full bg-green-500/20 border-t border-green-500/50 rounded-t transition-all" style={{ height: `${(data.bestCase / 80) * 100}%` }}></div>
                <div className="absolute bottom-0 w-full bg-[#00E5FF]/40 border-t border-[#00E5FF] rounded-t transition-all z-10" style={{ height: `${(data.forecast / 80) * 100}%` }}></div>
                {data.actual > 0 && (
                  <div className="absolute bottom-0 w-full bg-neutral-600 border-t border-neutral-400 rounded-t transition-all z-20" style={{ height: `${(data.actual / 80) * 100}%` }}></div>
                )}
                
              </div>
              <div className="mt-4 text-xs font-medium text-neutral-400 uppercase">{data.month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Forecast Inputs & Drivers */}
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Key Forecast Drivers</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-neutral-800 rounded bg-[#1A1A1A]">
              <span className="text-sm text-neutral-300">Pipeline Velocity</span>
              <span className="text-sm font-bold text-green-400">+12% MoM</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-neutral-800 rounded bg-[#1A1A1A]">
              <span className="text-sm text-neutral-300">Market Trend Score</span>
              <span className="text-sm font-bold text-[#00E5FF]">Bullish (8.4/10)</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-neutral-800 rounded bg-[#1A1A1A]">
              <span className="text-sm text-neutral-300">Historical Q2 Seasonality</span>
              <span className="text-sm font-bold text-amber-400">-5% Adj.</span>
            </div>
          </div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6">
           <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Risk Factors</h3>
           <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div>
              <div>
                <div className="text-sm font-medium text-white">Interest Rate Hike</div>
                <div className="text-xs text-neutral-500 mt-1">Expected to impact affordable housing segment conversions by ~4%.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
              <div>
                <div className="text-sm font-medium text-white">Project Orion Delay</div>
                <div className="text-xs text-neutral-500 mt-1">Construction delays might defer $12M of recognized revenue to Q3.</div>
              </div>
            </div>
           </div>
        </div>
      </div>

    </div>
  );
}
