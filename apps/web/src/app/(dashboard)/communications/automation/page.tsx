'use client';

import { useWhatsAppStore } from '@/store/whatsappStore';
import { Bot, ArrowRight, Zap, CheckCircle2, XCircle, Play, Pause, Sparkles } from 'lucide-react';

export default function WhatsAppAutomationPage() {
  const { automations, toggleAutomation } = useWhatsAppStore();

  return (
    <div className="h-full overflow-y-auto p-8 bg-slate-950 text-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bot className="h-6 w-6 text-emerald-400" />
            WhatsApp Communication Automation Engine
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Event-driven triggers binding PropertyHub CRM entity lifecycles to instant WhatsApp dispatches.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-400">
          <Zap className="h-4 w-4 animate-pulse" /> 4 Active Pipelines
        </div>
      </div>

      <div className="space-y-4 max-w-4xl">
        {automations.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl border p-6 transition flex flex-col md:flex-row md:items-center justify-between gap-6 ${
              item.isActive
                ? 'border-emerald-500/30 bg-slate-900/60 shadow-lg shadow-emerald-500/5'
                : 'border-slate-800 bg-slate-900/20 opacity-75'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-bold shadow ${
                item.isActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-500'
              }`}>
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{item.trigger}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{item.action}</span>
                </div>
                <div className="text-xs text-slate-300 mt-1 flex items-center gap-2 font-mono">
                  <span>Template: <strong className="text-emerald-300">{item.templateTitle}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                item.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
              }`}>
                {item.isActive ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                {item.isActive ? 'Active Pipeline' : 'Paused'}
              </span>

              <button
                onClick={() => toggleAutomation(item.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                  item.isActive
                    ? 'bg-slate-800 text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 border border-slate-700'
                    : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                }`}
              >
                {item.isActive ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {item.isActive ? 'Pause Trigger' : 'Enable'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
