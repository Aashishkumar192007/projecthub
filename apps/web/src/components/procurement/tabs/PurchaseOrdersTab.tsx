'use client';

import { ShoppingCart, Search, Filter, Download, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function PurchaseOrdersTab() {
  return (
    <div className="p-8 space-y-6">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><ShoppingCart size={16} className="text-[#00E5FF]"/> Purchase Order Pipeline</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A30] rounded text-[10px] font-bold text-white hover:bg-[#1E1E22] transition-colors"><Search size={12}/> Search PO</button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A30] rounded text-[10px] font-bold text-white hover:bg-[#1E1E22] transition-colors"><Filter size={12}/> Filter</button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 rounded text-[10px] font-bold hover:bg-[#00E5FF]/20 transition-colors"><Download size={12}/> Export PO Report</button>
        </div>
      </div>

      {/* PO Status Summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-brand-blue">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1">Issued</p>
           <p className="text-xl font-black text-white">42</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-purple-400">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1">Partially Received</p>
           <p className="text-xl font-black text-white">18</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-success">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1">Completed (MTD)</p>
           <p className="text-xl font-black text-success">124</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-danger">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1 flex items-center gap-1"><AlertTriangle size={10}/> Delayed</p>
           <p className="text-xl font-black text-danger">4</p>
        </div>
      </div>

      {/* Purchase Orders List */}
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl overflow-hidden mt-6">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#161616] border-b border-[#2A2A30]">
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">PO Number</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Vendor</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Project / Dept</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Delivery Date</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Value</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Status</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A30]">
                
                <tr className="hover:bg-[#111111] transition-colors">
                  <td className="p-4 text-xs font-bold text-white">PO-2026-4492</td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-white">L&T Steel</p>
                    <p className="text-[10px] text-[#71717A]">Structural Steel 500 Tons</p>
                  </td>
                  <td className="p-4 text-xs text-[#A1A1AA]">Project Alpha</td>
                  <td className="p-4 text-xs text-danger font-bold">14 Days Overdue</td>
                  <td className="p-4 text-xs font-black text-white">₹1,25,00,000</td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-danger/10 text-danger border border-danger/30 px-2 py-0.5 rounded uppercase">Delayed</span></td>
                  <td className="p-4 text-right"><button className="text-[10px] font-bold text-[#00E5FF] hover:underline">Track Delivery</button></td>
                </tr>

                <tr className="hover:bg-[#111111] transition-colors">
                  <td className="p-4 text-xs font-bold text-white">PO-2026-4495</td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-white">Dell Technologies</p>
                    <p className="text-[10px] text-[#71717A]">IT Equipment - 50 Laptops</p>
                  </td>
                  <td className="p-4 text-xs text-[#A1A1AA]">Corporate IT</td>
                  <td className="p-4 text-xs text-warning font-bold">Tomorrow</td>
                  <td className="p-4 text-xs font-black text-white">₹42,50,000</td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-purple-400/10 text-purple-400 border border-purple-400/30 px-2 py-0.5 rounded uppercase">Partially Received</span></td>
                  <td className="p-4 text-right"><button className="text-[10px] font-bold text-[#00E5FF] hover:underline">Create GRN</button></td>
                </tr>

                <tr className="hover:bg-[#111111] transition-colors">
                  <td className="p-4 text-xs font-bold text-white">PO-2026-4480</td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-white">Kone Elevators</p>
                    <p className="text-[10px] text-[#71717A]">Elevator Spares (AMC)</p>
                  </td>
                  <td className="p-4 text-xs text-[#A1A1AA]">Cyber City Facility</td>
                  <td className="p-4 text-xs text-[#A1A1AA]">Jun 15, 2026</td>
                  <td className="p-4 text-xs font-black text-white">₹8,10,000</td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-success/10 text-success border border-success/30 px-2 py-0.5 rounded uppercase flex items-center gap-1 w-max"><CheckCircle2 size={10}/> Completed</span></td>
                  <td className="p-4 text-right"><button className="text-[10px] font-bold text-[#A1A1AA] hover:text-white">View Details</button></td>
                </tr>

              </tbody>
            </table>
         </div>
      </div>

    </div>
  );
}
