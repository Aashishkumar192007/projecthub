'use client';

import { useRevenueIntelligenceStore } from '@/store/revenueIntelligenceStore';
import { Activity, Sliders, Play, RotateCcw, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function ScenarioSimulationEngine() {
  const { kpis } = useRevenueIntelligenceStore();
  
  // Slider states for the simulation
  const [conversionBoost, setConversionBoost] = useState(0); // percentage points
  const [priceAdjustment, setPriceAdjustment] = useState(0); // percentage
  const [marketingBudget, setMarketingBudget] = useState(0); // percentage increase
  const [commissionRate, setCommissionRate] = useState(0); // percentage points

  // Simulation Logic (Simplified for prototype)
  const baseRevenue = kpis.forecastRevenue;
  const baseConversion = kpis.conversionPercentage;
  
  const simulatedConversion = baseConversion + conversionBoost + (marketingBudget * 0.05);
  const revenueMultiplier = (simulatedConversion / baseConversion) * (1 + (priceAdjustment / 100));
  
  const simulatedRevenue = baseRevenue * revenueMultiplier;
  const revenueDiff = simulatedRevenue - baseRevenue;
  
  // Cost impacts
  const additionalMarketingCost = (marketingBudget / 100) * 500000; // Assuming $500k base budget
  const commissionImpact = (commissionRate / 100) * simulatedRevenue;
  
  const simulatedProfitImpact = revenueDiff - additionalMarketingCost - commissionImpact;

  const handleSimulate = () => {
    toast.success('Simulation Complete', { description: 'Impact analysis has been updated.' });
  };

  const handleReset = () => {
    setConversionBoost(0);
    setPriceAdjustment(0);
    setMarketingBudget(0);
    setCommissionRate(0);
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-white tracking-wide">Scenario Simulation Engine</h1>
          <p className="text-neutral-500 mt-2">Model "What-if" scenarios to analyze the impact of strategic decisions on revenue and profit.</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        
        {/* Simulation Inputs */}
        <div className="col-span-1 bg-[#121212] border border-neutral-800 rounded-xl p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 text-[#00E5FF] mb-6">
            <Sliders className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Adjust Variables</h3>
          </div>

          <div className="space-y-8 flex-1">
            
            {/* Conversion Rate */}
            <div>
              <div className="flex justify-between text-xs font-medium text-neutral-300 mb-3">
                <span>Sales Conversion Boost</span>
                <span className={conversionBoost > 0 ? 'text-green-400' : conversionBoost < 0 ? 'text-red-400' : 'text-neutral-500'}>
                  {conversionBoost > 0 ? '+' : ''}{conversionBoost}%
                </span>
              </div>
              <input 
                type="range" min="-5" max="5" step="0.5" 
                value={conversionBoost} 
                onChange={(e) => setConversionBoost(parseFloat(e.target.value))}
                className="w-full accent-[#00E5FF]"
              />
              <div className="flex justify-between text-[10px] text-neutral-600 mt-1">
                <span>-5%</span><span>0%</span><span>+5%</span>
              </div>
            </div>

            {/* Price Adjustment */}
            <div>
              <div className="flex justify-between text-xs font-medium text-neutral-300 mb-3">
                <span>Inventory Price Adjustment</span>
                <span className={priceAdjustment > 0 ? 'text-green-400' : priceAdjustment < 0 ? 'text-red-400' : 'text-neutral-500'}>
                  {priceAdjustment > 0 ? '+' : ''}{priceAdjustment}%
                </span>
              </div>
              <input 
                type="range" min="-10" max="20" step="1" 
                value={priceAdjustment} 
                onChange={(e) => setPriceAdjustment(parseFloat(e.target.value))}
                className="w-full accent-[#00E5FF]"
              />
              <div className="flex justify-between text-[10px] text-neutral-600 mt-1">
                <span>-10%</span><span>0%</span><span>+20%</span>
              </div>
            </div>

            {/* Marketing Budget */}
            <div>
              <div className="flex justify-between text-xs font-medium text-neutral-300 mb-3">
                <span>Marketing Budget Increase</span>
                <span className={marketingBudget > 0 ? 'text-green-400' : 'text-neutral-500'}>
                  +{marketingBudget}%
                </span>
              </div>
              <input 
                type="range" min="0" max="100" step="5" 
                value={marketingBudget} 
                onChange={(e) => setMarketingBudget(parseFloat(e.target.value))}
                className="w-full accent-[#00E5FF]"
              />
              <div className="flex justify-between text-[10px] text-neutral-600 mt-1">
                <span>0%</span><span>+50%</span><span>+100%</span>
              </div>
            </div>

            {/* Broker Commission */}
            <div>
              <div className="flex justify-between text-xs font-medium text-neutral-300 mb-3">
                <span>Broker Commission Adjustment</span>
                <span className={commissionRate > 0 ? 'text-green-400' : commissionRate < 0 ? 'text-red-400' : 'text-neutral-500'}>
                  {commissionRate > 0 ? '+' : ''}{commissionRate}%
                </span>
              </div>
              <input 
                type="range" min="-2" max="5" step="0.5" 
                value={commissionRate} 
                onChange={(e) => setCommissionRate(parseFloat(e.target.value))}
                className="w-full accent-[#00E5FF]"
              />
              <div className="flex justify-between text-[10px] text-neutral-600 mt-1">
                <span>-2%</span><span>0%</span><span>+5%</span>
              </div>
            </div>

          </div>

          <div className="flex gap-3 mt-8 pt-6 border-t border-neutral-800">
            <button onClick={handleReset} className="flex-1 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 text-xs font-medium rounded flex items-center justify-center gap-2 transition-colors">
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
            <button onClick={handleSimulate} className="flex-1 py-2 bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0A1A2A] text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors">
              <Play className="w-3 h-3" /> Run Simulation
            </button>
          </div>
        </div>

        {/* Output & Impact Analysis */}
        <div className="col-span-2 space-y-6">
          
          <div className="bg-[#1A1C20] border border-neutral-800 rounded-xl p-6">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6">Simulated Impact Analysis</h3>
            
            <div className="grid grid-cols-2 gap-6">
              
              <div className="bg-[#121212] p-5 rounded-lg border border-neutral-800">
                <div className="text-xs text-neutral-500 mb-1">Simulated Revenue Forecast</div>
                <div className="text-3xl font-medium text-white mb-2">${(simulatedRevenue / 1000000).toFixed(2)}M</div>
                
                <div className={`flex items-center gap-2 text-sm font-medium ${revenueDiff > 0 ? 'text-green-400' : revenueDiff < 0 ? 'text-red-400' : 'text-neutral-500'}`}>
                  {revenueDiff > 0 ? <ArrowUpRight className="w-4 h-4" /> : revenueDiff < 0 ? <ArrowDownRight className="w-4 h-4" /> : null}
                  {revenueDiff > 0 ? '+' : ''}{(revenueDiff / 1000000).toFixed(2)}M vs Base
                </div>
              </div>

              <div className="bg-[#121212] p-5 rounded-lg border border-neutral-800">
                <div className="text-xs text-neutral-500 mb-1">Simulated Net Profit Impact</div>
                <div className={`text-3xl font-medium mb-2 ${simulatedProfitImpact > 0 ? 'text-green-400' : simulatedProfitImpact < 0 ? 'text-red-400' : 'text-white'}`}>
                  ${(simulatedProfitImpact / 1000000).toFixed(2)}M
                </div>
                
                <div className="text-xs text-neutral-500 mt-2">
                  Accounting for marketing and commission costs.
                </div>
              </div>

            </div>

            <div className="mt-6 pt-6 border-t border-neutral-800 grid grid-cols-3 gap-4">
              <div>
                <div className="text-[10px] uppercase text-neutral-500 tracking-widest mb-1">Simulated Conversion</div>
                <div className="text-lg text-white font-medium">{simulatedConversion.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-neutral-500 tracking-widest mb-1">Addt'l Marketing Cost</div>
                <div className="text-lg text-amber-400 font-medium">${(additionalMarketingCost / 1000).toFixed(0)}K</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-neutral-500 tracking-widest mb-1">Addt'l Commission Exp.</div>
                <div className="text-lg text-amber-400 font-medium">${(commissionImpact / 1000).toFixed(0)}K</div>
              </div>
            </div>

          </div>

          <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6">
            <h3 className="text-xs font-bold text-[#00E5FF] uppercase tracking-widest mb-4">AI Interpretation</h3>
            
            {simulatedProfitImpact > 500000 ? (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded text-sm text-green-400 leading-relaxed">
                <strong className="block mb-2">Highly Favorable Scenario</strong>
                The modeled strategy yields significant positive ROI. The revenue gains heavily outpace the increased marketing and commission expenditures. Recommend presenting this model to the board for immediate rollout.
              </div>
            ) : simulatedProfitImpact < 0 ? (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-400 leading-relaxed">
                <strong className="block mb-2">High Risk / Negative ROI</strong>
                The modeled strategy destroys margin. The cost of acquisition via marketing and commissions outpaces the revenue growth. Not recommended unless fighting severe market attrition.
              </div>
            ) : (
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded text-sm text-neutral-300 leading-relaxed">
                <strong className="block mb-2">Neutral Impact</strong>
                The scenario balances out. Revenue increases are almost entirely offset by the cost of acquisition. Consider tweaking price adjustments to capture more margin.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
