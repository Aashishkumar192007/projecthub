'use client';

import { useState } from 'react';
import { useWhatsAppStore, WhatsAppChat, WhatsAppMessage } from '@/store/whatsappStore';
import { Search, Send, Paperclip, Mic, Smile, Star, Trash2, CheckCheck, Flame, User, Building2, Phone, Calendar, ArrowRight, Sparkles, ShieldCheck, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function WhatsAppCommandCenterPage() {
  const {
    session,
    chats,
    activeChatId,
    searchQuery,
    activeFilter,
    aiAnalysis,
    setSearchQuery,
    setActiveFilter,
    setActiveChat,
    sendMessage,
    toggleStar,
    deleteMessage
  } = useWhatsAppStore();

  const [composerText, setComposerText] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [crmFeedback, setCrmFeedback] = useState<string | null>(null);

  const filters = [
    { id: 'ALL_CHATS', label: 'All Chats' },
    { id: 'UNREAD', label: 'Unread' },
    { id: 'HOT_LEADS', label: 'Hot Leads' },
    { id: 'CUSTOMERS', label: 'Customers' },
    { id: 'BROKERS', label: 'Brokers' },
    { id: 'RESIDENTS', label: 'Residents' },
  ];

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.contactName.toLowerCase().includes(searchQuery.toLowerCase()) || chat.phone.includes(searchQuery) || chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeFilter === 'UNREAD') return chat.unreadCount > 0;
    if (activeFilter !== 'ALL_CHATS') return chat.category === activeFilter;
    return true;
  });

  const activeChat = chats.find(c => c.id === activeChatId) || filteredChats[0];

  const handleSend = () => {
    if (!composerText.trim()) return;
    sendMessage(composerText);
    setComposerText('');
    setShowAttachMenu(false);
  };

  const handleAttachMock = (type: 'PDF' | 'IMAGE' | 'VOICE') => {
    if (type === 'PDF') {
      sendMessage('Attached Institutional Brochure Specification', 'PDF', '/brochures/ph360_deck.pdf');
    } else if (type === 'IMAGE') {
      sendMessage('Floor Plan Mockup Rendering', 'IMAGE', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600');
    } else if (type === 'VOICE') {
      sendMessage('Voice Memo (0:45s)', 'VOICE', '/voice/agent_memo.mp3');
    }
    setShowAttachMenu(false);
  };

  const handleQuickCrmAction = (action: string) => {
    setCrmFeedback(`Executed: ${action} for ${activeChat?.contactName || 'Contact'}. Logged to CRM Timeline.`);
    setTimeout(() => setCrmFeedback(null), 4000);
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-slate-950 text-slate-100 font-sans">
      
      {/* ========================================================= */}
      {/* LEFT PANEL (25%): CONVERSATION NAVIGATOR */}
      {/* ========================================================= */}
      <div className="w-1/4 flex flex-col border-r border-slate-800 bg-slate-900/40">
        
        {/* Session Badge Header */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
              WA
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                +91 {session.phone || '98765 43210'}
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <div className="text-[10px] text-slate-400">Isolated Session • {session.status}</div>
            </div>
          </div>
          <div className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
            {session.lastSync || 'Live'}
          </div>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b border-slate-800/60">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search conversations or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Section Filters */}
        <div className="px-3 py-2 border-b border-slate-800/60 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition ${
                activeFilter === f.id
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
          {filteredChats.map((chat) => {
            const isSelected = activeChat?.id === chat.id;
            return (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`p-3.5 cursor-pointer transition flex items-start gap-3 hover:bg-slate-800/50 ${
                  isSelected ? 'bg-slate-800/90 border-l-4 border-emerald-500' : ''
                }`}
              >
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 flex items-center justify-center font-bold text-slate-300 text-sm">
                    {chat.contactName.substring(0, 2).toUpperCase()}
                  </div>
                  {chat.category === 'HOT_LEADS' && (
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-orange-500 text-white flex items-center justify-center shadow">
                      <Flame className="h-2.5 w-2.5" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white truncate">{chat.contactName}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(chat.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 truncate mt-0.5">{chat.lastMessage}</div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-900 border border-slate-700 text-emerald-400 uppercase tracking-wider">
                      {chat.leadStatus}
                    </span>
                    {chat.unreadCount > 0 && (
                      <span className="h-5 min-w-5 px-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] flex items-center justify-center animate-bounce">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* CENTER PANEL (50%): CHAT WORKSPACE */}
      {/* ========================================================= */}
      <div className="w-2/4 flex flex-col bg-slate-950 relative">
        
        {/* Chat Header */}
        {activeChat ? (
          <>
            <div className="p-4 border-b border-slate-800 bg-slate-900/30 flex items-center justify-between backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-800 flex items-center justify-center font-bold text-white text-sm shadow-md">
                  {activeChat.contactName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    {activeChat.contactName}
                    <span className="text-xs font-normal text-slate-400 font-mono">+91 {activeChat.phone}</span>
                  </h3>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="h-3 w-3" />
                    WhatsApp Encrypted Channel • {activeChat.category}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://web.whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 text-xs font-extrabold transition shadow-lg shadow-emerald-500/20"
                >
                  Open WhatsApp Web ↗
                </a>
                <span className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                  RM: Aashish Kumar
                </span>
              </div>
            </div>

            {/* Inline CRM Feedback Alert */}
            {crmFeedback && (
              <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-4 py-2 text-xs text-emerald-300 flex items-center gap-2 animate-fade-in">
                <Sparkles className="h-4 w-4 text-emerald-400 animate-spin" />
                {crmFeedback}
              </div>
            )}

            {/* Speech Bubble Workspace */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] bg-slate-950/90">
              <div className="text-center my-2">
                <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[10px] text-slate-400 font-mono">
                  Today • End-to-End Isolated Enterprise Session
                </span>
              </div>

              {activeChat.messages.map((msg) => {
                const isAgent = msg.sender === 'AGENT';
                return (
                  <div key={msg.id} className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'} group`}>
                    <div className="flex items-center gap-1 mb-1 px-1">
                      <span className="text-[10px] text-slate-500 font-mono">{isAgent ? 'You (CRM Cloud)' : activeChat.contactName}</span>
                    </div>

                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-lg relative ${
                        isAgent
                          ? 'bg-emerald-600 text-white rounded-tr-none'
                          : 'bg-slate-800 border border-slate-700 text-slate-100 rounded-tl-none'
                      }`}
                    >
                      {/* Attachments Renderer */}
                      {msg.mediaType === 'PDF' && (
                        <div className="mb-2 p-2.5 rounded-xl bg-slate-950/40 border border-white/10 flex items-center gap-3">
                          <FileText className="h-8 w-8 text-rose-400" />
                          <div className="text-xs truncate flex-1 font-semibold">{msg.content}</div>
                        </div>
                      )}

                      {msg.mediaType === 'IMAGE' && (
                        <div className="mb-2 rounded-xl overflow-hidden border border-white/10 max-h-60">
                          <img src={msg.mediaUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600'} alt="attachment" className="w-full object-cover" />
                        </div>
                      )}

                      {msg.mediaType === 'VOICE' && (
                        <div className="mb-2 p-2 rounded-xl bg-slate-950/40 flex items-center gap-2 min-w-48">
                          <Mic className="h-5 w-5 text-emerald-400 animate-pulse" />
                          <div className="h-2 flex-1 rounded-full bg-slate-700 overflow-hidden">
                            <div className="h-full w-2/3 bg-emerald-400"></div>
                          </div>
                          <span className="text-[10px] font-mono">0:45s</span>
                        </div>
                      )}

                      <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                      <div className="flex items-center justify-end gap-1.5 mt-1.5 text-[9px] opacity-75">
                        <span className="font-mono">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isAgent && <CheckCheck className="h-3 w-3 text-teal-200" />}
                      </div>

                      {/* Floating Bubble Actions */}
                      <div className="absolute top-2 -left-14 hidden group-hover:flex items-center gap-1 bg-slate-900 border border-slate-700 p-1 rounded-lg shadow-md">
                        <button onClick={() => toggleStar(msg.id)} className="p-1 hover:text-amber-400 text-slate-400">
                          <Star className={`h-3 w-3 ${msg.isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                        </button>
                        <button onClick={() => deleteMessage(msg.id)} className="p-1 hover:text-rose-400 text-slate-400">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Composer Box */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50 relative">
              {showAttachMenu && (
                <div className="absolute bottom-20 left-6 bg-slate-900 border border-slate-700 rounded-xl p-2 shadow-2xl flex flex-col gap-1 z-50 min-w-48 animate-fade-in">
                  <button onClick={() => handleAttachMock('PDF')} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-800 text-xs text-slate-200 text-left">
                    <FileText className="h-4 w-4 text-rose-400" /> Stamped Brochure PDF
                  </button>
                  <button onClick={() => handleAttachMock('IMAGE')} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-800 text-xs text-slate-200 text-left">
                    <Paperclip className="h-4 w-4 text-blue-400" /> Floor Plan Image
                  </button>
                  <button onClick={() => handleAttachMock('VOICE')} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-800 text-xs text-slate-200 text-left">
                    <Mic className="h-4 w-4 text-emerald-400" /> Voice Memo Note
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-2xl p-2 focus-within:border-emerald-500">
                <button onClick={() => setShowAttachMenu(!showAttachMenu)} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-900 transition">
                  <Paperclip className="h-5 w-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-900 transition">
                  <Smile className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  placeholder={`Reply to ${activeChat.contactName} via WhatsApp...`}
                  value={composerText}
                  onChange={(e) => setComposerText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 bg-transparent py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!composerText.trim()}
                  className={`p-2.5 rounded-xl transition flex items-center justify-center ${
                    composerText.trim() ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">Select a conversation</div>
        )}
      </div>

      {/* ========================================================= */}
      {/* RIGHT PANEL (25%): CONTACT INTELLIGENCE & AI COPILOT */}
      {/* ========================================================= */}
      <div className="w-1/4 flex flex-col border-l border-slate-800 bg-slate-900/40 overflow-y-auto p-4 space-y-4">
        
        {activeChat ? (
          <>
            {/* AI Copilot Card */}
            <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/30 via-slate-900/80 to-slate-900 p-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Sparkles className="h-24 w-24 text-emerald-400" />
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Sparkles className="h-4 w-4" /> Stitch AI Copilot
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {aiAnalysis.temperature} Lead
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 my-3">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Sentiment</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">{aiAnalysis.sentiment}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Intent Detected</div>
                  <div className="text-xs font-bold text-blue-400 mt-0.5 truncate">{aiAnalysis.intent}</div>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="text-[11px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                  <span>AI Suggested Reply</span>
                  <span className="text-[9px] text-emerald-400 font-mono">1-Click Insert</span>
                </div>
                <p className="text-xs text-slate-400 italic leading-relaxed">"{aiAnalysis.suggestedReply}"</p>
                <button
                  onClick={() => setComposerText(aiAnalysis.suggestedReply)}
                  className="mt-2 w-full py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold border border-emerald-500/40 transition flex items-center justify-center gap-1.5"
                >
                  Insert Reply to Composer <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* CRM Entity Match Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                <User className="h-4 w-4 text-blue-400" /> CRM Record Intelligence
              </h4>

              {activeChat.entityIntelligence ? (
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Lead Score:</span>
                    <span className="font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      {activeChat.entityIntelligence.leadScore}/100
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Customer Tier:</span>
                    <span className="font-semibold text-white">{activeChat.entityIntelligence.customerStatus}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Interest:</span>
                    <span className="font-semibold text-amber-300 truncate max-w-36">{activeChat.entityIntelligence.propertyInterest}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Site Visits:</span>
                    <span className="font-mono text-white">{activeChat.entityIntelligence.siteVisits} Completed</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Token Hold:</span>
                    <span className="font-mono text-emerald-400">{activeChat.entityIntelligence.paymentsCleared}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">RM Notes</div>
                    <p className="text-xs text-slate-300 mt-1 bg-slate-950/50 p-2 rounded border border-slate-800/60">
                      {activeChat.entityIntelligence.notes}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-400 py-4 text-center">
                  Unlinked Contact Number
                  <button onClick={() => handleQuickCrmAction('Create New CRM Lead Record')} className="mt-2 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition">
                    + Link to CRM Lead
                  </button>
                </div>
              )}
            </div>

            {/* Quick CRM Workflow Actions */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Quick CRM Triggers</h4>
              <button onClick={() => handleQuickCrmAction('Schedule Chauffeur Site Visit')} className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 text-left flex items-center justify-between transition">
                <span>🚘 Schedule Site Visit</span> <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </button>
              <button onClick={() => handleQuickCrmAction('Dispatch Digital Price Sheet')} className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 text-left flex items-center justify-between transition">
                <span>📄 Send Stamped Price Sheet</span> <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </button>
              <button onClick={() => handleQuickCrmAction('Assign Follow-Up Task to Desk')} className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 text-left flex items-center justify-between transition">
                <span>📌 Create Follow-Up Reminder</span> <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </button>
            </div>
          </>
        ) : null}
      </div>

    </div>
  );
}
