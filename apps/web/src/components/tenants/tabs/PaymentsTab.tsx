'use client';

import { useTenantStore } from '@/store/tenantStore';
import { TrendingUp, ArrowDownRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export function PaymentsTab() {
  const { invoices, activeTenantId } = useTenantStore();
  
  if (!activeTenantId) return null;
  const activeInvoices = invoices.filter(inv => inv.tenantId === activeTenantId);

  const totalPaid = activeInvoices.filter(i => i.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
  const totalOutstanding = activeInvoices.filter(i => i.status !== 'Paid').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="p-8 space-y-6">
      
      {/* Financial Analytics Widget */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4">
           <div className="flex items-center gap-2 mb-2">
             <div className="w-6 h-6 rounded bg-success/10 flex items-center justify-center"><CheckCircle2 size={12} className="text-success" /></div>
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Collection Rate</span>
           </div>
           <p className="text-2xl font-black text-white">94.2%</p>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4">
           <div className="flex items-center gap-2 mb-2">
             <div className="w-6 h-6 rounded bg-danger/10 flex items-center justify-center"><AlertCircle size={12} className="text-danger" /></div>
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Outstanding</span>
           </div>
           <p className="text-2xl font-black text-danger">₹{totalOutstanding.toLocaleString()}</p>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4">
           <div className="flex items-center gap-2 mb-2">
             <div className="w-6 h-6 rounded bg-warning/10 flex items-center justify-center"><Clock size={12} className="text-warning" /></div>
             <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Avg. Delay</span>
           </div>
           <p className="text-2xl font-black text-white">4.1 <span className="text-sm text-[#71717A] font-medium">Days</span></p>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4 flex flex-col justify-between">
           <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Trend</span>
           <div className="flex items-end gap-2 text-success">
             <TrendingUp size={24} />
             <span className="text-sm font-bold">Improving</span>
           </div>
        </div>
      </div>

      {/* Invoice History Table */}
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#161616] border-b border-[#2A2A30]">
            <tr>
              <th className="p-4 text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Invoice ID</th>
              <th className="p-4 text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Date</th>
              <th className="p-4 text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Amount</th>
              <th className="p-4 text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A30]">
            {activeInvoices.map(inv => (
              <tr key={inv.id} className="hover:bg-[#1E1E22] transition-colors">
                <td className="p-4 text-xs font-bold text-white uppercase">{inv.id}</td>
                <td className="p-4 text-xs text-[#A1A1AA]">{inv.date}</td>
                <td className="p-4 text-xs font-bold text-white">₹{inv.amount.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                    inv.status === 'Paid' ? 'border-success text-success bg-success/10' :
                    inv.status === 'Overdue' ? 'border-danger text-danger bg-danger/10' :
                    'border-warning text-warning bg-warning/10'
                  }`}>
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
            {activeInvoices.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-xs text-[#71717A]">No invoices found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
