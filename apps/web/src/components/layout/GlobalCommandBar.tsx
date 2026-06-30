'use client';

import { Bell, Settings, Search, CheckCircle2, AlertTriangle, Info, BellOff, Check } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { useEffect, useState, useRef } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export function GlobalCommandBar() {
  const pathname = usePathname();
  const { openSearchModal } = useDashboardStore();
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch notifications from the NestJS backend
  const fetchNotifications = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (!token) return;

    try {
      const res = await fetch('http://localhost:3001/api/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  // Poll notifications every 15 seconds
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mark single notification as read
  const markAsRead = async (id: string) => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:3001/api/notifications/${id}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        // Optimistic update
        setNotifications(prev =>
          prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
        );
      }
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:3001/api/notifications/read-all', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      }
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'SUCCESS':
        return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'WARNING':
        return <AlertTriangle size={16} className="text-amber-500" />;
      case 'ERROR':
        return <AlertTriangle size={16} className="text-red-500" />;
      default:
        return <Info size={16} className="text-blue-500" />;
    }
  };

  const formatTimestamp = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <div className="h-16 border-b flex items-center justify-between px-6高度 sticky top-0 z-50 transition-colors bg-[#111111] border-[#2A2A30]">
      
      {/* Left: Logo & Links */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight text-white cursor-pointer" onClick={() => window.location.href = '/'}>
            PropertyHub360
          </h1>
        </div>
        
        <div className="hidden lg:flex items-center gap-6 text-sm font-bold tracking-wide text-[#A1A1AA] pt-1">
          <span className="text-brand-blue border-b-2 border-brand-blue pb-4 cursor-pointer transition-colors">Dashboard</span>
          <span className="hover:text-white pb-4 cursor-pointer transition-colors" onClick={() => window.location.href = '/portfolio'}>Portfolio</span>
          <span className="hover:text-white pb-4 cursor-pointer transition-colors" onClick={() => window.location.href = '/revenue'}>Revenue</span>
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
        
        {/* Bell Icon & Dropdown container */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              fetchNotifications();
            }}
            className="text-[#A1A1AA] hover:text-white transition-colors relative p-1.5 rounded-full hover:bg-neutral-800 focus:outline-none"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_#EF4444]" />
            )}
          </button>

          {/* Floating Dropdown Panel */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#161616] border border-[#2A2A30] rounded-xl shadow-2xl overflow-hidden z-50 text-white animate-fade-in">
              {/* Header */}
              <div className="flex justify-between items-center px-4 py-3 bg-[#1D1D20] border-b border-[#2A2A30]">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold tracking-wide">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs font-bold text-brand-blue hover:text-blue-300 flex items-center gap-1 transition-colors"
                  >
                    <Check size={12} /> Mark all as read
                  </button>
                )}
              </div>

              {/* List */}
              <div className="max-h-[320px] overflow-y-auto divide-y divide-[#2A2A30]/40 custom-scrollbar">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div 
                      key={n.id} 
                      onClick={() => !n.isRead && markAsRead(n.id)}
                      className={`p-4 flex gap-3 transition-colors cursor-pointer ${
                        n.isRead ? 'hover:bg-neutral-900/30' : 'bg-[#1D2433]/30 hover:bg-[#1D2433]/50'
                      }`}
                    >
                      <div className="pt-0.5 flex-shrink-0">
                        {getNotificationIcon(n.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <p className={`text-xs leading-none ${n.isRead ? 'font-semibold text-[#A1A1AA]' : 'font-bold text-white'}`}>
                            {n.title}
                          </p>
                          <span className="text-[9px] font-bold text-[#71717A] ml-2 whitespace-nowrap">
                            {formatTimestamp(n.createdAt)}
                          </span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-[#A1A1AA]">
                          {n.message}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 flex flex-col items-center justify-center text-center text-slate-500">
                    <BellOff size={28} className="text-[#3F3F46] mb-2" />
                    <p className="text-xs font-bold">No notifications yet</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">We'll alert you when action is needed.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <button className="text-[#A1A1AA] hover:text-white transition-colors" onClick={() => window.location.href = '/settings'}>
          <Settings size={18} />
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-[#93A5CF] hover:bg-[#A5B4FC] text-[#111111] rounded text-xs font-bold transition-colors ml-2">
            Execute Action
        </button>
        
        <div className="w-8 h-8 rounded-full bg-[#1A1A1A] overflow-hidden ml-2 cursor-pointer border border-[#3F3F46]">
          <img src="https://ui-avatars.com/api/?name=JS&background=0A0A0A&color=00E5FF" alt="User" />
        </div>
      </div>
    </div>
  );
}
