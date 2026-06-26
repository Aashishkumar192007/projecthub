'use client';

import React, { useState } from 'react';
import { AdminNav } from '@/components/admin/AdminNav';
import { useEnterpriseStore, OrgNode } from '@/store/enterpriseStore';
import { 
  Building2, Globe, DollarSign, Clock, Calendar, Shield, Users, 
  GitBranch, Layers, CheckCircle2, Edit3, Plus, ArrowRight
} from 'lucide-react';

export default function EnterpriseAdminCenterPage() {
  const { companies, currentCompanyId, orgNodes, setCompany } = useEnterpriseStore();
  const currentCompany = companies.find(c => c.id === currentCompanyId);
  const [activeTab, setActiveTab] = useState<'overview' | 'structure' | 'fiscal'>('overview');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-16">
      <AdminNav activeTitle="ORG CENTER & ADMINISTRATION" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation Tabs for Org Subsections */}
        <div className="flex items-center gap-4 border-b border-[#2A2A30] pb-4 mb-8">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-[#1E1E24] text-white border border-[#3F3F46]' : 'text-[#71717A] hover:text-white'}`}
          >
            Organization Settings & KPIs
          </button>
          <button 
            onClick={() => setActiveTab('structure')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'structure' ? 'bg-[#1E1E24] text-white border border-[#3F3F46]' : 'text-[#71717A] hover:text-white'}`}
          >
            Hierarchy Structure Tree (Group → Team)
          </button>
          <button 
            onClick={() => setActiveTab('fiscal')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'fiscal' ? 'bg-[#1E1E24] text-white border border-[#3F3F46]' : 'text-[#71717A] hover:text-white'}`}
          >
            Fiscal Years, Currencies & Calendars
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-[#111111] p-6 rounded-2xl border border-[#2A2A30] relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-[#71717A] uppercase tracking-wider">Business Units</span>
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400"><Building2 size={18} /></div>
                </div>
                <div className="text-3xl font-extrabold text-white mb-1">12 Entities</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 size={14} /> 3 Global Companies Active
                </div>
              </div>

              <div className="bg-[#111111] p-6 rounded-2xl border border-[#2A2A30] relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-[#71717A] uppercase tracking-wider">Total Enterprise Users</span>
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400"><Users size={18} /></div>
                </div>
                <div className="text-3xl font-extrabold text-white mb-1">10,450</div>
                <div className="text-xs text-[#A1A1AA]">Across 42 Syndicated Branches</div>
              </div>

              <div className="bg-[#111111] p-6 rounded-2xl border border-[#2A2A30] relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-[#71717A] uppercase tracking-wider">Default Currency</span>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400"><DollarSign size={18} /></div>
                </div>
                <div className="text-3xl font-extrabold text-white mb-1">{currentCompany?.currency}</div>
                <div className="text-xs text-[#71717A]">Multi-Currency FX Auto-Conversion</div>
              </div>

              <div className="bg-[#111111] p-6 rounded-2xl border border-[#2A2A30] relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-[#71717A] uppercase tracking-wider">Primary Language</span>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400"><Globe size={18} /></div>
                </div>
                <div className="text-3xl font-extrabold text-white mb-1">{currentCompany?.language}</div>
                <div className="text-xs text-[#71717A]">Localization Engine Active</div>
              </div>
            </div>

            {/* Companies Grid */}
            <div className="bg-[#111111] rounded-2xl border border-[#2A2A30] p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Registered Companies & REIT Groups</h2>
                  <p className="text-xs text-[#71717A]">Manage corporate entities, cost centers, and departmental assignments.</p>
                </div>
                <button className="flex items-center gap-1.5 px-3.5 py-2 bg-brand-blue text-[#111111] rounded-lg text-xs font-bold hover:opacity-90 transition-all">
                  <Plus size={14} /> Add Entity
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {companies.map((comp) => (
                  <div 
                    key={comp.id}
                    onClick={() => setCompany(comp.id)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all ${
                      comp.id === currentCompanyId 
                        ? 'bg-[#1A1A24] border-brand-blue shadow-lg shadow-brand-blue/10' 
                        : 'bg-[#0F0F12] border-[#2A2A30] hover:border-[#3F3F46]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-[#A1A1AA]">
                        {comp.id.toUpperCase()}
                      </span>
                      {comp.id === currentCompanyId && (
                        <span className="text-xs text-brand-blue font-bold flex items-center gap-1">
                          <CheckCircle2 size={14} /> Active Entity
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-white text-base mb-2">{comp.name}</h3>
                    <div className="space-y-1 text-xs text-[#71717A]">
                      <div className="flex justify-between"><span>Fiscal Year Start:</span> <span className="text-white">{comp.fiscalStart}</span></div>
                      <div className="flex justify-between"><span>Base Currency:</span> <span className="text-white">{comp.currency}</span></div>
                      <div className="flex justify-between"><span>Time Zone:</span> <span className="text-white">{comp.timezone}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'structure' && (
          <div className="bg-[#111111] rounded-2xl border border-[#2A2A30] p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-1">Enterprise Hierarchy Architecture</h2>
              <p className="text-xs text-[#71717A]">True multi-tier enterprise governance structure supporting 10,000+ users across international jurisdictions.</p>
            </div>

            {/* Visual Tree Display */}
            <div className="space-y-6 relative before:absolute before:left-8 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-brand-blue before:via-purple-500 before:to-pink-500">
              {orgNodes.map((node, i) => {
                const colors: Record<string, string> = {
                  Group: 'bg-blue-500/10 border-blue-500 text-blue-400',
                  Company: 'bg-purple-500/10 border-purple-500 text-purple-400',
                  Region: 'bg-pink-500/10 border-pink-500 text-pink-400',
                  Branch: 'bg-amber-500/10 border-amber-500 text-amber-400',
                  Team: 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                };
                const margin = i === 0 ? 'ml-0' : i === 1 || i === 2 || i === 3 ? 'ml-8' : i === 4 ? 'ml-16' : i === 5 ? 'ml-24' : 'ml-32';

                return (
                  <div key={node.id} className={`${margin} flex items-center gap-4 relative z-10 transition-all hover:translate-x-1`}>
                    <div className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-bold shadow-lg ${colors[node.type]}`}>
                      {node.type.toUpperCase()}
                    </div>
                    <div className="flex-1 bg-[#16161C] border border-[#2A2A30] p-4 rounded-xl flex items-center justify-between hover:border-[#3F3F46]">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-white text-sm">{node.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#2A2A30] text-[#A1A1AA]">{node.code}</span>
                        </div>
                        <div className="text-xs text-[#71717A]">Head of Entity: <span className="text-neutral-300 font-medium">{node.head}</span></div>
                      </div>
                      <div className="text-right">
                        <span className="block text-sm font-bold text-white">{node.userCount.toLocaleString()}</span>
                        <span className="text-[10px] text-[#71717A] uppercase">Active Users</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'fiscal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#111111] rounded-2xl border border-[#2A2A30] p-6">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="text-brand-blue" size={18} /> Fiscal Year & Business Calendars
              </h3>
              <div className="space-y-4 text-sm">
                <div className="p-4 bg-[#16161C] rounded-xl border border-[#2A2A30]">
                  <div className="font-semibold text-white mb-1">Q1 – Q4 Standard REIT Cycle</div>
                  <p className="text-xs text-[#71717A] mb-3">April 1st to March 31st (Standard REIT accounting standard).</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded bg-[#2A2A30] text-xs text-white">Q1: Apr – Jun</span>
                    <span className="px-2 py-1 rounded bg-[#2A2A30] text-xs text-white">Q2: Jul – Sep</span>
                    <span className="px-2 py-1 rounded bg-[#2A2A30] text-xs text-white">Q3: Oct – Dec</span>
                    <span className="px-2 py-1 rounded bg-[#2A2A30] text-xs text-white">Q4: Jan – Mar</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111111] rounded-2xl border border-[#2A2A30] p-6">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="text-purple-400" size={18} /> Global FX & Currencies
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#16161C] rounded-lg border border-[#2A2A30] text-xs">
                  <span className="font-bold text-white">USD ($) — US Dollar</span>
                  <span className="text-emerald-400 font-mono">Base Rate (1.00)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#16161C] rounded-lg border border-[#2A2A30] text-xs">
                  <span className="font-bold text-white">EUR (€) — Euro</span>
                  <span className="text-neutral-300 font-mono">0.92 USD</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#16161C] rounded-lg border border-[#2A2A30] text-xs">
                  <span className="font-bold text-white">INR (₹) — Indian Rupee</span>
                  <span className="text-neutral-300 font-mono">83.45 USD</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
