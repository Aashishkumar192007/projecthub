'use client';

import { useResidentStore } from '@/store/residentStore';
import { User, Car, CalendarPlus, UserCheck, MessageSquareWarning, CreditCard, Heart, ShoppingBag } from 'lucide-react';

export function RelationsTab() {
  const { residents, activeResidentId } = useResidentStore();
  
  if (!activeResidentId) return null;
  const activeResident = residents.find(r => r.id === activeResidentId);
  if (!activeResident) return null;

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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00E5FF]/5 via-[#0A0C10] to-[#0A0C10] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

        <div className="relative w-[700px] h-[500px]">
          
          {/* Center Active Resident Node */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
            <div className={`w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.15)] border-2 border-[#00E5FF]`}>
              <User size={24} className="text-white" />
            </div>
            <span className="text-xs font-bold text-white bg-[#1A1A1A] px-3 py-1 rounded-full border border-[#2A2A30] shadow-lg text-center max-w-[150px] truncate">
              {activeResident.name}
            </span>
            <span className="text-[9px] font-bold text-[#A1A1AA] uppercase tracking-widest">{activeResident.unit} • {activeResident.tower}</span>
          </div>

          {/* Orbiting Nodes */}
          {renderNode('family', `3 Family Members`, <Heart size={16} className="text-[#00E5FF]" />, 'text-[#00E5FF]', 7)}
          {renderNode('vehicles', `2 Vehicles`, <Car size={16} className="text-[#A1A1AA]" />, 'text-[#A1A1AA]', 7)}
          {renderNode('bookings', `${activeResident.activeBookings} Active Bookings`, <CalendarPlus size={16} className="text-brand-blue" />, 'text-brand-blue', 7)}
          {renderNode('complaints', `${activeResident.openComplaints} Complaints`, <MessageSquareWarning size={16} className={activeResident.openComplaints > 0 ? 'text-warning' : 'text-[#A1A1AA]'} />, activeResident.openComplaints > 0 ? 'text-warning' : 'text-[#A1A1AA]', 7)}
          {renderNode('payments', activeResident.pendingDues > 0 ? `₹${activeResident.pendingDues} Due` : `Dues Cleared`, <CreditCard size={16} className={activeResident.pendingDues > 0 ? 'text-danger' : 'text-success'} />, activeResident.pendingDues > 0 ? 'text-danger' : 'text-success', 7)}
          {renderNode('visitors', `${activeResident.activeVisitors} Expected Visitors`, <UserCheck size={16} className="text-white" />, 'text-white', 7)}
          {renderNode('marketplace', `1 Active Listing`, <ShoppingBag size={16} className="text-[#00E5FF]" />, 'text-[#00E5FF]', 7)}

        </div>
      </div>
    </div>
  );
}
