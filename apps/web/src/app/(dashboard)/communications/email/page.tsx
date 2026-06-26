'use client';

import { useState } from 'react';
import { Mail, Search, Send, Star, Archive, Trash2, Reply, Forward, Paperclip, Sparkles, User, Building2, ExternalLink, CheckCircle2, AlertCircle, RefreshCw, Tag, Clock } from 'lucide-react';

interface EmailThread {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  snippet: string;
  time: string;
  isUnread: boolean;
  isStarred: boolean;
  folder: 'INBOX' | 'SENT' | 'DRAFTS' | 'STARRED' | 'ARCHIVED';
  body: string;
  leadScore: number;
  customerTier: string;
  interest: string;
  aiSummary: string[];
  suggestedReply: string;
}

const mockEmails: EmailThread[] = [
  {
    id: 'gm-101',
    senderName: 'Vikramaditya Singhania',
    senderEmail: 'vikram@singhaniaholdings.com',
    subject: 'Institutional Inquiry: PropertyHub Sky Towers Penthouse Hold',
    snippet: 'Following up on our WhatsApp discussion regarding private elevator access...',
    time: '12:42 PM',
    isUnread: true,
    isStarred: true,
    folder: 'INBOX',
    body: `Dear Aashish Kumar,\n\nThank you for sharing the specification deck over WhatsApp earlier today. Our investment board has reviewed the floor plans for the 4BHK Sky Penthouse.\n\nWe would like to formally request an institutional hold on Unit 4501. Please confirm if the escrow token requirement of ₹5 Lakhs can be routed via standard NEFT transfer to the institutional escrow account.\n\nAdditionally, please attach the drafted Agreement to Sell (ATS) for our legal team's verification.\n\nWarm regards,\nVikramaditya Singhania\nManaging Director, Singhania Holdings`,
    leadScore: 92,
    customerTier: 'VIP Ultra High Net Worth',
    interest: 'Sky Penthouse 4BHK (₹8.5 Cr)',
    aiSummary: [
      'Customer formally requesting unit hold on Penthouse 4501.',
      'Asking for NEFT escrow account routing details for ₹5L token.',
      'Requested drafted Agreement to Sell (ATS) for legal review.'
    ],
    suggestedReply: `Dear Mr. Singhania,\n\nWe are delighted to confirm institutional reservation hold for Sky Penthouse 4501. I have attached the official NEFT escrow routing mandate alongside the drafted ATS.\n\nLooking forward to hosting you this Saturday.`
  },
  {
    id: 'gm-102',
    senderName: 'Ananya Mehra',
    senderEmail: 'ananya.mehra@outlook.com',
    subject: 'Milestone Tranche 2 Receipt Acknowledgment',
    snippet: 'Received the stamped ledger copy. Could you also send the interior customization...',
    time: 'Yesterday',
    isUnread: false,
    isStarred: false,
    folder: 'INBOX',
    body: `Hi Aashish,\n\nI have downloaded the stamped tranche 2 receipt. Everything looks in order.\n\nCould you please email across the interior customization catalogue for Tower A? We want to finalize the Italian marble flooring options before the civil work concludes.\n\nThanks,\nAnanya Mehra`,
    leadScore: 100,
    customerTier: 'Unit Owner (Tower A - 1402)',
    interest: '3BHK Residences',
    aiSummary: [
      'Customer acknowledged milestone tranche 2 payment receipt.',
      'Requesting interior customization catalogue for marble flooring.'
    ],
    suggestedReply: `Dear Ananya,\n\nThank you for the confirmation. I have attached the curated interior customization catalogue with Italian marble finishes.`
  },
  {
    id: 'gm-103',
    senderName: 'Google Workspace Cloud',
    senderEmail: 'workspace-noreply@google.com',
    subject: 'Security Alert: Gmail OAuth Gateway Synchronized',
    snippet: 'Your enterprise PropertyHub360 CRM cloud instance was successfully granted API scope...',
    time: 'Jun 24',
    isUnread: false,
    isStarred: false,
    folder: 'ARCHIVED',
    body: `Hello Admin,\n\nYour Google Workspace OAuth 2.0 API connection for propertyhub360-prod was successfully verified. Bi-directional email sync is active.`,
    leadScore: 0,
    customerTier: 'System Notification',
    interest: 'N/A',
    aiSummary: ['OAuth token successfully synchronized with CRM backend.'],
    suggestedReply: 'N/A'
  }
];

