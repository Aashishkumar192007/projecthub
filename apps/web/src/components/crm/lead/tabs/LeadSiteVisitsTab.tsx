'use client';

import { Lead } from '@/lib/crmMockData';
import { useCrmStore } from '@/store/crmStore';
import { Calendar as CalendarIcon, Clock, MapPin, Check, X } from 'lucide-react';
import { useState } from 'react';

export function LeadSiteVisitsTab({ lead }: { lead: Lead }) {
  const { siteVisits, createSiteVisit, updateSiteVisitStatus } = useCrmStore();
  const visits = siteVisits.filter(v => v.leadId === lead.id);

  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleCreate = () => {
    if (!date || !time) return;
    createSiteVisit({
      leadId: lead.id,
      projectId: 'proj-1', // default mock
      date: new Date(date).toISOString(),
      time,
      executive: lead.assignedExecutive,
      status: 'SCHEDULED',
      notes: ''
    });
    setShowForm(false);
    setDate('');
    setTime('');
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium text-white">Site Visits</h3>
        <button 
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-[#00E5FF]/10 text-[#00E5FF] hover:bg-[#00E5FF]/20 text-xs font-medium rounded transition-colors"
        >
          Schedule Visit
        </button>
      </div>

      {showForm && (
        <div className="bg-[#1A1C20] border border-neutral-800 rounded p-4 mb-6">
          <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">New Site Visit</h4>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-[#121212] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00E5FF]" />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Time</label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-[#121212] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00E5FF]" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleCreate} className="px-4 py-2 bg-[#00E5FF] text-[#0A0C10] hover:bg-[#00BCCC] text-xs font-medium rounded transition-colors">Save</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-neutral-800 text-white hover:bg-neutral-700 text-xs font-medium rounded transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {visits.length === 0 && <div className="text-sm text-neutral-500">No site visits scheduled.</div>}
        {visits.map(visit => (
          <div key={visit.id} className="bg-[#1A1C20] border border-neutral-800 rounded p-4 flex items-center justify-between">
            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-sm text-neutral-300">
                <CalendarIcon className="w-4 h-4 text-neutral-500" />
                {new Date(visit.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-300">
                <Clock className="w-4 h-4 text-neutral-500" />
                {visit.time}
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-300">
                <MapPin className="w-4 h-4 text-neutral-500" />
                Project {visit.projectId}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${
                visit.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400' :
                visit.status === 'CANCELLED' ? 'bg-red-500/10 text-red-400' :
                'bg-amber-500/10 text-amber-400'
              }`}>
                {visit.status}
              </span>
              
              {visit.status === 'SCHEDULED' && (
                <div className="flex gap-2">
                  <button onClick={() => updateSiteVisitStatus(visit.id, 'COMPLETED')} className="w-7 h-7 rounded bg-green-500/10 hover:bg-green-500/20 text-green-400 flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={() => updateSiteVisitStatus(visit.id, 'CANCELLED')} className="w-7 h-7 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
