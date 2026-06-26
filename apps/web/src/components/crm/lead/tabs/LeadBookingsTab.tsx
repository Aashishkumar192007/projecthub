'use client';

import { Lead } from '@/lib/crmMockData';
import { useCrmStore } from '@/store/crmStore';
import { useState } from 'react';

export function LeadBookingsTab({ lead }: { lead: Lead }) {
  const { bookings, reservations, createReservation, createBooking } = useCrmStore();
  const leadRes = reservations.filter(r => r.leadId === lead.id);
  const leadBookings = bookings.filter(b => b.leadId === lead.id);

  const [showResForm, setShowResForm] = useState(false);
  const [showBookForm, setShowBookForm] = useState(false);
  
  const [unit, setUnit] = useState('UNIT-A101');
  const [bookingAmt, setBookingAmt] = useState(500000);

  const handleReserve = () => {
    createReservation({
      leadId: lead.id,
      unitId: unit,
      reservedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // 48 hrs
      status: 'ACTIVE'
    });
    setShowResForm(false);
  };

  const handleBook = () => {
    createBooking({
      leadId: lead.id,
      unitId: unit,
      projectId: 'proj-1',
      bookingAmount: bookingAmt,
      totalValue: lead.budget,
      status: 'RESERVED',
      date: new Date().toISOString()
    });
    setShowBookForm(false);
  };

  return (
    <div className="p-6 space-y-8">
      
      {/* Reservations Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-white">Active Reservations</h3>
          <button onClick={() => setShowResForm(true)} className="px-4 py-2 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 text-xs font-medium rounded transition-colors">
            Reserve Unit
          </button>
        </div>

        {showResForm && (
          <div className="bg-[#1A1C20] border border-neutral-800 rounded p-4 mb-4">
            <div className="mb-4">
              <label className="block text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Unit to Reserve</label>
              <input type="text" value={unit} onChange={e => setUnit(e.target.value)} className="w-full bg-[#121212] border border-neutral-800 rounded px-3 py-2 text-sm text-white" />
            </div>
            <div className="flex gap-2">
              <button onClick={handleReserve} className="px-4 py-2 bg-amber-500 text-[#0A0C10] hover:bg-amber-400 text-xs font-medium rounded transition-colors">Lock Unit for 48h</button>
              <button onClick={() => setShowResForm(false)} className="px-4 py-2 bg-neutral-800 text-white hover:bg-neutral-700 text-xs font-medium rounded transition-colors">Cancel</button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {leadRes.length === 0 && <div className="text-sm text-neutral-500">No units reserved.</div>}
          {leadRes.map(res => (
            <div key={res.id} className="bg-[#1A1C20] border border-amber-900/30 rounded p-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-white mb-1">Unit: {res.unitId}</div>
                <div className="text-xs text-neutral-400">Expires: {new Date(res.expiresAt).toLocaleString()}</div>
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded bg-amber-500/10 text-amber-400">
                {res.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bookings Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-white">Confirmed Bookings</h3>
          <button onClick={() => setShowBookForm(true)} className="px-4 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 text-xs font-medium rounded transition-colors">
            Create Booking
          </button>
        </div>

        {showBookForm && (
          <div className="bg-[#1A1C20] border border-neutral-800 rounded p-4 mb-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Unit</label>
                <input type="text" value={unit} onChange={e => setUnit(e.target.value)} className="w-full bg-[#121212] border border-neutral-800 rounded px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="block text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Booking Amount Received</label>
                <input type="number" value={bookingAmt} onChange={e => setBookingAmt(Number(e.target.value))} className="w-full bg-[#121212] border border-neutral-800 rounded px-3 py-2 text-sm text-white" />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleBook} className="px-4 py-2 bg-green-500 text-[#0A0C10] hover:bg-green-400 text-xs font-medium rounded transition-colors">Confirm Booking</button>
              <button onClick={() => setShowBookForm(false)} className="px-4 py-2 bg-neutral-800 text-white hover:bg-neutral-700 text-xs font-medium rounded transition-colors">Cancel</button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {leadBookings.length === 0 && <div className="text-sm text-neutral-500">No bookings found.</div>}
          {leadBookings.map(b => (
            <div key={b.id} className="bg-[#1A1C20] border border-green-900/30 rounded p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-white">Unit: {b.unitId}</div>
                <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded bg-green-500/10 text-green-400">
                  {b.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Total Value</div>
                  <div className="text-sm text-neutral-300">${(b.totalValue / 1000000).toFixed(2)}M</div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Booking Amount</div>
                  <div className="text-sm text-neutral-300">${b.bookingAmount.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
