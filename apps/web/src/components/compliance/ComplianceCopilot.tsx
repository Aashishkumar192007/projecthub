import React from 'react';
import { Bot, ShieldCheck, AlertTriangle, FileSignature } from 'lucide-react';

export function ComplianceCopilot() {
  return (
    <div className="w-80 bg-[#161616] border-l border-[#2A2A30] flex flex-col h-full">
      <div className="p-4 border-b border-[#2A2A30] flex items-center gap-2 bg-[#1A2533]/50">
        <Bot className="text-brand-blue" size={20} />
        <div>
          <h2 className="text-white font-bold text-sm">AI Compliance Copilot</h2>
          <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wide">Monitoring Active State</p>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        <div className="bg-[#111111] border border-[#2A2A30] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={16} className="text-emerald-500" />
            <h4 className="text-sm font-bold text-white">KYC Risk OK</h4>
          </div>
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            All documents for the current context have been verified. No immediate compliance risk detected.
          </p>
        </div>

        <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-rose-500" />
            <h4 className="text-sm font-bold text-rose-500">Missing Signature</h4>
          </div>
          <p className="text-xs text-rose-500/80 leading-relaxed mb-3">
            The Co-Applicant has not yet signed the Booking Agreement (sent 2 days ago).
          </p>
          <button className="w-full py-1.5 bg-rose-500/20 text-rose-500 hover:bg-rose-500/30 text-xs font-bold rounded transition-colors">
            Send Reminder
          </button>
        </div>

        <div className="bg-[#111111] border border-[#2A2A30] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <FileSignature size={16} className="text-brand-blue" />
            <h4 className="text-sm font-bold text-white">Draft Ready</h4>
          </div>
          <p className="text-xs text-[#A1A1AA] leading-relaxed mb-3">
            A new compliance workflow has suggested generating the Sale Agreement based on recent KYC approval.
          </p>
          <button className="w-full py-1.5 bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20 text-xs font-bold rounded transition-colors">
            Generate Draft
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-[#2A2A30]">
        <input 
          type="text" 
          placeholder="Ask Copilot..." 
          className="w-full bg-[#111111] border border-[#2A2A30] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors"
        />
      </div>
    </div>
  );
}
