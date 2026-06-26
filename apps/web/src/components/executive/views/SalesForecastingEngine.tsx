'use client';

import { useCrmStore } from '@/store/crmStore';
import { Target, Users, CalendarCheck, FileText, CheckCircle, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export function SalesForecastingEngine() {
  const [timeframe, setTimeframe] = useState<'MONTH' | 'QUARTER' | 'YEAR'>('MONTH');

  // Static mock forecasts for the prototype
  const forecastData = {
    MONTH: { leads: 1200, visits: 350, negotiations: 80, bookings: 45, collections: 2500000 },
    QUARTER: { leads: 4000, visits: 1100, negotiations: 280, bookings: 140, collections: 8500000 },
    YEAR: { leads: 18000, visits: 4800, negotiations: 1200, bookings: 650, collections: 42000000 },
  };

  const currentData = forecastData[timeframe];

  return (
    <div className="p-8 h-full overflow-y-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-white tracking-wide">Sales Forecasting Engine</h1>
          <p className="text-neutral-500 mt-2">Predictive modeling for operational sales metrics and team targets.</p>
        </div>
        <div className="flex bg-[#121212] rounded p-1 border border-neutral-800">
          <button 
            className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${timeframe === 'MONTH' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white'}`}
            onClick={() => setTimeframe('MONTH')}
          >
            This Month
          </button>
          <button 
            className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${timeframe === 'QUARTER' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white'}`}
            onClick={() => setTimeframe('QUARTER')}
          >
            This Quarter
          </button>
          <button 
            className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${timeframe === 'YEAR' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white'}`}
            onClick={() => setTimeframe('YEAR')}
          >
            This Year
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden group hover:border-[#00E5FF]/50 transition-colors">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Expected Leads</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">{currentData.leads.toLocaleString()}</div>
          <div className="text-xs text-green-400 flex items-center"><ArrowUpRight className="w-3 h-3 mr-1"/> 12% vs history</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden group hover:border-[#00E5FF]/50 transition-colors">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <CalendarCheck className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Expected Visits</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">{currentData.visits.toLocaleString()}</div>
          <div className="text-xs text-green-400 flex items-center"><ArrowUpRight className="w-3 h-3 mr-1"/> 8% vs history</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden group hover:border-[#00E5FF]/50 transition-colors">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <FileText className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Negotiations</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">{currentData.negotiations.toLocaleString()}</div>
          <div className="text-xs text-red-400 flex items-center">-2% vs history</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden group hover:border-[#00E5FF]/50 transition-colors">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Expected Bookings</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">{currentData.bookings.toLocaleString()}</div>
          <div className="text-xs text-green-400 flex items-center"><ArrowUpRight className="w-3 h-3 mr-1"/> 15% vs history</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden group hover:border-[#00E5FF]/50 transition-colors">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <Target className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Collections Forecast</span>
          </div>
          <div className="text-3xl font-medium text-[#00E5FF] mb-2">${(currentData.collections / 1000000).toFixed(1)}M</div>
          <div className="text-xs text-green-400 flex items-center"><ArrowUpRight className="w-3 h-3 mr-1"/> 5% vs history</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        
        {/* Sales Velocity Forecast */}
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Sales Velocity Projection</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs text-neutral-400 mb-2">
                <span>Lead to Visit Conversion</span>
                <span className="text-white">{(currentData.visits / currentData.leads * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full" style={{ width: `${(currentData.visits / currentData.leads * 100)}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-neutral-400 mb-2">
                <span>Visit to Negotiation</span>
                <span className="text-white">{(currentData.negotiations / currentData.visits * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-2">
                <div className="bg-purple-400 h-2 rounded-full" style={{ width: `${(currentData.negotiations / currentData.visits * 100)}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-neutral-400 mb-2">
                <span>Negotiation to Booking</span>
                <span className="text-white">{(currentData.bookings / currentData.negotiations * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: `${(currentData.bookings / currentData.negotiations * 100)}%` }}></div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-neutral-800">
               <div className="flex justify-between text-xs font-bold text-neutral-300 uppercase">
                <span>Net Lead to Booking Ratio</span>
                <span className="text-[#00E5FF]">{(currentData.bookings / currentData.leads * 100).toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-[#1A1C20] border border-neutral-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-[#00E5FF] uppercase tracking-widest mb-6">AI Prescriptive Actions</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-black/40 rounded border border-neutral-800/50">
              <h4 className="text-sm font-bold text-white mb-1">Increase Top-of-Funnel Leads</h4>
              <p className="text-xs text-neutral-400">To achieve the target of {currentData.bookings} bookings, AI suggests increasing ad spend by 15% on Google Ads to generate an additional {(currentData.leads * 0.15).toFixed(0)} leads.</p>
            </div>
            
            <div className="p-4 bg-black/40 rounded border border-neutral-800/50">
              <h4 className="text-sm font-bold text-white mb-1">Optimize Visit Conversion</h4>
              <p className="text-xs text-neutral-400">Current Visit to Negotiation rate is {(currentData.negotiations / currentData.visits * 100).toFixed(1)}%. Deploying the 'Summer Special Offer' could increase this to 25%.</p>
            </div>

            <div className="p-4 bg-black/40 rounded border border-neutral-800/50">
              <h4 className="text-sm font-bold text-white mb-1">Sales Team Allocation</h4>
              <p className="text-xs text-neutral-400">Forecast indicates a bottleneck at site visits. Reallocate 3 remote callers to site-presence roles for the upcoming weekends.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
