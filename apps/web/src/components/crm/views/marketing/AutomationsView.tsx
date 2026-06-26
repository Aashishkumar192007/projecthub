'use client';

import { useCrmStore } from '@/store/crmStore';
import { Workflow, Plus, Play, Pause, FileEdit, Users, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';


export function AutomationsView() {
  const { automations } = useCrmStore();

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">Marketing Automations</h2>
        <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0A1A2A] px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Create Workflow</span>
        </button>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-[#1A1C20] border-b border-neutral-800">
            <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              <th className="px-6 py-4 font-medium">WORKFLOW NAME</th>
              <th className="px-6 py-4 font-medium">TRIGGER EVENT</th>
              <th className="px-6 py-4 font-medium text-right">ENROLLED</th>
              <th className="px-6 py-4 font-medium text-right">COMPLETED</th>
              <th className="px-6 py-4 font-medium text-right">STATUS</th>
              <th className="px-6 py-4 font-medium text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {automations.map(auto => (
              <tr key={auto.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-white flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-neutral-500" />
                    {auto.name}
                  </div>
                </td>
                <td className="px-6 py-4 text-neutral-400">{auto.triggerEvent}</td>
                <td className="px-6 py-4 text-right text-blue-400 font-medium">
                  {auto.leadsEnrolled.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right text-green-400 font-medium">
                  {auto.leadsCompleted.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${
                    auto.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                    auto.status === 'PAUSED' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-neutral-800 text-neutral-500 border-neutral-700'
                  }`}>
                    {auto.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors"><FileEdit className="w-4 h-4" /></button>
                    {auto.status === 'ACTIVE' ? (
                      <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="p-1 hover:bg-neutral-800 rounded text-amber-400 transition-colors"><Pause className="w-4 h-4" /></button>
                    ) : (
                      <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="p-1 hover:bg-neutral-800 rounded text-green-400 transition-colors"><Play className="w-4 h-4" /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
