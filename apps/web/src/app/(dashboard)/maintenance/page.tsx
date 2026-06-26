'use client';

import React, { useEffect } from 'react';
import { CreditCard, FileText, Download, TrendingUp, Loader2 } from 'lucide-react';
import { useMaintenanceStore } from '@/store/maintenanceStore';

export default function MaintenanceBillingCloud() {
  const { bills, fetchBills, isLoading } = useMaintenanceStore();

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  const totalOutstanding = bills
    .filter(b => b.status === 'UNPAID' || b.status === 'OVERDUE')
    .reduce((acc, b) => acc + Number(b.amount), 0);

  const defaulters = bills.filter(b => b.status === 'OVERDUE').length;

  return (
    <div className="flex h-[calc(100vh-64px)] bg-black text-white overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden p-6 relative">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light tracking-wide text-white flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-amber-400" />
              Maintenance Billing Cloud
            </h1>
            <p className="text-white/50 text-sm mt-1">Society billing and invoicing system</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-sm font-medium transition-all shadow-[0_0_15px_rgba(217,119,6,0.3)]">
            <FileText className="w-4 h-4" /> Generate Invoices
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Total Outstanding</p>
            <p className="text-3xl font-light text-amber-400">₹{totalOutstanding.toLocaleString()}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Collection Rate</p>
            <p className="text-3xl font-light text-emerald-400">92%</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Defaulters</p>
            <p className="text-3xl font-light text-red-400">{defaulters}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Sinking Fund</p>
            <p className="text-3xl font-light text-white">₹4.5M</p>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/10 rounded-xl flex-1 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-white/50 uppercase bg-black/40 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium tracking-wider">Unit & Resident</th>
                <th className="px-6 py-4 font-medium tracking-wider">Billing Period</th>
                <th className="px-6 py-4 font-medium tracking-wider">Amount</th>
                <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                <th className="px-6 py-4 font-medium tracking-wider">Due Date</th>
                <th className="px-6 py-4 font-medium tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-white/50">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                      <div>Loading bills...</div>
                    </div>
                  </td>
                </tr>
              ) : bills.map((bill) => (
                <tr key={bill.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-white/90 font-medium">Unit {bill.unitNumber}</div>
                    <div className="text-xs text-white/40">{bill.residentName}</div>
                  </td>
                  <td className="px-6 py-4 text-white/80">{bill.billingPeriod}</td>
                  <td className="px-6 py-4 text-white/90">₹{Number(bill.amount).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs border ${
                      bill.status === 'PAID' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                      bill.status === 'OVERDUE' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                      'bg-amber-500/10 border-amber-500/20 text-amber-400'
                    }`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/80" suppressHydrationWarning>
                    {bill.dueDate ? bill.dueDate.split('T')[0] : ''}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-white/60 hover:text-white p-2 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {!isLoading && bills.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-white/40">
                    No maintenance bills found.
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
