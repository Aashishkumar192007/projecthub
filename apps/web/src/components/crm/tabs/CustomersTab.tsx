'use client';

import { useCrmStore } from '@/store/crmStore';
import { Search, Filter, Mail, Phone, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';


export function CustomersTab() {
  const { customers } = useCrmStore();

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">Customers Registry</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-64 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
          <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="h-9 px-4 bg-[#121212] border border-neutral-800 rounded flex items-center gap-2 text-sm text-white hover:bg-neutral-800">
            <Filter className="w-4 h-4 text-neutral-400" />
            Filters
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-[#1A1C20] border-b border-neutral-800">
            <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              <th className="px-6 py-4 font-medium">CUSTOMER</th>
              <th className="px-6 py-4 font-medium">CONTACT</th>
              <th className="px-6 py-4 font-medium">KYC STATUS</th>
              <th className="px-6 py-4 font-medium text-right">TOTAL INVESTMENT</th>
              <th className="px-6 py-4 font-medium text-right">JOINED</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(cust => (
              <tr key={cust.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-[#00E5FF] font-medium text-xs">
                      {cust.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-white flex items-center gap-2">
                        {cust.name} <ExternalLink className="w-3 h-3 text-neutral-500 cursor-pointer hover:text-white" />
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
                  <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${
                    cust.kycStatus === 'VERIFIED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {cust.kycStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-white font-medium">
                  ${(cust.totalInvestment / 1000000).toFixed(2)}M
                </td>
                <td className="px-6 py-4 text-right text-neutral-400">
                  {new Date(cust.joinedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
