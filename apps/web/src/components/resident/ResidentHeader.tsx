'use client';

import { useResidentStore } from '@/store/residentStore';
import { User, Building2, MessageSquarePlus, CalendarPlus, QrCode, CreditCard, PenLine, Star } from 'lucide-react';

export function ResidentHeader({ resident, isLoading }: { resident?: any, isLoading?: boolean }) {
  if (isLoading) return <div className="bg-[#161616] border-b border-[#2A2A30] p-8 shrink-0 animate-pulse h-32"></div>;
  if (!resident) return null;

  const primaryUnit = resident.ownedUnits?.[0];
  const unitLabel = primaryUnit ? `Unit ${primaryUnit.unitNumber} • ${primaryUnit.floor?.tower?.name || 'Unassigned Tower'}` : 'No Unit Assigned';
  const communityScore = 95; // Mock score for now

  return (
    <div className="bg-[#161616] border-b border-[#2A2A30] p-8 shrink-0 relative overflow-hidden">
      
      {/* Decorative background glow based on community score */}
      <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none transition-colors ${
        communityScore >= 90 ? 'bg-[#00E5FF]/5' : 
        communityScore >= 60 ? 'bg-warning/5' : 'bg-danger/5'
      }`}></div>

      <div className="flex items-start justify-between relative z-10">
        
        {/* Resident Info */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-[#1A1A1A] border-2 border-[#2A2A30] shadow-2xl flex items-center justify-center relative overflow-hidden">
            {/* Placeholder for Profile Photo */}
            <span className="text-3xl font-bold text-[#A1A1AA]">{resident.name?.charAt(0).toUpperCase()}</span>
            {/* Occupancy Dot */}
            <div className={`absolute bottom-2 right-2 w-3 h-3 rounded-full border-2 border-[#161616] bg-success`}></div>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-white tracking-tight">{resident.name}</h1>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border bg-[#2A2A30] text-[#A1A1AA] border-[#3F3F46]`}>
                Owner
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-bold text-[#71717A] mt-2">
              <span className="flex items-center gap-1.5"><Building2 size={12}/> {unitLabel}</span>
              <span className="flex items-center gap-1.5 text-[#00E5FF]"><Star size={12}/> {communityScore} Community Score</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col items-end gap-3">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <MessageSquarePlus size={12} /> Complaint
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <CalendarPlus size={12} /> Book Facility
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <QrCode size={12} /> Invite Visitor
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
