'use client';

import { useCrmStore } from '@/store/crmStore';
import { AlertTriangle, UserMinus, RotateCcw, Calendar, TrendingDown, Target } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function ChurnIntelligence() {
  const { leads, bookings } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock analysis logic based on CRM data
  const lostLeads = leads.filter(l => l.stage === 'LOST');
  const inactiveLeads = leads.filter(l => l.score < 20 && l.stage !== 'LOST' && l.stage !== 'BOOKED');
  
  // Create mock churn analysis entries
  const churnAnalysis = [
    ...lostLeads.slice(0, 3).map(l => ({ ...l, type: 'LOST_LEAD', reason: 'Budget mismatch', impact: 450000, recoveryAction: 'Downsell to 2BHK' })),
    ...inactiveLeads.slice(0, 3).map(l => ({ ...l, type: 'INACTIVE', reason: 'Unresponsive > 30 days', impact: 280000, recoveryAction: 'Automated SMS Campaign' })),
    { id: 'c-1', name: 'James Peterson', email: 'james@example.com', type: 'CANCELLED_BOOKING', reason: 'Financing fell through', impact: 850000, recoveryAction: 'Refer to partner mortgage broker' },
    { id: 'c-2', name: 'Sarah Wu', email: 'sarah@example.com', type: 'ABANDONED_NEGOTIATION', reason: 'Competitor matched price', impact: 620000, recoveryAction: 'Manager Intervention / Match Offer' },
  ];

  const filteredChurn = churnAnalysis.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalAtRiskValue = churnAnalysis.reduce((acc, c) => acc + c.impact, 0);

  return (
    <div className="p-8 h-full overflow-y-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-white tracking-wide">Churn & Lost Lead Intelligence</h1>
          <p className="text-neutral-500 mt-2">Analyze pipeline leakage, abandoned deals, and AI-prescribed recovery actions.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden border-b-2 border-b-red-500/50">
          <div className="flex items-center gap-2 text-red-400 mb-3">
            <UserMinus className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Lost / Cancelled</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">{lostLeads.length + 1}</div>
          <div className="text-xs text-neutral-500">Trailing 30 days</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden border-b-2 border-b-amber-500/50">
          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">At Risk / Inactive</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">{inactiveLeads.length + 1}</div>
          <div className="text-xs text-neutral-500">Pipeline leakage</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-[#00E5FF] mb-3">
            <TrendingDown className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Pipeline Value at Risk</span>
          </div>
          <div className="text-3xl font-medium text-[#00E5FF] mb-2">${(totalAtRiskValue / 1000000).toFixed(2)}M</div>
          <div className="text-xs text-neutral-500">From highly qualified leads</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden border-b-2 border-b-green-500/50">
          <div className="flex items-center gap-2 text-green-400 mb-3">
            <RotateCcw className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">AI Recovery Rate</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">14%</div>
          <div className="text-xs text-neutral-500">Historical reactivation</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        
        {/* Main Churn Table */}
        <div className="col-span-2 bg-[#121212] border border-neutral-800 rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-[#1A1C20]">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Leakage & Recovery Interventions</h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 h-8 bg-neutral-900 border border-neutral-800 rounded px-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-[#1A1C20] border-b border-neutral-800">
                <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  <th className="px-6 py-4 font-medium">CONTACT</th>
                  <th className="px-6 py-4 font-medium">EVENT TYPE</th>
                  <th className="px-6 py-4 font-medium">IDENTIFIED REASON</th>
                  <th className="px-6 py-4 font-medium text-right">VALUE IMPACT</th>
                  <th className="px-6 py-4 font-medium text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredChurn.map((item, idx) => (
                  <tr key={item.id || idx} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">{item.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${
                        item.type === 'CANCELLED_BOOKING' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        item.type === 'ABANDONED_NEGOTIATION' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                        item.type === 'INACTIVE' ? 'bg-neutral-800 text-neutral-400 border-neutral-700' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {item.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-300">
                      {item.reason}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-[#00E5FF] font-medium">${(item.impact / 1000).toFixed(0)}K</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => toast.success('Intervention Started', { description: `Triggered: ${item.recoveryAction}` })}
                        className="text-xs text-green-400 hover:text-green-300 hover:underline px-3 py-1 bg-green-500/10 rounded"
                        title={item.recoveryAction}
                      >
                        Trigger Recovery
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Root Cause Analysis */}
        <div className="space-y-6">
          <div className="bg-[#1A1C20] border border-neutral-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-[#00E5FF] uppercase tracking-widest mb-6">AI Root Cause Analysis</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-black/40 border border-neutral-800/50 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white">#1 Reason: Pricing Competitiveness</h4>
                  <span className="text-xs text-red-400">38% of losses</span>
                </div>
                <div className="w-full bg-neutral-900 rounded-full h-1.5 mb-3">
                  <div className="bg-red-400 h-1.5 rounded-full" style={{ width: '38%' }}></div>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Competitor 'Nova Towers' recently dropped prices by 5%. This directly correlates with an uptick in abandoned negotiations in our South Region projects.
                </p>
              </div>

              <div className="p-4 bg-black/40 border border-neutral-800/50 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white">#2 Reason: Financing Rejection</h4>
                  <span className="text-xs text-amber-400">22% of cancellations</span>
                </div>
                <div className="w-full bg-neutral-900 rounded-full h-1.5 mb-3">
                  <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '22%' }}></div>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Recent interest rate hikes have caused mortgage pre-approvals to fail just before booking confirmation. Recommend stronger tie-ups with secondary NBFCs.
                </p>
              </div>

              <div className="p-4 bg-black/40 border border-neutral-800/50 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white">#3 Reason: Slow Response</h4>
                  <span className="text-xs text-blue-400">15% of inactive</span>
                </div>
                <div className="w-full bg-neutral-900 rounded-full h-1.5 mb-3">
                  <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '15%' }}></div>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Leads generated outside business hours are going cold before they are contacted. Reassign night-shift callers or implement an AI scheduling bot.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
