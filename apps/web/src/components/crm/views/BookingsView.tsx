'use client';

import { useCrmStore } from '@/store/crmStore';

import { Search } from 'lucide-react';
import { useState } from 'react';

export function BookingsView() {
  const { bookings, leads, updateBookingStatus } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = bookings.filter(booking => {
    const lead = leads.find(l => l.id === booking.leadId);
    const searchString = `${lead?.name} ${booking.unitId} ${booking.projectId} ${booking.id} ${booking.status}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  const totalValue = filteredBookings.reduce((sum, b) => sum + b.totalValue, 0);
  const collected = filteredBookings.reduce((sum, b) => sum + b.bookingAmount, 0);
  const pending = totalValue - collected;

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">Booking Command Center</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Total Booking Value</div>
          <div className="text-2xl font-medium text-white">${(totalValue / 1000000).toFixed(2)}M</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Collected Amount</div>
          <div className="text-2xl font-medium text-green-400">${(collected / 1000000).toFixed(2)}M</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Pending Amount</div>
          <div className="text-2xl font-medium text-amber-400">${(pending / 1000000).toFixed(2)}M</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Completed Bookings</div>
          <div className="text-2xl font-medium text-white">{bookings.filter(b => b.status === 'COMPLETED').length}</div>
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] border-b border-neutral-800">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">BOOKING ID / LEAD</th>
                <th className="px-6 py-4 font-medium">UNIT</th>
                <th className="px-6 py-4 font-medium text-right">TOTAL VALUE</th>
                <th className="px-6 py-4 font-medium text-right">BOOKING AMOUNT</th>
                <th className="px-6 py-4 font-medium text-right">STATUS</th>
                <th className="px-6 py-4 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(booking => {
                const lead = leads.find(l => l.id === booking.leadId);
                return (
                  <tr key={booking.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{lead?.name || 'Unknown Lead'}</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">{booking.id}</div>
                    </td>
                    <td className="px-6 py-4 text-neutral-300">
                      <div className="font-medium">{booking.unitId}</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">{booking.projectId}</div>
                    </td>
                    <td className="px-6 py-4 text-right text-white font-medium">
                      ${(booking.totalValue / 1000000).toFixed(2)}M
                    </td>
                    <td className="px-6 py-4 text-right text-green-400 font-medium">
                      ${booking.bookingAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${
                        booking.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                        booking.status === 'CANCELLED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {booking.status === 'RESERVED' && (
                        <button onClick={() => updateBookingStatus(booking.id, 'COMPLETED')} className="px-3 py-1 text-xs font-medium rounded bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-colors">
                          Mark Completed
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
