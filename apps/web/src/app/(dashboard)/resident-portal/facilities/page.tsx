'use client';
import { useState, useEffect } from 'react';
import apiClient from '@/api/apiClient';
import { Calendar, Plus } from 'lucide-react';

export default function FacilityBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await apiClient.get('/facility-bookings');
      setBookings(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Facility Bookings</h1>
          <p className="text-gray-400 mt-1">Reserve club house, sports facilities, and guest houses</p>
        </div>
        <button className="flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-fuchsia-900/20">
          <Plus className="w-4 h-4" />
          Book Facility
        </button>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-xl">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-gray-800/80 text-xs uppercase text-gray-400 border-b border-gray-700">
            <tr>
              <th className="px-6 py-4">Facility</th>
              <th className="px-6 py-4">Start Time</th>
              <th className="px-6 py-4">End Time</th>
              <th className="px-6 py-4">Fee</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  No upcoming bookings
                </td>
              </tr>
            ) : (
              bookings.map((booking: any) => (
                <tr key={booking.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{booking.facility?.name || 'Club House'}</td>
                  <td className="px-6 py-4">{new Date(booking.startTime).toLocaleString()}</td>
                  <td className="px-6 py-4">{new Date(booking.endTime).toLocaleString()}</td>
                  <td className="px-6 py-4">${booking.totalFee}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs border bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30">
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
