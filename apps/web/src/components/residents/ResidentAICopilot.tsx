'use client';

import React from 'react';
import { Sparkles, TrendingUp, AlertCircle, ShieldAlert, CheckCircle, ChevronRight, Users } from 'lucide-react';

export function ResidentAICopilot() {
  return (
    <div className="w-80 border-l border-white/10 bg-black/40 backdrop-blur-xl flex flex-col h-full overflow-y-auto shrink-0">
      <div className="p-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-black/40 backdrop-blur-xl z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <h2 className="text-sm font-semibold text-white/90 tracking-wide uppercase">AI Copilot</h2>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Top Insights */}
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider">Community Engagement</h3>
            </div>
            <p className="text-2xl font-light text-white tracking-tight">85<span className="text-sm text-white/40">/100</span></p>
            <p className="text-xs text-emerald-400 mt-1">High participation in recent polls</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider">Complaint Risk</h3>
            </div>
            <p className="text-2xl font-light text-white tracking-tight">12%</p>
            <p className="text-xs text-amber-400 mt-1">Spike in plumbing issues in Tower B</p>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider px-1">Suggested Actions</h3>
          
          <div className="group bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/20 transition-all rounded-xl p-3 cursor-pointer">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-white/90 font-medium mb-1">Amenity Utilization</p>
                <p className="text-xs text-white/60 leading-relaxed">Clubhouse occupancy drops by 40% on weekdays. Offer a mid-week discount.</p>
                <button className="text-xs text-blue-400 font-medium mt-2 flex items-center gap-1 hover:text-blue-300">
                  Create Promotion <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="group bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/20 transition-all rounded-xl p-3 cursor-pointer">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-white/90 font-medium mb-1">Defaulter Prediction</p>
                <p className="text-xs text-white/60 leading-relaxed">5 tenants have historically delayed maintenance payments beyond 30 days.</p>
                <button className="text-xs text-amber-400 font-medium mt-2 flex items-center gap-1 hover:text-amber-300">
                  Send Reminders <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
