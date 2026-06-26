'use client';

import { Sparkles, ArrowUp, ArrowDown, MapPin, Building, Search, Activity } from 'lucide-react';
import { useState } from 'react';

export function DemandPredictionEngine() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', '1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Villa', 'Commercial', 'Plot', 'Retail'];

  const predictions = [
    { id: '1', item: '2 BHK in North Region', category: '2 BHK', demandScore: 92, trend: 'UP', timeframe: 'Next 30 Days', reason: 'IT park opening nearby. High search volume.' },
    { id: '2', name: 'Luxury Villas (West)', category: 'Villa', demandScore: 85, trend: 'UP', timeframe: 'Next 90 Days', reason: 'Stock market highs driving HNWI investments.' },
    { id: '3', name: 'Commercial Retail Spaces', category: 'Retail', demandScore: 45, trend: 'DOWN', timeframe: 'Next 60 Days', reason: 'Oversupply in the Downtown area.' },
    { id: '4', name: '3 BHK in South Region', category: '3 BHK', demandScore: 78, trend: 'UP', timeframe: 'Next 45 Days', reason: 'Upcoming school season; families upgrading.' },
    { id: '5', name: '1 BHK Studios', category: '1 BHK', demandScore: 88, trend: 'UP', timeframe: 'Immediate', reason: 'Investor demand for rental yield is peaking.' },
  ];

  const filteredPredictions = activeCategory === 'ALL' ? predictions : predictions.filter(p => p.category === activeCategory);

  return (
    <div className="p-8 h-full overflow-y-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-white tracking-wide">Demand Prediction Engine</h1>
          <p className="text-neutral-500 mt-2">AI models predicting which inventory types, configurations, and regions will trend next.</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors border ${
              activeCategory === cat 
                ? 'bg-[#00E5FF] text-[#0A1A2A] border-[#00E5FF]' 
                : 'bg-transparent text-neutral-400 border-neutral-700 hover:border-neutral-500 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8">
        
        {/* Main Prediction Feed */}
        <div className="col-span-2 bg-[#121212] border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Market Demand Forecast</h3>
            <div className="flex items-center gap-2 text-xs text-[#00E5FF] bg-[#00E5FF]/10 px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3" />
              <span>Live AI Model Active</span>
            </div>
          </div>

          <div className="space-y-4">
            {filteredPredictions.map(pred => (
              <div key={pred.id} className="p-4 border border-neutral-800 bg-[#1A1C20] rounded-lg hover:border-neutral-600 transition-colors group">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{pred.category}</span>
                      <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">{pred.timeframe}</span>
                    </div>
                    <h4 className="text-base font-medium text-white mb-2">{pred.item || pred.name}</h4>
                    <p className="text-xs text-neutral-400 max-w-lg">{pred.reason}</p>
                  </div>
                  
                  <div className="text-right flex flex-col items-end">
                    <div className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Demand Score</div>
                    <div className={`text-2xl font-bold flex items-center gap-2 ${pred.trend === 'UP' ? 'text-green-400' : 'text-red-400'}`}>
                      {pred.demandScore}/100
                      {pred.trend === 'UP' ? <ArrowUp className="w-5 h-5" /> : <ArrowDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredPredictions.length === 0 && (
              <div className="py-12 text-center text-neutral-500 text-sm">
                No predictions available for this category right now.
              </div>
            )}
          </div>
        </div>

        {/* Hotspots & Price Points */}
        <div className="space-y-6">
          
          <div className="bg-[#1A1C20] border border-neutral-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-[#00E5FF] uppercase tracking-widest mb-4">Trending Micro-Markets</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-8 h-8 text-neutral-600 p-1.5 bg-neutral-900 rounded" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-white">Airport Corridor</span>
                    <span className="text-xs text-green-400">+14%</span>
                  </div>
                  <div className="w-full bg-neutral-900 rounded-full h-1.5">
                    <div className="bg-green-400 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-8 h-8 text-neutral-600 p-1.5 bg-neutral-900 rounded" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-white">IT Park Zone 3</span>
                    <span className="text-xs text-green-400">+8%</span>
                  </div>
                  <div className="w-full bg-neutral-900 rounded-full h-1.5">
                    <div className="bg-green-400 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1C20] border border-neutral-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-[#00E5FF] uppercase tracking-widest mb-4">Optimal Price Points</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border border-neutral-800 bg-[#121212] rounded">
                <div>
                  <div className="text-xs font-bold text-white mb-0.5">1 BHK Studio</div>
                  <div className="text-[10px] text-neutral-500">Highest Conversion Range</div>
                </div>
                <div className="text-sm font-medium text-[#00E5FF]">$120k - $150k</div>
              </div>
              <div className="flex justify-between items-center p-3 border border-neutral-800 bg-[#121212] rounded">
                <div>
                  <div className="text-xs font-bold text-white mb-0.5">3 BHK Premium</div>
                  <div className="text-[10px] text-neutral-500">Highest Conversion Range</div>
                </div>
                <div className="text-sm font-medium text-[#00E5FF]">$450k - $520k</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
