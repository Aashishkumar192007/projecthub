'use client';

import React from 'react';
import { useLegalStore } from '@/store/legalStore';
import { Workflow, Plus, Play, Pause, Settings, ChevronRight } from 'lucide-react';

export default function ComplianceWorkflowBuilder() {
  const { complianceWorkflows } = useLegalStore();

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Workflow className="text-brand-blue" />
            Compliance Workflow Builder
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">Design and automate compliance policies and legal workflows.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-brand-blue text-[#111111] font-bold rounded hover:bg-white transition-colors flex items-center gap-2">
            <Plus size={18} />
            Create Workflow
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complianceWorkflows.map(wf => (
          <div key={wf.id} className="bg-[#161616] border border-[#2A2A30] rounded-xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[#2A2A30] flex items-start justify-between bg-[#1A2533]/30">
              <div>
                <h3 className="font-bold text-white">{wf.name}</h3>
                <p className="text-xs text-[#A1A1AA] mt-1">{wf.description}</p>
              </div>
              <div className="flex gap-2">
                <button className={`p-1.5 rounded-md transition-colors ${wf.isActive ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' : 'bg-[#2A2A30] text-[#A1A1AA] hover:bg-[#3A3A40]'}`}>
                  {wf.isActive ? <Play size={16} /> : <Pause size={16} />}
                </button>
                <button className="p-1.5 rounded-md bg-[#2A2A30] text-[#A1A1AA] hover:bg-[#3A3A40] transition-colors">
                  <Settings size={16} />
                </button>
              </div>
            </div>
            <div className="p-4 flex-1">
              <div className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-3">Trigger: <span className="text-white">{wf.triggerEvent}</span></div>
              <div className="space-y-2">
                {wf.steps.map((step, idx) => (
                  <div key={step.id} className="flex flex-col">
                    <div className="flex items-center justify-between p-3 bg-[#111111] border border-[#2A2A30] rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#2A2A30] text-[#A1A1AA] flex items-center justify-center text-xs font-bold">
                          {step.order}
                        </span>
                        <span className="text-sm font-medium text-white">{step.action}</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-brand-blue bg-brand-blue/10 px-2 py-1 rounded-full">
                        {step.assignedRole}
                      </span>
                    </div>
                    {idx < wf.steps.length - 1 && (
                      <div className="flex justify-center my-1 text-[#2A2A30]">
                        <ChevronRight size={16} className="rotate-90" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        {/* Create New Card */}
        <button className="bg-[#161616] border border-dashed border-[#2A2A30] rounded-xl p-6 flex flex-col items-center justify-center text-[#A1A1AA] hover:border-brand-blue hover:text-brand-blue transition-colors min-h-[300px]">
          <Plus size={48} className="mb-4" />
          <p className="font-bold">Design New Workflow</p>
          <p className="text-xs mt-2 text-center max-w-[200px]">Build custom automation sequences for KYC, agreements, and legal reviews.</p>
        </button>
      </div>
    </div>
  );
}
