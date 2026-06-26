'use client';

import { useRevenueIntelligenceStore } from '@/store/revenueIntelligenceStore';
import { useCrmStore } from '@/store/crmStore';
import { Activity, Clock, Zap, DollarSign, Users, Briefcase, RefreshCw, PhoneCall, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

export function RevenueWarRoom() {
  const { kpis } = useRevenueIntelligenceStore();
  const { leads, bookings } = useCrmStore();
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  // Simulate auto-refresh
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefreshed(new Date());
    }, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, []);

  const todayBookings = bookings.length; // Mocking as 'today'
  const todayRevenue = todayBookings * 450000; // Mock average ticket size
  const livePipeline = leads.filter(l => l.stage === 'NEGOTIATION').length;

  return (
    <div className="p-8 h-full overflow-y-auto bg-black">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Live Feed</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-wide">Revenue War Room</h1>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
          <Clock className="w-4 h-4" />
          <span>Last updated: {lastRefreshed.toLocaleTimeString()}</span>
          <RefreshCw className="w-4 h-4 text-neutral-600 animate-spin-slow" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        
        {/* Today's Scorecard */}
        <div className="col-span-1 bg-[#111111] border border-neutral-800 rounded-xl p-6">
          <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6">Today's Performance</h3>
          
          <div className="space-y-6">
            <div>
              <div className="text-xs text-neutral-500 mb-1">Today's Revenue</div>
              <div className="text-4xl font-bold text-green-400">${(todayRevenue / 1000).toFixed(0)}K</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
              <div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Bookings</div>
                <div className="text-xl font-medium text-white">{todayBookings}</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Collections</div>
                <div className="text-xl font-medium text-[#00E5FF]">$120K</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Pipeline Velocity */}
        <div className="col-span-1 bg-[#111111] border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Live Pipeline Velocity</h3>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded">
              <span className="text-sm text-neutral-300">Hot Leads Added</span>
              <span className="text-lg font-bold text-amber-400">+12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded">
              <span className="text-sm text-neutral-300">Active Negotiations</span>
              <span className="text-lg font-bold text-[#00E5FF]">{livePipeline}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded">
              <span className="text-sm text-neutral-300">Site Visits Ongoing</span>
              <span className="text-lg font-bold text-blue-400">4</span>
            </div>
          </div>
        </div>

        {/* Active Workforce */}
        <div className="col-span-1 bg-[#111111] border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Active Workforce</h3>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">42 / 50</div>
                <div className="text-xs text-neutral-500">Sales Execs Online</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">18</div>
                <div className="text-xs text-neutral-500">Brokers at Site</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Live Activity Feed */}
      <div className="bg-[#111111] border border-neutral-800 rounded-xl p-6">
        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6">Live Activity Stream</h3>
        
        <div className="space-y-4">
          
          <div className="flex items-start gap-4 p-4 border border-green-500/20 bg-green-500/5 rounded-lg">
            <div className="mt-0.5">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-green-400">Booking Confirmed: Unit A-402</div>
              <div className="text-xs text-neutral-400 mt-1">Closed by Sarah Jenkins • Revenue: $450,000</div>
            </div>
            <div className="text-xs text-neutral-500">Just now</div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-neutral-800 bg-[#1A1A1A] rounded-lg">
            <div className="mt-0.5">
              <PhoneCall className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-white">High Value Lead Assigned</div>
              <div className="text-xs text-neutral-400 mt-1">Lead: Michael Chang ($1.2M budget) assigned to Elite Team.</div>
            </div>
            <div className="text-xs text-neutral-500">2 min ago</div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-neutral-800 bg-[#1A1A1A] rounded-lg">
            <div className="mt-0.5">
              <Calendar className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-white">Site Visit Completed</div>
              <div className="text-xs text-neutral-400 mt-1">Broker: RealtyCorp. Lead feedback: Positive, moving to negotiation.</div>
            </div>
            <div className="text-xs text-neutral-500">14 min ago</div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-neutral-800 bg-[#1A1A1A] rounded-lg">
            <div className="mt-0.5">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-green-400">Collection Received</div>
              <div className="text-xs text-neutral-400 mt-1">Payment: $120,000 (10% milestone) received for Unit B-105.</div>
            </div>
            <div className="text-xs text-neutral-500">22 min ago</div>
          </div>

        </div>
      </div>

    </div>
  );
}
