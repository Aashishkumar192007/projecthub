import { useCrmStore } from '@/store/crmStore';
import { Phone, Calendar, Clock, CheckCircle, XCircle, Search, MoreVertical, Plus } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


export function CallsView() {
  const { activities, leads, logCall, completeTask } = useCrmStore();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'MISSED' | 'COMPLETED'>('UPCOMING');

  const calls = activities.filter(a => a.type === 'Call' || (a.type === 'Task' && a.title.toLowerCase().includes('call')));
  
  const filteredCalls = calls.filter(call => {
    const lead = leads.find(l => l.id === call.leadId);
    const searchString = `${lead?.name || ''} ${lead?.phone || ''} ${call.title}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  const getFilteredByTab = () => {
    if (activeTab === 'UPCOMING') return filteredCalls.filter(c => c.status === 'PENDING' && (!c.dueDate || new Date(c.dueDate) >= new Date()));
    if (activeTab === 'MISSED') return filteredCalls.filter(c => c.status === 'OVERDUE' || (c.status === 'PENDING' && c.dueDate && new Date(c.dueDate) < new Date()));
    if (activeTab === 'COMPLETED') return filteredCalls.filter(c => c.status === 'COMPLETED');
    return filteredCalls;
  };

  const displayedCalls = getFilteredByTab();

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">Call Queue</h2>
          <p className="text-sm text-neutral-400 mt-1">Manage and track all your scheduled calls.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search calls..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#12141A] border border-neutral-800 rounded pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#00E5FF] w-64"
            />
          </div>
          <button onClick={(e) => { e.stopPropagation(); useCrmStore.getState().openGlobalModal('Requested Action'); }} className="bg-[#BDE0FF] hover:bg-[#A3D3FF] text-[#0A1A2A] px-4 py-2 rounded text-sm font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Schedule Call</span>
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b border-neutral-800 pb-2">
        {(['UPCOMING', 'MISSED', 'COMPLETED'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t border-b-2 transition-colors ${
              activeTab === tab 
                ? 'text-[#00E5FF] border-[#00E5FF]' 
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            {tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
        {displayedCalls.length === 0 ? (
          <div className="col-span-full py-12 text-center text-neutral-500 bg-[#12141A] border border-neutral-800 rounded">
            No calls found in this category.
          </div>
        ) : (
          displayedCalls.map(call => {
            const lead = leads.find(l => l.id === call.leadId);
            return (
              <div key={call.id} className="bg-[#12141A] border border-neutral-800 rounded p-4 flex flex-col group hover:border-neutral-700 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-medium text-sm">{lead?.name || 'Unknown Lead'}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="w-3 h-3 text-neutral-400" />
                      <span className="text-xs text-neutral-400">{lead?.phone || 'No phone'}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold tracking-widest ${
                    call.priority === 'HIGH' ? 'bg-red-500/10 text-red-400' : 
                    call.priority === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {call.priority}
                  </span>
                </div>
                
                <div className="text-xs text-neutral-300 mb-4 line-clamp-2">{call.title}</div>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-800">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{call.dueDate ? new Date(call.dueDate).toLocaleDateString() : 'No date'}</span>
                    </div>
                    {call.dueDate && (
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(call.dueDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                    )}
                  </div>
                  
                  {call.status !== 'COMPLETED' && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => completeTask(call.id)}
                        className="text-xs font-medium text-[#00E5FF] hover:text-white transition-colors"
                      >
                        Complete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
