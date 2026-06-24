'use client';

import { Package, Search, Filter, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function InventoryTab() {
  return (
    <div className="p-8 space-y-6">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><Package size={16} className="text-[#00E5FF]"/> Inventory & Stock Management</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A30] rounded text-[10px] font-bold text-white hover:bg-[#1E1E22] transition-colors"><Search size={12}/> Search SKU</button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A30] rounded text-[10px] font-bold text-white hover:bg-[#1E1E22] transition-colors"><Filter size={12}/> Filter by Warehouse</button>
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30]">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1">Total Valuation</p>
           <p className="text-xl font-black text-white">₹4.25Cr</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-success">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1 flex items-center gap-1"><ArrowUpRight size={10}/> Fast Moving</p>
           <p className="text-xl font-black text-success">342 SKUs</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-warning">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1 flex items-center gap-1"><ArrowDownRight size={10}/> Slow Moving</p>
           <p className="text-xl font-black text-warning">84 SKUs</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-danger">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1 flex items-center gap-1"><AlertTriangle size={10}/> Dead Stock</p>
           <p className="text-xl font-black text-danger">₹12.5L Value</p>
        </div>
      </div>

      {/* Inventory Ledger */}
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl overflow-hidden mt-6">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#161616] border-b border-[#2A2A30]">
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">SKU</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Item Name / Category</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Location</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Current Stock</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Reorder Level</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Status</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A30]">
                
                <tr className="hover:bg-[#111111] transition-colors">
                  <td className="p-4 text-xs font-bold text-[#00E5FF]">SKU-220</td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-white">HVAC HEPA Filters (Industrial)</p>
                    <p className="text-[10px] text-[#71717A]">Facilities / Consumables</p>
                  </td>
                  <td className="p-4 text-xs text-[#A1A1AA]">Cyber City - W1</td>
                  <td className="p-4 text-xs font-black text-danger">12 Units</td>
                  <td className="p-4 text-xs font-bold text-[#A1A1AA]">50 Units</td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-danger/10 text-danger border border-danger/30 px-2 py-0.5 rounded uppercase flex items-center gap-1 w-max"><AlertTriangle size={10}/> Critical Stock</span></td>
                  <td className="p-4 text-right"><button className="text-[10px] font-bold text-danger hover:underline">Reorder Now</button></td>
                </tr>

                <tr className="hover:bg-[#111111] transition-colors">
                  <td className="p-4 text-xs font-bold text-[#00E5FF]">SKU-845</td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-white">Structural Steel (Grade A)</p>
                    <p className="text-[10px] text-[#71717A]">Construction / Raw Material</p>
                  </td>
                  <td className="p-4 text-xs text-[#A1A1AA]">Project Alpha Site</td>
                  <td className="p-4 text-xs font-black text-warning">140 Tons</td>
                  <td className="p-4 text-xs font-bold text-[#A1A1AA]">200 Tons</td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-warning/10 text-warning border border-warning/30 px-2 py-0.5 rounded uppercase">Low Stock</span></td>
                  <td className="p-4 text-right"><button className="text-[10px] font-bold text-[#00E5FF] hover:underline">Create PR</button></td>
                </tr>

                <tr className="hover:bg-[#111111] transition-colors">
                  <td className="p-4 text-xs font-bold text-[#00E5FF]">SKU-112</td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-white">LED Panel Lights (60x60)</p>
                    <p className="text-[10px] text-[#71717A]">Electrical / Fittings</p>
                  </td>
                  <td className="p-4 text-xs text-[#A1A1AA]">Central Hub - W2</td>
                  <td className="p-4 text-xs font-black text-white">450 Units</td>
                  <td className="p-4 text-xs font-bold text-[#A1A1AA]">100 Units</td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-success/10 text-success border border-success/30 px-2 py-0.5 rounded uppercase">Healthy</span></td>
                  <td className="p-4 text-right"><button className="text-[10px] font-bold text-[#A1A1AA] hover:text-white">View Ledger</button></td>
                </tr>

              </tbody>
            </table>
         </div>
      </div>

    </div>
  );
}
