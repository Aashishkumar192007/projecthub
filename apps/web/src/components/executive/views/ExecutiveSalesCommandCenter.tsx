'use client';

import { useRevenueIntelligenceStore } from '@/store/revenueIntelligenceStore';
import { useCrmStore } from '@/store/crmStore';
import { Target, TrendingUp, Users, DollarSign, Activity, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function ExecutiveSalesCommandCenter() {
  const { kpis } = useRevenueIntelligenceStore();
  const { leads, siteVisits, bookings } = useCrmStore();

  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(l => l.stage !== 'NEW' && l.stage !== 'LOST').length;
  const closedBookings = bookings.length;

  return (
    <div className="p-8 h-full overflow-y-auto">
      
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-white tracking-wide">Executive Sales Command Center</h1>
        <p className="text-neutral-500 mt-2">Comprehensive view of revenue performance and sales pipeline health.</p>
      </div>

      {/* Primary KPI Deck */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <DollarSign className="w-24 h-24 text-green-400" />
          </div>
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Revenue (YTD)</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">
            ${(kpis.totalRevenue / 1000000).toFixed(1)}M
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center text-green-400"><ArrowUpRight className="w-3 h-3 mr-1" /> 12%</span>
            <span className="text-neutral-600">vs Last Year</span>
          </div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <Target className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Forecast Revenue</span>
          </div>
          <div className="text-3xl font-medium text-[#00E5FF] mb-2">
            ${(kpis.forecastRevenue / 1000000).toFixed(1)}M
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500">Pipeline Confidence: </span>
            <span className="text-white font-medium">High</span>
          </div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <Users className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Target Achievement</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">
            {((kpis.totalRevenue / kpis.targetRevenue) * 100).toFixed(1)}%
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-1.5 mt-3">
            <div className="bg-green-400 h-1.5 rounded-full" style={{ width: `${(kpis.totalRevenue / kpis.targetRevenue) * 100}%` }}></div>
          </div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <Activity className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Conversion Rate</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">
            {kpis.conversionPercentage}%
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center text-red-400"><ArrowDownRight className="w-3 h-3 mr-1" /> 0.2%</span>
            <span className="text-neutral-600">vs Last Month</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-3 gap-8">
        
        {/* Sales Pipeline Funnel */}
        <div className="col-span-2 bg-[#121212] border border-neutral-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Sales Pipeline Conversion</h3>
          <div className="space-y-4">
            
            <div className="relative">
              <div className="flex justify-between text-xs text-neutral-400 mb-1">
                <span>Total Leads</span>
                <span>{totalLeads}</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-8 overflow-hidden flex items-center">
                <div className="bg-neutral-700 h-full w-full flex items-center px-4">
                  <span className="text-xs text-white">100%</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="flex justify-between text-xs text-neutral-400 mb-1">
                <span>Qualified Leads</span>
                <span>{qualifiedLeads}</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-8 overflow-hidden flex items-center">
                <div className="bg-[#1A2533] h-full flex items-center px-4 transition-all" style={{ width: `${(qualifiedLeads/totalLeads)*100}%` }}>
                  <span className="text-xs text-blue-400">{((qualifiedLeads/totalLeads)*100).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="flex justify-between text-xs text-neutral-400 mb-1">
                <span>Site Visits</span>
                <span>{siteVisits.length}</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-8 overflow-hidden flex items-center">
                <div className="bg-amber-500/20 h-full flex items-center px-4 transition-all" style={{ width: `${(siteVisits.length/totalLeads)*100}%` }}>
                  <span className="text-xs text-amber-400">{((siteVisits.length/totalLeads)*100).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="flex justify-between text-xs text-neutral-400 mb-1">
                <span>Closures (Bookings)</span>
                <span>{closedBookings}</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-8 overflow-hidden flex items-center">
                <div className="bg-green-500/20 h-full flex items-center px-4 transition-all" style={{ width: `${(closedBookings/totalLeads)*100}%` }}>
                  <span className="text-xs text-green-400">{((closedBookings/totalLeads)*100).toFixed(1)}%</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* AI Action Alerts */}
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6">
           <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">AI Action Alerts</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-red-900/50 bg-[#2A1616] rounded flex flex-col gap-2">
              <span className="text-xs font-bold text-red-400 uppercase">Revenue Risk</span>
              <p className="text-xs text-neutral-300">Target for current quarter is missing by $5.2M. Recommend running a recovery campaign.</p>
            </div>
            
            <div className="p-4 border border-amber-900/50 bg-[#2A2316] rounded flex flex-col gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase">Inventory Aging</span>
              <p className="text-xs text-neutral-300">45 units in Project Orion have been unsold for >90 days. AI suggests a 2% price correction.</p>
            </div>

            <div className="p-4 border border-[#00E5FF]/20 bg-[#00E5FF]/5 rounded flex flex-col gap-2">
              <span className="text-xs font-bold text-[#00E5FF] uppercase">Broker Opportunity</span>
              <p className="text-xs text-neutral-300">Top 3 brokers are responsible for 60% of bookings. Consider allocating exclusive inventory.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
