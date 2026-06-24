'use client';

import { useInvestorStore } from '@/store/investorStore';
import { Landmark, Building2, HardHat, TrendingUp, ArrowRightLeft, Scale, FileText, ShieldAlert, Leaf, LineChart, BarChart3 } from 'lucide-react';

export function InvestmentsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Landmark size={16} className="text-[#00E5FF]"/> Investment Ledger</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Total Commitments</p><p className="text-2xl font-black text-brand-blue mt-1">$4.2B</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Capital Called</p><p className="text-2xl font-black text-warning mt-1">$3.8B</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Unfunded</p><p className="text-2xl font-black text-success mt-1">$400M</p></div>
      </div>
    </div>
  );
}

export function PropertiesTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Building2 size={16} className="text-[#00E5FF]"/> Property Performance</h3>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Owned Assets</p><p className="text-2xl font-black text-white mt-1">42</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase">Occupancy</p><p className="text-2xl font-black text-brand-blue mt-1">94.2%</p></div>
        <div className="col-span-2 bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex items-center justify-between">
          <div><p className="text-[10px] text-[#A1A1AA] uppercase">NOI (TTM)</p><p className="text-2xl font-black text-success mt-1">$142.5M</p></div>
          <button className="px-4 py-2 bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 font-bold rounded-lg transition-colors h-full">View Rent Roll</button>
        </div>
      </div>
    </div>
  );
}

export function ProjectsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><HardHat size={16} className="text-[#00E5FF]"/> Construction Investments</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Capital Deployed</h4><p className="text-3xl font-black text-warning">$840M</p><p className="text-[10px] text-[#A1A1AA] mt-2">Across 8 Active Projects</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30] flex items-center justify-center">
          <div className="w-full text-left">
             <div className="flex justify-between mb-2"><span className="text-xs font-bold text-white">Aggregated Progress</span><span className="text-xs font-bold text-brand-blue">62%</span></div>
             <div className="w-full bg-[#111111] h-2 rounded-full overflow-hidden border border-[#2A2A30]"><div className="h-full bg-[linear-gradient(90deg,#00E5FF,#0066FF)] w-[62%] rounded-full"></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReturnsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><TrendingUp size={16} className="text-[#00E5FF]"/> Return Analytics</h3>
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-64 flex items-center justify-center relative overflow-hidden"><div className="text-center z-10"><h4 className="text-sm font-bold text-white mb-2">Performance Benchmarking</h4><p className="text-xs text-[#71717A]">Chart loading: IRR vs Market Index</p></div></div>
    </div>
  );
}

export function DistributionsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><ArrowRightLeft size={16} className="text-[#00E5FF]"/> Dividend & Payouts</h3>
      <div className="space-y-3">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">Q2 2026 Dividend</span><span className="text-sm font-black text-success">$45.5M</span></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">Q1 2026 Dividend</span><span className="text-sm font-black text-success">$42.1M</span></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-[#A1A1AA]">Q4 2025 Dividend</span><span className="text-sm font-black text-[#A1A1AA]">$39.8M</span></div>
      </div>
    </div>
  );
}

export function ValuationsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Scale size={16} className="text-[#00E5FF]"/> Asset Valuations</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-[#A1A1AA] uppercase mb-1">Book Value</h4><p className="text-2xl font-black text-white">$3.8B</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30] border-l-4 border-l-success"><h4 className="text-xs font-bold text-[#A1A1AA] uppercase mb-1">Fair Market Value</h4><p className="text-2xl font-black text-success">$4.25B</p></div>
      </div>
    </div>
  );
}

export function DocumentsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><FileText size={16} className="text-[#00E5FF]"/> Investor Data Room</h3>
      <div className="space-y-3">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">Q1 2026 Board Report.pdf</span><button className="text-[10px] text-brand-blue border border-brand-blue/30 px-3 py-1.5 rounded hover:bg-brand-blue/10 font-bold">Download</button></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] flex justify-between items-center"><span className="text-sm font-bold text-white">K-1 Tax Statement 2025.pdf</span><button className="text-[10px] text-brand-blue border border-brand-blue/30 px-3 py-1.5 rounded hover:bg-brand-blue/10 font-bold">Download</button></div>
      </div>
    </div>
  );
}

export function RiskTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><ShieldAlert size={16} className="text-[#00E5FF]"/> Risk Exposure</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Market Risk</h4><p className="text-xl font-black text-warning">Moderate</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Vacancy Risk</h4><p className="text-xl font-black text-success">Low (4.8%)</p></div>
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A30]"><h4 className="text-xs font-bold text-white mb-2">Concentration</h4><p className="text-xl font-black text-brand-blue">Diversified</p></div>
      </div>
    </div>
  );
}

export function EsgTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><Leaf size={16} className="text-[#00E5FF]"/> Sustainability & ESG</h3>
      <div className="space-y-4 border-l-2 border-[#2A2A30] ml-4 pl-6 relative pt-2">
        <div className="relative bg-[#1A1A1A] border border-success/30 rounded-xl p-4">
           <div className="absolute -left-[35px] top-5 w-4 h-4 rounded-full bg-success border-4 border-[#0A0C10]"></div>
           <p className="text-sm font-bold text-white mb-1">Carbon Reduction Target Hit</p>
           <p className="text-[10px] text-[#A1A1AA]">Commercial portfolio achieved 20% reduction YoY.</p>
        </div>
      </div>
    </div>
  );
}

export function ForecastsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><LineChart size={16} className="text-[#00E5FF]"/> Predictive Forecasting</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase mb-1">EOM Cash Flow</p><p className="text-2xl font-black text-success">+$22.4M</p></div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]"><p className="text-[10px] text-[#A1A1AA] uppercase mb-1">EOY Valuation</p><p className="text-2xl font-black text-brand-blue">$4.8B</p></div>
      </div>
    </div>
  );
}

export function AnalyticsTab() {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-white flex items-center gap-2"><BarChart3 size={16} className="text-[#00E5FF]"/> Scenario Analysis</h3>
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 h-64 flex items-center justify-center relative overflow-hidden"><div className="text-center z-10"><h4 className="text-sm font-bold text-white mb-2">JLL Market Analytics Integration</h4><p className="text-xs text-[#71717A]">Peer comparison and Cap Rate modeling active.</p></div></div>
    </div>
  );
}
