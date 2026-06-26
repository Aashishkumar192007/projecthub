import React from 'react';
import { CustomerMaster } from '@/store/customerStore';
import { Activity, Home, Building2, Users, Car, FileText, CreditCard } from 'lucide-react';

export function OverviewTab({ customer }: { customer: CustomerMaster }) {
  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Home className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider">Properties</h3>
          </div>
          <p className="text-2xl font-light text-white tracking-tight">{customer.propertiesOwned}</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider">Units</h3>
          </div>
          <p className="text-2xl font-light text-white tracking-tight">{customer.unitsOwned}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider">Outstanding</h3>
          </div>
          <p className="text-2xl font-light text-white tracking-tight">₹{customer.outstandingBalance.toLocaleString()}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider">Portfolio Value</h3>
          </div>
          <p className="text-2xl font-light text-white tracking-tight">₹{(customer.portfolioValue / 1000000).toFixed(1)}M</p>
        </div>
      </div>

      {/* Activity Feed Placeholder */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4">Recent Activity Feed</h3>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-white/90">Customer profile created automatically from Booking #B-2041</p>
              <p className="text-xs text-white/40 mt-1">2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
