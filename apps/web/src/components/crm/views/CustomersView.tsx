'use client';

import { useCrmStore } from '@/store/crmStore';
import { Search, Filter, Mail, Phone, ExternalLink, Home, FileText, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

export function CustomersView() {
  const { customers, bookings } = useCrmStore();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(cust => 
    cust.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cust.phone.includes(searchQuery) || 
    cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cust.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">Customer Database</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] border-b border-neutral-800">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">CUSTOMER</th>
                <th className="px-6 py-4 font-medium">CONTACT</th>
                <th className="px-6 py-4 font-medium">PORTFOLIO</th>
                <th className="px-6 py-4 font-medium">PAYMENT STATUS</th>
                <th className="px-6 py-4 font-medium">DOCUMENTS</th>
                <th className="px-6 py-4 font-medium text-right">TOTAL INVESTMENT</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(cust => {
                const custBookings = bookings.filter(b => b.customerId === cust.id);
                return (
                  <tr 
                    key={cust.id} 
                    onClick={() => router.push(`/crm/customers/${cust.id}`)}
                    className="border-b border-neutral-800/50 hover:bg-[#1A1C20] cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-[#00E5FF] font-medium text-xs">
                          {cust.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-white flex items-center gap-2">
                            {cust.name} <ExternalLink className="w-3 h-3 text-neutral-500" />
                          </div>
                          <div className="text-[10px] text-neutral-500 mt-0.5">ID: {cust.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-neutral-300 text-xs"><Phone className="w-3 h-3 text-neutral-500" /> {cust.phone}</div>
                        <div className="flex items-center gap-2 text-neutral-500 text-xs"><Mail className="w-3 h-3" /> {cust.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-neutral-300 text-xs"><Home className="w-3 h-3 text-neutral-500" /> {custBookings.length} Properties</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-green-400 text-xs"><CreditCard className="w-3 h-3" /> On Track</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-neutral-400 text-xs"><FileText className="w-3 h-3" /> 2 Pending</div>
                    </td>
                    <td className="px-6 py-4 text-right text-white font-medium">
                      ${(cust.totalInvestment / 1000000).toFixed(2)}M
                    </td>
                  </tr>
                );
              })}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-500">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
