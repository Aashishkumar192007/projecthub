'use client';

import { useProjectStore } from '@/store/projectStore';
import { MapPin, Building, Plus, FileText, CheckCircle2, ShoppingCart, BarChart3 } from 'lucide-react';

export function ProjectHeader() {
  const { projects, activeProjectId } = useProjectStore();
  
  if (!activeProjectId) return null;
  const activeProject = projects.find(p => p.id === activeProjectId);
  if (!activeProject) return null;

  return (
    <div className="bg-[#161616] border-b border-[#2A2A30] p-8 shrink-0 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex items-start justify-between relative z-10">
        
        {/* Project Info */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-[#1A1A1A] border-2 border-[#2A2A30] shadow-2xl flex items-center justify-center relative">
            <Building size={32} className="text-brand-blue" />
            {/* Status Dot */}
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#161616] ${
              activeProject.status === 'Completed' ? 'bg-success' : 
              activeProject.status === 'High Risk' ? 'bg-danger' : 
              activeProject.status === 'Delayed' ? 'bg-warning' : 'bg-brand-blue'
            }`}></div>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-white tracking-tight">{activeProject.name}</h1>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                activeProject.status === 'Completed' ? 'bg-success/10 text-success border-success/30' : 
                activeProject.status === 'High Risk' ? 'bg-danger/10 text-danger border-danger/30' : 
                activeProject.status === 'Delayed' ? 'bg-warning/10 text-warning border-warning/30' : 
                'bg-[#2A2A30] text-[#A1A1AA] border-[#3F3F46]'
              }`}>
                {activeProject.status}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-bold text-[#71717A] mt-2">
              <span className="flex items-center gap-1.5"><Building size={12}/> {activeProject.developer}</span>
              <span className="flex items-center gap-1.5"><MapPin size={12}/> {activeProject.location}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col items-end gap-3">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <Plus size={12} /> DPR
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <Plus size={12} /> Work Order
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <CheckCircle2 size={12} /> BOQ
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded text-[11px] font-bold text-white transition-colors">
              <ShoppingCart size={12} /> PR
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A2533] hover:bg-[#1E2D40] border border-brand-blue/30 rounded text-[11px] font-bold text-brand-blue transition-colors shadow-[0_0_10px_rgba(79,132,255,0.1)]">
              <BarChart3 size={12} /> Report
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
