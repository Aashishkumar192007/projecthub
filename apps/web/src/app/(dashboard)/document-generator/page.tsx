'use client';

import React, { useState } from 'react';
import { FileSignature, Play, Settings2, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function DocumentGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState('booking_agreement');

  const templates = [
    { id: 'booking_agreement', name: 'Booking Agreement', category: 'Sales' },
    { id: 'sale_agreement', name: 'Sale Agreement', category: 'Sales' },
    { id: 'lease_agreement', name: 'Lease Agreement', category: 'Rental' },
    { id: 'offer_letter', name: 'Offer Letter', category: 'Sales' },
    { id: 'demand_letter', name: 'Demand Letter', category: 'Finance' },
    { id: 'possession_letter', name: 'Possession Letter', category: 'Handover' },
    { id: 'noc', name: 'NOC', category: 'Compliance' },
    { id: 'broker_agreement', name: 'Broker Agreement', category: 'Partners' }
  ];

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileSignature className="text-brand-blue" />
            Dynamic Document Generator
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">Generate dynamic agreements and letters with automated variable mapping.</p>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Templates List */}
        <div className="w-80 bg-[#161616] border border-[#2A2A30] rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-[#2A2A30] bg-[#1A2533]/50">
            <h3 className="font-bold text-white">Select Template</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {templates.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  selectedTemplate === t.id 
                    ? 'bg-brand-blue/10 text-brand-blue'
                    : 'text-[#A1A1AA] hover:bg-[#1E1E22] hover:text-white'
                }`}
              >
                {t.name}
                <span className="block text-[10px] uppercase mt-1 opacity-70">{t.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Generator Form */}
        <div className="flex-1 bg-[#161616] border border-[#2A2A30] rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-[#2A2A30] flex items-center justify-between">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Settings2 size={18} className="text-brand-blue" />
              Configure Variables
            </h3>
            <button className="px-4 py-2 bg-brand-blue text-[#111111] font-bold rounded hover:bg-white transition-colors flex items-center gap-2">
              <Play size={16} />
              Generate Document
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white border-b border-[#2A2A30] pb-2">Customer Details</h4>
                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">Customer Search</label>
                  <input type="text" placeholder="Search by name or ID..." className="w-full bg-[#111111] border border-[#2A2A30] rounded-lg px-3 py-2 text-sm text-white focus:border-brand-blue" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">Full Name</label>
                  <input type="text" className="w-full bg-[#111111] border border-[#2A2A30] rounded-lg px-3 py-2 text-sm text-white" disabled value="Auto-populated" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">Address</label>
                  <textarea className="w-full bg-[#111111] border border-[#2A2A30] rounded-lg px-3 py-2 text-sm text-white h-20" disabled value="Auto-populated" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white border-b border-[#2A2A30] pb-2">Property Details</h4>
                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">Booking Search</label>
                  <input type="text" placeholder="Search by booking ID..." className="w-full bg-[#111111] border border-[#2A2A30] rounded-lg px-3 py-2 text-sm text-white focus:border-brand-blue" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#A1A1AA] mb-1">Project</label>
                    <input type="text" className="w-full bg-[#111111] border border-[#2A2A30] rounded-lg px-3 py-2 text-sm text-white" disabled value="Auto-populated" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#A1A1AA] mb-1">Unit</label>
                    <input type="text" className="w-full bg-[#111111] border border-[#2A2A30] rounded-lg px-3 py-2 text-sm text-white" disabled value="Auto-populated" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#A1A1AA] mb-1">Price</label>
                    <input type="text" className="w-full bg-[#111111] border border-[#2A2A30] rounded-lg px-3 py-2 text-sm text-white" disabled value="Auto-populated" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#A1A1AA] mb-1">Booking Amount</label>
                    <input type="text" className="w-full bg-[#111111] border border-[#2A2A30] rounded-lg px-3 py-2 text-sm text-white" disabled value="Auto-populated" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-3">
              <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-emerald-400">All mappings resolved successfully</p>
                <p className="text-xs text-emerald-500/70 mt-1">
                  The selected template has all its variables correctly mapped to CRM entity fields. The document is ready to be generated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
