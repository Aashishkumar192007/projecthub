'use client';

import React from 'react';
import { ResidentMaster } from '@/store/residentStore';
import { Key, Users, Car, FileText, Wrench, ChevronLeft, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ResidentProfileNavigator({ resident }: { resident: ResidentMaster }) {
  const router = useRouter();

  return (
    <div className="w-72 border-r border-white/10 bg-black/40 backdrop-blur-xl flex flex-col h-full overflow-y-auto shrink-0">
      <div className="p-4 border-b border-white/10 sticky top-0 bg-black/40 backdrop-blur-xl z-10">
        <button 
          onClick={() => router.push('/residents')}
          className="flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors mb-4"
        >
          <ChevronLeft className="w-3 h-3" /> Back to Registry
        </button>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-white/10 flex items-center justify-center text-3xl text-emerald-300 font-medium mb-3 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            {resident.avatarUrl ? (
              <img src={resident.avatarUrl} alt={resident.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              resident.name.charAt(0)
            )}
          </div>
          <h2 className="text-xl font-medium text-white tracking-wide">{resident.name}</h2>
          
          <div className="flex items-center gap-2 mt-2 text-white/50 text-xs">
            <Building2 className="w-3 h-3" />
            <span>{resident.unitNumber} • {resident.buildingName}</span>
          </div>
          
          <div className="flex items-center gap-2 mt-3">
            <span className="px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/80">
              {resident.type}
            </span>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
              resident.status === 'Verified' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400' : 
              resident.status === 'Move-In Pending' ? 'border-amber-500/20 bg-amber-500/10 text-amber-400' : 
              'border-white/10 bg-white/5 text-white/60'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${resident.status === 'Verified' ? 'bg-emerald-400' : resident.status === 'Move-In Pending' ? 'bg-amber-400' : 'bg-white/40'}`} />
              <span className="text-xs">{resident.status}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Key Metrics Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <p className="text-xl font-light text-white">{resident.familyMembers}</p>
            <p className="text-[10px] uppercase tracking-wider text-white/50 mt-1">Family</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <p className="text-xl font-light text-white">{resident.vehicles}</p>
            <p className="text-[10px] uppercase tracking-wider text-white/50 mt-1">Vehicles</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center col-span-2">
            <p className={`text-xl font-medium ${resident.outstandingDues > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              ₹{resident.outstandingDues.toLocaleString()}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-white/50 mt-1">Outstanding Dues</p>
          </div>
        </div>

        {/* Community Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Community Score</span>
            <span className="text-sm font-medium text-white">{resident.communityParticipation}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className={`h-1.5 rounded-full ${resident.communityParticipation > 70 ? 'bg-emerald-500' : resident.communityParticipation > 40 ? 'bg-blue-500' : 'bg-white/40'}`} style={{ width: `${resident.communityParticipation}%` }}></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Resident Actions</h3>
          <div className="space-y-1.5">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm">
              <Users className="w-4 h-4 text-emerald-400" /> Manage Family
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm">
              <Car className="w-4 h-4 text-blue-400" /> Vehicle Registry
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm">
              <Key className="w-4 h-4 text-purple-400" /> Access Cards
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm">
              <FileText className="w-4 h-4 text-amber-400" /> View Lease
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm">
              <Wrench className="w-4 h-4 text-red-400" /> Log Complaint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
