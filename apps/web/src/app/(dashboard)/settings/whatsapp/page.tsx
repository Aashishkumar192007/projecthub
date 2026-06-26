'use client';

import { useState, useEffect } from 'react';
import { useWhatsAppStore } from '@/store/whatsappStore';
import { QrCode, Smartphone, ShieldCheck, RefreshCw, LogOut, CheckCircle2, Phone, Laptop, AlertCircle, ExternalLink } from 'lucide-react';

export default function WhatsAppSessionSettingsPage() {
  const { session, connectSession, disconnectSession, triggerQrScan } = useWhatsAppStore();
  const [phoneInput, setPhoneInput] = useState(session.phone || '9876543210');
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!session.qrCode?.includes('web.whatsapp.com')) {
      triggerQrScan();
    }
  }, []);

  const handleConnect = () => {
    if (!phoneInput.trim() || phoneInput.length < 10) {
      setFeedback('Error: Please enter a valid 10-digit mobile number.');
      return;
    }
    connectSession(phoneInput);
    setFeedback('Success: WhatsApp Web Session successfully paired and authenticated!');
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleDisconnect = () => {
    disconnectSession();
    setFeedback('Session unlinked. All local tokens wiped.');
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto p-8 font-sans">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
            <ShieldCheck className="h-4 w-4" /> User Isolated Workspace Cloud
          </div>
          <h1 className="text-2xl font-bold text-white mt-1">Personal WhatsApp Session Integration</h1>
          <p className="text-xs text-slate-400 mt-2">
            Every PropertyHub CRM user maintains a dedicated, highly private WhatsApp session. Executive A cannot view Executive B's chats or contacts.
          </p>
        </div>

        {feedback && (
          <div className={`p-4 rounded-xl border text-xs font-bold flex items-center gap-2 animate-fade-in ${
            feedback.startsWith('Error') ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}>
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            {feedback}
          </div>
        )}

        {/* Status Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center font-bold text-lg border ${
                session.status === 'CONNECTED'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-800 text-slate-500 border-slate-700'
              }`}>
                <Smartphone className="h-7 w-7" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">+91 {session.phone || 'Not Paired'}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    session.status === 'CONNECTED' ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {session.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-3 font-mono">
                  <span className="flex items-center gap-1"><Laptop className="h-3.5 w-3.5" /> {session.device || 'Cloud Instance'}</span>
                  <span>Sync: {session.lastSync || 'Never'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {session.status === 'CONNECTED' ? (
                <button
                  onClick={handleDisconnect}
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-xs font-bold text-rose-300 hover:bg-rose-500 hover:text-white transition"
                >
                  <LogOut className="h-4 w-4" /> Disconnect Session
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* QR Scanner & Manual Pairing Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          {/* QR Pairing Panel */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <QrCode className="h-5 w-5 text-emerald-400" /> WhatsApp Web QR Pairing
            </h4>
            <p className="text-xs text-slate-400 max-w-sm">
              Scan or click this QR code to link your individual WhatsApp Web account directly.
            </p>

            <div className="p-4 rounded-2xl bg-white shadow-2xl my-2 relative group cursor-pointer">
              <a href="https://web.whatsapp.com" target="_blank" rel="noreferrer">
                <img
                  src={session.qrCode || `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent('https://web.whatsapp.com')}`}
                  alt="WhatsApp Web QR Code"
                  className="h-44 w-44 object-contain"
                />
              </a>
              <div className="absolute inset-0 bg-slate-950/90 hidden group-hover:flex flex-col gap-2 items-center justify-center rounded-2xl p-3">
                <a
                  href="https://web.whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-emerald-500 text-slate-950 text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
                >
                  Open WhatsApp Web ↗
                </a>
                <button onClick={(e) => { e.preventDefault(); triggerQrScan(); }} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-[10px] flex items-center gap-1.5 hover:bg-slate-700">
                  <RefreshCw className="h-3 w-3 animate-spin" /> Regenerate QR
                </button>
              </div>
            </div>

            <a
              href="https://web.whatsapp.com"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition flex items-center justify-center gap-2 shadow"
            >
              Launch WhatsApp Web (web.whatsapp.com) <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <span className="text-[10px] text-slate-500 font-mono">Links directly for individual session isolation</span>
          </div>

          {/* Manual Simulation Pairing */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-400" /> Quick Cloud Number Binding
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                For instant presentation and local development testing, enter your executive WhatsApp mobile number below to simulate immediate webhook authentication.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Executive Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-mono">+91</span>
                  <input
                    type="text"
                    maxLength={10}
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ''))}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-xs font-mono text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                    placeholder="9876543210"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleConnect}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-xs font-bold text-slate-950 hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="h-4 w-4" /> Authenticate Private WhatsApp Session
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
