'use client';

import { useFacilityStore } from '@/store/facilityStore';
import { Bot, Sparkles, AlertTriangle, ArrowRight, Activity, ShieldAlert, Zap, Wrench } from 'lucide-react';

export function FacilityCopilot() {
  const { facilities, activeFacilityId } = useFacilityStore();
  
  if (!activeFacilityId) return null;
  const activeFacility = facilities.find(f => f.id === activeFacilityId);
  if (!activeFacility) return null;

  return (
    <div className="w-80 border-l border-[#2A2A30] bg-[#111111] h-full flex flex-col shrink-0 overflow-y-auto z-10">
      
      {/* Header */}
      <div className="p-5 border-b border-[#2A2A30] bg-[#161616] flex items-center gap-3 sticky top-0 z-10">
        <div className="w-8 h-8 rounded-full bg-[linear-gradient(45deg,#00E5FF,#0066FF)] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]">
          <Bot size={16} className="text-[#0A0C10]" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">AI Facility Copilot <Sparkles size={12} className="text-[#00E5FF]"/></h2>
          <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-bold">Predictive Intelligence</p>
        </div>
      </div>

      <div className="p-5 space-y-8">
        
        {/* Executive Escalation Engine */}
        <div>
          <p className="text-[10px] font-bold text-danger tracking-widest uppercase mb-3 flex items-center gap-2">
            <AlertTriangle size={12} /> Executive Escalations
          </p>
          <div className="space-y-3">
            {activeFacility.escalations.length > 0 ? (
              activeFacility.escalations.map((esc) => (
                <div key={esc.id} className="bg-[#1A1A1A] border border-danger/30 rounded-xl p-4 relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-[20px] pointer-events-none transition-colors ${
                    esc.severity === 'Critical' ? 'bg-danger/10 group-hover:bg-danger/20' : 'bg-warning/10 group-hover:bg-warning/20'
                  }`}></div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                      esc.severity === 'Critical' ? 'text-danger bg-danger/10 border-danger/20' : 'text-warning bg-warning/10 border-warning/20'
                    }`}>
                      {esc.severity}
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-bold text-white">{esc.title}</h4>
                  <p className={`text-lg font-black mt-1 mb-2 ${esc.severity === 'Critical' ? 'text-danger' : 'text-warning'}`}>
                    {esc.reason}
                  </p>
                  
                  <div className="bg-[#111111] border border-[#2A2A30] rounded p-2 mb-3">
                    <p className="text-[10px] text-[#71717A] uppercase font-bold mb-0.5">Impact Metric</p>
                    <p className="text-xs font-medium text-[#A1A1AA]">{esc.metric}</p>
                  </div>

                  <button className="w-full flex items-center justify-between px-3 py-2 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#3F3F46] rounded-lg transition-all group/btn">
                    <span className="text-[10px] font-bold text-white">{esc.action}</span>
                    <ArrowRight size={12} className="text-[#71717A] group-hover/btn:text-brand-blue" />
                  </button>
                </div>
              ))
            ) : (
              <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 text-center">
                <p className="text-xs font-bold text-success">No active escalations.</p>
              </div>
            )}
          </div>
        </div>

        {/* Predictive Risk Assessment Layer */}
        <div>
          <p className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-3">Predictive Risk Matrix</p>
          <div className="space-y-3">
            
            <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#A1A1AA] flex items-center gap-2"><Activity size={14} className={activeFacility.assetFailureRisk > 50 ? 'text-danger' : 'text-warning'}/> Asset Failure</span>
                <span className="text-sm font-black text-white">{activeFacility.assetFailureRisk}%</span>
              </div>
              <div className="w-full h-1 bg-[#111111] rounded-full mt-2 overflow-hidden">
                <div className={`h-full rounded-full ${activeFacility.assetFailureRisk > 70 ? 'bg-danger' : activeFacility.assetFailureRisk > 40 ? 'bg-warning' : 'bg-success'}`} style={{ width: `${activeFacility.assetFailureRisk}%` }}></div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#A1A1AA] flex items-center gap-2"><Zap size={14} className={activeFacility.energyRisk > 50 ? 'text-danger' : 'text-warning'}/> Energy Waste</span>
                <span className="text-sm font-black text-white">{activeFacility.energyRisk}%</span>
              </div>
              <div className="w-full h-1 bg-[#111111] rounded-full mt-2 overflow-hidden">
                <div className={`h-full rounded-full ${activeFacility.energyRisk > 70 ? 'bg-danger' : activeFacility.energyRisk > 40 ? 'bg-warning' : 'bg-success'}`} style={{ width: `${activeFacility.energyRisk}%` }}></div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#A1A1AA] flex items-center gap-2"><Wrench size={14} className={activeFacility.maintenanceRisk > 50 ? 'text-danger' : 'text-warning'}/> Maintenance Delay</span>
                <span className="text-sm font-black text-white">{activeFacility.maintenanceRisk}%</span>
              </div>
              <div className="w-full h-1 bg-[#111111] rounded-full mt-2 overflow-hidden">
                <div className={`h-full rounded-full ${activeFacility.maintenanceRisk > 70 ? 'bg-danger' : activeFacility.maintenanceRisk > 40 ? 'bg-warning' : 'bg-success'}`} style={{ width: `${activeFacility.maintenanceRisk}%` }}></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
