'use client';

import { Building2, User, Users, Wrench } from 'lucide-react';

export default function InteractiveMapCanvas() {
  return (
    <div className="relative w-full h-full bg-[#0A0C10] overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Center Node Graph */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[500px] h-[400px]">
          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
            <line x1="50%" y1="50%" x2="30%" y2="25%" stroke="#3F3F46" strokeWidth="1.5" strokeDasharray="4" />
            <line x1="50%" y1="50%" x2="70%" y2="25%" stroke="#3F3F46" strokeWidth="1.5" strokeDasharray="4" />
            <line x1="50%" y1="50%" x2="50%" y2="75%" stroke="#3F3F46" strokeWidth="1.5" strokeDasharray="4" />
          </svg>

          {/* Central Building */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#1A1A1A] border border-[#3F3F46] rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(147,165,207,0.15)] z-20 cursor-pointer hover:border-brand-blue transition-colors">
            <Building2 size={32} className="text-brand-blue" />
          </div>

          {/* Owner Node */}
          <div className="absolute top-[20%] left-[15%] z-20">
            <div className="bg-[#1A1A1A] border border-amber-500/30 rounded px-4 py-2 flex items-center gap-2 cursor-pointer hover:border-amber-500/80 transition-colors shadow-lg">
              <User size={14} className="text-amber-500" />
              <span className="text-xs font-bold text-white tracking-wide">Owner</span>
            </div>
          </div>

          {/* Tenants Node */}
          <div className="absolute top-[20%] right-[15%] z-20">
            <div className="bg-[#1A1A1A] border border-success/30 rounded px-4 py-2 flex items-center gap-2 cursor-pointer hover:border-success/80 transition-colors shadow-lg">
              <Users size={14} className="text-success" />
              <span className="text-xs font-bold text-white tracking-wide">Tenants</span>
            </div>
          </div>

          {/* Vendors Node */}
          <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-[#1A1A1A] border border-[#71717A]/50 rounded px-4 py-2 flex items-center gap-2 cursor-pointer hover:border-white transition-colors shadow-lg">
              <Wrench size={14} className="text-[#A1A1AA]" />
              <span className="text-xs font-bold text-white tracking-wide">Vendors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
