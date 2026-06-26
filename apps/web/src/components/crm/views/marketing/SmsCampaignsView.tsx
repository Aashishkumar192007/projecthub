'use client';

import { useCrmStore } from '@/store/crmStore';
import { MessageSquare, Plus, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';


export function SmsCampaignsView() {
  const { smsCampaigns } = useCrmStore();

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">SMS Campaigns</h2>
        <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0A1A2A] px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>New SMS Campaign</span>
        </button>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-[#1A1C20] border-b border-neutral-800">
            <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              <th className="px-6 py-4 font-medium">CAMPAIGN NAME</th>
              <th className="px-6 py-4 font-medium">AUDIENCE</th>
              <th className="px-6 py-4 font-medium text-right">SENT</th>
              <th className="px-6 py-4 font-medium text-right">DELIVERED</th>
              <th className="px-6 py-4 font-medium text-right">CLICKED</th>
              <th className="px-6 py-4 font-medium text-right">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {smsCampaigns.map(sms => (
              <tr key={sms.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-neutral-500" />
                    {sms.name}
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-1">Scheduled: {new Date(sms.scheduledAt).toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 text-neutral-400">{sms.audienceId}</td>
                <td className="px-6 py-4 text-right text-white">{sms.sent.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-green-400">{sms.delivered.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-blue-400">{sms.clicked.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded border flex items-center justify-center gap-1 w-28 ml-auto ${
                    sms.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                    sms.status === 'SCHEDULED' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  }`}>
                    {sms.status === 'COMPLETED' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {sms.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
