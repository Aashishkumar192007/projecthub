'use client';

import React, { useEffect, useState } from 'react';
import { useSocietyStore } from '@/store/societyStore';
import { Car, Zap, CheckCircle, Map, Search, Filter, Users, Loader2 } from 'lucide-react';
import { QuickFilterMenu } from '@/components/ui/QuickFilterMenu';

export default function ParkingManagementCloud() {
  const { parkingSlots, fetchParkingSlots, isLoading } = useSocietyStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  useEffect(() => {
    fetchParkingSlots();
  }, [fetchParkingSlots]);

  const filteredSlots = parkingSlots.filter(slot => {
    const matchesSearch = !searchTerm || slot.slotNumber.toLowerCase().includes(searchTerm.toLowerCase()) || (slot.vehicleNumber && slot.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All Statuses' || slot.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-[calc(100vh-64px)] bg-black text-white overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-light tracking-wide text-white flex items-center gap-2">
              <Car className="w-6 h-6 text-blue-400" />
              Parking Management Cloud
            </h1>
            <p className="text-white/50 text-sm mt-1">Manage all parking assets and allocations</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search slot or vehicle..."
                className="w-64 bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500/50"
              />
            </div>
            <QuickFilterMenu value={statusFilter} onChange={setStatusFilter} options={['All Statuses', 'Available', 'Allocated', 'Reserved']} />
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Total Slots</p>
            <p className="text-3xl font-light text-white">{parkingSlots.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Available</p>
            <p className="text-3xl font-light text-emerald-400">
              {parkingSlots.filter(p => p.status === 'Available').length}
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-3 h-3 text-blue-400" />
              <p className="text-xs text-white/50 uppercase tracking-wider">EV Charging</p>
            </div>
            <p className="text-3xl font-light text-white">
              {parkingSlots.filter(p => p.type === 'EV').length}
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Visitor Slots</p>
            <p className="text-3xl font-light text-white">
              {parkingSlots.filter(p => p.type === 'Visitor').length}
            </p>
          </div>
        </div>

        {/* View Toggles */}
        <div className="flex gap-2 border-b border-white/10 mb-6 pb-2">
          <button className="px-4 py-1.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-sm font-medium">Grid View</button>
          <button className="px-4 py-1.5 text-white/60 hover:text-white/90 hover:bg-white/5 rounded-lg text-sm transition-all">Tower View</button>
          <button className="px-4 py-1.5 text-white/60 hover:text-white/90 hover:bg-white/5 rounded-lg text-sm transition-all">Basement View</button>
          <button className="px-4 py-1.5 flex items-center gap-1.5 text-amber-400/80 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg text-sm transition-all">
            <Map className="w-4 h-4" /> Heatmap
          </button>
        </div>

        {/* Data Grid */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-4 gap-4">
            {filteredSlots.map(slot => (
              <div key={slot.id} className="bg-white/[0.02] border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-medium text-white">{slot.slotNumber}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${
                    slot.status === 'Available' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                    slot.status === 'Allocated' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                    'bg-white/5 border-white/10 text-white/60'
                  }`}>
                    {slot.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  {slot.type === 'EV' && <Zap className="w-4 h-4 text-amber-400" />}
                  {slot.type === 'Visitor' && <Users className="w-4 h-4 text-purple-400" />}
                  {slot.type === 'Reserved' && <CheckCircle className="w-4 h-4 text-blue-400" />}
                  <span className="text-sm text-white/70">{slot.type} Slot</span>
                </div>
                {slot.allocatedTo && (
                  <div className="pt-3 border-t border-white/10 mt-auto">
                    <p className="text-xs text-white/40">Allocated to</p>
                    <p className="text-sm text-white/90 font-medium truncate">{slot.allocatedTo}</p>
                    {slot.rfidTag && <p className="text-xs text-blue-400 mt-0.5">RFID: {slot.rfidTag}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
