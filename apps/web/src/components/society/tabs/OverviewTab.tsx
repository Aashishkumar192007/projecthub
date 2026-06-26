'use client';

import { useSocietyStore } from '@/store/societyStore';
import { Target, Activity, Heart, ArrowUpRight, ArrowDownRight, Headset, CheckCircle2, AlertTriangle, Users } from 'lucide-react';

export function OverviewTab() {
  const { stats } = useSocietyStore();

  if (!stats) return null;

  return (
    <div className="p-8 space-y-6">
      
      {/* Top Community KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-success/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <Activity size={14} className="text-success" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Community Health</span>
           </div>
           <div className="flex items-end gap-2">
             <p className="text-4xl font-black text-white">{stats.communityScore}</p>
             <span className="text-[10px] font-bold bg-success/10 text-success border border-success/30 px-2 py-0.5 rounded uppercase mb-2 flex items-center gap-1"><ArrowUpRight size={10}/> Top 5%</span>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-warning/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <Target size={14} className="text-warning" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Collection Rate</span>
           </div>
           <div className="flex items-end gap-2">
             <p className="text-4xl font-black text-white">{stats.collectionRate}%</p>
             <span className="text-[10px] font-bold bg-danger/10 text-danger border border-danger/30 px-2 py-0.5 rounded uppercase mb-2 flex items-center gap-1"><ArrowDownRight size={10}/> -2.4% MoM</span>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-brand-blue/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <Heart size={14} className="text-brand-blue" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Resident Satisfaction</span>
           </div>
           <div className="flex items-end gap-2">
             <p className="text-4xl font-black text-brand-blue">4.8/5</p>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 hover:border-danger/50 transition-colors">
           <div className="flex items-center gap-2 mb-4">
             <Headset size={14} className="text-danger" />
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Open Complaints</span>
           </div>
           <div className="flex items-end gap-2">
             <p className="text-4xl font-black text-danger">{stats.openComplaints}</p>
             <span className="text-[10px] font-bold bg-warning/10 text-warning border border-warning/30 px-2 py-0.5 rounded uppercase mb-2 flex items-center gap-1"><AlertTriangle size={10}/> 4 SLA Breaches</span>
           </div>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-6">
        
        {/* Compliance & Maintenance Summary */}
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 size={14} className="text-white" /> Operations Snapshot
            </h3>
          </div>
          
          <div className="space-y-6">
             <div className="bg-[#111111] p-4 rounded-lg border border-[#2A2A30] border-l-4 border-l-success">
                <div className="flex justify-between items-end mb-2">
                   <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest">Fire & Safety Compliance</p>
                   <p className="text-2xl font-black text-white">100%</p>
                </div>
                <div className="w-full bg-[#1A1A1A] h-2 rounded overflow-hidden">
                  <div className="h-full bg-success w-full"></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-[#A1A1AA]">
                  <span>Audit Passed</span>
                  <span>Next Audit: Jan 2027</span>
                </div>
             </div>

             <div className="bg-[#111111] p-4 rounded-lg border border-[#2A2A30] border-l-4 border-l-[#00E5FF]">
                <div className="flex justify-between items-end mb-2">
                   <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest">Facility Utilization (Clubhouse & Gym)</p>
                   <p className="text-2xl font-black text-white">82%</p>
                </div>
                <div className="w-full bg-[#1A1A1A] h-2 rounded overflow-hidden">
                  <div className="h-full bg-[#00E5FF] w-[82%]"></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-[#A1A1AA]">
                  <span>Peak Hours: 6PM-9PM</span>
                  <span className="text-success">+14% vs Last Month</span>
                </div>
             </div>
          </div>
        </div>

        {/* Community Events & Demographics */}
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest flex items-center gap-2">
              <Users size={14} className="text-brand-blue" /> Upcoming Events
            </h3>
            <button className="text-[10px] text-brand-blue font-bold hover:underline">View Calendar</button>
          </div>
          
          <div className="space-y-4 border-l-2 border-[#2A2A30] ml-2 pl-4">
             <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-brand-blue border-2 border-[#0A0C10]"></div>
                <p className="text-sm font-bold text-white">Annual General Meeting (AGM)</p>
                <p className="text-[10px] text-[#71717A] mt-1">Saturday, 10:00 AM • Main Clubhouse</p>
             </div>
             <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-purple-400 border-2 border-[#0A0C10]"></div>
                <p className="text-sm font-bold text-white">Summer Kids Camp</p>
                <p className="text-[10px] text-[#71717A] mt-1">Monday, 09:00 AM • Swimming Pool Area</p>
             </div>
             <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-[#00E5FF] border-2 border-[#0A0C10]"></div>
                <p className="text-sm font-bold text-white">Yoga & Wellness Drive</p>
                <p className="text-[10px] text-[#71717A] mt-1">Wed, 06:00 AM • Central Lawn</p>
             </div>
          </div>
        </div>

      </div>

    </div>
  );
}
