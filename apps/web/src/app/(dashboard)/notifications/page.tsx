'use client';

import React, { useState } from 'react';
import { useEnterpriseStore, EnterpriseNotification } from '@/store/enterpriseStore';
import { 
  Bell, CheckCircle2, MessageSquare, Mail, Smartphone, Radio, 
  Webhook, Filter, CheckCheck, Sparkles, AlertTriangle, ShieldAlert
} from 'lucide-react';
import Link from 'next/link';

export default function EnterpriseNotificationCenterPage() {
  const { notifications, markNotificationRead } = useEnterpriseStore();
  const [channelFilter, setChannelFilter] = useState('All');

  const channels = ['In App', 'Email', 'WhatsApp', 'SMS', 'Push', 'Webhook'];

  const channelIcons: Record<string, any> = {
    'In App': Bell,
    'Email': Mail,
    'WhatsApp': MessageSquare,
    'SMS': Smartphone,
    'Push': Radio,
    'Webhook': Webhook
  };

  const filteredNotifs = notifications.filter(n => channelFilter === 'All' || n.channel === channelFilter);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#2A2A30]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-blue uppercase mb-1">
              <span>ENTERPRISE BROADCAST HUB</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              Multi-Channel Notification Center
              {unreadCount > 0 && (
                <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold font-mono">
                  {unreadCount} UNREAD
                </span>
              )}
            </h1>
          </div>

          <div className="flex gap-3">
            <Link href="/admin" className="px-4 py-2 bg-[#1A1A24] hover:bg-[#2A2A30] rounded-xl text-xs font-bold transition-all border border-[#3F3F46]">
              Admin Hub
            </Link>
          </div>
        </div>

        {/* Channel Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button 
            onClick={() => setChannelFilter('All')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${channelFilter === 'All' ? 'bg-brand-blue text-[#111111] shadow-lg shadow-brand-blue/20' : 'bg-[#111111] text-[#A1A1AA] border border-[#2A2A30] hover:text-white'}`}
          >
            All Channels ({notifications.length})
          </button>
          {channels.map((chan) => {
            const Icon = channelIcons[chan] || Bell;
            return (
              <button
                key={chan}
                onClick={() => setChannelFilter(chan)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${channelFilter === chan ? 'bg-brand-blue text-[#111111] shadow-lg shadow-brand-blue/20' : 'bg-[#111111] text-[#A1A1AA] border border-[#2A2A30] hover:text-white'}`}
              >
                <Icon size={14} /> {chan}
              </button>
            );
          })}
        </div>

        {/* Notifications Feed feed */}
        <div className="space-y-4">
          {filteredNotifs.map((notif) => {
            const Icon = channelIcons[notif.channel] || Bell;
            return (
              <div 
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  !notif.isRead 
                    ? 'bg-[#161622] border-brand-blue shadow-lg shadow-brand-blue/5' 
                    : 'bg-[#111111] border-[#2A2A30] hover:border-[#3F3F46] opacity-75'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl border ${!notif.isRead ? 'bg-brand-blue/20 border-brand-blue text-brand-blue' : 'bg-[#1E1E24] border-[#3F3F46] text-[#A1A1AA]'}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">
                        {notif.type}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400">
                        {notif.channel}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{notif.title}</h3>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">{notif.message}</p>
                    <span className="block text-[11px] text-[#71717A] mt-2 font-mono">{notif.time}</span>
                  </div>
                </div>

                <div>
                  {!notif.isRead ? (
                    <span className="flex items-center gap-1 text-[11px] text-brand-blue font-bold whitespace-nowrap bg-brand-blue/10 px-3 py-1 rounded-lg border border-brand-blue/20">
                      Mark Read
                    </span>
                  ) : (
                    <span className="text-[#71717A] flex items-center gap-1 text-xs font-semibold">
                      <CheckCheck size={14} /> Read
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
