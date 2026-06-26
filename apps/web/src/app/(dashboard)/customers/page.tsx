'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCustomerStore } from '@/store/customerStore';
import { CustomerNavigator } from '@/components/customers/CustomerNavigator';
import { CustomerAICopilot } from '@/components/customers/CustomerAICopilot';
import { Search, Filter, Download, MoreHorizontal, FileText, Settings, UserPlus, FileSpreadsheet } from 'lucide-react';
import Link from 'next/link';
import { QuickFilterMenu } from '@/components/ui/QuickFilterMenu';

export default function CustomersCommandCenter() {
  const router = useRouter();
  const customers = useCustomerStore((state) => state.customers);
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('All Tiers');

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.customerCode.toLowerCase().includes(searchQuery.toLowerCase());
    if (tierFilter === 'All Tiers') return matchesSearch;
    return matchesSearch && c.type?.toLowerCase().includes(tierFilter.toLowerCase());
  });

  return (
    <div className="flex h-[calc(100vh-64px)] bg-black text-white overflow-hidden">
      {/* Left Panel: Customer Navigator */}
      <CustomerNavigator />

      {/* Center Workspace: Enterprise Data Grid */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <div className="h-16 border-b border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-light tracking-wide text-white">Customer Command Center</h1>
            <div className="h-4 w-px bg-white/20"></div>
            <div className="text-sm text-white/50">{customers.length} Total Customers</div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all"
              />
            </div>
            <QuickFilterMenu value={tierFilter} onChange={setTierFilter} options={['All Tiers', 'Enterprise', 'Retail', 'Institutional', 'High Net Worth']} />
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all">
              <FileSpreadsheet className="w-4 h-4" /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              <UserPlus className="w-4 h-4" /> New Customer
            </button>
          </div>
        </div>

        {/* Data Grid Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-white/50 uppercase bg-black/40 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 font-medium tracking-wider">Customer</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Type</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Properties / Units</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Outstanding</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Portfolio Value</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Health</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                  <th className="px-6 py-4 font-medium tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredCustomers.map((customer) => (
                  <tr 
                    key={customer.id} 
                    className="hover:bg-white/5 transition-colors group cursor-pointer"
                    onClick={() => router.push(`/customers/${customer.id}`)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-blue-300 font-medium shrink-0">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white/90 font-medium group-hover:text-blue-400 transition-colors">
                            {customer.name}
                          </div>
                          <div className="text-xs text-white/40 mt-0.5">{customer.customerCode} • {customer.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded border border-white/10 bg-white/5 text-xs text-white/70">
                        {customer.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white/80">{customer.propertiesOwned} Properties</div>
                      <div className="text-xs text-white/40">{customer.unitsOwned} Units</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`font-medium ${customer.outstandingBalance > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        ₹{customer.outstandingBalance.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/80">
                      ₹{customer.portfolioValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${customer.healthScore > 80 ? 'bg-emerald-500' : customer.healthScore > 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${customer.healthScore}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/60">{customer.healthScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          customer.status === 'Active' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 
                          customer.status === 'High Risk' ? 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]' : 
                          'bg-white/40'
                        }`} />
                        <span className="text-white/70">{customer.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        className="text-white/40 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Action menu
                        }}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredCustomers.length === 0 && (
              <div className="p-12 text-center text-white/40">
                No customers found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel: AI Copilot */}
      <CustomerAICopilot />
    </div>
  );
}
