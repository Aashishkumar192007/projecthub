'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { residentCopilot } from '@/lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  id: number;
  text: string;
  sender: 'ai' | 'user';
};

export function ResidentCopilot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: residentCopilot.message, sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user' }]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "I've noted your request and submitted a priority notification to the management office. You can track this in your Service Requests.";
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes('gym') || lowerText.includes('book')) {
        aiResponse = "I can help you book the Fitness Center. Navigating you to the Facilities module now, where I've pre-filled a request for tomorrow morning.";
      } else if (lowerText.includes('pay') || lowerText.includes('invoice') || lowerText.includes('due')) {
        aiResponse = "You currently have one pending invoice for July Rent. Would you like me to process payment using your Wallet Balance?";
      }

      setMessages(prev => [...prev, { id: Date.now(), text: aiResponse, sender: 'ai' }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="w-80 lg:w-[360px] border-l border-[#2A2A30] bg-[#161616] h-full flex flex-col relative z-20">
      
      {/* Header */}
      <div className="p-6 border-b border-[#2A2A30]">
        <p className="text-[10px] font-bold tracking-widest text-amber-500 uppercase mb-1">Intelligence Copilot</p>
        <h2 className="text-lg font-bold text-white tracking-wide mb-1">AI Resident Assistant</h2>
        <p className="text-xs text-[#A1A1AA]">Ready to assist with your property needs.</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex items-start gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {msg.sender === 'ai' ? (
                <div className="w-8 h-8 rounded-lg bg-[#332200] border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={16} className="text-amber-500" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#2A2A30] border border-[#3F3F46] flex items-center justify-center flex-shrink-0 mt-1 text-xs">
                  👨‍💼
                </div>
              )}
              
              <div className={`p-4 text-xs leading-relaxed shadow-lg ${
                msg.sender === 'ai' 
                  ? 'bg-[#1E1E1E] border border-[#2A2A30] rounded-xl rounded-tl-sm text-[#E5E7EB]' 
                  : 'bg-[#4F84FF] text-white rounded-xl rounded-tr-sm'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#332200] border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-1">
              <Bot size={16} className="text-amber-500" />
            </div>
            <div className="bg-[#1E1E1E] border border-[#2A2A30] rounded-xl rounded-tl-sm p-4 flex items-center gap-1.5 h-[50px]">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0.15s' }}></div>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </motion.div>
        )}

        {/* Action Pills - only show if there's just 1 message */}
        {messages.length === 1 && (
          <div className="space-y-3 pt-4 pl-12">
            {residentCopilot.actions.map((action, i) => (
              <button 
                key={i} 
                onClick={() => handleSend(action)}
                className="block w-fit px-4 py-2 bg-[#222222] hover:bg-[#2A2A30] border border-[#333333] text-[#A1A1AA] hover:text-white rounded-full text-xs font-bold transition-colors text-left"
              >
                {action}
              </button>
            ))}
          </div>
        )}
        
        <div ref={endRef} />
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-[#2A2A30] bg-[#111111]">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="relative">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Copilot..." 
            className="w-full bg-[#1A1A1A] border border-[#2A2A30] rounded-lg py-3 pl-4 pr-12 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-amber-500/50 transition-colors"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-amber-500 hover:bg-amber-500/10 disabled:opacity-50 disabled:hover:bg-transparent rounded transition-colors"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

    </div>
  );
}
