'use client';

import React, { useState } from 'react';
import { AdminNav } from '@/components/admin/AdminNav';
import { 
  DownloadCloud, FileText, FileSpreadsheet, Presentation, FileCode, 
  CheckCircle2, Sparkles, Filter, Calendar, Shield, Briefcase, Building2, DollarSign
} from 'lucide-react';

export default function EnterpriseDataExportPage() {
  const [selectedReport, setSelectedReport] = useState('CRM Reports');
  const [format, setFormat] = useState('Excel (.xlsx)');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportCategories = [
    { name: 'CRM Reports', desc: 'Lead pipeline velocity, conversion ratios, and executive sales quota summaries.', icon: Briefcase },
    { name: 'Booking Reports', desc: 'Unit reservation holds, token cleared ledgers, agreement dispatch times.', icon: FileText },
    { name: 'Property Reports', desc: 'Portfolio occupancy, tower pricing tiers, outstanding amenity dues.', icon: Building2 },
    { name: 'Revenue Reports', desc: 'Multi-currency institutional collections, broker payout forecasts, FX gains.', icon: DollarSign },
    { name: 'Compliance Reports', desc: 'AML/KYC background clearance logs, WORM audit trails, data retention rules.', icon: Shield },
    { name: 'Executive Reports', desc: 'C-Suite governance KPI deck consolidating all cloud metrics for board presentation.', icon: Presentation }
  ];

  const formats = ['CSV (.csv)', 'Excel (.xlsx)', 'PDF (.pdf)', 'JSON (.json)', 'PowerPoint (.pptx)'];

  const triggerExport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Successfully compiled and downloaded [${selectedReport}] in ${format} format!`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-16">
      <AdminNav activeTitle="DATA EXPORT CENTER & REPORT GENERATOR" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-white mb-2 flex items-center gap-3">
            <DownloadCloud className="text-brand-blue" /> Enterprise Data Export Engine
          </h2>
          <p className="text-xs text-[#A1A1AA]">Generate institutional reports with granular RBAC filtering across 5 export formats.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-bold text-[#71717A] uppercase tracking-wider block px-1">Report Packages</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reportCategories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedReport === cat.name;
                return (
                  <div
                    key={cat.name}
                    onClick={() => setSelectedReport(cat.name)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-4 ${
                      isSelected 
                        ? 'bg-[#1A1A24] border-brand-blue shadow-lg shadow-brand-blue/10' 
                        : 'bg-[#111111] border-[#2A2A30] hover:border-[#3F3F46]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-xl ${isSelected ? 'bg-brand-blue text-[#111111]' : 'bg-[#1E1E24] text-[#A1A1AA]'}`}>
                        <Icon size={20} />
                      </div>
                      {isSelected && <CheckCircle2 size={18} className="text-brand-blue" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base mb-1">{cat.name}</h3>
                      <p className="text-xs text-[#71717A] leading-relaxed">{cat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Export Settings Sidebar */}
          <div className="bg-[#111111] rounded-2xl border border-[#2A2A30] p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono text-brand-blue uppercase font-bold tracking-wider">TARGET PACKAGE</span>
                <h3 className="text-xl font-extrabold text-white mt-1">{selectedReport}</h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A1A1AA] uppercase mb-3">Select Export Format</label>
                <div className="space-y-2">
                  {formats.map((fmt) => (
                    <label 
                      key={fmt}
                      onClick={() => setFormat(fmt)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer select-none text-xs font-bold transition-all ${
                        format === fmt ? 'bg-brand-blue/10 border-brand-blue text-white font-mono' : 'bg-[#16161C] border-[#2A2A30] text-[#71717A] hover:border-[#3F3F46]'
                      }`}
                    >
                      <span>{fmt}</span>
                      <input type="radio" checked={format === fmt} readOnly className="sr-only" />
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#16161C] border border-[#2A2A30] text-[11px] text-[#A1A1AA] space-y-1.5 font-mono">
                <div className="flex justify-between"><span>RBAC Filter:</span> <span className="text-emerald-400 font-bold">Enforced</span></div>
                <div className="flex justify-between"><span>Audit Capture:</span> <span className="text-white">Active</span></div>
                <div className="flex justify-between"><span>Watermark:</span> <span className="text-purple-400">Confidential</span></div>
              </div>
            </div>

            <button
              onClick={triggerExport}
              disabled={isGenerating}
              className="mt-8 w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-indigo-400 text-[#111111] font-bold text-xs shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? 'Compiling Report Package...' : <><DownloadCloud size={16} /> Generate & Download Export</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
