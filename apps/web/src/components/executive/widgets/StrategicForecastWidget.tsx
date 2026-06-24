'use client';

import { useExecutiveStore } from '@/store/executiveStore';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

export function StrategicForecastWidget() {
  const { forecasts } = useExecutiveStore();

  const calculateGrowth = (current: number, projected: number) => {
    return (((projected - current) / current) * 100).toFixed(1);
  };

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 relative overflow-hidden group">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50"></div>

      <div className="flex justify-between items-center relative z-10 mb-8">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp size={20} className="text-brand-blue" />
            Strategic Forecast Layer
          </h2>
          <p className="text-xs text-[#71717A] mt-1">12-Month Predictive Analytics (Current vs Projected)</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 relative z-10">
        
        {/* Revenue Forecast */}
        <div className="bg-[#111111] border border-[#2A2A30] rounded-xl p-6 relative">
          <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-4">Revenue Forecast</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#71717A] mb-1">Current</p>
              <p className="text-2xl font-black text-white">₹{forecasts.currentRevenue} Cr</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#71717A] mb-1">Projected</p>
              <p className="text-2xl font-black text-brand-blue">₹{forecasts.projectedRevenue} Cr</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 bg-[#1A2533] border border-brand-blue/30 px-3 py-1.5 rounded-lg w-fit">
            <ArrowUpRight size={14} className="text-brand-blue" />
            <span className="text-xs font-bold text-brand-blue">+{calculateGrowth(forecasts.currentRevenue, forecasts.projectedRevenue)}%</span>
          </div>
        </div>

        {/* Occupancy Forecast */}
        <div className="bg-[#111111] border border-[#2A2A30] rounded-xl p-6 relative">
          <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-4">Occupancy Forecast</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#71717A] mb-1">Current</p>
              <p className="text-2xl font-black text-white">{forecasts.currentOccupancy}%</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#71717A] mb-1">Projected</p>
              <p className="text-2xl font-black text-brand-blue">{forecasts.projectedOccupancy}%</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 bg-[#1A2533] border border-brand-blue/30 px-3 py-1.5 rounded-lg w-fit">
            <ArrowUpRight size={14} className="text-brand-blue" />
            <span className="text-xs font-bold text-brand-blue">+{calculateGrowth(forecasts.currentOccupancy, forecasts.projectedOccupancy)}%</span>
          </div>
        </div>

        {/* Construction Forecast */}
        <div className="bg-[#111111] border border-[#2A2A30] rounded-xl p-6 relative">
          <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-4">Construction Progress</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#71717A] mb-1">Current</p>
              <p className="text-2xl font-black text-white">{forecasts.currentConstruction}%</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#71717A] mb-1">Projected Target</p>
              <p className="text-2xl font-black text-brand-blue">{forecasts.projectedConstruction}%</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 bg-[#1A2533] border border-brand-blue/30 px-3 py-1.5 rounded-lg w-fit">
            <ArrowUpRight size={14} className="text-brand-blue" />
            <span className="text-xs font-bold text-brand-blue">+{calculateGrowth(forecasts.currentConstruction, forecasts.projectedConstruction)}%</span>
          </div>
        </div>

      </div>
    </div>
  );
}
