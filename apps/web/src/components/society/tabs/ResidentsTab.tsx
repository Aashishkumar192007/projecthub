'use client';

import { UserSquare2, Search, Filter, Download, UserCheck, KeySquare } from 'lucide-react';

export function ResidentsTab() {
  return (
    <div className="p-8 space-y-6">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><UserSquare2 size={16} className="text-[#00E5FF]"/> Resident Directory</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A30] rounded text-[10px] font-bold text-white hover:bg-[#1E1E22] transition-colors"><Search size={12}/> Search Name/Unit</button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A30] rounded text-[10px] font-bold text-white hover:bg-[#1E1E22] transition-colors"><Filter size={12}/> Filter Tower</button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 rounded text-[10px] font-bold hover:bg-[#00E5FF]/20 transition-colors"><Download size={12}/> Export CSV</button>
        </div>
      </div>

      {/* Resident Summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-[#00E5FF]">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1">Total Residents</p>
           <p className="text-xl font-black text-white">1,420</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-brand-blue">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1">Owners (Residing)</p>
           <p className="text-xl font-black text-white">840</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-purple-400">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1">Tenants</p>
           <p className="text-xl font-black text-white">580</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-warning">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1 flex items-center gap-1"><KeySquare size={10}/> Vacant Units</p>
           <p className="text-xl font-black text-warning">24</p>
        </div>
      </div>

      {/* Resident List */}
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl overflow-hidden mt-6">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#161616] border-b border-[#2A2A30]">
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Unit / Tower</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Resident Name</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Type</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Family / Members</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">KYC Status</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A30]">
                
                <tr className="hover:bg-[#111111] transition-colors">
                  <td className="p-4 font-bold text-[#00E5FF]">Flat 104 - Tower A</td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-white">Aashish Kumar</p>
                    <p className="text-[10px] text-[#71717A]">aashish@example.com</p>
                  </td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-brand-blue/10 text-brand-blue border border-brand-blue/30 px-2 py-0.5 rounded uppercase">Owner</span></td>
                  <td className="p-4 text-xs font-bold text-white">4 Members</td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-success/10 text-success border border-success/30 px-2 py-0.5 rounded uppercase flex items-center gap-1 w-max"><UserCheck size={10}/> Verified</span></td>
                  <td className="p-4 text-right"><button className="text-[10px] font-bold text-[#00E5FF] hover:underline">View Profile</button></td>
                </tr>

                <tr className="hover:bg-[#111111] transition-colors">
                  <td className="p-4 font-bold text-[#00E5FF]">Flat 205 - Tower B</td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-white">Rahul Sharma</p>
                    <p className="text-[10px] text-[#71717A]">rahul.s@example.com</p>
                  </td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-purple-400/10 text-purple-400 border border-purple-400/30 px-2 py-0.5 rounded uppercase">Tenant</span></td>
                  <td className="p-4 text-xs font-bold text-white">2 Members</td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-success/10 text-success border border-success/30 px-2 py-0.5 rounded uppercase flex items-center gap-1 w-max"><UserCheck size={10}/> Verified</span></td>
                  <td className="p-4 text-right"><button className="text-[10px] font-bold text-[#00E5FF] hover:underline">View Profile</button></td>
                </tr>

                <tr className="hover:bg-[#111111] transition-colors">
                  <td className="p-4 font-bold text-warning">Flat 801 - Tower C</td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-[#A1A1AA] italic">Unoccupied</p>
                    <p className="text-[10px] text-[#71717A]">Owner: Neha Gupta</p>
                  </td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-warning/10 text-warning border border-warning/30 px-2 py-0.5 rounded uppercase">Vacant</span></td>
                  <td className="p-4 text-xs font-bold text-[#A1A1AA]">-</td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-[#2A2A30] text-[#71717A] border border-[#3F3F46] px-2 py-0.5 rounded uppercase">N/A</span></td>
                  <td className="p-4 text-right"><button className="text-[10px] font-bold text-[#A1A1AA] hover:text-white">Contact Owner</button></td>
                </tr>

              </tbody>
            </table>
         </div>
      </div>

    </div>
  );
}