export default function GmailCenterPage() {
  const [emails, setEmails] = useState<EmailThread[]>(mockEmails);
  const [activeId, setActiveId] = useState<string>('gm-101');
  const [activeFolder, setActiveFolder] = useState<string>('INBOX');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [replyText, setReplyText] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const folders = [
    { id: 'INBOX', label: 'Inbox', count: emails.filter(e => e.folder === 'INBOX' && e.isUnread).length },
    { id: 'STARRED', label: 'Starred', count: 0 },
    { id: 'SENT', label: 'Sent', count: 0 },
    { id: 'DRAFTS', label: 'Drafts', count: 0 },
    { id: 'ARCHIVED', label: 'Archived', count: 0 },
  ];

  const filteredEmails = emails.filter(e => {
    const matchesSearch = e.subject.toLowerCase().includes(searchQuery.toLowerCase()) || e.senderName.toLowerCase().includes(searchQuery.toLowerCase()) || e.body.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeFolder === 'STARRED') return e.isStarred;
    if (activeFolder !== 'INBOX') return e.folder === activeFolder;
    return e.folder === 'INBOX';
  });

  const activeEmail = emails.find(e => e.id === activeId) || filteredEmails[0];

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    setFeedback(`Dispatched official Gmail response to ${activeEmail?.senderEmail}. Logged bi-directional CRM activity.`);
    setReplyText('');
    setTimeout(() => setFeedback(null), 4000);
  };

  const toggleStar = (id: string, e: any) => {
    e.stopPropagation();
    setEmails(emails.map(item => item.id === id ? { ...item, isStarred: !item.isStarred } : item));
  };

  const deleteEmail = (id: string, e?: any) => {
    e?.stopPropagation();
    setEmails(emails.filter(item => item.id !== id));
    setFeedback('Email moved to Google Workspace Trash.');
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-slate-950 text-slate-100 font-sans">
      
      {/* LEFT PANEL (25%): THREAD LIST */}
      <div className="w-1/4 flex flex-col border-r border-slate-800 bg-slate-900/40">
        <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm border border-rose-500/30 shadow">
              M
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                aashish.kumar@propertyhub.com
              </div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Connected Gmail Workspace
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-slate-800/60">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search Gmail threads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-rose-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Folders */}
        <div className="px-3 py-2 border-b border-slate-800/60 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {folders.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFolder(f.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                activeFolder === f.id
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{f.label}</span>
              {f.count > 0 && <span className="px-1.5 py-0.2 rounded-full bg-slate-950 text-[9px] font-bold text-rose-300">{f.count}</span>}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
          {filteredEmails.map((email) => {
            const isSelected = activeEmail?.id === email.id;
            return (
              <div
                key={email.id}
                onClick={() => {
                  setActiveId(email.id);
                  setEmails(emails.map(i => i.id === email.id ? { ...i, isUnread: false } : i));
                }}
                className={`p-3.5 cursor-pointer transition flex items-start gap-3 hover:bg-slate-800/50 ${
                  isSelected ? 'bg-slate-800/90 border-l-4 border-rose-500' : ''
                }`}
              >
                <button onClick={(e) => toggleStar(email.id, e)} className="mt-1 text-slate-500 hover:text-amber-400">
                  <Star className={`h-3.5 w-3.5 ${email.isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs truncate ${email.isUnread ? 'font-extrabold text-white' : 'font-semibold text-slate-300'}`}>{email.senderName}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">{email.time}</span>
                  </div>
                  <div className={`text-xs truncate mt-0.5 ${email.isUnread ? 'font-bold text-slate-100' : 'text-slate-400'}`}>{email.subject}</div>
                  <p className="text-[11px] text-slate-500 truncate mt-1">{email.snippet}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CENTER PANEL (50%): EMAIL WORKSPACE */}
      <div className="w-2/4 flex flex-col bg-slate-950 relative overflow-y-auto">
        {activeEmail ? (
          <>
            <div className="p-6 border-b border-slate-800 bg-slate-900/30">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-base font-bold text-white leading-snug">{activeEmail.subject}</h2>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => deleteEmail(activeEmail.id)} className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-rose-400 transition" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-600 to-pink-800 flex items-center justify-center font-bold text-white text-sm">
                    {activeEmail.senderName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{activeEmail.senderName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{activeEmail.senderEmail}</div>
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-500 font-mono">
                  <div>{activeEmail.time}</div>
                  <div className="text-emerald-400 flex items-center gap-1 justify-end mt-0.5"><CheckCircle2 className="h-3 w-3" /> SPF/DKIM Verified</div>
                </div>
              </div>
            </div>

            {feedback && (
              <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-6 py-2.5 text-xs text-emerald-300 flex items-center gap-2 animate-fade-in">
                <Sparkles className="h-4 w-4 text-emerald-400 animate-spin" />
                {feedback}
              </div>
            )}

            {/* Email Body */}
            <div className="p-8 flex-1 bg-slate-950 text-slate-200 text-xs leading-loose whitespace-pre-wrap font-sans select-text">
              {activeEmail.body}
            </div>

            {/* Reply Box */}
            <div className="p-6 border-t border-slate-800 bg-slate-900/40">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3 focus-within:border-rose-500 transition">
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-2">
                  <span>Reply to <strong className="text-white">{activeEmail.senderEmail}</strong></span>
                  <span className="font-mono text-[10px] text-slate-500">HTML Enterprise Mailer</span>
                </div>
                <textarea
                  rows={4}
                  placeholder={`Compose institutional email reply...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-transparent text-xs text-white placeholder-slate-600 focus:outline-none font-sans leading-relaxed"
                />
                <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                  <div className="flex items-center gap-1 text-slate-500">
                    <button className="p-1.5 hover:text-white rounded hover:bg-slate-900"><Paperclip className="h-4 w-4" /></button>
                  </div>
                  <button
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-5 py-2 text-xs font-bold text-white hover:bg-rose-400 transition disabled:opacity-50"
                  >
                    <Send className="h-3.5 w-3.5" /> Send via Gmail
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>

      {/* RIGHT PANEL (25%): AI COPILOT & CRM LINK */}
      <div className="w-1/4 flex flex-col border-l border-slate-800 bg-slate-900/40 p-4 space-y-4 overflow-y-auto">
        {activeEmail ? (
          <>
            {/* AI Summary Card */}
            <div className="rounded-2xl border border-rose-500/40 bg-gradient-to-br from-rose-950/30 via-slate-900/80 to-slate-900 p-4 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider">
                  <Sparkles className="h-4 w-4" /> Stitch AI Briefing
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeEmail.aiSummary.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0"></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {activeEmail.suggestedReply && activeEmail.suggestedReply !== 'N/A' && (
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <div className="text-[10px] text-slate-400 font-semibold mb-1">AI Suggested Draft Response</div>
                  <button
                    onClick={() => setReplyText(activeEmail.suggestedReply)}
                    className="w-full py-2 px-3 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-semibold border border-rose-500/40 transition text-left truncate"
                  >
                    + Insert AI Draft Response
                  </button>
                </div>
              )}
            </div>

            {/* CRM Intelligence */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                <User className="h-4 w-4 text-blue-400" /> CRM Record Intelligence
              </h4>
              {activeEmail.leadScore > 0 ? (
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Lead Score:</span>
                    <span className="font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">{activeEmail.leadScore}/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Status:</span>
                    <span className="font-semibold text-white">{activeEmail.customerTier}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Interest:</span>
                    <span className="font-semibold text-amber-300 truncate max-w-36">{activeEmail.interest}</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500 py-2">System Admin Notification</div>
              )}
            </div>
          </>
        ) : null}
      </div>

    </div>
  );
}
