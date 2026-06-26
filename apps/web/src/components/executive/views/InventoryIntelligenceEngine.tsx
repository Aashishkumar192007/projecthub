'use client';

import { usePropertyStore } from '@/store/propertyStore';
import { Box, AlertTriangle, TrendingUp, TrendingDown, Clock, Sparkles } from 'lucide-react';

export function InventoryIntelligenceEngine() {
  const { properties } = usePropertyStore();

  const totalUnits = properties.length;
  const availableUnits = properties.filter(p => p.status === 'AVAILABLE').length;
  const soldUnits = properties.filter(p => p.status === 'SOLD').length;
  const bookedUnits = properties.filter(p => p.status === 'BOOKED').length;

  const mockDeadInventory = Math.floor(availableUnits * 0.12);
  const mockHighDemand = Math.floor(availableUnits * 0.18);
  const avgAging = 142; // days

  return (
    <div className="p-8 h-full overflow-y-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-white tracking-wide">Inventory Intelligence Engine</h1>
          <p className="text-neutral-500 mt-2">AI-driven analysis of inventory velocity, pricing recommendations, and stock aging.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <Box className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Available Stock</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">{availableUnits}</div>
          <div className="text-xs text-neutral-500">Out of {totalUnits} total units</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Avg Inventory Aging</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">{avgAging} days</div>
          <div className="text-xs text-red-400 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +12 days YoY</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-red-400 mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Dead Inventory Risk</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">{mockDeadInventory} units</div>
          <div className="text-xs text-neutral-500">Unsold > 180 days</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-[#00E5FF] mb-3">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">High Demand Premium</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">{mockHighDemand} units</div>
          <div className="text-xs text-green-400">Eligible for +2% markup</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        
        {/* Unit Type Performance */}
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6 flex flex-col">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Velocity by Configuration</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-medium mb-2">
                <span className="text-neutral-300">1 BHK (Studio)</span>
                <span className="text-green-400">Fast Moving (18 days avg)</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-2">
                <span className="text-neutral-300">2 BHK</span>
                <span className="text-[#00E5FF]">Steady (45 days avg)</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-2">
                <div className="bg-[#00E5FF] h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-2">
                <span className="text-neutral-300">3 BHK</span>
                <span className="text-amber-400">Slow Moving (110 days avg)</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-2">
                <span className="text-neutral-300">4 BHK / Penthouse</span>
                <span className="text-red-400">Stagnant (210+ days avg)</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-2">
                <div className="bg-red-400 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Pricing Prescriptions */}
        <div className="bg-[#1A1C20] border border-neutral-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-[#00E5FF] uppercase tracking-widest mb-6">AI Pricing Prescriptions</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-black/40 border border-neutral-800/50 rounded flex gap-4">
              <div className="mt-1"><TrendingUp className="w-5 h-5 text-green-400" /></div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Increase Price: 1 BHK Units</h4>
                <p className="text-xs text-neutral-400 leading-relaxed mb-2">
                  Inventory turnover for 1 BHK is exceptionally high. Current supply will deplete in 3 weeks.
                </p>
                <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">Recommendation: +3.5% Markup</span>
              </div>
            </div>

            <div className="p-4 bg-black/40 border border-neutral-800/50 rounded flex gap-4">
              <div className="mt-1"><TrendingDown className="w-5 h-5 text-red-400" /></div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Offer Discounts: Premium Segment</h4>
                <p className="text-xs text-neutral-400 leading-relaxed mb-2">
                  4 BHK units in Project Orion are sitting idle. Carrying cost is exceeding projected margins.
                </p>
                <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded">Recommendation: -2% Discount or Free Parking</span>
              </div>
            </div>

            <div className="p-4 bg-black/40 border border-neutral-800/50 rounded flex gap-4">
              <div className="mt-1"><Sparkles className="w-5 h-5 text-[#00E5FF]" /></div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Allocate to Top Brokers</h4>
                <p className="text-xs text-neutral-400 leading-relaxed mb-2">
                  12 corner units with park views identified as 'High Demand'. 
                </p>
                <span className="text-[10px] font-bold text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-1 rounded">Recommendation: Exclusive allocation to Elite Brokers Inc.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
