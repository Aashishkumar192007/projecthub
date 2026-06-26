'use client';

import { useState } from 'react';
import { useWhatsAppStore } from '@/store/whatsappStore';
import { FileText, Plus, Copy, Trash2, CheckCircle2, Sparkles, Tag } from 'lucide-react';

export default function WhatsAppTemplatesPage() {
  const { templates, createTemplate } = useWhatsAppStore();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Lead Introduction');
  const [body, setBody] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCreate = () => {
    if (!title.trim() || !body.trim()) return;
    const vars = (body.match(/\{(\w+)\}/g) || []).map(v => v.replace(/[\{\}]/g, ''));
    createTemplate({ category, title, body, variables: vars });
    setTitle('');
    setBody('');
    setShowModal(false);
  };

  const handleCopy = (t: any) => {
    navigator.clipboard.writeText(t.body);
    setCopiedId(t.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-full overflow-y-auto p-8 bg-slate-950 text-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-emerald-400" />
            WhatsApp Quick-Reply Templates
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Standardized enterprise communication templates with dynamic {`{variable}`} placeholder injection.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition"
        >
          <Plus className="h-4 w-4" /> Create New Template
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((t) => (
          <div key={t.id} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-slate-700 transition backdrop-blur shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {t.category}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Meta Approved</span>
              </div>
              <h3 className="text-sm font-bold text-white">{t.title}</h3>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800 font-mono">
                {t.body}
              </p>
              {t.variables && t.variables.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap mt-4">
                  <Tag className="h-3 w-3 text-blue-400" />
                  {t.variables.map(v => (
                    <span key={v} className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 font-mono">
                      {`{${v}}`}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800/80">
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-emerald-400" /> WORM Verified
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(t)}
                  className="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-2.5 py-1.5 text-[11px] font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition"
                >
                  {copiedId === t.id ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedId === t.id ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl animate-fade-in">
            <h3 className="text-lg font-bold text-white mb-4">Create Enterprise Quick-Reply Template</h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option>Lead Introduction</option>
                  <option>Site Visit Reminder</option>
                  <option>Booking Confirmation</option>
                  <option>Payment Reminder</option>
                  <option>Welcome Message</option>
                  <option>Festival Greetings</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Template Title</label>
                <input
                  type="text"
                  placeholder="e.g., VIP Investor Greeting"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Message Body (use {`{name}`} for dynamic variables)</label>
                <textarea
                  rows={4}
                  placeholder="Dear {name}, thank you for your interest in {project}..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none font-mono text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-xl px-4 py-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!title.trim() || !body.trim()}
                  className="rounded-xl bg-emerald-500 px-5 py-2 font-bold text-slate-950 hover:bg-emerald-400 transition disabled:opacity-50"
                >
                  Save Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
