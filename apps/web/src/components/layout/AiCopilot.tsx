'use client';

import React, { useState } from 'react';
import { Sparkles, AlertCircle, TrendingUp, Clock, Send, Bot, User, CheckCircle2, Zap } from 'lucide-react';

export default function AiCopilot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your AI CRM Copilot 360. How can I assist your enterprise portfolio today?' }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const quickCommands = [
    'Show high value leads (> $2M)',
    'Draft follow-up email',
    'Recommend discount limit',
    'Trigger booking agreement',
    'Forecast Q3 collections',
    'Run KYC sign-off audit'
  ];

  const handleSend = (query?: string) => {
    const textToSend = query || input;
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    if (!query) setInput('');
    setIsThinking(true);

    setTimeout(() => {
      let botResp = `Analyzed 10,000+ institutional records. Based on multi-company telemetry, execution completed cleanly for: "${textToSend}".`;
      if (textToSend.includes('high value')) {
        botResp = `Found 14 Syndicated Leads with budget > $2M. Top prospect: Marcus Vance ($2.4M Marina Heights Penthouse). Probability to close: 88%.`;
      } else if (textToSend.includes('discount')) {
        botResp = `RBAC Recommendation: Max allowable discount for Tier-1 Tower B is 6.5%. Anything higher requires Director + Finance sign-off.`;
      } else if (textToSend.includes('email')) {
        botResp = `Draft generated: "Dear Marcus, following our visit to Marina Heights, I have attached the tokenized E-Agreement..." (Ready to dispatch via Postmark).`;
      } else if (textToSend.includes('KYC')) {
        botResp = `AML Verification ran against OFAC & Interpol databases. 100% of pending residents cleared. Certificate generated in WORM vault.`;
      }
      setMessages(prev => [...prev, { sender: 'bot', text: botResp }]);
      setIsThinking(false);
    }, 900);
  };

  return (
    <div className="w-80 border-l border-[#2A2A30] bg-[#111111] h-full flex flex-col shrink-0 hidden xl:flex text-white">
      {/* Header */}
      <div className="p-4 border-b border-[#2A2A30] flex items-center justify-between bg-[#16161C]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-blue/20 text-brand-blue animate-pulse">
            <Sparkles size={16} />
          </div>
          <span className="font-extrabold text-white text-sm tracking-wide">AI Copilot 360</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          GEMINI 2.5
        </span>
      </div>
      
      {/* Chat Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${msg.sender === 'bot' ? 'bg-brand-blue text-[#111111]' : 'bg-[#2A2A30] text-white'}`}>
              {msg.sender === 'bot' ? <Bot size={14} /> : <User size={14} />}
            </div>
            <div className={`p-3 rounded-xl max-w-[210px] leading-relaxed ${msg.sender === 'bot' ? 'bg-[#161622] border border-brand-blue/30 text-neutral-200' : 'bg-brand-blue text-[#111111] font-semibold'}`}>
              {msg.text}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex gap-2 items-center text-[#71717A] text-[11px] font-mono pl-10">
            <Sparkles size={12} className="animate-spin text-brand-blue" /> Copilot is calculating insights...
          </div>
        )}
      </div>

      {/* Quick Command Pills */}
      <div className="px-4 py-2 bg-[#16161C] border-t border-[#2A2A30]">
        <span className="text-[10px] font-mono text-[#71717A] uppercase block mb-2 font-bold">COPILOT COMMAND LAUNCHPAD</span>
        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
          {quickCommands.map((qc) => (
            <button
              key={qc}
              onClick={() => handleSend(qc)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-[#1A1A20] hover:bg-brand-blue hover:text-[#111111] border border-[#2A2A30] text-[#A1A1AA] text-left transition-all font-semibold flex items-center gap-1"
            >
              <Zap size={10} className="text-amber-400 shrink-0" /> {qc}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Bar */}
      <div className="p-4 border-t border-[#2A2A30] bg-[#111111]">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative flex items-center">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI Copilot anything..." 
            className="w-full bg-[#16161C] border border-[#2A2A30] rounded-xl py-2.5 pl-3 pr-10 text-xs text-white placeholder:text-[#71717A] focus:outline-none focus:border-brand-blue transition-colors"
          />
          <button type="submit" className="absolute right-2 text-[#A1A1AA] hover:text-brand-blue p-1 transition-colors">
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
export { AiCopilot };
