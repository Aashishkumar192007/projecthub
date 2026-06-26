'use client';

import { useState } from 'react';
import { MessageSquare, Search, Send, Smartphone, Sparkles, User, ShieldCheck, CheckCheck, Phone, CheckCircle2, AlertCircle, RefreshCw, Radio } from 'lucide-react';

interface SmsMessage {
  id: string;
  sender: 'AGENT' | 'CONTACT';
  text: string;
  time: string;
  dltVerified?: boolean;
}

interface SmsThread {
  id: string;
  contactName: string;
  phone: string;
  category: 'LEAD' | 'OWNER' | 'BROKER';
  unread: boolean;
  messages: SmsMessage[];
  leadScore: number;
  stage: string;
}

const mockSmsThreads: SmsThread[] = [
  {
    id: 'sms-1',
    contactName: 'Rajeshwar Bhubaneswar',
    phone: '98220 11442',
    category: 'LEAD',
    unread: true,
    leadScore: 88,
    stage: 'Site Visit Scheduled',
    messages: [
      { id: 'm1', sender: 'AGENT', text: 'Dear Rajeshwar, your chauffeur pickup for PropertyHub Sky Towers site visit is confirmed for tomorrow 11:00 AM. Driver: Ramesh (+91 9988776655).', time: 'Yesterday 6:15 PM', dltVerified: true },
      { id: 'm2', sender: 'CONTACT', text: 'Thanks for the message. Can we make it 11:30 AM instead? Traffic from airport is heavy.', time: '10:14 AM' }
    ]
  },
  {
    id: 'sms-2',
    contactName: 'Siddharth Mistry',
    phone: '98111 44552',
    category: 'BROKER',
    unread: false,
    leadScore: 75,
    stage: 'Channel Partner Tier 1',
    messages: [
      { id: 'm3', sender: 'AGENT', text: 'PropertyHub Partner Alert: 2.5% Spot Commission tranche unlocked for Tower B bookings closed before Sunday midnight.', time: 'Jun 22', dltVerified: true }
    ]
  },
  {
    id: 'sms-3',
    contactName: 'Kavita Krishnamurthy',
    phone: '98990 88221',
    category: 'OWNER',
    unread: false,
    leadScore: 95,
    stage: 'Unit Handover Pending',
    messages: [
      { id: 'm4', sender: 'AGENT', text: 'Dear Kavita, your key handover inspection slot for Villa 14 is ready. Please carry original allotment letter.', time: 'Jun 20', dltVerified: true },
      { id: 'm5', sender: 'CONTACT', text: 'Acknowledged. See you Friday.', time: 'Jun 20' }
    ]
  }
];

