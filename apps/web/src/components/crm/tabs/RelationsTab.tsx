'use client';

import { useCrmStore } from '@/store/crmStore';
import { Target, Users, Building2, Briefcase, Handshake, FileText, CalendarPlus } from 'lucide-react';

export function RelationsTab() {
  const { entities, activeEntityId } = useCrmStore();
  
  if (!activeEntityId) return null;
  const activeEntity = entities.find(r => r.id === activeEntityId);
  if (!activeEntity) return null;

  let index = 0;
  const renderNode = (id: string, label: string, icon: any, colorClass: string, totalNodes: number, radius: number = 190, centerX: number = 350, centerY: number = 250) => {
    const angle = (index / totalNodes) * 2 * Math.PI - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    index++;

    return (
      <div key={id}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
          <line x1={`${centerX}px`} y1={`${centerY}px`} x2={`${x}px`} y2={`${y}px`} stroke="#3F3F46" strokeWidth="1.5" strokeDasharray="4" />
        </svg>
        
        <div 
          className="absolute z-20 flex flex-col items-center gap-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform group"
          style={{ left: `${x}px`, top: `${y}px` }}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-[#1A1A1A] border border-[#2A2A30] shadow-lg group-hover:border-[#00E5FF]/50 transition-colors`}>
            {icon}
          </div>
          <span className={`text-[10px] font-bold ${colorClass} bg-[#111111] px-2 py-0.5 rounded border border-[#2A2A30] whitespace-nowrap shadow-xl`}>{label}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 h-full">
      <div className="relative w-full h-[600px] bg-[#0A0C10] overflow-hidden flex items-center justify-center rounded-xl border border-[#2A2A30]">
        
        {/* Palantir-style Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-blue/10 via-[#0A0C10] to-[#0A0C10] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="relative w-[700px] h-[500px]">
          
          {/* Center Active Entity Node */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
            <div className={`w-20 h-20 bg-[#1A1A1A] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(79,132,255,0.2)] border-2 border-brand-blue`}>
              <Target size={32} className="text-white" />
            </div>
            <span className="text-xs font-bold text-white bg-[#1A1A1A] px-3 py-1.5 rounded-full border border-[#2A2A30] shadow-xl text-center max-w-[200px] truncate">
              {activeEntity.name}
            </span>
            <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest bg-[#111111] px-2 py-0.5 rounded border border-[#2A2A30]">Lead • {activeEntity.stage}</span>
          </div>

          {/* Orbiting CRM Nodes */}
          {renderNode('broker', `Broker: ${activeEntity.assignedBroker}`, <Briefcase size={18} className="text-[#00E5FF]" />, 'text-[#00E5FF]', 5)}
          {renderNode('property', `Target Property`, <Building2 size={18} className="text-brand-blue" />, 'text-brand-blue', 5)}
          {renderNode('visits', `2 Site Visits`, <CalendarPlus size={18} className="text-purple-400" />, 'text-purple-400', 5)}
          {renderNode('docs', `3 Documents Sent`, <FileText size={18} className="text-[#A1A1AA]" />, 'text-[#A1A1AA]', 5)}
          {renderNode('deals', `Active Negotiation`, <Handshake size={18} className="text-warning" />, 'text-warning', 5)}

        </div>
      </div>
    </div>
  );
}
