'use client';

import { useTenantStore } from '@/store/tenantStore';
import { RefreshCcw, Wrench, FileText, Send, DollarSign, Activity, FileSpreadsheet } from 'lucide-react';

export function OverviewTab() {
  const { tenants, activeTenantId } = useTenantStore();
  const activeTenant = tenants.find(t => t.id === activeTenantId);
  
  if (!activeTenant) return null;

  return (
    <div className="p-8 space-y-6">
      
      {/* Quick Actions Command Center */}
      <div>
        <h3 className="text-sm font-bold text-white mb-4">Command Center</h3>
        <div className="grid grid-cols-5 gap-4">
          
          <button className="flex flex-col items-center justify-center gap-3 p-4 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] hover:border-brand-blue/50 rounded-xl transition-all group">
            <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center group-hover:bg-brand-blue/20 transition-colors">
              <RefreshCcw size={18} className="text-brand-blue" />
            </div>
            <span className="text-[11px] font-bold text-white">Renew Lease</span>
          </button>

          <button className="flex flex-col items-center justify-center gap-3 p-4 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] hover:border-amber-500/50 rounded-xl transition-all group">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
              <Wrench size={18} className="text-amber-500" />
            </div>
            <span className="text-[11px] font-bold text-white">Raise WO</span>
          </button>

          <button className="flex flex-col items-center justify-center gap-3 p-4 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] hover:border-success/50 rounded-xl transition-all group">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
              <DollarSign size={18} className="text-success" />
            </div>
            <span className="text-[11px] font-bold text-white">Create Invoice</span>
          </button>

          <button className="flex flex-col items-center justify-center gap-3 p-4 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] hover:border-danger/50 rounded-xl transition-all group">
            <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center group-hover:bg-danger/20 transition-colors">
              <Send size={18} className="text-danger" />
            </div>
            <span className="text-[11px] font-bold text-white">Send Notice</span>
          </button>

          <button className="flex flex-col items-center justify-center gap-3 p-4 bg-[#1A1A1A] hover:bg-[#1E1E22] border border-[#2A2A30] hover:border-[#A1A1AA] rounded-xl transition-all group">
            <div className="w-10 h-10 rounded-full bg-[#2A2A30] flex items-center justify-center group-hover:bg-[#3F3F46] transition-colors">
              <FileSpreadsheet size={18} className="text-[#A1A1AA]" />
            </div>
            <span className="text-[11px] font-bold text-white">Statement</span>
          </button>

        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
           <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest mb-4">Current Lease Summary</h3>
           {/* Mock Data */}
           <div className="space-y-3">
             <div className="flex justify-between items-center py-2 border-b border-[#2A2A30]">
                <span className="text-xs text-[#71717A]">Lease ID</span>
                <span className="text-xs font-bold text-white">LSE-2023-441</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-[#2A2A30]">
                <span className="text-xs text-[#71717A]">Monthly Rent</span>
                <span className="text-xs font-bold text-white">₹25,000</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-[#2A2A30]">
                <span className="text-xs text-[#71717A]">Expiry Date</span>
                <span className="text-xs font-bold text-warning">31 Dec 2026</span>
             </div>
           </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
           <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest mb-4">Recent Activity</h3>
           <div className="space-y-4">
             <div className="flex items-start gap-3">
               <div className="w-2 h-2 rounded-full bg-brand-blue mt-1"></div>
               <div>
                 <p className="text-xs font-bold text-white">Payment Received</p>
                 <p className="text-[10px] text-[#71717A]">₹25,000 for May 2026 • 2 days ago</p>
               </div>
             </div>
             <div className="flex items-start gap-3">
               <div className="w-2 h-2 rounded-full bg-success mt-1"></div>
               <div>
                 <p className="text-xs font-bold text-white">Work Order Resolved</p>
                 <p className="text-[10px] text-[#71717A]">HVAC Maintenance • 5 days ago</p>
               </div>
             </div>
             <div className="flex items-start gap-3">
               <div className="w-2 h-2 rounded-full bg-amber-500 mt-1"></div>
               <div>
                 <p className="text-xs font-bold text-white">Lease Renewal Notice Sent</p>
                 <p className="text-[10px] text-[#71717A]">Auto-generated • 1 week ago</p>
               </div>
             </div>
           </div>
        </div>
      </div>

    </div>
  );
}
