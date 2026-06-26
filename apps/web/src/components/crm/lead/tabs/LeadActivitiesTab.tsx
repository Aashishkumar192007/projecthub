'use client';

import { Lead } from '@/lib/crmMockData';
import { useCrmStore } from '@/store/crmStore';
import { Clock } from 'lucide-react';

export function LeadActivitiesTab({ lead }: { lead: Lead }) {
  const { activities, emails, whatsappChats } = useCrmStore();
  
  const leadActivities = activities.filter(a => a.leadId === lead.id).map(a => ({
    id: a.id,
    type: a.type,
    title: a.title,
    description: a.description,
    date: a.createdAt,
    by: a.assignedTo
  }));

  const leadEmails = emails.filter(e => e.leadId === lead.id).map(e => ({
    id: e.id,
    type: 'Email',
    title: `Email: ${e.subject}`,
    description: e.body,
    date: e.createdAt,
    by: e.from
  }));

  const leadWa = whatsappChats.filter(w => w.leadId === lead.id).map(w => ({
    id: w.id,
    type: 'WhatsApp',
    title: `WhatsApp (${w.sender})`,
    description: w.content,
    date: w.createdAt,
    by: w.sender === 'AGENT' ? 'Agent' : lead.name
  }));

  const timeline = [...leadActivities, ...leadEmails, ...leadWa].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="p-6">
      <div className="relative border-l border-neutral-800 ml-4 space-y-8">
        {timeline.map(act => (
          <div key={act.id} className="relative pl-6">
            <div className="absolute -left-2 top-1 w-4 h-4 rounded-full border-4 border-[#121212] bg-[#00E5FF]"></div>
            <div className="bg-[#1A1C20] border border-neutral-800 rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-white">{act.title}</div>
                <div className="flex items-center gap-1 text-xs text-neutral-500">
                  <Clock className="w-3 h-3" />
                  {new Date(act.date).toLocaleString()}
                </div>
              </div>
              <p className="text-sm text-neutral-400 whitespace-pre-wrap">{act.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 uppercase tracking-widest">{act.type}</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest">By: {act.by}</div>
              </div>
            </div>
          </div>
        ))}
        {timeline.length === 0 && (
          <div className="text-neutral-500 text-sm ml-6">No timeline events found.</div>
        )}
      </div>
    </div>
  );
}
