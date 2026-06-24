'use client';

import { useTenantStore } from '@/store/tenantStore';
import { User, Users, FileText, Banknote, Car, AlertTriangle, Building } from 'lucide-react';

export function RelationshipsTab() {
  const { tenants, activeTenantId, leases, invoices, complaints } = useTenantStore();
  
  if (!activeTenantId) return null;
  const activeTenant = tenants.find(t => t.id === activeTenantId);
  if (!activeTenant) return null;

  // Gather nodes
  const relatedUnits = activeTenant.units;
  const activeLeases = leases.filter(l => l.tenantId === activeTenantId);
  const activeInvoices = invoices.filter(i => i.tenantId === activeTenantId);
  const activeComplaints = complaints.filter(c => c.tenantId === activeTenantId);

  const totalNodes = relatedUnits.length + activeLeases.length + activeInvoices.length + activeComplaints.length + 1; // +1 for Family/Vehicles Mock
  let index = 0;

  const radius = 180;
  const centerX = 350;
  const centerY = 250;

  const renderNode = (id: string, label: string, icon: any, colorClass: string) => {
    const angle = (index / totalNodes) * 2 * Math.PI - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    index++;

    return (
      <div key={id}>
        {/* Line to center */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
          <line x1={`${centerX}px`} y1={`${centerY}px`} x2={`${x}px`} y2={`${y}px`} stroke="#3F3F46" strokeWidth="1.5" strokeDasharray="4" />
        </svg>
        
        <div 
          className="absolute z-20 flex flex-col items-center gap-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
          style={{ left: `${x}px`, top: `${y}px` }}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-[#1A1A1A] border border-[#2A2A30] shadow-lg`}>
            {icon}
          </div>
          <span className={`text-[10px] font-bold ${colorClass} bg-[#111111] px-2 py-0.5 rounded border border-[#2A2A30] whitespace-nowrap`}>{label}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-[600px] bg-[#0A0C10] overflow-hidden flex items-center justify-center rounded-xl border border-[#2A2A30] m-8">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A2533]/20 via-[#0A0C10] to-[#0A0C10] pointer-events-none"></div>

      <div className="relative w-[700px] h-[500px]">
        {/* Center Active Tenant */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
          <div className="w-16 h-16 bg-[#1A1A1A] border border-brand-blue rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(79,132,255,0.2)] overflow-hidden">
            <img src={activeTenant.photoUrl} alt={activeTenant.name} className="w-full h-full object-cover" />
          </div>
          <span className="text-xs font-bold text-white bg-brand-blue/20 px-3 py-1 rounded-full border border-brand-blue/30">{activeTenant.name}</span>
        </div>

        {/* Orbiting Nodes */}
        {relatedUnits.map(u => renderNode(u.unitId, u.unitName, <Building size={16} className="text-brand-blue" />, 'text-brand-blue'))}
        {activeLeases.map(l => renderNode(l.id, `Lease ${l.id}`, <FileText size={16} className="text-white" />, 'text-white'))}
        {activeInvoices.map(i => renderNode(i.id, `Inv ₹${i.amount}`, <Banknote size={16} className={i.status === 'Paid' ? 'text-success' : 'text-danger'} />, i.status === 'Paid' ? 'text-success' : 'text-danger'))}
        {activeComplaints.map(c => renderNode(c.id, c.title.substring(0, 10)+'...', <AlertTriangle size={16} className="text-warning" />, 'text-warning'))}
        {renderNode('mock-family', 'Family Members (3)', <Users size={16} className="text-[#00E5FF]" />, 'text-[#00E5FF]')}
        {renderNode('mock-vehicles', 'Vehicles (2)', <Car size={16} className="text-[#00E5FF]" />, 'text-[#00E5FF]')}
      </div>
    </div>
  );
}