export default function SmsGatewayPage() {
  const [threads, setThreads] = useState<SmsThread[]>(mockSmsThreads);
  const [activeId, setActiveId] = useState<string>('sms-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [smsInput, setSmsInput] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const filteredThreads = threads.filter(t => t.contactName.toLowerCase().includes(searchQuery.toLowerCase()) || t.phone.includes(searchQuery));
  const activeThread = threads.find(t => t.id === activeId) || filteredThreads[0];

  const handleSend = () => {
    if (!smsInput.trim()) return;
    const newMsg: SmsMessage = {
      id: `sm-${Date.now()}`,
      sender: 'AGENT',
      text: smsInput,
      time: 'Just now',
      dltVerified: true
    };
    setThreads(threads.map(t => t.id === activeThread.id ? { ...t, messages: [...t.messages, newMsg], unread: false } : t));
    setFeedback(`Dispatched cellular SMS to +91 ${activeThread?.phone} via Airtel/Jio Enterprise DLT Gateway.`);
    setSmsInput('');
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-slate-950 text-slate-100 font-sans">
      
      {/* LEFT PANEL (25%): SMS THREADS */}
      <div className="w-1/4 flex flex-col border-r border-slate-800 bg-slate-900/40">
        <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30">
              <Radio className="h-4 w-4 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Cellular SMS Cloud</div>
              <div className="text-[10px] text-amber-400">DLT TRAI Gateway Active</div>
            </div>
          </div>
        </div>

        <div className="p-3 border-b border-slate-800/60">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search phone numbers or SMS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
          {filteredThreads.map((t) => {
            const isSelected = activeThread?.id === t.id;
            return (
              <div
                key={t.id}
                onClick={() => {
                  setActiveId(t.id);
                  setThreads(threads.map(i => i.id === t.id ? { ...i, unread: false } : i));
                }}
                className={`p-3.5 cursor-pointer transition flex items-start gap-3 hover:bg-slate-800/50 ${
                  isSelected ? 'bg-slate-800/90 border-l-4 border-amber-500' : ''
                }`}
              >
                <div className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-xs font-bold text-amber-300 shrink-0">
                  +91
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white truncate">{t.contactName}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">{t.messages[t.messages.length - 1]?.time}</span>
                  </div>
                  <div className="text-[11px] text-amber-400 font-mono mt-0.5">{t.phone}</div>
                  <p className="text-[11px] text-slate-400 truncate mt-1">{t.messages[t.messages.length - 1]?.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CENTER PANEL (50%): CELLULAR THREAD */}
      <div className="w-2/4 flex flex-col bg-slate-950 relative">
        {activeThread ? (
          <>
            <div className="p-4 border-b border-slate-800 bg-slate-900/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-sm">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{activeThread.contactName}</h3>
                  <div className="text-xs text-slate-400 font-mono">+91 {activeThread.phone} • Cellular Carrier Channel</div>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase font-mono">
                TRAI DLT Verified
              </span>
            </div>

            {feedback && (
              <div className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-2 text-xs text-amber-300 flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="h-4 w-4 text-amber-400" />
                {feedback}
              </div>
            )}

            {/* Cellular Bubbles */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-950">
              <div className="text-center my-2">
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-slate-500 font-mono">
                  Standard GSM Cellular Messaging (160 Chars / SMS)
                </span>
              </div>

              {activeThread.messages.map((m) => {
                const isAgent = m.sender === 'AGENT';
                return (
                  <div key={m.id} className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-1 mb-1 px-1">
                      <span className="text-[10px] text-slate-500 font-mono">{isAgent ? 'PropertyHub SMS Gateway' : activeThread.contactName}</span>
                    </div>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-md ${
                      isAgent ? 'bg-amber-600 text-white rounded-tr-none' : 'bg-slate-800 border border-slate-700 text-slate-100 rounded-tl-none'
                    }`}>
                      <p className="text-xs leading-relaxed font-sans">{m.text}</p>
                      <div className="flex items-center justify-end gap-1.5 mt-1.5 text-[9px] opacity-80">
                        <span className="font-mono">{m.time}</span>
                        {isAgent && <span className="text-[8px] bg-black/20 px-1 rounded font-mono">DLT PASS</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Composer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/40">
              <div className="flex flex-col gap-2 bg-slate-950 border border-slate-800 rounded-2xl p-3 focus-within:border-amber-500 transition">
                <textarea
                  rows={2}
                  placeholder={`Send normal SMS to +91 ${activeThread.phone}...`}
                  value={smsInput}
                  onChange={(e) => setSmsInput(e.target.value)}
                  className="w-full bg-transparent text-xs text-white placeholder-slate-600 focus:outline-none font-sans"
                />
                <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {smsInput.length}/160 chars ({Math.ceil((smsInput.length || 1)/160)} SMS Credits)
                  </span>
                  <button
                    onClick={handleSend}
                    disabled={!smsInput.trim()}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition disabled:opacity-50"
                  >
                    <Send className="h-3.5 w-3.5" /> Send SMS
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>

      {/* RIGHT PANEL (25%): SMS DIAGNOSTICS */}
      <div className="w-1/4 flex flex-col border-l border-slate-800 bg-slate-900/40 p-4 space-y-4">
        {activeThread ? (
          <>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                <ShieldCheck className="h-4 w-4 text-amber-400" /> Carrier Diagnostics
              </h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-300"><span>TRAI DLT Entity ID:</span> <strong className="text-amber-400">1001928374</strong></div>
                <div className="flex justify-between text-slate-300"><span>Header:</span> <strong className="text-white">PROPHB</strong></div>
                <div className="flex justify-between text-slate-300"><span>Route Tier:</span> <strong className="text-emerald-400">Transactional OTP</strong></div>
                <div className="flex justify-between text-slate-300"><span>Delivery Latency:</span> <strong>1.2s avg</strong></div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                <User className="h-4 w-4 text-blue-400" /> CRM Link
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-slate-400">Lead Score:</span> <span className="font-bold text-emerald-400">{activeThread.leadScore}/100</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Stage:</span> <span className="font-semibold text-white">{activeThread.stage}</span></div>
              </div>
            </div>
          </>
        ) : null}
      </div>

    </div>
  );
}
