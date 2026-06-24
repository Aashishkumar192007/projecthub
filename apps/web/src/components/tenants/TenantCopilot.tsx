'use client';

import { useTenantStore } from '@/store/tenantStore';
import { Bot, TrendingUp, AlertTriangle, ArrowRight, ShieldAlert, Sparkles, TrendingDown } from 'lucide-react';

export function TenantCopilot() {
  const { tenants, activeTenantId, getCalculatedHealth } = useTenantStore();
  
  if (!activeTenantId) return null;
  const activeTenant = tenants.find(t => t.id === activeTenantId);
  if (!activeTenant) return null;

  const { score, risk } = getCalculatedHealth(activeTenant);
  
  // Predictive Layer Mocks based on Score
  const renewalProbability = Math.min(100, Math.max(0, score + 12));
  const churnRisk = 100 - renewalProbability;
  const potentialLoss = activeTenant.type === 'Corporate' ? '₹15,00,000' : '₹1,20,000';
  
  const paymentRisk = activeTenant.paymentStatus === 'Delinquent' ? 'High' : 
                      activeTenant.paymentStatus === 'Pending' ? 'Moderate' : 'Low';

  return (
    <div className="w-72 border-l border-[#2A2A30] bg-[#111111] h-full flex flex-col shrink-0 overflow-y-auto z-10">
      
      {/* Header */}
      <div className="p-5 border-b border-[#2A2A30] bg-[#161616] flex items-center gap-3 sticky top-0 z-10">
        <div className="w-8 h-8 rounded-full bg-[linear-gradient(45deg,#00E5FF,#0066FF)] flex items-center justify-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
          <Bot size={16} className="text-white" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">AI Copilot 2.0 <Sparkles size={12} className="text-[#00E5FF]"/></h2>
          <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-bold">Predictive Engine</p>
        </div>
      </div>

      <div className="p-5 space-y-6">
        
        {/* Health Score Overview */}
        <div>
          <p className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-3">Calculated Health</p>
          <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 flex items-center gap-4">
            <div className={`text-4xl font-black ${score >= 71 ? 'text-success' : score >= 41 ? 'text-warning' : 'text-danger'}`}>
              {score}
            </div>
            <div className="flex-1">
              <p className={`text-xs font-bold uppercase ${score >= 71 ? 'text-success' : score >= 41 ? 'text-warning' : 'text-danger'}`}>{risk}</p>
              <div className="w-full h-1.5 bg-[#111111] rounded-full mt-2 overflow-hidden">
                <div className={`h-full rounded-full ${score >= 71 ? 'bg-success' : score >= 41 ? 'bg-warning' : 'bg-danger'}`} style={{ width: `${score}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Predictive Layer */}
        <div>
          <p className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-3">Predictive Layer</p>
          <div className="space-y-3">
            
            <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#A1A1AA] flex items-center gap-2"><TrendingUp size={14} className="text-brand-blue"/> Renewal Prob.</span>
                <span className="text-lg font-black text-white">{renewalProbability}%</span>
              </div>
              <p className="text-[10px] text-[#71717A]">Based on 3 yrs occupancy & comms.</p>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#A1A1AA] flex items-center gap-2"><ShieldAlert size={14} className={paymentRisk === 'High' ? 'text-danger' : 'text-warning'}/> Payment Risk</span>
                <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded border ${paymentRisk === 'High' ? 'border-danger text-danger bg-danger/10' : paymentRisk === 'Moderate' ? 'border-warning text-warning bg-warning/10' : 'border-success text-success bg-success/10'}`}>
                  {paymentRisk}
                </span>
              </div>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#A1A1AA] flex items-center gap-2"><TrendingDown size={14} className="text-danger"/> Rev Impact</span>
                <span className="text-sm font-black text-danger">-{potentialLoss}</span>
              </div>
              <p className="text-[10px] text-[#71717A]">If lease expires without renewal.</p>
            </div>

          </div>
        </div>

        {/* Action Engine */}
        <div>
          <p className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-3">Suggested Actions</p>
          <div className="space-y-2">
            
            {renewalProbability > 70 && (
              <button className="w-full flex items-center justify-between px-4 py-3 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] hover:border-brand-blue/50 rounded-xl transition-all group">
                <span className="text-xs font-bold text-white">Send Renewal Offer</span>
                <ArrowRight size={14} className="text-[#71717A] group-hover:text-brand-blue" />
              </button>
            )}

            {paymentRisk === 'High' && (
              <button className="w-full flex items-center justify-between px-4 py-3 bg-danger/10 hover:bg-danger/20 border border-danger/30 rounded-xl transition-all group">
                <span className="text-xs font-bold text-danger">Issue Legal Notice</span>
                <ArrowRight size={14} className="text-danger" />
              </button>
            )}

            <button className="w-full flex items-center justify-between px-4 py-3 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] hover:border-brand-blue/50 rounded-xl transition-all group">
              <span className="text-xs font-bold text-white">Schedule Check-in</span>
              <ArrowRight size={14} className="text-[#71717A] group-hover:text-brand-blue" />
            </button>
            
            <button className="w-full flex items-center justify-between px-4 py-3 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] hover:border-brand-blue/50 rounded-xl transition-all group">
              <span className="text-xs font-bold text-white">Generate Lease Draft</span>
              <ArrowRight size={14} className="text-[#71717A] group-hover:text-brand-blue" />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
