'use client';

import { Lead } from '@/lib/crmMockData';
import { ArrowLeft, User, Phone, Mail, Building, MapPin, Hash, ShieldCheck, Banknote } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LeadProfileNavigator({ lead }: { lead: Lead }) {
  const router = useRouter();

  return (
    <div className="w-[280px] h-full bg-[#0A0A0A] border-r border-neutral-800 flex flex-col font-sans shrink-0 z-10">
      <div className="h-[72px] flex items-center px-4 border-b border-neutral-800 shrink-0">
        <button 
          onClick={() => router.push('/crm')}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to CRM</span>
        </button>
      </div>

      <div className="p-6 border-b border-neutral-800 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-neutral-900 border-2 border-neutral-800 flex items-center justify-center text-2xl font-bold text-[#00E5FF] mb-4">
          {lead.name.substring(0, 2).toUpperCase()}
        </div>
        <h2 className="text-lg font-medium text-white mb-1">{lead.name}</h2>
        <div className="text-xs text-neutral-500 bg-neutral-900 px-2.5 py-1 rounded-full uppercase tracking-widest font-bold">
          {lead.stage}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">Contact Details</div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <Phone className="w-4 h-4 text-neutral-500" />
              {lead.phone}
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <Mail className="w-4 h-4 text-neutral-500" />
              {lead.email}
            </div>
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">Lead Meta</div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <Hash className="w-4 h-4 text-neutral-500" />
              <span className="text-xs truncate">{lead.id}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <User className="w-4 h-4 text-neutral-500" />
              {lead.assignedExecutive}
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <Banknote className="w-4 h-4 text-neutral-500" />
              ${(lead.budget / 1000000).toFixed(1)}M Budget
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
              Score: {lead.score} / 100
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
