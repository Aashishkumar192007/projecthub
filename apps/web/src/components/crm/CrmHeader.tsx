'use client';

import { Search, Calendar, ChevronDown } from 'lucide-react';

export function CrmHeader() {
  return (
    <div className="bg-[#0A0A0A] p-6 shrink-0 relative flex items-center justify-between">
      {/* Left side Titles */}
      <div>
        <h1 className="text-xl font-medium text-white tracking-wide">CRM Command Center</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Lead Intelligence • Sales Pipeline • Conversion Analytics
        </p>
      </div>

      {/* Right side Controls */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Global CRM Search..."
            className="w-64 bg-[#1A1A1A] border border-neutral-800 text-sm text-white rounded px-9 py-2 focus:outline-none focus:border-neutral-700 placeholder-neutral-600 transition-colors"
          />
        </div>

        {/* Project Selector */}
        <button className="flex items-center justify-between gap-3 px-4 py-2 bg-[#1A1A1A] border border-neutral-800 rounded text-sm text-neutral-300 hover:bg-[#222222] transition-colors w-40">
          <span>Skyline Plaza</span>
          <ChevronDown className="w-4 h-4 text-neutral-500" />
        </button>

        {/* Date Picker Button */}
        <button className="flex items-center justify-center w-10 h-10 bg-[#1A1A1A] border border-neutral-800 rounded text-neutral-400 hover:text-white hover:bg-[#222222] transition-colors">
          <Calendar className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
