'use client';

import React, { useState } from 'react';
import { AdminNav } from '@/components/admin/AdminNav';
import { 
  Activity, Users, Zap, ShieldAlert, CheckCircle2, Clock, 
  ArrowUpRight, Server, RefreshCw, Sparkles, Wifi
} from 'lucide-react';

export default function EnterpriseActivityMonitorPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activeSessions = [
    { usr: 'Liam Cunningham', role: 'CRM Director', ip: '192.168.1.42', loc: 'London, UK', action: 'Exporting EMEA Revenue Forecast', time: 'Just now' },
    { usr: 'Sarah Jenkins', role: 'Sales Manager', ip: '10.0.4.19', loc: 'Dubai, UAE', action: 'Reviewing KYC Sign-off #4401', time: '2 mins ago' },
    { usr: 'Kenji Sato', role: 'Broker Manager', ip: '172.16.0.8', loc: 'Tokyo, JP', action: 'Simulating Batch CSV Import', time: '4 mins ago' },
    { usr: 'Elena Rostova', role: 'Finance Officer', ip: '10.1.2.99', loc: 'Zurich, CH', action: 'Authorizing Wire Escrow Hold', time: '8 mins ago' },
    { usr: 'System Worker #4', role: 'BullMQ Daemon', ip: 'localhost', loc: 'AWS us-east-1', action: 'Redis Cache Sync Snapshot', time: '12 mins ago' }
  ];

  const refreshTelemetry = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-16">
      <AdminNav activeTitle="REAL-TIME ACTIVITY MONITORING CENTER" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-1 flex items-center gap-3">
              <Activity className="text-brand-blue animate-pulse" /> Live Enterprise Telemetry Stream
            </h2>
            <p className="text-xs text-[#A1A1AA]">Monitor concurrent staff sessions, API throughput velocity, and WORM event triggers.</p>
          </div>
          <button 
            onClick={refreshTelemetry}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A1A24] border border-[#3F3F46] hover:bg-[#2A2A30] text-xs font-bold transition-all"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin text-brand-blue' : ''} /> Refresh Stream
          </button>
        </div>

        {/* Live Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 font-mono">
          <div className="p-6 rounded-2xl bg-[#111111] border border-[#2A2A30]">
            <span className="text-[10px] text-[#71717A] uppercase block font-sans font-bold">Concurrent Active Sessions</span>
            <div className="text-3xl font-extrabold text-emerald-400 mt-2">1,420</div>
            <span className="text-[10px] text-neutral-400 mt-1 block">+12% vs. peak yesterday</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-[#2A2A30]">
            <span className="text-[10px] text-[#71717A] uppercase block font-sans font-bold">API Throughput Velocity</span>
            <div className="text-3xl font-extrabold text-brand-blue mt-2">4,850 <span className="text-xs font-normal text-[#71717A]">req/m</span></div>
            <span className="text-[10px] text-emerald-400 mt-1 block">Sub-20ms latency</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-[#2A2A30]">
            <span className="text-[10px] text-[#71717A] uppercase block font-sans font-bold">Platform Error Ratio</span>
            <div className="text-3xl font-extrabold text-purple-400 mt-2">0.001%</div>
            <span className="text-[10px] text-[#71717A] mt-1 block">Zero dropped transactions</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-[#2A2A30]">
            <span className="text-[10px] text-[#71717A] uppercase block font-sans font-bold">Redis Cluster Health</span>
            <div className="text-3xl font-extrabold text-amber-400 mt-2">99.99%</div>
            <span className="text-[10px] text-neutral-400 mt-1 block">3 Nodes In Sync</span>
          </div>
        </div>

        {/* Live Active Sessions Table */}
        <div className="bg-[#111111] rounded-2xl border border-[#2A2A30] overflow-hidden">
          <div className="p-6 border-b border-[#2A2A30] flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Wifi size={16} className="text-emerald-400 animate-pulse" /> Live Authenticated Staff Sessions
            </h3>
            <span className="text-xs font-mono text-[#71717A]">Polling interval: 500ms websocket</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="bg-[#16161C] border-b border-[#2A2A30] text-[#71717A] font-sans">
                  <th className="py-3.5 pl-6">STAFF USER</th>
                  <th className="py-3.5 px-4">IAM ROLE</th>
                  <th className="py-3.5 px-4">IP & GEO-LOCATION</th>
                  <th className="py-3.5 px-4">CURRENT TELEMETRY ACTION</th>
                  <th className="py-3.5 pr-6 text-right">LAST SIGNAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A30]">
                {activeSessions.map((sess, idx) => (
                  <tr key={idx} className="hover:bg-[#1A1A24]/50 transition-colors">
                    <td className="py-4 pl-6 font-bold text-white font-sans">{sess.usr}</td>
                    <td className="py-4 px-4"><span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300 text-[10px]">{sess.role}</span></td>
                    <td className="py-4 px-4 text-[#A1A1AA]">{sess.ip} ({sess.loc})</td>
                    <td className="py-4 px-4 text-brand-blue font-sans font-semibold">{sess.action}</td>
                    <td className="py-4 pr-6 text-right text-emerald-400">{sess.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
