'use client';

import { useCrmStore } from '@/store/crmStore';
import { UserCircle, Star, Users, PieChart, Crown, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function CustomerIntelligence() {
  const { customers } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Enhance customer data with AI mock predictions
  const intelligenceCustomers = customers.map(c => {
    const isInvestor = c.segment === 'VIP' || c.budget > 1000000;
    const upgradeOpportunity = c.segment === 'VIP' ? 'High' : c.budget > 500000 ? 'Medium' : 'Low';
    const referralPotential = c.segment === 'VIP' ? 85 : c.segment === 'Hot' ? 60 : 30; // percentage
    
    return { ...c, isInvestor, upgradeOpportunity, referralPotential };
  });

  const filteredCustomers = intelligenceCustomers.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalInvestors = intelligenceCustomers.filter(c => c.isInvestor).length;
  const highUpgradePotential = intelligenceCustomers.filter(c => c.upgradeOpportunity === 'High').length;
  const avgReferralPotential = intelligenceCustomers.reduce((acc, c) => acc + c.referralPotential, 0) / Math.max(1, intelligenceCustomers.length);

  return (
    <div className="p-8 h-full overflow-y-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-white tracking-wide">Customer Intelligence</h1>
          <p className="text-neutral-500 mt-2">Analyze buyer types, predict upgrade opportunities, and identify high-value referral sources.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Customer Base</span>
          </div>
          <div className="text-3xl font-medium text-white mb-1">{customers.length}</div>
          <div className="text-xs text-neutral-500 mt-2">Active buyers and prospects</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <PieChart className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Investor Mix</span>
          </div>
          <div className="text-3xl font-medium text-white mb-1">{((totalInvestors / Math.max(1, customers.length)) * 100).toFixed(0)}%</div>
          <div className="text-xs text-neutral-500 mt-2">{totalInvestors} identified as investors</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <Crown className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Upgrade Candidates</span>
          </div>
          <div className="text-3xl font-medium text-white mb-1">{highUpgradePotential}</div>
          <div className="text-xs text-purple-400 mt-2">Ready for premium outreach</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            <Star className="w-4 h-4 text-green-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Avg Referral Score</span>
          </div>
          <div className="text-3xl font-medium text-white mb-1">{avgReferralPotential.toFixed(1)}</div>
          <div className="w-full bg-neutral-800 rounded-full h-1.5 mt-3">
             <div className="bg-green-400 h-1.5 rounded-full" style={{ width: `${avgReferralPotential}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        
        {/* Customer Matrix Table */}
        <div className="col-span-2 bg-[#121212] border border-neutral-800 rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Customer Prediction Matrix</h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search customers..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 h-8 bg-neutral-900 border border-neutral-800 rounded px-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
              />
            </div>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-[#1A1C20] border-b border-neutral-800">
                <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  <th className="px-6 py-4 font-medium">CUSTOMER</th>
                  <th className="px-6 py-4 font-medium text-center">BUYER PERSONA</th>
                  <th className="px-6 py-4 font-medium text-right">LTV POTENTIAL</th>
                  <th className="px-6 py-4 font-medium text-center">REFERRAL SCORE</th>
                  <th className="px-6 py-4 font-medium text-right">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{customer.name}</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">{customer.email}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${
                        customer.isInvestor ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {customer.isInvestor ? 'Investor' : 'End User'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`font-bold ${customer.upgradeOpportunity === 'High' ? 'text-green-400' : customer.upgradeOpportunity === 'Medium' ? 'text-amber-400' : 'text-neutral-400'}`}>
                        {customer.upgradeOpportunity}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-12 bg-neutral-800 rounded-full h-1.5">
                          <div className="bg-[#00E5FF] h-1.5 rounded-full" style={{ width: `${customer.referralPotential}%` }}></div>
                        </div>
                        <span className="text-[10px] text-neutral-400">{customer.referralPotential}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => toast.success('Action Triggered', { description: 'Added to automated VIP outreach sequence.' })} className="text-xs text-[#00E5FF] hover:underline flex items-center justify-end gap-1">
                        Outreach <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Segment Insights */}
        <div className="space-y-6">
          <div className="bg-[#1A1C20] border border-neutral-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-[#00E5FF] uppercase tracking-widest mb-6">Persona Insights</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-black/40 border border-neutral-800/50 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white">Repeat Investors</h4>
                  <span className="text-xs text-green-400">Trending Up</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  24% of your investor pool has purchased more than one unit. AI recommends launching a <strong>"Portfolio Builder"</strong> loyalty program offering early access to Phase 3.
                </p>
              </div>

              <div className="p-4 bg-black/40 border border-neutral-800/50 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white">Referral Goldmine</h4>
                  <span className="text-xs text-[#00E5FF]">Opportunity</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {highUpgradePotential} VIP customers have a referral score > 80. Triggering an automated referral request with a 1% kickback could generate ~$4M in pipeline value.
                </p>
              </div>

              <div className="p-4 bg-black/40 border border-neutral-800/50 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white">Upgrade Resistance</h4>
                  <span className="text-xs text-amber-400">Analysis</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  End-users in the "Medium" upgrade tier are resisting upsells to 3BHKs due to perceived maintenance costs. Recommend offering 1-year free maintenance as an upgrade incentive.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
