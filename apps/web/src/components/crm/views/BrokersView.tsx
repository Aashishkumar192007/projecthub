'use client';

import { useCrmStore } from '@/store/crmStore';
import { Search, Users, CheckCircle, Clock, DollarSign, Briefcase, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function BrokersView() {
  const { brokers, commissions } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBrokers = brokers.filter(broker => 
    broker.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    broker.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeBrokers = brokers.filter(b => b.status === 'ACTIVE').length;
  const pendingKyc = brokers.filter(b => b.kycStatus === 'PENDING').length;
  const totalRevenue = brokers.reduce((acc, b) => acc + b.revenueGenerated, 0);

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-white tracking-wide">Broker Network</h2>
          <p className="text-sm text-neutral-500 mt-1">Manage individual brokers and channel partners</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.info('Add Broker', { description: 'Opening add broker form...' })} className="h-9 px-4 bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0A1A2A] rounded flex items-center gap-2 text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            Add Broker
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Brokers</span>
          </div>
          <div className="text-2xl font-medium text-white">{brokers.length}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-blue-400 mb-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Active</span>
          </div>
          <div className="text-2xl font-medium text-white">{activeBrokers}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-amber-400 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Pending KYC</span>
          </div>
          <div className="text-2xl font-medium text-white">{pendingKyc}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-green-400 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Partner Revenue</span>
          </div>
          <div className="text-2xl font-medium text-white">${(totalRevenue / 1000000).toFixed(1)}M</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search brokers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
          />
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] border-b border-neutral-800">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">BROKER / AGENCY</th>
                <th className="px-6 py-4 font-medium">KYC STATUS</th>
                <th className="px-6 py-4 font-medium">COMMISSION</th>
                <th className="px-6 py-4 font-medium">DEALS CLOSED</th>
                <th className="px-6 py-4 font-medium">COMMISSION EARNED</th>
                <th className="px-6 py-4 font-medium">REVENUE GENERATED</th>
                <th className="px-6 py-4 font-medium">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrokers.map(broker => (
                <tr key={broker.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{broker.name}</div>
                    <div className="flex items-center gap-1 text-[10px] text-neutral-500 mt-0.5">
                      <Briefcase className="w-3 h-3" />
                      {broker.company}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded ${
                      broker.kycStatus === 'VERIFIED' ? 'text-green-400 bg-green-500/10' :
                      broker.kycStatus === 'PENDING' ? 'text-amber-400 bg-amber-500/10' :
                      'text-red-400 bg-red-500/10'
                    }`}>
                      {broker.kycStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-300">{broker.commissionRate.toFixed(1)}%</td>
                  <td className="px-6 py-4 text-white font-medium">{broker.dealsClosed}</td>
                  <td className="px-6 py-4 text-[#00E5FF] font-medium">${(broker.commissionEarned / 1000).toFixed(1)}k</td>
                  <td className="px-6 py-4 text-green-400 font-medium">
                    ${(broker.revenueGenerated / 1000000).toFixed(2)}M
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${
                      broker.status === 'ACTIVE' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-neutral-800 text-neutral-500 border-neutral-700'
                    }`}>
                      {broker.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
