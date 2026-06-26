'use client';

import { useCrmStore } from '@/store/crmStore';

export function GlobalBookingsTab() {
  const { bookings, leads } = useCrmStore();

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">All Bookings</h2>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-[#1A1C20] border-b border-neutral-800">
            <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              <th className="px-6 py-4 font-medium">BOOKING ID / LEAD</th>
              <th className="px-6 py-4 font-medium">UNIT</th>
              <th className="px-6 py-4 font-medium text-right">TOTAL VALUE</th>
              <th className="px-6 py-4 font-medium text-right">BOOKING AMOUNT</th>
              <th className="px-6 py-4 font-medium text-right">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => {
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
                    <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded border bg-green-500/10 text-green-400 border-green-500/20">
                      {booking.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
