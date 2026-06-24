'use client';

import { useFacilityStore } from '@/store/facilityStore';
import { BarChart3, TrendingUp, TrendingDown, ArrowRight, Zap, ShieldAlert, Wrench, Activity } from 'lucide-react';

export function AnalyticsTab() {
  const { facilities, activeFacilityId } = useFacilityStore();
  
  if (!activeFacilityId) return null;
  const activeFacility = facilities.find(f => f.id === activeFacilityId);
  if (!activeFacility) return null;

  return (
    <div className="p-8 space-y-8">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><BarChart3 size={16} className="text-[#00E5FF]"/> Predictive Analytics & Forecasting</h3>
        <span className="text-[10px] text-[#A1A1AA] uppercase font-bold px-3 py-1 bg-[#1A1A1A] border border-[#2A2A30] rounded-lg">
          AI-Powered Forecast: Next 90 Days
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        
        {/* Maintenance Forecast */}
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-warning/30 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest flex items-center gap-2"><Wrench size={14} className="text-warning"/> Maintenance Forecast</h4>
            <span className="text-[10px] font-bold text-warning bg-warning/10 border border-warning/20 px-2 py-0.5 rounded uppercase">Surge Expected</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-black text-white">42</p>
                <p className="text-[10px] text-[#71717A] uppercase tracking-wider font-bold">Projected Work Orders</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-danger flex items-center gap-1 justify-end"><TrendingUp size={12}/> +15%</span>
                <p className="text-[9px] text-[#71717A] uppercase tracking-wider mt-1">Vs Previous 90 Days</p>
              </div>
            </div>
            <div className="p-3 bg-[#111111] border border-[#2A2A30] rounded-lg">
              <p className="text-[10px] text-[#A1A1AA] leading-relaxed">
                <span className="text-warning font-bold">AI Insight:</span> Summer temperature increases are projected to drive a 15% surge in HVAC-related reactive maintenance requests.
              </p>
            </div>
          </div>
        </div>

        {/* Energy Forecast */}
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-danger/30 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest flex items-center gap-2"><Zap size={14} className="text-danger"/> Energy Forecast</h4>
            <span className="text-[10px] font-bold text-danger bg-danger/10 border border-danger/20 px-2 py-0.5 rounded uppercase">High Cost Risk</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-black text-white">124k <span className="text-sm text-[#71717A]">kWh</span></p>
                <p className="text-[10px] text-[#71717A] uppercase tracking-wider font-bold">Projected Consumption</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-danger flex items-center gap-1 justify-end"><TrendingUp size={12}/> +8.4%</span>
                <p className="text-[9px] text-[#71717A] uppercase tracking-wider mt-1">Above Baseline</p>
              </div>
            </div>
            <div className="p-3 bg-[#111111] border border-[#2A2A30] rounded-lg">
              <p className="text-[10px] text-[#A1A1AA] leading-relaxed">
                <span className="text-danger font-bold">AI Insight:</span> Uncalibrated chiller units in Zone B will likely drive consumption beyond the operational baseline.
              </p>
            </div>
          </div>
        </div>

        {/* Asset Failure Forecast */}
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-[#00E5FF]/30 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest flex items-center gap-2"><ShieldAlert size={14} className="text-[#00E5FF]"/> Asset Failure Forecast</h4>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-black text-white">{activeFacility.assetFailureRisk}%</p>
                <p className="text-[10px] text-[#71717A] uppercase tracking-wider font-bold">Systemic Failure Probability</p>
              </div>
              <button className="flex items-center gap-1 text-[10px] font-bold text-[#00E5FF] hover:underline">
                View Critical Assets <ArrowRight size={10} />
              </button>
            </div>
            <div className="p-3 bg-[#111111] border border-[#2A2A30] rounded-lg">
              <p className="text-[10px] text-[#A1A1AA] leading-relaxed">
                <span className="text-[#00E5FF] font-bold">AI Insight:</span> 2 critical assets are entering end-of-life stages within this quarter. Immediate Capex planning recommended.
              </p>
            </div>
          </div>
        </div>

        {/* Occupancy Forecast */}
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-success/30 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest flex items-center gap-2"><Activity size={14} className="text-success"/> Occupancy Forecast</h4>
            <span className="text-[10px] font-bold text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded uppercase">Stable</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-black text-white">89%</p>
                <p className="text-[10px] text-[#71717A] uppercase tracking-wider font-bold">Projected Utilization</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-success flex items-center gap-1 justify-end"><TrendingUp size={12}/> +1.0%</span>
                <p className="text-[9px] text-[#71717A] uppercase tracking-wider mt-1">Vs Current</p>
              </div>
            </div>
            <div className="p-3 bg-[#111111] border border-[#2A2A30] rounded-lg">
              <p className="text-[10px] text-[#A1A1AA] leading-relaxed">
                <span className="text-success font-bold">AI Insight:</span> Hybrid work patterns have stabilized. Peak utilization occurs consistently on Tuesdays and Wednesdays.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
