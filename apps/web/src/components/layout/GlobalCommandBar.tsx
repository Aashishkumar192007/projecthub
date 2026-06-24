'use client';

import { Bell, Settings, HelpCircle, Search, Building2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useDashboardStore } from '@/stores/useDashboardStore';

export function GlobalCommandBar() {
  const pathname = usePathname();
  const { openSearchModal } = useDashboardStore();

  return (
    <div className="h-16 border-b flex items-center justify-between px-6 sticky top-0 z-50 transition-colors bg-[#111111] border-[#2A2A30]">
      
      {/* Left: Logo & Links */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight text-white">PropertyHub360</h1>
        </div>
        
        <div className="hidden lg:flex items-center gap-6 text-sm font-bold tracking-wide text-[#A1A1AA] pt-1">
          <span className="text-brand-blue border-b-2 border-brand-blue pb-4 cursor-pointer transition-colors">Dashboard</span>
          <span className="hover:text-white pb-4 cursor-pointer transition-colors">Portfolio</span>
          <span className="hover:text-white pb-4 cursor-pointer transition-colors">Revenue</span>
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <div 
          className="relative flex items-center cursor-pointer group"
          onClick={openSearchModal}
        >
          <Search size={16} className="absolute left-3 text-[#71717A] group-hover:text-white transition-colors" />
          <div className="w-full border rounded py-2 pl-10 pr-10 text-sm focus:outline-none transition-all bg-[#111111] border-[#2A2A30] text-[#71717A] group-hover:border-[#3F3F46]">
            Portfolio Search (CTRL + K)
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-5">
        <button className="text-[#A1A1AA] hover:text-white transition-colors relative">
          <Bell size={18} />
        </button>

        <button className="text-[#A1A1AA] hover:text-white transition-colors">
          <Settings size={18} />
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-[#93A5CF] hover:bg-[#A5B4FC] text-[#111111] rounded text-xs font-bold transition-colors ml-2">
            Execute Action
        </button>
        
        <div className="w-8 h-8 rounded-full bg-[#1A1A1A] overflow-hidden ml-2 cursor-pointer border border-[#3F3F46]">
          {/* Neon avatar from screenshot */}
          <img src="https://ui-avatars.com/api/?name=JS&background=0A0A0A&color=00E5FF" alt="User" />
        </div>
      </div>
    </div>
  );
}
