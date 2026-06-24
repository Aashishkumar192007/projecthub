'use client';

import { useTenantStore } from '@/store/tenantStore';
import { FileSignature, CheckCircle2, Key, Home, RefreshCw, LogOut } from 'lucide-react';

export function LeaseTab() {
  const { leases, activeTenantId } = useTenantStore();
  
  if (!activeTenantId) return null;
  const activeLeases = leases.filter(l => l.tenantId === activeTenantId);

  // Linear-style lifecycle stages
  const stages = [
    { id: 'Application', icon: FileSignature, label: 'Application' },
    { id: 'Approval', icon: CheckCircle2, label: 'Approval' },
    { id: 'Move In', icon: Key, label: 'Move In' },
    { id: 'Active', icon: Home, label: 'Active Lease' },
    { id: 'Renewal', icon: RefreshCw, label: 'Renewal' },
    { id: 'Move Out', icon: LogOut, label: 'Move Out' }
  ];

  return (
    <div className="p-8 space-y-10">
      
      {activeLeases.map(lease => {
        // Find current stage index
        const currentStageIndex = stages.findIndex(s => s.id === lease.status);

        return (
          <div key={lease.id} className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Lease {lease.id.toUpperCase()}</h3>
                <p className="text-xs text-[#71717A]">Unit: {lease.unitId} • {lease.startDate} to {lease.endDate}</p>
              </div>
              <div className="text-right">
                <h3 className="text-lg font-bold text-brand-blue mb-1">₹{lease.monthlyRent.toLocaleString()} <span className="text-xs text-[#71717A] font-normal">/mo</span></h3>
                <p className="text-xs text-[#71717A]">Deposit: ₹{lease.depositAmount.toLocaleString()}</p>
              </div>
            </div>

            {/* Linear Style Roadmap Timeline */}
            <div className="relative">
              {/* Connecting Background Line */}
              <div className="absolute top-5 left-[5%] right-[5%] h-0.5 bg-[#2A2A30]"></div>
              {/* Connecting Progress Line */}
              <div 
                 className="absolute top-5 left-[5%] h-0.5 bg-brand-blue shadow-[0_0_10px_rgba(79,132,255,0.5)] transition-all duration-1000" 
                 style={{ width: `${(Math.max(0, currentStageIndex) / (stages.length - 1)) * 90}%` }}
              ></div>

              <div className="relative flex justify-between">
                {stages.map((stage, idx) => {
                  const isCompleted = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;
                  
                  return (
                    <div key={stage.id} className="flex flex-col items-center gap-3 w-20">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 ${
                        isCurrent ? 'bg-[#1A2533] border-brand-blue text-brand-blue scale-110 shadow-[0_0_15px_rgba(79,132,255,0.3)]' : 
                        isCompleted ? 'bg-brand-blue border-brand-blue text-white' : 'bg-[#161616] border-[#3F3F46] text-[#71717A]'
                      }`}>
                        <stage.icon size={16} />
                      </div>
                      <span className={`text-[10px] font-bold text-center ${
                        isCurrent ? 'text-brand-blue' : isCompleted ? 'text-white' : 'text-[#71717A]'
                      }`}>
                        {stage.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        );
      })}

    </div>
  );
}
