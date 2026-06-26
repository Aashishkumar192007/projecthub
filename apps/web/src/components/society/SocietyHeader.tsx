'use client';

import { useSocietyStore } from '@/store/societyStore';
import { Home, Megaphone, PieChart, CalendarDays, Wrench, FileText, ArrowRight } from 'lucide-react';

export function SocietyHeader() {
  const { stats, activeCategoryId } = useSocietyStore();
  
  if (!activeCategoryId || !stats) return null;

  return (
    <div className="bg-[#161616] border-b border-[#2A2A30] p-8 shrink-0 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none transition-colors ${
        stats.communityScore >= 90 ? 'bg-success/5' : 
        stats.communityScore >= 70 ? 'bg-warning/5' : 'bg-danger/5'
      }`}></div>

      <div className="flex items-start justify-between relative z-10">
        
        {/* Category Info */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-xl bg-[#1A1A1A] border-2 border-[#2A2A30] shadow-2xl flex items-center justify-center relative overflow-hidden">
            <Home size={32} className="text-[#00E5FF]" />
            <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${
              stats.communityScore >= 90 ? 'bg-success' : 
              stats.communityScore >= 70 ? 'bg-warning' : 'bg-danger'
            }`}></div>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-black text-white tracking-tight">{stats.societyName}</h1>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border bg-[#2A2A30] text-[#E4E4E7] border-[#3F3F46]`}>
                {activeCategoryId}
              </span>
            </div>
            
            <div className="flex items-center gap-6 mt-3">
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Community Score:</span>
                 <span className={`text-sm font-black ${
                   stats.communityScore >= 90 ? 'text-success' : 
                   stats.communityScore >= 70 ? 'text-warning' : 'text-danger'
                 }`}>{stats.communityScore}/100</span>
               </div>
               <div className="w-px h-4 bg-[#2A2A30]"></div>
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Occupancy:</span>
                 <span className="text-sm font-black text-[#00E5FF]">{stats.occupancyRate}%</span>
               </div>
               <div className="w-px h-4 bg-[#2A2A30]"></div>
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Collections:</span>
                 <span className="text-sm font-black text-warning">{stats.collectionRate}%</span>
               </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col items-end gap-3">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <Megaphone size={12} /> Notice
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <PieChart size={12} /> Poll
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <CalendarDays size={12} /> Meeting
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <Wrench size={12} /> Work Order
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded text-[11px] font-bold transition-colors shadow-[0_0_15px_rgba(79,132,255,0.3)] border border-brand-blue/50">
              <FileText size={12} /> Report
            </button>
          </div>
          
          <div className="flex items-center gap-4 text-right mb-2">
            <div>
              <p className="text-[9px] font-bold text-[#71717A] uppercase tracking-wider">Residents</p>
              <p className="text-lg font-black text-white">{stats.totalResidents}</p>
            </div>
            <div className="w-px h-8 bg-[#2A2A30]"></div>
            <div>
              <p className="text-[9px] font-bold text-[#71717A] uppercase tracking-wider">Units</p>
              <p className="text-lg font-black text-white">{stats.totalUnits}</p>
            </div>
            <div className="w-px h-8 bg-[#2A2A30]"></div>
            <div>
              <p className="text-[9px] font-bold text-[#71717A] uppercase tracking-wider">Open Complaints</p>
              <p className="text-lg font-black text-danger">{stats.openComplaints}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
