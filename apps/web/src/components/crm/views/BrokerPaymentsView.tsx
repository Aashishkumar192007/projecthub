'use client';

import { useCrmStore } from '@/store/crmStore';
import { Search, FileText, Download, CheckCircle, CreditCard, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function BrokerPaymentsView() {
  const { brokerPayments, brokers, agencies } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');

  const enrichedPayments = brokerPayments.map(payment => {
    const broker = payment.brokerId ? brokers.find(b => b.id === payment.brokerId) : null;
    const agency = payment.agencyId ? agencies.find(a => a.id === payment.agencyId) : null;
    
    return {
      ...payment,
      partnerName: broker?.name || agency?.name || 'Unknown Partner',
      partnerType: broker ? 'Broker' : agency ? 'Agency' : 'Unknown',
    };
  }).filter(p => p.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalProcessed = brokerPayments.filter(p => p.status === 'COMPLETED').reduce((acc, p) => acc + p.amount, 0);
  const totalProcessing = brokerPayments.filter(p => p.status === 'PROCESSING').reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-white tracking-wide">Payouts & Invoices</h2>
          <p className="text-sm text-neutral-500 mt-1">Manage broker invoices and track wire transfers</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.info('New Payout', { description: 'Opening manual payout modal...' })} className="h-9 px-4 bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0A1A2A] rounded flex items-center gap-2 text-sm font-medium transition-colors">
            <Send className="w-4 h-4" />
            New Payout
          </button>
        </div>
      </div>

      {/* Financial KPI Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-green-400 mb-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Processed</span>
          </div>
          <div className="text-2xl font-medium text-white">${totalProcessed.toLocaleString()}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-blue-400 mb-2">
            <CreditCard className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">In Transit / Processing</span>
          </div>
          <div className="text-2xl font-medium text-white">${totalProcessing.toLocaleString()}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <FileText className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Invoices Generated</span>
          </div>
          <div className="text-2xl font-medium text-white">{brokerPayments.length}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search payments or partners..." 
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
                <th className="px-6 py-4 font-medium">PAYMENT ID</th>
                <th className="px-6 py-4 font-medium">PARTNER</th>
                <th className="px-6 py-4 font-medium">METHOD</th>
                <th className="px-6 py-4 font-medium text-right">AMOUNT</th>
                <th className="px-6 py-4 font-medium text-center">STATUS</th>
                <th className="px-6 py-4 font-medium text-right">INVOICE</th>
              </tr>
            </thead>
            <tbody>
              {enrichedPayments.map(payment => (
                <tr key={payment.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{payment.id}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{new Date(payment.paymentDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{payment.partnerName}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{payment.partnerType}</div>
                  </td>
                  <td className="px-6 py-4 text-neutral-300 font-mono text-xs">
                    {payment.paymentMethod}
                    {payment.referenceNumber && <span className="block text-[10px] text-neutral-500 mt-0.5">Ref: {payment.referenceNumber}</span>}
                  </td>
                  <td className="px-6 py-4 text-right text-[#00E5FF] font-medium">${payment.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${
                      payment.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      payment.status === 'PROCESSING' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      payment.status === 'FAILED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => toast.success('Invoice Downloaded', { description: `Invoice for ${payment.id} downloaded.` })} className="p-2 text-neutral-400 hover:text-white bg-neutral-900 rounded border border-neutral-800 transition-colors inline-flex">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {enrichedPayments.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">
                    No payment records found.
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
