import { useCrmStore } from '@/store/crmStore';
import { CheckSquare, Calendar, Clock, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';


export function TasksView() {
  const { activities, leads, completeTask } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'TODAY' | 'UPCOMING' | 'OVERDUE' | 'COMPLETED'>('TODAY');

  const tasks = activities.filter(a => a.type === 'Task');
  
  const filteredTasks = tasks.filter(task => {
    const lead = leads.find(l => l.id === task.leadId);
    const searchString = `${lead?.name || ''} ${task.title} ${task.description}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  const getFilteredByTab = () => {
    const todayStr = new Date().toDateString();
    if (activeTab === 'TODAY') {
      return filteredTasks.filter(t => t.status === 'PENDING' && t.dueDate && new Date(t.dueDate).toDateString() === todayStr);
    }
    if (activeTab === 'UPCOMING') {
      return filteredTasks.filter(t => t.status === 'PENDING' && (!t.dueDate || new Date(t.dueDate) > new Date(new Date().setHours(23,59,59,999))));
    }
    if (activeTab === 'OVERDUE') {
      return filteredTasks.filter(t => (t.status === 'OVERDUE') || (t.status === 'PENDING' && t.dueDate && new Date(t.dueDate) < new Date(new Date().setHours(0,0,0,0))));
    }
    if (activeTab === 'COMPLETED') {
      return filteredTasks.filter(t => t.status === 'COMPLETED');
    }
    return filteredTasks;
  };

  const displayedTasks = getFilteredByTab();

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">Tasks & Follow-Ups</h2>
          <p className="text-sm text-neutral-400 mt-1">Manage your daily to-dos and lead follow-ups.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#12141A] border border-neutral-800 rounded pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#00E5FF] w-64"
            />
          </div>
          <button onClick={(e) => { e.stopPropagation(); useCrmStore.getState().openGlobalModal('Requested Action'); }} className="bg-[#BDE0FF] hover:bg-[#A3D3FF] text-[#0A1A2A] px-4 py-2 rounded text-sm font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b border-neutral-800 pb-2">
        {(['TODAY', 'UPCOMING', 'OVERDUE', 'COMPLETED'] as const).map(tab => (
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

      <div className="flex-1 overflow-y-auto space-y-3">
        {displayedTasks.length === 0 ? (
          <div className="py-12 text-center text-neutral-500 bg-[#12141A] border border-neutral-800 rounded">
            No tasks found in this category.
          </div>
        ) : (
          displayedTasks.map(task => {
            const lead = leads.find(l => l.id === task.leadId);
            return (
              <div key={task.id} className="bg-[#12141A] border border-neutral-800 rounded p-4 flex items-center gap-4 group hover:border-neutral-700 transition-colors">
                <button 
                  onClick={() => task.status !== 'COMPLETED' && completeTask(task.id)}
                  className={`shrink-0 flex items-center justify-center w-6 h-6 rounded border transition-colors ${
                    task.status === 'COMPLETED' ? 'bg-[#00E5FF] border-[#00E5FF] text-[#0A1A2A]' : 'border-neutral-600 hover:border-[#00E5FF] text-transparent hover:text-[#00E5FF]/50'
                  }`}
                >
                  <CheckSquare className="w-4 h-4" />
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className={`font-medium text-sm truncate ${task.status === 'COMPLETED' ? 'text-neutral-500 line-through' : 'text-white'}`}>
                      {task.title}
                    </h3>
                    <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded font-bold tracking-widest ${
                      task.priority === 'HIGH' ? 'bg-red-500/10 text-red-400' : 
                      task.priority === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400' : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 truncate">{task.description}</p>
                </div>

                <div className="flex items-center gap-6 shrink-0 text-xs text-neutral-500">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center text-[9px] text-neutral-300 font-bold border border-neutral-700">
                      {lead ? lead.name.charAt(0) : '?'}
                    </div>
                    <span className="truncate w-24">{lead?.name || 'No Lead'}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 w-32">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString(undefined, {month:'short', day:'numeric'}) : '-'}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
