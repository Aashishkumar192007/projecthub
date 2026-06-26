import { useCrmStore } from '@/store/crmStore';
import { Mail, Search, Send, FileText, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';


export function EmailCenterView() {
  const { emails, leads } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'INBOX' | 'SENT' | 'DRAFTS' | 'TEMPLATES'>('INBOX');

  const filteredEmails = emails.filter(email => {
    const lead = leads.find(l => l.id === email.leadId);
    const searchString = `${lead?.name || ''} ${email.subject} ${email.body}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  const displayedEmails = activeTab === 'TEMPLATES' ? [] : filteredEmails.filter(e => e.status === activeTab);

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">Email Center</h2>
          <p className="text-sm text-neutral-400 mt-1">Manage campaigns, templates, and lead communication.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search emails..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#12141A] border border-neutral-800 rounded pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#00E5FF] w-64"
            />
          </div>
          <button onClick={(e) => { e.stopPropagation(); useCrmStore.getState().openGlobalModal('Requested Action'); }} className="bg-[#BDE0FF] hover:bg-[#A3D3FF] text-[#0A1A2A] px-4 py-2 rounded text-sm font-medium flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>Compose Email</span>
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b border-neutral-800 pb-2">
        {(['INBOX', 'SENT', 'DRAFTS', 'TEMPLATES'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === tab 
                ? 'text-[#00E5FF] border-[#00E5FF]' 
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            {tab === 'INBOX' && <Mail className="w-4 h-4" />}
            {tab === 'SENT' && <Send className="w-4 h-4" />}
            {tab === 'DRAFTS' && <FileText className="w-4 h-4" />}
            {tab === 'TEMPLATES' && <CheckCircle className="w-4 h-4" />}
            {tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {activeTab === 'TEMPLATES' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Property Brochure', 'Visit Reminder', 'Booking Reminder', 'Welcome Email', 'Thank You Email'].map(template => (
              <div key={template} className="bg-[#12141A] border border-neutral-800 rounded p-4 group hover:border-[#00E5FF]/50 transition-colors cursor-pointer">
                <FileText className="w-6 h-6 text-[#00E5FF] mb-3" />
                <h3 className="text-white font-medium text-sm mb-1">{template}</h3>
                <p className="text-xs text-neutral-400 mb-4 line-clamp-2">Template to send when a lead requests more information about a project or schedule.</p>
                <button onClick={(e) => { e.stopPropagation(); useCrmStore.getState().openGlobalModal('Requested Action'); }} className="text-xs font-medium text-[#00E5FF] hover:text-white transition-colors">Use Template</button>
              </div>
            ))}
          </div>
        ) : displayedEmails.length === 0 ? (
          <div className="py-12 text-center text-neutral-500 bg-[#12141A] border border-neutral-800 rounded">
            No emails found in {activeTab.toLowerCase()}.
          </div>
        ) : (
          displayedEmails.map(email => {
            const lead = leads.find(l => l.id === email.leadId);
            return (
              <div key={email.id} className={`bg-[#12141A] border-l-[3px] border-y border-r border-y-neutral-800 border-r-neutral-800 rounded p-4 flex gap-4 transition-colors hover:bg-[#1A1C20] cursor-pointer ${
                email.read ? 'border-l-transparent' : 'border-l-[#00E5FF]'
              }`}>
                <div className="w-10 h-10 rounded bg-neutral-800 flex items-center justify-center text-neutral-300 font-bold shrink-0">
                  {lead ? lead.name.charAt(0) : '?'}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-medium text-sm truncate ${email.read ? 'text-neutral-300' : 'text-white'}`}>
                      {lead?.name || email.from}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-medium">
                      <Clock className="w-3 h-3" />
                      {new Date(email.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={`text-sm mb-1 ${email.read ? 'text-neutral-400' : 'text-neutral-200'}`}>
                    {email.subject}
                  </div>
                  <p className="text-xs text-neutral-500 truncate">{email.body}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
