'use client';

import { useRevenueIntelligenceStore } from '@/store/revenueIntelligenceStore';
import { Bot, Send, User, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function ExecutiveAICopilot() {
  const { kpis } = useRevenueIntelligenceStore();
  const [messages, setMessages] = useState([
    { id: '1', role: 'ai', content: `Good morning. I've analyzed the overnight data. Our pipeline velocity increased by 2.4%, pushing our expected Q3 revenue to $${(kpis.forecastRevenue / 1000000).toFixed(1)}M. However, I noticed a bottleneck in the South Region. How can I help you today?` }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Mock AI Response
    setTimeout(() => {
      let aiResponse = "I'm analyzing that request now. Based on current CRM data, ";
      
      if (input.toLowerCase().includes('south region')) {
        aiResponse += "the South Region bottleneck is primarily due to a 15% drop in site visits over the last two weeks, despite stable lead generation. It appears the current marketing creative is attracting low-intent buyers. I recommend reallocating $15k to retargeting campaigns.";
      } else if (input.toLowerCase().includes('forecast') || input.toLowerCase().includes('revenue')) {
        aiResponse += `we are currently at ${((kpis.totalRevenue / kpis.targetRevenue) * 100).toFixed(1)}% of our target. If current conversion rates hold, we will exceed our goal by $4.2M.`;
      } else {
        aiResponse += "there are no immediate anomalies. Would you like me to run a full diagnostic on the active pipeline or generate a summary report for the board?";
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', content: aiResponse }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-black">
      
      <div className="p-6 border-b border-neutral-800 flex items-center justify-between shrink-0 bg-[#0A0A0A]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center border border-[#00E5FF]/30">
            <Bot className="w-5 h-5 text-[#00E5FF]" />
          </div>
          <div>
            <h1 className="text-lg font-medium text-white tracking-wide">Palantir AI Executive Copilot</h1>
            <p className="text-xs text-[#00E5FF]">Connected to CRM, Property, and Revenue engines.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-neutral-800' : 'bg-[#121212] border border-[#00E5FF]/20'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-neutral-400" /> : <Sparkles className="w-4 h-4 text-[#00E5FF]" />}
              </div>
              
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-neutral-800 text-white rounded-tr-sm' 
                  : 'bg-[#121212] border border-neutral-800 text-neutral-300 rounded-tl-sm'
              }`}>
                {msg.content}
              </div>

            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 bg-[#0A0A0A] border-t border-neutral-800 shrink-0">
        <div className="flex gap-2 mb-4">
          <button onClick={() => setInput("Why is the South Region underperforming?")} className="px-3 py-1.5 bg-[#121212] border border-neutral-800 rounded-full text-xs text-neutral-400 hover:text-white transition-colors">
            Analyze South Region
          </button>
          <button onClick={() => setInput("What is our confidence score for the Q3 forecast?")} className="px-3 py-1.5 bg-[#121212] border border-neutral-800 rounded-full text-xs text-neutral-400 hover:text-white transition-colors">
            Check Forecast Confidence
          </button>
          <button onClick={() => setInput("Show me high churn risk brokers.")} className="px-3 py-1.5 bg-[#121212] border border-neutral-800 rounded-full text-xs text-neutral-400 hover:text-white transition-colors">
            Identify Broker Risk
          </button>
        </div>

        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Palantir anything about your sales, pipeline, or inventory..." 
            className="w-full h-14 bg-[#121212] border border-neutral-800 rounded-xl pl-5 pr-14 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF] transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-2 top-2 w-10 h-10 rounded-lg bg-[#00E5FF] hover:bg-[#00E5FF]/80 disabled:bg-neutral-800 disabled:text-neutral-600 flex items-center justify-center text-[#0A0A0A] transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
