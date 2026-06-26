'use client';

import React, { useState } from 'react';
import { AdminNav } from '@/components/admin/AdminNav';
import { useEnterpriseStore, WorkflowFlow } from '@/store/enterpriseStore';
import { 
  GitBranch, Plus, Play, Pause, Zap, ArrowDown, CheckCircle2, 
  Sparkles, Settings2, Webhook, Send, FileText, UserCheck, Layers
} from 'lucide-react';

export default function EnterpriseWorkflowBuilderPage() {
  const { workflows, addWorkflow, toggleWorkflowStatus } = useEnterpriseStore();
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState<WorkflowFlow | null>(workflows[0] || null);

  // Builder Form State
  const [flowName, setFlowName] = useState('');
  const [flowDesc, setFlowDesc] = useState('');
  const [trigger, setTrigger] = useState('Lead Created');
  const [action, setAction] = useState('Send WhatsApp Alert');

  const triggersList = [
    'Lead Created', 'Lead Updated', 'Visit Created', 'Negotiation Created',
    'Reservation Created', 'Booking Created', 'Payment Received', 'Document Uploaded',
    'KYC Approved', 'Agreement Signed', 'Work Order Created', 'Resident Created', 'Custom Event'
  ];

  const actionsList = [
    'Assign User', 'Create Task', 'Send Email', 'Send WhatsApp', 'Send SMS',
    'Generate Document', 'Update Status', 'Create Approval', 'Notify Team',
    'Webhook', 'API Call', 'Custom Logic'
  ];

  const handleSaveFlow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flowName) return;
    const newWf: WorkflowFlow = {
      id: `wf-${Date.now().toString().slice(-4)}`,
      name: flowName,
      description: flowDesc || `Automated pipeline reacting to ${trigger}.`,
      trigger,
      action,
      status: 'Active',
      runs: 0,
      lastTriggered: 'Never'
    };
    addWorkflow(newWf);
    setSelectedFlow(newWf);
    setIsBuilderOpen(false);
    setFlowName('');
    setFlowDesc('');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-16">
      <AdminNav activeTitle="ENTERPRISE WORKFLOW & AUTOMATION BUILDER" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <GitBranch className="text-brand-blue" /> Visual Enterprise Flow Engine
            </h2>
            <p className="text-xs text-[#71717A]">Event-driven automation canvas inspired by Salesforce Flow & Power Automate.</p>
          </div>
          <button 
            onClick={() => setIsBuilderOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-brand-blue to-indigo-400 text-[#111111] rounded-lg text-xs font-bold hover:opacity-90 transition-all shadow-lg whitespace-nowrap"
          >
            <Plus size={14} /> Launch Flow Builder
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Workflows List */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#71717A] uppercase tracking-wider block px-1">Automated Pipelines ({workflows.length})</span>
            {workflows.map((wf) => (
              <div 
                key={wf.id}
                onClick={() => setSelectedFlow(wf)}
                className={`p-5 rounded-xl border cursor-pointer transition-all relative overflow-hidden ${
                  selectedFlow?.id === wf.id 
                    ? 'bg-[#1A1A24] border-brand-blue shadow-lg shadow-brand-blue/10' 
                    : 'bg-[#111111] border-[#2A2A30] hover:border-[#3F3F46]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-sm">{wf.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${wf.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
                    {wf.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-[#71717A] mb-3">{wf.description}</p>
                <div className="flex items-center justify-between text-[11px] text-[#A1A1AA] pt-3 border-t border-[#2A2A30]">
                  <span>Runs: <strong className="text-white">{wf.runs.toLocaleString()}</strong></span>
                  <span>Last fired: {wf.lastTriggered}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Visual Canvas Simulator */}
          <div className="lg:col-span-2 bg-[#111111] rounded-2xl border border-[#2A2A30] p-8 relative flex flex-col justify-between">
            {selectedFlow ? (
              <div>
                <div className="flex items-center justify-between border-b border-[#2A2A30] pb-6 mb-8">
                  <div>
                    <span className="text-[10px] font-mono text-brand-blue uppercase font-bold tracking-wider">ACTIVE FLOW DEFINITION</span>
                    <h3 className="text-2xl font-extrabold text-white mt-1">{selectedFlow.name}</h3>
                  </div>
                  <button 
                    onClick={() => toggleWorkflowStatus(selectedFlow.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedFlow.status === 'Active' 
                        ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20' 
                        : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                    }`}
                  >
                    {selectedFlow.status === 'Active' ? <><Pause size={14} /> Pause Execution</> : <><Play size={14} /> Activate Flow</>}
                  </button>
                </div>

                {/* Flow Sequence Nodes Canvas */}
                <div className="max-w-md mx-auto py-6 space-y-4">
                  {/* Node 1: Trigger */}
                  <div className="p-4 bg-blue-500/10 border border-blue-500/40 rounded-2xl shadow-xl flex items-center gap-4 animate-in fade-in">
                    <div className="p-3 bg-blue-500 rounded-xl text-white"><Zap size={20} /></div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">TRIGGER EVENT</span>
                      <strong className="text-white text-sm block">{selectedFlow.trigger}</strong>
                    </div>
                  </div>

                  <div className="flex justify-center text-[#71717A] my-1 animate-bounce"><ArrowDown size={20} /></div>

                  {/* Node 2: Evaluation Condition */}
                  <div className="p-4 bg-[#16161C] border border-[#3F3F46] rounded-2xl shadow-xl flex items-center gap-4">
                    <div className="p-3 bg-[#2A2A30] rounded-xl text-amber-400"><Layers size={20} /></div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#A1A1AA] font-bold block">EVALUATE CRITERIA</span>
                      <strong className="text-white text-sm block">Check Record Security & RBAC Scope</strong>
                    </div>
                  </div>

                  <div className="flex justify-center text-[#71717A] my-1 animate-bounce"><ArrowDown size={20} /></div>

                  {/* Node 3: Action */}
                  <div className="p-4 bg-purple-500/10 border border-purple-500/40 rounded-2xl shadow-xl flex items-center gap-4">
                    <div className="p-3 bg-purple-500 rounded-xl text-white"><Webhook size={20} /></div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block">EXECUTE ACTION</span>
                      <strong className="text-white text-sm block">{selectedFlow.action}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-[#71717A]">Select a flow from the sidebar to inspect visual execution nodes.</div>
            )}

            <div className="mt-8 p-4 rounded-xl bg-[#16161C] border border-[#2A2A30] text-xs text-[#A1A1AA] flex items-center justify-between">
              <span>Execution Engine: <strong>Async BullMQ Redis Workers</strong></span>
              <span className="text-emerald-400 flex items-center gap-1 font-semibold"><CheckCircle2 size={14} /> 99.99% Node Delivery Rate</span>
            </div>
          </div>
        </div>

        {/* Drag and Drop Builder Modal Simulator */}
        {isBuilderOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#111111] border border-[#2A2A30] rounded-2xl p-8 max-w-xl w-full shadow-2xl animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-[#2A2A30] pb-4 mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="text-brand-blue" /> Enterprise Workflow Studio (Salesforce Flow style)
                </h3>
                <button onClick={() => setIsBuilderOpen(false)} className="text-[#71717A] hover:text-white text-base">✕</button>
              </div>

              <form onSubmit={handleSaveFlow} className="space-y-5 text-xs">
                <div>
                  <label className="block text-[#A1A1AA] mb-1 font-semibold">Workflow Title *</label>
                  <input required type="text" value={flowName} onChange={(e) => setFlowName(e.target.value)} placeholder="e.g. Instant KYC Sign-off Notification" className="w-full bg-[#16161C] border border-[#2A2A30] rounded-lg p-2.5 text-white focus:border-brand-blue focus:outline-none" />
                </div>

                <div>
                  <label className="block text-[#A1A1AA] mb-1 font-semibold">Description</label>
                  <input type="text" value={flowDesc} onChange={(e) => setFlowDesc(e.target.value)} placeholder="e.g. Automatically notify legal vault..." className="w-full bg-[#16161C] border border-[#2A2A30] rounded-lg p-2.5 text-white focus:border-brand-blue focus:outline-none" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-blue-400 mb-1 font-bold">Trigger Event</label>
                    <select value={trigger} onChange={(e) => setTrigger(e.target.value)} className="w-full bg-[#16161C] border border-[#2A2A30] rounded-lg p-2.5 text-white focus:border-brand-blue focus:outline-none">
                      {triggersList.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-purple-400 mb-1 font-bold">Resulting Action</label>
                    <select value={action} onChange={(e) => setAction(e.target.value)} className="w-full bg-[#16161C] border border-[#2A2A30] rounded-lg p-2.5 text-white focus:border-brand-blue focus:outline-none">
                      {actionsList.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-[#2A2A30]">
                  <button type="button" onClick={() => setIsBuilderOpen(false)} className="px-4 py-2 rounded-lg bg-[#1E1E24] text-[#A1A1AA] hover:text-white font-bold">Cancel</button>
                  <button type="submit" className="px-6 py-2 rounded-lg bg-brand-blue text-[#111111] font-bold shadow-lg shadow-brand-blue/20">Compile & Activate Flow</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
