'use client';

import { useCrmStore } from '@/store/crmStore';
import { Search, Building2, Users, DollarSign, Award, Plus, FolderKanban, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function BrokerWorkspaceView() {
  const { brokers, commissions, leads, projectAllocations } = useCrmStore();
  const [selectedBrokerId, setSelectedBrokerId] = useState<string | null>(brokers[0]?.id || null);

  const selectedBroker = brokers.find(b => b.id === selectedBrokerId);
  const brokerCommissions = commissions.filter(c => c.brokerId === selectedBrokerId);
  const brokerLeads = leads.filter(l => l.brokerId === selectedBrokerId);
  const brokerAllocations = projectAllocations.filter(p => p.brokerId === selectedBrokerId);

  const pendingCommissions = brokerCommissions.filter(c => c.status === 'PENDING').reduce((acc, c) => acc + c.amount, 0);

  return (
    <div className="flex h-full bg-[#0A0C10]">
      {/* Sidebar: Broker List */}
      <div className="w-80 border-r border-neutral-800 flex flex-col bg-[#111111]">
        <div className="p-4 border-b border-neutral-800">
          <h2 className="text-sm font-medium text-white mb-3">Partner Workspaces</h2>
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search partners..." 
              className="w-full h-9 bg-[#1A1C20] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {brokers.map(broker => (
            <button 
              key={broker.id}
              onClick={() => setSelectedBrokerId(broker.id)}
              className={`w-full p-4 border-b border-neutral-800/50 text-left transition-colors ${selectedBrokerId === broker.id ? 'bg-[#1A1C20] border-l-2 border-l-[#00E5FF]' : 'hover:bg-[#1A1C20]'}`}
            >
              <div className="font-medium text-white text-sm mb-1">{broker.name}</div>
              <div className="text-xs text-neutral-500 flex justify-between">
                <span>{broker.company}</span>
                <span className="text-[#00E5FF]">{broker.dealsClosed} deals</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {selectedBroker ? (
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-medium text-white">{selectedBroker.name}</h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-neutral-400">
                  <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {selectedBroker.company}</span>
                  <span className="flex items-center gap-1 text-green-400"><CheckCircle className="w-4 h-4" /> {selectedBroker.kycStatus}</span>
                  <span className="text-[#00E5FF]">{selectedBroker.commissionRate}% Base Commission</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toast.success('Payment Initiated', { description: `Paying $${(pendingCommissions).toLocaleString()} to ${selectedBroker.name}` })} className="px-4 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20 rounded text-sm font-medium transition-colors">
                  Pay Pending Commissions
                </button>
                <button onClick={() => toast.info('Portal Link Generated', { description: 'Link copied to clipboard.' })} className="px-4 py-2 bg-[#1A1C20] text-white hover:bg-[#2A2D35] border border-neutral-800 rounded text-sm font-medium transition-colors">
                  Generate Portal Link
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-[#121212] border border-neutral-800 rounded p-4">
                <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Total Leads Generated</div>
                <div className="text-2xl font-medium text-white">{brokerLeads.length}</div>
              </div>
              <div className="bg-[#121212] border border-neutral-800 rounded p-4">
                <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Total Revenue</div>
                <div className="text-2xl font-medium text-green-400">${(selectedBroker.revenueGenerated / 1000000).toFixed(2)}M</div>
              </div>
              <div className="bg-[#2A1C16] border border-amber-900/50 rounded p-4">
                <div className="text-xs font-bold text-amber-500/70 uppercase tracking-widest mb-1">Pending Commission</div>
                <div className="text-2xl font-medium text-amber-500">${pendingCommissions.toLocaleString()}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Allocated Projects */}
              <div>
                <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FolderKanban className="w-4 h-4" /> Allocated Projects
                </h3>
                <div className="bg-[#121212] border border-neutral-800 rounded">
                  {brokerAllocations.map(alloc => (
                    <div key={alloc.id} className="p-4 border-b border-neutral-800 last:border-0 flex justify-between items-center">
                      <div>
                        <div className="font-medium text-white">{alloc.projectId}</div>
                        <div className="text-xs text-neutral-500 mt-1">Quota: {alloc.inventoryQuota} units</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[#00E5FF] font-medium">{alloc.specialCommissionRate}% Rate</div>
                      </div>
                    </div>
                  ))}
                  {brokerAllocations.length === 0 && (
                    <div className="p-4 text-sm text-neutral-500">No specific project allocations. Master inventory access.</div>
                  )}
                </div>
              </div>

              {/* Recent Commissions */}
              <div>
                <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Commission History
                </h3>
                <div className="bg-[#121212] border border-neutral-800 rounded">
                  {brokerCommissions.map(comm => (
                    <div key={comm.id} className="p-4 border-b border-neutral-800 last:border-0 flex justify-between items-center">
                      <div>
                        <div className="font-medium text-white">${comm.amount.toLocaleString()}</div>
                        <div className="text-xs text-neutral-500 mt-1">Booking: {comm.bookingId}</div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded ${
                          comm.status === 'PAID' ? 'text-green-400 bg-green-500/10' :
                          comm.status === 'PENDING' ? 'text-amber-400 bg-amber-500/10' :
                          'text-red-400 bg-red-500/10'
                        }`}>
                          {comm.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {brokerCommissions.length === 0 && (
                    <div className="p-4 text-sm text-neutral-500">No commissions recorded yet.</div>
                  )}
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-500">
            Select a broker workspace to view details
          </div>
        )}
      </div>
    </div>
  );
}
