'use client';

import { useTenantStore } from '@/store/tenantStore';
import { Mail, Phone, ExternalLink, Building, CheckCircle2, AlertCircle } from 'lucide-react';

export function TenantHeader() {
  const { tenants, activeTenantId, getCalculatedHealth } = useTenantStore();
  
  if (!activeTenantId) return null;
  const activeTenant = tenants.find(t => t.id === activeTenantId);
  if (!activeTenant) return null;

  const { score } = getCalculatedHealth(activeTenant);

  return (
    <div className="bg-[#161616] border-b border-[#2A2A30] p-8 shrink-0 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex items-start justify-between relative z-10">
        
        {/* Profile Info */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <img 
              src={activeTenant.photoUrl} 
              alt={activeTenant.name} 
              className="w-20 h-20 rounded-2xl object-cover bg-[#1A1A1A] border-2 border-[#2A2A30] shadow-2xl"
            />
            {/* Status Dot */}
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#161616] ${activeTenant.status === 'Active' ? 'bg-success' : 'bg-warning'}`}></div>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-white tracking-tight">{activeTenant.name}</h1>
              <span className="px-2 py-0.5 bg-[#2A2A30] text-[#A1A1AA] rounded text-[10px] font-bold uppercase tracking-wider border border-[#3F3F46]">
                {activeTenant.type}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-bold text-[#71717A] mt-2">
              <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors"><Mail size={12}/> {activeTenant.type === 'Corporate' ? 'billing@acme.com' : 'contact@email.com'}</span>
              <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors"><Phone size={12}/> +1-555-0199</span>
              <span className="flex items-center gap-1.5 hover:text-brand-blue cursor-pointer transition-colors text-brand-blue"><ExternalLink size={12}/> View Portal</span>
            </div>
          </div>
        </div>

        {/* Quick Health & Units */}
        <div className="flex items-center gap-6 text-right">
          
          <div>
            <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest mb-1">Occupying</p>
            <div className="flex flex-col items-end gap-1">
              {activeTenant.units.slice(0, 2).map(u => (
                <span key={u.unitId} className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#1A1A1A] border border-[#2A2A30] px-2 py-0.5 rounded whitespace-nowrap">
                  <Building size={10} className="text-brand-blue" /> {u.unitName}
                </span>
              ))}
              {activeTenant.units.length > 2 && (
                <span className="text-[10px] text-[#A1A1AA]">+{activeTenant.units.length - 2} more units</span>
              )}
            </div>
          </div>

          <div className="w-px h-12 bg-[#2A2A30]"></div>

          <div>
            <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest mb-1">Payment Status</p>
            <div className="flex items-center gap-2 justify-end">
              {activeTenant.paymentStatus === 'Current' ? (
                <><CheckCircle2 size={16} className="text-success" /> <span className="text-sm font-bold text-success uppercase whitespace-nowrap">Current</span></>
              ) : activeTenant.paymentStatus === 'Pending' ? (
                <><AlertCircle size={16} className="text-warning" /> <span className="text-sm font-bold text-warning uppercase whitespace-nowrap">Pending</span></>
              ) : (
                <><AlertCircle size={16} className="text-danger" /> <span className="text-sm font-bold text-danger uppercase whitespace-nowrap">Delinquent</span></>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
