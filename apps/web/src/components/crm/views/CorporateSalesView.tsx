'use client';

import { useCrmStore } from '@/store/crmStore';
import { Search, Building, Users, DollarSign, Target, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function CorporateSalesView() {
  const { corporateSales, brokers } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSales = corporateSales.filter(sale => 
    sale.companyName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    sale.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCompanies = corporateSales.length;
  const totalVolume = corporateSales.reduce((acc, s) => acc + s.expectedVolume, 0);
  const activeAgreements = corporateSales.filter(s => s.status === 'AGREEMENT_SIGNED').length;

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-white tracking-wide">Corporate Sales & B2B</h2>
          <p className="text-sm text-neutral-500 mt-1">Manage bulk deals, corporate tie-ups, and institutional sales</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.info('New Corporate Tie-up', { description: 'Opening corporate sales wizard...' })} className="h-9 px-4 bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0A1A2A] rounded flex items-center gap-2 text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            New Tie-up
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <Building className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Companies</span>
          </div>
          <div className="text-2xl font-medium text-white">{totalCompanies}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-green-400 mb-2">
            <Target className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Active Agreements</span>
          </div>
          <div className="text-2xl font-medium text-white">{activeAgreements}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-blue-400 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Employees Reached</span>
          </div>
          <div className="text-2xl font-medium text-white">{corporateSales.reduce((acc, s) => acc + s.employeeCount, 0).toLocaleString()}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-amber-400 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Expected Volume</span>
          </div>
          <div className="text-2xl font-medium text-white">${(totalVolume / 1000000).toFixed(1)}M</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search companies or contacts..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-80 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
          />
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] border-b border-neutral-800">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">COMPANY</th>
                <th className="px-6 py-4 font-medium">INDUSTRY / EMPLOYEES</th>
                <th className="px-6 py-4 font-medium">CONTACT PERSON</th>
                <th className="px-6 py-4 font-medium text-right">DISCOUNT / BENEFIT</th>
                <th className="px-6 py-4 font-medium text-right">EXPECTED VOLUME</th>
                <th className="px-6 py-4 font-medium text-center">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map(sale => (
                <tr key={sale.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{sale.companyName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white">{sale.industry}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{sale.employeeCount.toLocaleString()} Employees</div>
                  </td>
                  <td className="px-6 py-4 text-neutral-300">
                    <div className="font-medium">{sale.contactPerson}</div>
                    <div className="text-[10px] text-neutral-500">{sale.contactEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-right text-[#00E5FF] font-medium">{sale.discountOffered}%</td>
                  <td className="px-6 py-4 text-right text-green-400 font-medium">${(sale.expectedVolume / 1000000).toFixed(1)}M</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${
                      sale.status === 'AGREEMENT_SIGNED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      sale.status === 'PROSPECTING' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredSales.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">
                    No corporate sales data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
