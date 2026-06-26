'use client';

import { useCrmStore } from '@/store/crmStore';
import { Search, DollarSign, CheckCircle, Clock, AlertTriangle, FileText } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function CommissionsView() {
  const { commissions, brokers, agencies, bookings } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');

  const enrichedCommissions = commissions.map(comm => {
    const broker = comm.brokerId ? brokers.find(b => b.id === comm.brokerId) : null;
    const agency = comm.agencyId ? agencies.find(a => a.id === comm.agencyId) : null;
    const booking = bookings.find(b => b.id === comm.bookingId);
    
    return {
      ...comm,
      partnerName: broker?.name || agency?.name || 'Unknown Partner',
      partnerType: broker ? 'Broker' : agency ? 'Agency' : 'Unknown',
      bookingValue: booking?.bookingAmount || 0,
    };
  }).filter(c => c.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) || c.bookingId.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalPending = commissions.filter(c => c.status === 'PENDING').reduce((acc, c) => acc + c.amount, 0);
  const totalApproved = commissions.filter(c => c.status === 'APPROVED').reduce((acc, c) => acc + c.amount, 0);
  const totalPaid = commissions.filter(c => c.status === 'PAID').reduce((acc, c) => acc + c.amount, 0);
  const totalDisputed = commissions.filter(c => c.status === 'DISPUTED').reduce((acc, c) => acc + c.amount, 0);

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'PAID': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'APPROVED': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'PENDING': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'DISPUTED': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-neutral-800 text-neutral-400 border-neutral-700';
    }
  };

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-white tracking-wide">Commission Engine</h2>
          <p className="text-sm text-neutral-500 mt-1">Review, approve, and track partner commissions</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.success('Export Initiated', { description: 'Downloading commission report to CSV...' })} className="h-9 px-4 bg-[#121212] border border-neutral-800 hover:bg-neutral-800 text-white rounded flex items-center gap-2 text-sm font-medium transition-colors">
            <FileText className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Financial KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-amber-400 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Pending Review</span>
          </div>
          <div className="text-2xl font-medium text-white">${totalPending.toLocaleString()}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-blue-400 mb-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Approved for Payout</span>
          </div>
          <div className="text-2xl font-medium text-white">${totalApproved.toLocaleString()}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-green-400 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Paid (YTD)</span>
          </div>
          <div className="text-2xl font-medium text-white">${totalPaid.toLocaleString()}</div>
        </div>
        <div className="bg-[#2A1616] border border-red-900/50 rounded p-4">
          <div className="flex items-center gap-3 text-red-400 mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Disputed Claims</span>
          </div>
          <div className="text-2xl font-medium text-white">${totalDisputed.toLocaleString()}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search commissions or booking IDs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-80 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={() => toast.info('Bulk Action', { description: 'Approve all selected commissions.' })} className="px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900 rounded border border-neutral-800">Bulk Approve</button>
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] border-b border-neutral-800">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">COMMISSION ID</th>
                <th className="px-6 py-4 font-medium">PARTNER</th>
                <th className="px-6 py-4 font-medium">BOOKING ID</th>
                <th className="px-6 py-4 font-medium text-right">BOOKING VALUE</th>
                <th className="px-6 py-4 font-medium text-right">COMMISSION AMOUNT</th>
                <th className="px-6 py-4 font-medium text-center">STATUS</th>
                <th className="px-6 py-4 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {enrichedCommissions.map(comm => (
                <tr key={comm.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{comm.id}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{new Date(comm.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{comm.partnerName}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{comm.partnerType}</div>
                  </td>
                  <td className="px-6 py-4 text-neutral-300 font-mono text-xs">{comm.bookingId}</td>
                  <td className="px-6 py-4 text-right text-neutral-400">${comm.bookingValue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-[#00E5FF] font-medium">${comm.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${getStatusStyle(comm.status)}`}>
                      {comm.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {comm.status === 'PENDING' && (
                      <button onClick={() => toast.success('Commission Approved', { description: `${comm.id} has been moved to Approved.` })} className="px-3 py-1 text-xs font-medium rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors">
                        Approve
                      </button>
                    )}
                    {comm.status === 'APPROVED' && (
                      <button onClick={() => toast.success('Payment Initiated', { description: `Sending $${comm.amount} to ${comm.partnerName}` })} className="px-3 py-1 text-xs font-medium rounded bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-colors">
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {enrichedCommissions.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-neutral-500">
                    No commissions found.
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
