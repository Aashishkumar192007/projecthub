'use client';

import React from 'react';
import { Sparkles, TrendingUp, AlertCircle, ShieldAlert, CheckCircle, ChevronRight, Activity } from 'lucide-react';

export function CustomerAICopilot() {
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
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider">Portfolio Growth</h3>
            </div>
            <p className="text-2xl font-light text-white tracking-tight">₹1.24B</p>
            <p className="text-xs text-emerald-400 mt-1">+12.4% vs last quarter</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider">Payment Risk</h3>
            </div>
            <p className="text-2xl font-light text-white tracking-tight">14</p>
            <p className="text-xs text-amber-400 mt-1">High-risk accounts require attention</p>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider px-1">Recommended Actions</h3>
          
          <div className="group bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/20 transition-all rounded-xl p-3 cursor-pointer">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-white/90 font-medium mb-1">Cross-Sell Opportunity</p>
                <p className="text-xs text-white/60 leading-relaxed">24 owners in Marina Heights have high propensity for parking slot upgrades.</p>
                <button className="text-xs text-blue-400 font-medium mt-2 flex items-center gap-1 hover:text-blue-300">
                  Generate Campaign <ChevronRight className="w-3 h-3" />
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
                <p className="text-sm text-white/90 font-medium mb-1">Compliance Risk</p>
                <p className="text-xs text-white/60 leading-relaxed">12 corporate clients have pending KYC renewals this month.</p>
                <button className="text-xs text-amber-400 font-medium mt-2 flex items-center gap-1 hover:text-amber-300">
                  Send Reminders <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="group bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/20 transition-all rounded-xl p-3 cursor-pointer">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-white/90 font-medium mb-1">Retention Strategy</p>
                <p className="text-xs text-white/60 leading-relaxed">Schedule annual review meetings with top 10 VIP investors.</p>
                <button className="text-xs text-emerald-400 font-medium mt-2 flex items-center gap-1 hover:text-emerald-300">
                  Auto-Schedule <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Health Score */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center">
          <Activity className="w-8 h-8 text-blue-400 mb-2" />
          <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">System Health Score</p>
          <p className="text-4xl font-light text-white tracking-tight mb-2">92<span className="text-lg text-white/40">/100</span></p>
          <div className="w-full bg-white/10 rounded-full h-1.5 mb-2">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
          </div>
          <p className="text-xs text-white/50">Overall customer ecosystem is stable</p>
        </div>
      </div>
    </div>
  );
}
