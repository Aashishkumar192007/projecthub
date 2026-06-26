'use client';

import React from 'react';
import { FileBarChart, Download, Calendar, BarChart3, PieChart, ShieldCheck } from 'lucide-react';

export default function ComplianceReports() {
  const reports = [
    { title: 'KYC Verification Turnaround', type: 'Performance', updated: 'Today, 09:00 AM' },
    { title: 'Overall Compliance Score', type: 'Risk', updated: 'Yesterday, 11:30 PM' },
    { title: 'Agreement Signature Delays', type: 'Bottlenecks', updated: 'Today, 08:15 AM' },
    { title: 'Fraud & Exception Logs', type: 'Audit', updated: 'Weekly' },
  ];

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileBarChart className="text-brand-blue" />
            Compliance Reports & Analytics
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">Analytics for KYC, legal SLAs, and overall compliance health.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#1A2533] border border-brand-blue/30 text-brand-blue font-semibold rounded hover:bg-brand-blue hover:text-[#111111] transition-colors flex items-center gap-2">
            <Calendar size={16} />
            This Month
          </button>
          <button className="px-4 py-2 bg-brand-blue text-[#111111] font-bold rounded hover:bg-white transition-colors flex items-center gap-2">
            <Download size={16} />
            Export Board Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg KYC TAT', value: '4.2 Hrs', trend: '-12%', icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'System Compliance', value: '96.5%', trend: '+1.2%', icon: ShieldCheck, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
          { label: 'Agreements Signed', value: '142', trend: '+8%', icon: BookCheck, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
          { label: 'Legal Exceptions', value: '18', trend: '-5%', icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#161616] border border-[#2A2A30] rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-xs text-[#A1A1AA] uppercase tracking-wider font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[#161616] border border-[#2A2A30] rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white flex items-center gap-2">
              <BarChart3 className="text-brand-blue" size={18} />
              Verification Performance Trend
            </h3>
          </div>
          <div className="flex-1 border border-dashed border-[#2A2A30] rounded flex items-center justify-center text-[#A1A1AA]">
            [Chart Area: KYC vs SLA]
          </div>
        </div>

        <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white flex items-center gap-2">
              <PieChart className="text-brand-blue" size={18} />
              Risk Distribution
            </h3>
          </div>
          <div className="flex-1 border border-dashed border-[#2A2A30] rounded flex items-center justify-center text-[#A1A1AA]">
            [Chart Area: Low/Medium/High Risk]
          </div>
        </div>
      </div>

      <div className="bg-[#161616] border border-[#2A2A30] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#2A2A30] bg-[#1A2533]/30">
          <h3 className="font-bold text-white">Generated Reports</h3>
        </div>
        <div className="divide-y divide-[#2A2A30]">
          {reports.map((r, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-[#1E1E22]/50 transition-colors">
              <div className="flex items-center gap-4">
                <FileBarChart className="text-[#A1A1AA]" size={20} />
                <div>
                  <p className="font-bold text-white text-sm">{r.title}</p>
                  <p className="text-xs text-[#A1A1AA]">Updated: {r.updated}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-2 py-0.5 bg-[#2A2A30] text-[#A1A1AA] text-[10px] uppercase font-bold rounded-full">
                  {r.type}
                </span>
                <button className="p-2 bg-[#2A2A30] text-[#A1A1AA] hover:text-white rounded transition-colors">
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Ensure icons used exist in lucide-react or provide alternatives if missing from imports above.
import { Clock, BookCheck, AlertTriangle } from 'lucide-react';
