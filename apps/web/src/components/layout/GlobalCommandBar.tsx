'use client';

import { Bell, Settings, HelpCircle, Search, Building2, Wifi, WifiOff, Activity, Shield } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { useEnterpriseStore } from '@/store/enterpriseStore';

export function GlobalCommandBar() {
  const pathname = usePathname();
  const { openSearchModal } = useDashboardStore();
  const { isMobileOfflineMode, toggleOfflineMode, notifications } = useEnterpriseStore();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="h-16 border-b flex items-center justify-between px-6 sticky top-0 z-50 transition-colors bg-[#111111] border-[#2A2A30]">
      
      {/* Left: Logo & Links */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="text-xl font-bold tracking-tight text-white hover:text-brand-blue transition-colors">PropertyHub360</Link>
          {isMobileOfflineMode && (
            <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-mono animate-pulse">
              OFFLINE SYNC
            </span>
          )}
        </div>
        
        <div className="hidden lg:flex items-center gap-6 text-sm font-bold tracking-wide text-[#A1A1AA] pt-1">
          <Link href="/dashboard" className={`pb-4 transition-colors ${pathname === '/dashboard' ? 'text-brand-blue border-b-2 border-brand-blue' : 'hover:text-white'}`}>Dashboard</Link>
          <Link href="/properties" className={`pb-4 transition-colors ${pathname.startsWith('/properties') ? 'text-brand-blue border-b-2 border-brand-blue' : 'hover:text-white'}`}>Portfolio</Link>
          <Link href="/crm" className={`pb-4 transition-colors ${pathname.startsWith('/crm') ? 'text-brand-blue border-b-2 border-brand-blue' : 'hover:text-white'}`}>CRM & Sales</Link>
          <Link href="/admin" className={`pb-4 transition-colors flex items-center gap-1 ${pathname.startsWith('/admin') ? 'text-brand-blue border-b-2 border-brand-blue' : 'hover:text-white'}`}>
            <Shield size={14} /> Governance
          </Link>
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <div 
          className="relative flex items-center cursor-pointer group"
          onClick={openSearchModal}
        >
          <Search size={16} className="absolute left-3 text-[#71717A] group-hover:text-white transition-colors" />
          <div className="w-full border rounded py-2 pl-10 pr-10 text-sm focus:outline-none transition-all bg-[#111111] border-[#2A2A30] text-[#71717A] group-hover:border-[#3F3F46] flex items-center justify-between">
            <span>Portfolio Search & Action Hub</span>
            <kbd className="px-2 py-0.5 text-xs bg-[#1A1A20] border border-[#3F3F46] rounded text-[#A1A1AA]">CTRL+K</kbd>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Module 13: Mobile CRM / Offline Simulator Toggle */}
        <button 
          onClick={toggleOfflineMode}
          title={isMobileOfflineMode ? "Disable Offline Cache Sync" : "Simulate Mobile Offline Mode"}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            isMobileOfflineMode 
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
              : 'bg-[#1A1A20] border-[#2A2A30] text-[#A1A1AA] hover:text-white'
          }`}
        >
          {isMobileOfflineMode ? <WifiOff size={14} className="animate-spin" /> : <Wifi size={14} />}
          <span className="hidden sm:inline">{isMobileOfflineMode ? 'Offline Cache' : 'Online'}</span>
        </button>

        <Link href="/notifications" className="text-[#A1A1AA] hover:text-white transition-colors relative p-1.5 hover:bg-[#1A1A20] rounded-lg">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Link>

        <Link href="/admin" className="text-[#A1A1AA] hover:text-white transition-colors p-1.5 hover:bg-[#1A1A20] rounded-lg">
          <Settings size={18} />
        </Link>

        <Link href="/admin/workflows" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-blue to-[#A5B4FC] hover:opacity-90 text-[#111111] rounded-lg text-xs font-bold transition-all shadow-md">
          Workflow Hub
        </Link>
        
        <div className="w-8 h-8 rounded-full bg-[#1A1A1A] overflow-hidden ml-1 cursor-pointer border border-[#3F3F46]">
          <img src="https://ui-avatars.com/api/?name=AK&background=2563EB&color=fff" alt="User" />
        </div>
      </div>
    </div>
  );
}
