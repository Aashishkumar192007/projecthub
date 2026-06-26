'use client';

import React, { useState } from 'react';
import { AdminNav } from '@/components/admin/AdminNav';
import { 
  Clock, AlertTriangle, CheckCircle2, ShieldAlert, ArrowRight, 
  Sparkles, Zap, Layers, BarChart3, RefreshCw
} from 'lucide-react';

export default function EnterpriseSLAManagementPage() {
  const slas = [
    { title: 'Inbound Lead First Response', target: '15 Minutes', currentAvg: '8 Minutes', compliance: '99.4%', status: 'Healthy' },
    { title: 'Emergency Maintenance Dispatch', target: '2 Hours', currentAvg: '42 Minutes', compliance: '100%', status: 'Healthy' },
    { title: 'Booking Token Escrow Clearance', target: '24 Hours', currentAvg: '18 Hours', compliance: '98.8%', status: 'Healthy' },
    { title: 'Resident Legal Agreement E-Sign off', target: '48 Hours', currentAvg: '36 Hours', compliance: '97.5%', status: 'Warning' },
    { title: 'AML/KYC Background Check Clearance', target: '4 Hours', currentAvg: '1.5 Hours', compliance: '99.9%', status: 'Healthy' },
    { title: 'General Work Order Closure', target: '24 Hours', currentAvg: '20 Hours', compliance: '98.1%', status: 'Healthy' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-16">
      <AdminNav activeTitle="SLA ENGINE & ESCALATION RULES" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-white mb-1 flex items-center gap-3">
            <Clock className="text-brand-blue" /> Service Level Agreement (SLA) Engine
          </h2>
          <p className="text-xs text-[#A1A1AA]">Automated timer countdowns, breach alerts, and hierarchical escalation workflows.</p>
        </div>

        {/* Escalation Matrix Pipeline */}
        <div className="p-6 rounded-2xl bg-[#111111] border border-[#2A2A30] mb-8 font-mono text-xs">
          <span className="text-[10px] text-brand-blue uppercase font-bold block mb-3">AUTOMATED ESCALATION PROTOCOL (ON SLA BREACH RISK)</span>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-[#16161C] rounded-xl border border-blue-500/30 text-blue-300">
              <strong className="block text-white mb-1">T - 30 Mins (Warning)</strong>
              <span>Push Notification & Email alert sent to assigned Staff Member.</span>
            </div>
            <div className="p-4 bg-[#16161C] rounded-xl border border-amber-500/30 text-amber-300">
              <strong className="block text-white mb-1">T - 0 Mins (Breach)</strong>
              <span>Auto-reassign record to Team Supervisor + WhatsApp Ping.</span>
            </div>
            <div className="p-4 bg-[#16161C] rounded-xl border border-purple-500/30 text-purple-300">
              <strong className="block text-white mb-1">T + 2 Hours (Level 2)</strong>
              <span>Escalate ticket directly to Department Head & Director dashboard.</span>
            </div>
            <div className="p-4 bg-[#16161C] rounded-xl border border-red-500/30 text-red-300">
              <strong className="block text-white mb-1">T + 24 Hours (Critical)</strong>
              <span>Log permanent compliance demerit in Executive Audit Vault.</span>
            </div>
          </div>
        </div>

        {/* SLAs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slas.map((item) => (
            <div key={item.title} className="p-6 rounded-2xl bg-[#111111] border border-[#2A2A30] flex flex-col justify-between hover:border-[#3F3F46] transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white">{item.title}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${item.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse'}`}>
                    {item.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 py-4 border-y border-[#2A2A30] my-3 font-mono text-xs">
                  <div className="flex justify-between text-[#A1A1AA]"><span>SLA Target Limit:</span> <strong className="text-white">{item.target}</strong></div>
                  <div className="flex justify-between text-[#A1A1AA]"><span>Current Delivery Avg:</span> <strong className="text-brand-blue">{item.currentAvg}</strong></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs font-mono">
                <span className="text-[#71717A]">Compliance Ratio:</span>
                <span className="text-emerald-400 font-bold text-sm">{item.compliance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
