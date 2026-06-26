'use client';

import { useCrmStore } from '@/store/crmStore';
import { LeadStage } from '@/lib/crmMockData';
import { Filter, Search, Phone, Mail, User, Clock } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


const STAGES: { id: LeadStage; label: string; color: string }[] = [
  { id: 'NEW', label: 'NEW', color: 'bg-blue-400' },
  { id: 'CONTACTED', label: 'CONTACTED', color: 'bg-indigo-400' },
  { id: 'QUALIFIED', label: 'QUALIFIED', color: 'bg-purple-400' },
  { id: 'VISIT SCHEDULED', label: 'VISIT SCHED', color: 'bg-amber-400' },
  { id: 'VISIT COMPLETED', label: 'VISIT DONE', color: 'bg-orange-400' },
  { id: 'NEGOTIATION', label: 'NEGOTIATION', color: 'bg-pink-400' },
  { id: 'BOOKING', label: 'BOOKING', color: 'bg-green-400' },
  { id: 'WON', label: 'WON', color: 'bg-emerald-400' },
];

export function PipelineTab() {
  const { leads, moveLeadStage } = useCrmStore();
  const router = useRouter();
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedLeadId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetStage: LeadStage) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id && targetStage) {
      moveLeadStage(id, targetStage);
    }
    setDraggedLeadId(null);
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    lead.phone.includes(searchQuery) || 
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (lead.interestedProjectId || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h2 className="text-xl font-medium text-white tracking-wide">Sales Pipeline</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Filter pipeline..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
          <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="h-9 px-4 bg-[#121212] border border-neutral-800 rounded flex items-center gap-2 text-sm text-white hover:bg-neutral-800">
            <Filter className="w-4 h-4 text-neutral-400" />
            Filters
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {STAGES.map(stage => {
          const stageLeads = filteredLeads.filter(l => l.stage === stage.id);
          const stageTotal = stageLeads.reduce((sum, l) => sum + l.budget, 0);

          return (
            <div 
              key={stage.id} 
              className="min-w-[300px] w-[300px] flex flex-col bg-[#121212] border border-neutral-800 rounded-lg overflow-hidden"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              {/* Stage Header */}
              <div className="p-3 border-b border-neutral-800 bg-[#1A1C20] flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${stage.color}`}></div>
                    <span className="text-xs font-bold tracking-widest text-white uppercase">{stage.label}</span>
                  </div>
                  <span className="text-[10px] font-bold text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded-full">{stageLeads.length}</span>
                </div>
                <div className="text-xs font-medium text-neutral-400">
                  ${(stageTotal / 1000000).toFixed(1)}M
                </div>
              </div>

              {/* Cards Container */}
              <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-3">
                {stageLeads.map(lead => (
                  <div 
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    onClick={() => router.push(`/crm/leads/${lead.id}`)}
                    className={`bg-[#1A1C20] border border-neutral-800 rounded p-3 cursor-grab hover:border-neutral-700 transition-colors ${draggedLeadId === lead.id ? 'opacity-50' : 'opacity-100'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm text-white">{lead.name}</div>
                      <div className="text-[10px] text-[#00E5FF] font-bold bg-[#00E5FF]/10 px-1.5 py-0.5 rounded">Score: {lead.score}</div>
                    </div>
                    
                    <div className="text-xs font-medium text-green-400 mb-3">
                      ${(lead.budget / 1000000).toFixed(1)}M
                    </div>

                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                        <User className="w-3 h-3 text-neutral-500" /> {lead.assignedExecutive}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                        <Clock className="w-3 h-3 text-neutral-500" /> {new Date(lead.lastContactAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {stageLeads.length === 0 && (
                  <div className="h-20 flex items-center justify-center border-2 border-dashed border-neutral-800 rounded">
                    <span className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">Drop Here</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
