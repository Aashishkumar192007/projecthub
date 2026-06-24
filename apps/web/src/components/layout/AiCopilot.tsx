'use client';

import { Sparkles, AlertCircle, TrendingUp, Clock } from 'lucide-react';

export function AiCopilot() {
  return (
    <div className="w-80 border-l border-gray-800 bg-background h-full flex flex-col hidden lg:flex">
      <div className="p-4 border-b border-gray-800 flex items-center gap-2">
        <Sparkles size={16} className="text-primary" />
        <span className="font-semibold text-text-primary text-sm tracking-wide">PropertyHub Copilot</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Insights Section */}
        <div>
          <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Live Insights</h4>
          <div className="space-y-3">
            <div className="glass-panel p-3 rounded-lg border-l-2 border-l-warning cursor-pointer hover:bg-workspace-surface transition-colors">
              <div className="flex gap-2 items-start">
                <AlertCircle size={14} className="text-warning mt-0.5" />
                <div>
                  <p className="text-sm text-text-primary font-medium">Revenue Risk Detected</p>
                  <p className="text-xs text-text-secondary mt-1">3 commercial leases in Skyline Tower expire in 60 days. Risk of 15% occupancy drop.</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-3 rounded-lg border-l-2 border-l-success cursor-pointer hover:bg-workspace-surface transition-colors">
              <div className="flex gap-2 items-start">
                <TrendingUp size={14} className="text-success mt-0.5" />
                <div>
                  <p className="text-sm text-text-primary font-medium">Yield Opportunity</p>
                  <p className="text-xs text-text-secondary mt-1">Maintenance costs in Block B are 20% below average. Adjusting HVAC schedules could yield +5% savings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div>
          <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Recent AI Actions</h4>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Clock size={12} className="text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-text-primary">Auto-dispatched Work Order #492</p>
                <p className="text-[10px] text-text-secondary mt-0.5">2 mins ago</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-800">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ask Copilot..." 
            className="w-full bg-workspace-surface border border-gray-700 rounded-md py-2 px-3 text-sm text-text-primary placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
          />
          <button className="absolute right-2 top-2 text-primary hover:text-indigo-400">
            <Sparkles size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
