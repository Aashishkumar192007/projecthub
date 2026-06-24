'use client';

import { useFacilityStore } from '@/store/facilityStore';
import { Building2, Settings, Users, ClipboardList, UserCheck, ShieldCheck, Calendar, Activity } from 'lucide-react';

export function RelationsTab() {
  const { facilities, activeFacilityId } = useFacilityStore();
  
  if (!activeFacilityId) return null;
  const activeFacility = facilities.find(f => f.id === activeFacilityId);
  if (!activeFacility) return null;

  let index = 0;
  const renderNode = (id: string, label: string, icon: any, colorClass: string, totalNodes: number, radius: number = 180, centerX: number = 350, centerY: number = 250) => {
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
          <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-[#1A1A1A] border border-[#2A2A30] shadow-lg group-hover:border-[#00E5FF]/50 transition-colors`}>
            {icon}
          </div>
          <span className={`text-[10px] font-bold ${colorClass} bg-[#111111] px-2 py-0.5 rounded border border-[#2A2A30] whitespace-nowrap`}>{label}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 h-full">
      <div className="relative w-full h-[600px] bg-[#0A0C10] overflow-hidden flex items-center justify-center rounded-xl border border-[#2A2A30]">
        
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00E5FF]/10 via-[#0A0C10] to-[#0A0C10] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

        <div className="relative w-[700px] h-[500px]">
          
          {/* Center Active Facility Node */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
            <div className={`w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.2)] border-2 border-[#00E5FF]`}>
              <Building2 size={24} className="text-white" />
            </div>
            <span className="text-xs font-bold text-white bg-[#1A1A1A] px-3 py-1 rounded-full border border-[#2A2A30] shadow-lg text-center max-w-[150px] truncate">
              {activeFacility.name}
            </span>
          </div>

          {/* Orbiting Nodes */}
          {renderNode('assets', `Core Assets`, <Settings size={16} className="text-[#00E5FF]" />, 'text-[#00E5FF]', 8)}
          {renderNode('workorders', `${activeFacility.openWorkOrders} Work Orders`, <ClipboardList size={16} className="text-warning" />, 'text-warning', 8)}
          {renderNode('vendors', `Active Vendors`, <Users size={16} className="text-brand-blue" />, 'text-brand-blue', 8)}
          {renderNode('inspections', `Compliance Audits`, <ShieldCheck size={16} className="text-success" />, 'text-success', 8)}
          {renderNode('visitors', `Visitor Log`, <UserCheck size={16} className="text-white" />, 'text-white', 8)}
          {renderNode('reservations', `Resource Bookings`, <Calendar size={16} className="text-[#A1A1AA]" />, 'text-[#A1A1AA]', 8)}
          {renderNode('health', `${activeFacility.healthScore}/100 Health`, <Activity size={16} className={activeFacility.healthScore >= 90 ? 'text-success' : 'text-danger'} />, activeFacility.healthScore >= 90 ? 'text-success' : 'text-danger', 8)}
          {renderNode('contracts', `AMCs & Contracts`, <ClipboardList size={16} className="text-brand-blue" />, 'text-brand-blue', 8)}

        </div>
      </div>
    </div>
  );
}
