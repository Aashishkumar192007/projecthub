'use client';

import { useExecutiveStore } from '@/store/executiveStore';
import { Search, Bell, Globe, Calendar, Bot, Maximize, Minimize } from 'lucide-react';

export function ExecutiveCommandBar() {
  const { isWarRoomMode, toggleWarRoomMode } = useExecutiveStore();

  return (
    <div className={`h-14 border-b border-[#2A2A30] flex items-center justify-between px-6 shrink-0 transition-colors ${
      isWarRoomMode ? 'bg-danger/10 border-danger/30' : 'bg-[#111111]'
    }`}>
      
      {/* Search & Global Context */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[linear-gradient(45deg,#00E5FF,#0066FF)] flex items-center justify-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
            <Globe size={16} className="text-white" />
          </div>
          <h1 className="text-sm font-black text-white uppercase tracking-wider">PropertyHub Command</h1>
        </div>

        <div className="h-6 w-px bg-[#2A2A30]"></div>

        <div className="relative w-64">
          <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#71717A]" />
          <input 
            type="text" 
            placeholder="Search Portfolio..."
            className="w-full bg-[#1A1A1A] border border-[#3F3F46] rounded px-3 py-1 pl-8 text-xs text-white placeholder:text-[#71717A] focus:outline-none focus:border-brand-blue transition-colors"
          />
        </div>
      </div>

      {/* Selectors & Actions */}
      <div className="flex items-center gap-4">
        
        {/* Time Range */}
        <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#3F3F46] rounded px-3 py-1">
          <Calendar size={12} className="text-[#A1A1AA]" />
          <select className="bg-transparent text-xs text-white focus:outline-none cursor-pointer">
            <option>Q2 2026</option>
            <option>YTD 2026</option>
            <option>FY 2025</option>
          </select>
        </div>

        {/* War Room Toggle */}
        <button 
          onClick={toggleWarRoomMode}
          className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-bold transition-all border ${
            isWarRoomMode ? 'bg-danger text-white border-danger shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-[#1A1A1A] text-[#A1A1AA] border-[#3F3F46] hover:text-white'
          }`}
        >
          {isWarRoomMode ? <Minimize size={14} /> : <Maximize size={14} />}
          WAR ROOM {isWarRoomMode ? 'ON' : 'OFF'}
        </button>

        {/* AI Command Palette Trigger */}
        <button className="flex items-center gap-2 px-3 py-1 rounded text-xs font-bold bg-[#1A2533] text-brand-blue border border-brand-blue/30 shadow-[0_0_15px_rgba(79,132,255,0.1)] hover:bg-[#1E2D40] transition-colors">
          <Bot size={14} />
          CMD+K
        </button>

        <div className="h-6 w-px bg-[#2A2A30] mx-2"></div>

        {/* Notifications */}
        <div className="relative cursor-pointer hover:text-white text-[#A1A1AA] transition-colors">
          <Bell size={18} />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-danger"></div>
        </div>

      </div>

    </div>
  );
}
