import { useCrmStore } from '@/store/crmStore';
import { Search, Send, Paperclip, MoreVertical, Check, CheckCheck, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

export function WhatsAppView() {
  const { whatsappChats, leads, sendWhatsApp } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');

  // Group messages by lead
  const chatsByLead = whatsappChats.reduce((acc, msg) => {
    if (!msg.leadId) return acc;
    if (!acc[msg.leadId]) acc[msg.leadId] = [];
    acc[msg.leadId].push(msg);
    return acc;
  }, {} as Record<string, typeof whatsappChats>);

  // Sort messages chronologically for each lead
  Object.keys(chatsByLead).forEach(leadId => {
    chatsByLead[leadId].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  });

  const activeChats = Object.keys(chatsByLead).map(leadId => {
    const lead = leads.find(l => l.id === leadId);
    const messages = chatsByLead[leadId];
    const lastMessage = messages[messages.length - 1];
    return { lead, messages, lastMessage };
  }).filter(chat => chat.lead);

  // Sort active chats by latest message
  activeChats.sort((a, b) => new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime());

  const filteredChats = activeChats.filter(chat => 
    chat.lead?.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    chat.lead?.phone.includes(searchQuery)
  );

  const activeChat = activeChats.find(c => c.lead?.id === activeLeadId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeLeadId) return;

    sendWhatsApp({
      leadId: activeLeadId,
      content: messageInput,
      sender: 'AGENT',
      status: 'SENT',
      createdAt: new Date().toISOString()
    });

    setMessageInput('');
  };

  return (
    <div className="h-full flex bg-[#0A0C10]">
      {/* Left Conversation List */}
      <div className="w-80 border-r border-neutral-800 flex flex-col">
        <div className="p-4 border-b border-neutral-800 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white tracking-wide">WhatsApp CRM</h2>
            <Link
              href="/communications/whatsapp"
              className="inline-flex items-center gap-1 rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-1 text-[10px] font-bold text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition"
            >
              Cloud Hub <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search chats..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12141A] border border-neutral-800 rounded pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#25D366]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.map(chat => (
            <button
              key={chat.lead!.id}
              onClick={() => setActiveLeadId(chat.lead!.id)}
              className={`w-full p-4 flex gap-3 text-left transition-colors border-b border-neutral-800/50 ${
                activeLeadId === chat.lead!.id ? 'bg-[#1A1C20]' : 'hover:bg-[#12141A]'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 font-bold shrink-0">
                {chat.lead!.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-sm text-white truncate">{chat.lead!.name}</h3>
                  <span className="text-[10px] text-neutral-500">
                    {new Date(chat.lastMessage.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-neutral-400">
                  {chat.lastMessage.sender === 'AGENT' && (
                    <CheckCheck className={`w-3 h-3 ${chat.lastMessage.status === 'READ' ? 'text-[#25D366]' : ''}`} />
                  )}
                  <span className="truncate">{chat.lastMessage.content}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Center Chat Window */}
      {activeChat ? (
        <div className="flex-1 flex flex-col border-r border-neutral-800">
          <div className="h-[72px] p-4 border-b border-neutral-800 flex items-center justify-between bg-[#0A0C10] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-white font-bold">
                {activeChat.lead!.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-white">{activeChat.lead!.name}</h3>
                <p className="text-xs text-neutral-400">{activeChat.lead!.phone}</p>
              </div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); useCrmStore.getState().openGlobalModal('Requested Action'); }} className="text-neutral-400 hover:text-white p-2">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-[#0E1015] space-y-4">
            {activeChat.messages.map(msg => {
              const isAgent = msg.sender === 'AGENT';
              return (
                <div key={msg.id} className={`flex flex-col max-w-[70%] ${isAgent ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                  <div className={`p-3 rounded-lg text-sm ${
                    isAgent ? 'bg-[#005C4B] text-white rounded-tr-none' : 'bg-[#202C33] text-white rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-neutral-500">
                    <span>{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    {isAgent && (
                      <CheckCheck className={`w-3 h-3 ${msg.status === 'READ' ? 'text-[#34B7F1]' : ''}`} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t border-neutral-800 bg-[#0A0C10] shrink-0">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <button onClick={(e) => { e.stopPropagation(); useCrmStore.getState().openGlobalModal('Requested Action'); }} type="button" className="p-2 text-neutral-400 hover:text-white transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..." 
                className="flex-1 bg-[#1A1C20] border border-neutral-800 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#25D366]"
              />
              <button 
                type="submit" 
                disabled={!messageInput.trim()}
                className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1DA851] transition-colors"
              >
                <Send className="w-4 h-4 ml-1" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-neutral-500 border-r border-neutral-800">
          <MessageCircle className="w-16 h-16 text-neutral-800 mb-4" />
          <p>Select a chat to start messaging</p>
        </div>
      )}

      {/* Right Lead Insights */}
      {activeChat && (
        <div className="w-72 bg-[#0A0C10] p-6 overflow-y-auto shrink-0 hidden lg:block">
          <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-6">Lead Insights</h3>
          
          <div className="space-y-6">
            <div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Status</div>
              <div className="text-sm text-white font-medium">{activeChat.lead!.stage}</div>
            </div>
            
            <div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Budget</div>
              <div className="text-sm text-[#00E5FF] font-medium">₹{(activeChat.lead!.budget / 10000000).toFixed(2)} Cr</div>
            </div>

            <div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Win Probability</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500" 
                    style={{ width: `${activeChat.lead!.winProbability}%` }}
                  />
                </div>
                <span className="text-xs text-white font-medium">{activeChat.lead!.winProbability}%</span>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <h4 className="text-xs font-medium text-white mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button onClick={(e) => { e.stopPropagation(); useCrmStore.getState().openGlobalModal('Requested Action'); }} className="w-full py-2 text-xs font-medium bg-[#12141A] hover:bg-[#1A1C20] text-white border border-neutral-800 rounded transition-colors text-left px-3">
                  Share Project Brochure
                </button>
                <button onClick={(e) => { e.stopPropagation(); useCrmStore.getState().openGlobalModal('Requested Action'); }} className="w-full py-2 text-xs font-medium bg-[#12141A] hover:bg-[#1A1C20] text-white border border-neutral-800 rounded transition-colors text-left px-3">
                  Share Payment Plan
                </button>
                <button onClick={(e) => { e.stopPropagation(); useCrmStore.getState().openGlobalModal('Requested Action'); }} className="w-full py-2 text-xs font-medium bg-[#12141A] hover:bg-[#1A1C20] text-[#00E5FF] border border-[#00E5FF]/30 hover:border-[#00E5FF] rounded transition-colors text-left px-3">
                  Schedule Site Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
