'use client';

import React, { useEffect } from 'react';
import { UserCheck, Shield, Clock, Truck, PlusCircle, Loader2 } from 'lucide-react';
import { useVisitorStore } from '@/store/visitorStore';

export default function VisitorManagementCloud() {
  const { visitors, fetchVisitors, isLoading } = useVisitorStore();

  useEffect(() => {
    fetchVisitors();
  }, [fetchVisitors]);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-black text-white overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden p-6 relative">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light tracking-wide text-white flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-purple-400" />
              Visitor Management Cloud
            </h1>
            <p className="text-white/50 text-sm mt-1">Expected guests, deliveries, and security logs</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)]">
            <PlusCircle className="w-4 h-4" /> Pre-Approve Visitor
          </button>
        </div>

        <div className="flex-1 overflow-auto bg-white/[0.02] border border-white/10 rounded-xl">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-white/50 uppercase bg-black/40 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium tracking-wider">Visitor</th>
                <th className="px-6 py-4 font-medium tracking-wider">Host & Unit</th>
                <th className="px-6 py-4 font-medium tracking-wider">Purpose</th>
                <th className="px-6 py-4 font-medium tracking-wider">Entry Time</th>
                <th className="px-6 py-4 font-medium tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/50">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
                      <div>Loading visitors...</div>
                    </div>
                  </td>
                </tr>
              ) : visitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-white/90 font-medium">{visitor.visitorName}</div>
                    <div className="text-xs text-white/40">{visitor.vehiclePlate || 'No Vehicle'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white/80">{visitor.hostName}</div>
                    <div className="text-xs text-white/40">Unit {visitor.unitNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-white/80">
                      {visitor.purpose === 'DELIVERY' && <Truck className="w-4 h-4 text-amber-400" />}
                      {visitor.purpose === 'GUEST' && <UserCheck className="w-4 h-4 text-emerald-400" />}
                      {visitor.purpose === 'SERVICE' && <Shield className="w-4 h-4 text-blue-400" />}
                      {visitor.purpose}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/80">
                    {visitor.entryTime ? new Date(visitor.entryTime).toLocaleString() : 'Not entered'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs border ${
                      visitor.status === 'ENTERED' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                      visitor.status === 'EXITED' ? 'bg-white/5 border-white/10 text-white/60' :
                      visitor.status === 'AWAITING_APPROVAL' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                      'bg-blue-500/10 border-blue-500/20 text-blue-400'
                    }`}>
                      {visitor.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
              {!isLoading && visitors.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/40">
                    No visitor logs found.
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
