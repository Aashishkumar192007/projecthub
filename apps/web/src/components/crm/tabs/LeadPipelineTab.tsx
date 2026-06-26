'use client';

import { useCrmStore, LeadStage } from '@/store/crmStore';
import { Target, GripVertical, Plus } from 'lucide-react';
import { toast } from 'sonner';


const STAGES: { stage: LeadStage; color: string; border: string }[] = [
  { stage: 'Lead', color: 'bg-[#A1A1AA]', border: 'border-[#A1A1AA]' },
  { stage: 'Qualified', color: 'bg-brand-blue', border: 'border-brand-blue' },
  { stage: 'Visit Scheduled', color: 'bg-purple-400', border: 'border-purple-400' },
  { stage: 'Negotiation', color: 'bg-warning', border: 'border-warning' },
  { stage: 'Booked', color: 'bg-success', border: 'border-success' },
];

export function LeadPipelineTab() {
  const { entities, setActiveEntity, activeEntityId, moveLeadStage } = useCrmStore();

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('entityId', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStage: LeadStage) => {
    const id = e.dataTransfer.getData('entityId');
    if (id) {
      moveLeadStage(id, newStage);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><Target size={16} className="text-[#00E5FF]"/> Sales Pipeline Kanban</h3>
        <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="flex items-center gap-1 text-[10px] text-[#00E5FF] font-bold px-3 py-1.5 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded hover:bg-[#00E5FF]/20 transition-colors">
          <Plus size={12}/> New Deal
        </button>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {STAGES.map(({ stage, color, border }) => {
          const stageEntities = entities.filter(e => e.stage === stage);
          const totalValue = stageEntities.reduce((sum, e) => sum + e.potentialValue, 0);

          return (
            <div 
              key={stage}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
              className="w-80 shrink-0 bg-[#121212] border border-[#2A2A30] rounded-xl flex flex-col overflow-hidden"
            >
              {/* Kanban Column Header */}
              <div className={`p-4 border-b border-[#2A2A30] bg-[#161616] border-t-2 ${border}`}>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">{stage}</h4>
                  <span className="text-[10px] font-bold text-[#A1A1AA] bg-[#1A1A1A] px-2 py-0.5 rounded-full border border-[#2A2A30]">{stageEntities.length}</span>
                </div>
                <p className="text-[10px] font-bold text-[#71717A]">₹{(totalValue / 100000).toFixed(1)}L</p>
              </div>

              {/* Kanban Column Body */}
              <div className="flex-1 p-3 overflow-y-auto space-y-3">
                {stageEntities.map(entity => (
                  <div
                    key={entity.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, entity.id)}
                    onClick={() => setActiveEntity(entity.id)}
                    className={`p-3 bg-[#1A1A1A] border rounded-lg cursor-grab active:cursor-grabbing hover:border-[#3F3F46] transition-all ${
                      activeEntityId === entity.id ? 'border-brand-blue shadow-[0_0_15px_rgba(79,132,255,0.15)]' : 'border-[#2A2A30]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-xs font-bold text-white">{entity.name}</h5>
                      <GripVertical size={14} className="text-[#3F3F46]" />
                    </div>
                    
                    <p className="text-[10px] text-[#A1A1AA] mb-3">{entity.category}</p>
                    
                    <div className="flex justify-between items-end border-t border-[#2A2A30] pt-2">
                      <div>
                        <p className="text-[9px] font-bold text-[#71717A] uppercase tracking-widest">Value</p>
                        <p className="text-xs font-black text-white">₹{(entity.potentialValue / 100000).toFixed(1)}L</p>
                      </div>
                      <div className="flex items-center gap-1">
                         <div className={`w-1.5 h-1.5 rounded-full ${color}`}></div>
                         <p className="text-[9px] font-bold text-[#A1A1AA]">{entity.probability}%</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {stageEntities.length === 0 && (
                  <div className="h-24 border-2 border-dashed border-[#2A2A30] rounded-lg flex items-center justify-center">
                    <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest">Drop Here</p>
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
