'use client';

import React, { useEffect } from 'react';
import { useSocietyStore } from '@/store/societyStore';
import { Dumbbell, CheckCircle, Calendar, XCircle, Loader2 } from 'lucide-react';

export default function AmenityManagementCloud() {
  const { amenities, fetchAmenities, isLoading } = useSocietyStore();

  useEffect(() => {
    fetchAmenities();
  }, [fetchAmenities]);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-black text-white overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden p-6 relative">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light tracking-wide text-white flex items-center gap-2">
              <Dumbbell className="w-6 h-6 text-emerald-400" />
              Amenity Management Cloud
            </h1>
            <p className="text-white/50 text-sm mt-1">Booking engine for community facilities</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {amenities.map(amenity => (
            <div key={amenity.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-white">{amenity.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${
                  amenity.status === 'Available' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                  amenity.status === 'Closed' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                  'bg-amber-500/10 border-amber-500/20 text-amber-400'
                }`}>
                  {amenity.status}
                </span>
              </div>
              <div className="text-sm text-white/60 mb-6">
                <p>Category: {amenity.category}</p>
                <p>Capacity: {amenity.capacity} people</p>
              </div>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-all">
                <Calendar className="w-4 h-4" /> View Bookings
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
