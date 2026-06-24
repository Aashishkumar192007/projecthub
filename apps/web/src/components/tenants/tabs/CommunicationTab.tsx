'use client';

import { useTenantStore } from '@/store/tenantStore';
import { Mail, MessageSquare, Phone, FileText } from 'lucide-react';

export function CommunicationTab() {
  const { communications, activeTenantId } = useTenantStore();
  
  if (!activeTenantId) return null;
  const activeComms = communications.filter(c => c.tenantId === activeTenantId);

  const getIcon = (type: string) => {
    switch(type) {
      case 'Email': return <Mail size={14} className="text-brand-blue" />;
      case 'SMS': return <MessageSquare size={14} className="text-success" />;
      case 'WhatsApp': return <MessageSquare size={14} className="text-success" />;
      case 'Call': return <Phone size={14} className="text-amber-500" />;
      case 'Notice': return <FileText size={14} className="text-danger" />;
      default: return <Mail size={14} className="text-[#A1A1AA]" />;
    }
  };

  return (
    <div className="p-8 space-y-6">
      
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-bold text-white">Communication Timeline</h3>
        <button className="px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 rounded text-xs font-bold text-white transition-colors shadow-[0_0_15px_rgba(79,132,255,0.3)]">
          New Message
        </button>
      </div>

      <div className="relative border-l-2 border-[#2A2A30] ml-4 pl-8 space-y-8">
        
        {activeComms.map((comm) => (
          <div key={comm.id} className="relative">
            {/* Timeline Dot */}
            <div className="absolute -left-[41px] top-1 w-8 h-8 rounded-full bg-[#161616] border-2 border-[#2A2A30] flex items-center justify-center">
              {getIcon(comm.type)}
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 hover:border-brand-blue/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-white uppercase px-2 py-0.5 rounded border border-[#3F3F46] bg-[#2A2A30]">{comm.type}</span>
                  <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">{comm.direction}</span>
                </div>
                <span className="text-[10px] text-[#71717A]">{comm.date}</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{comm.subject}</h4>
              <p className="text-xs text-[#71717A]">Mock message content for {comm.type} communication regarding {comm.subject}.</p>
            </div>
          </div>
        ))}

        {activeComms.length === 0 && (
          <p className="text-xs text-[#71717A]">No communication history found.</p>
        )}

      </div>

    </div>
  );
}
