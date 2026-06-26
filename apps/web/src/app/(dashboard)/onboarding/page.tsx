'use client';

import React from 'react';
import { Rocket, CheckCircle2, Circle, ArrowRight, UserCheck, Key, Settings, UserPlus, FileText } from 'lucide-react';
import Link from 'next/link';

export default function CustomerOnboardingCenter() {
  const steps = [
    { id: 1, label: 'Lead Qualification', status: 'completed' },
    { id: 2, label: 'Booking Finalized', status: 'completed' },
    { id: 3, label: 'KYC & Verification', status: 'completed' },
    { id: 4, label: 'Agreement & Signatures', status: 'in-progress' },
    { id: 5, label: 'Payment Clearances', status: 'pending' },
    { id: 6, label: 'Resident Profile Creation', status: 'pending' },
  ];

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Rocket className="text-brand-blue" />
            Customer Onboarding Center
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">Visualize and manage the end-to-end customer journey.</p>
        </div>
      </div>

      <div className="flex-1 flex gap-6">
        {/* Active Journey */}
        <div className="flex-1 bg-[#161616] border border-[#2A2A30] rounded-xl flex flex-col p-6">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2A2A30]">
            <div>
              <h2 className="text-xl font-bold text-white">Rahul Verma</h2>
              <p className="text-[#A1A1AA] text-sm">Booking: BKG-1042 • Skyline Plaza, Unit 104</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-brand-blue">Stage 4 of 6</p>
              <p className="text-xs text-[#A1A1AA]">Estimated Completion: Jun 28, 2026</p>
            </div>
          </div>

          <div className="flex-1 flex items-start gap-8">
            <div className="w-1/3 border-r border-[#2A2A30] pr-8 relative">
              <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-[#2A2A30] -z-10" />
              
              <div className="space-y-8">
                {steps.map(step => (
                  <div key={step.id} className="flex items-center gap-4 z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.status === 'completed' ? 'bg-emerald-500 text-[#111111]' :
                      step.status === 'in-progress' ? 'bg-brand-blue text-[#111111] animate-pulse' :
                      'bg-[#111111] border-2 border-[#2A2A30] text-[#A1A1AA]'
                    }`}>
                      {step.status === 'completed' ? <CheckCircle2 size={18} /> : <span className="text-sm font-bold">{step.id}</span>}
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${
                        step.status === 'completed' ? 'text-emerald-400' :
                        step.status === 'in-progress' ? 'text-white' :
                        'text-[#A1A1AA]'
                      }`}>{step.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-4">Current Action Required</h3>
              
              <div className="bg-[#111111] border border-brand-blue/30 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-white font-bold text-lg">Agreement & Signatures</h4>
                    <p className="text-[#A1A1AA] text-sm mt-1">The Booking Agreement has been generated and requires signatures from all parties.</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-500 font-bold text-xs uppercase rounded-full">Pending Signature</span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-3 bg-[#161616] border border-[#2A2A30] rounded-lg">
                    <div className="flex items-center gap-3">
                      <UserCheck size={18} className="text-emerald-500" />
                      <span className="text-sm text-white font-medium">Rahul Verma (Customer)</span>
                    </div>
                    <span className="text-xs text-emerald-500 font-bold">Signed</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#161616] border border-[#2A2A30] rounded-lg">
                    <div className="flex items-center gap-3">
                      <Circle size={18} className="text-[#A1A1AA]" />
                      <span className="text-sm text-white font-medium">Sales Head (Authorized Signatory)</span>
                    </div>
                    <span className="text-xs text-amber-500 font-bold">Pending Review</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-brand-blue text-[#111111] font-bold rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
                  Send Reminder to Authorized Signatory
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Portal Provisioning Preview */}
        <div className="w-80 bg-[#161616] border border-[#2A2A30] rounded-xl flex flex-col">
          <div className="p-4 border-b border-[#2A2A30]">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Settings className="text-brand-blue" size={18} />
              Portal Provisioning
            </h3>
            <p className="text-xs text-[#A1A1AA] mt-1">Auto-creates upon step 6</p>
          </div>
          <div className="p-4 space-y-4 flex-1 opacity-50">
            <div className="flex items-start gap-3 p-3 bg-[#111111] border border-[#2A2A30] rounded-lg">
              <UserPlus className="text-emerald-500 mt-1" size={18} />
              <div>
                <p className="text-sm font-bold text-white">Owner Profile</p>
                <p className="text-xs text-[#A1A1AA]">Creates digital identity and links unit ownership.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-[#111111] border border-[#2A2A30] rounded-lg">
              <Key className="text-emerald-500 mt-1" size={18} />
              <div>
                <p className="text-sm font-bold text-white">Resident Access</p>
                <p className="text-xs text-[#A1A1AA]">Grants Resident Portal access and generates credentials.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-[#111111] border border-[#2A2A30] rounded-lg">
              <FileText className="text-emerald-500 mt-1" size={18} />
              <div>
                <p className="text-sm font-bold text-white">Maintenance Account</p>
                <p className="text-xs text-[#A1A1AA]">Sets up billing cycle and CAM charges ledger.</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-[#2A2A30]">
            <button className="w-full py-2 bg-[#2A2A30] text-[#A1A1AA] font-bold rounded-lg transition-colors text-sm" disabled>
              Provision Accounts Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
