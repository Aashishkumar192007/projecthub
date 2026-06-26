'use client';

import React from 'react';
import { CustomerMaster } from '@/store/customerStore';
import { Home, Key, FileText, Wrench, ShieldAlert, CheckCircle, ChevronLeft, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CustomerProfileNavigator({ customer }: { customer: CustomerMaster }) {
  const router = useRouter();

  return (
    <div className="w-72 border-r border-white/10 bg-black/40 backdrop-blur-xl flex flex-col h-full overflow-y-auto shrink-0">
      <div className="p-4 border-b border-white/10 sticky top-0 bg-black/40 backdrop-blur-xl z-10">
        <button 
          onClick={() => router.push('/customers')}
          className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors mb-4"
        >
          <ChevronLeft className="w-3 h-3" /> Back to Customers
        </button>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-white/10 flex items-center justify-center text-3xl text-blue-300 font-medium mb-3 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            {customer.avatarUrl ? (
              <img src={customer.avatarUrl} alt={customer.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              customer.name.charAt(0)
            )}
          </div>
          <h2 className="text-xl font-medium text-white tracking-wide">{customer.name}</h2>
          <p className="text-xs text-white/50 mt-1">{customer.customerCode}</p>
          
          <div className="flex items-center gap-2 mt-3">
            <span className="px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/80">
              {customer.type}
            </span>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
              customer.status === 'Active' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400' : 
              customer.status === 'High Risk' ? 'border-red-500/20 bg-red-500/10 text-red-400' : 
              'border-white/10 bg-white/5 text-white/60'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${customer.status === 'Active' ? 'bg-emerald-400' : customer.status === 'High Risk' ? 'bg-red-400' : 'bg-white/40'}`} />
              <span className="text-xs">{customer.status}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Key Metrics Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <p className="text-xl font-light text-white">{customer.propertiesOwned}</p>
            <p className="text-[10px] uppercase tracking-wider text-white/50 mt-1">Properties</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <p className="text-xl font-light text-white">{customer.unitsOwned}</p>
            <p className="text-[10px] uppercase tracking-wider text-white/50 mt-1">Units</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center col-span-2">
            <p className={`text-xl font-medium ${customer.outstandingBalance > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              ₹{customer.outstandingBalance.toLocaleString()}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-white/50 mt-1">Outstanding Balance</p>
          </div>
        </div>

        {/* Health Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Health Score</span>
            <span className="text-sm font-medium text-white">{customer.healthScore}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className={`h-1.5 rounded-full ${customer.healthScore > 80 ? 'bg-emerald-500' : customer.healthScore > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${customer.healthScore}%` }}></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Quick Actions</h3>
          <div className="space-y-1.5">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm">
              <Home className="w-4 h-4 text-blue-400" /> Assign Unit
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm">
              <Plus className="w-4 h-4 text-purple-400" /> Add Family Member
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm">
              <Key className="w-4 h-4 text-amber-400" /> Add Vehicle
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm">
              <FileText className="w-4 h-4 text-emerald-400" /> Upload Document
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm">
              <Wrench className="w-4 h-4 text-red-400" /> Service Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
