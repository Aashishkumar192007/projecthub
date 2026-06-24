'use client';

import { Headset, Search, Filter, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export function ComplaintsTab() {
  return (
    <div className="p-8 space-y-6">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><Headset size={16} className="text-[#00E5FF]"/> Resident Helpdesk</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A30] rounded text-[10px] font-bold text-white hover:bg-[#1E1E22] transition-colors"><Search size={12}/> Search Ticket</button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A30] rounded text-[10px] font-bold text-white hover:bg-[#1E1E22] transition-colors"><Filter size={12}/> Filter Status</button>
        </div>
      </div>

      {/* Complaints Summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-brand-blue">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1">Open Tickets</p>
           <p className="text-xl font-black text-white">14</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-danger">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1 flex items-center gap-1"><AlertTriangle size={10}/> SLA Breached</p>
           <p className="text-xl font-black text-danger">4</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-warning">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1">Escalated</p>
           <p className="text-xl font-black text-warning">2</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A30] border-l-2 border-l-success">
           <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-1 flex items-center gap-1"><CheckCircle2 size={10}/> Resolved (MTD)</p>
           <p className="text-xl font-black text-success">85</p>
        </div>
      </div>

      {/* Complaints List */}
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl overflow-hidden mt-6">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#161616] border-b border-[#2A2A30]">
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Ticket ID</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Issue Description</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Category</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Resident / Unit</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">SLA Status</th>
                  <th className="p-4 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A30]">
                
                <tr className="hover:bg-[#111111] transition-colors">
                  <td className="p-4 text-xs font-bold text-white">Tkt-842</td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-white">Plumbing Leak in Master Bath</p>
                    <p className="text-[10px] text-[#71717A] flex items-center gap-1"><Clock size={10}/> Raised 2 hours ago</p>
                  </td>
                  <td className="p-4 text-xs text-[#A1A1AA]">Plumbing</td>
                  <td className="p-4 text-xs text-white font-bold">Tower B - 204</td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-warning/10 text-warning border border-warning/30 px-2 py-0.5 rounded uppercase">Within SLA</span></td>
                  <td className="p-4 text-right"><button className="text-[10px] font-bold text-brand-blue bg-brand-blue/10 border border-brand-blue/30 px-3 py-1.5 rounded hover:bg-brand-blue/20">Assign Staff</button></td>
                </tr>

                <tr className="hover:bg-[#111111] transition-colors">
                  <td className="p-4 text-xs font-bold text-white">Tkt-840</td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-white">AC not cooling (HVAC)</p>
                    <p className="text-[10px] text-[#71717A] flex items-center gap-1"><Clock size={10}/> Raised Yesterday</p>
                  </td>
                  <td className="p-4 text-xs text-[#A1A1AA]">HVAC</td>
                  <td className="p-4 text-xs text-white font-bold">Tower A - 501</td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-danger/10 text-danger border border-danger/30 px-2 py-0.5 rounded uppercase flex items-center gap-1 w-max"><AlertTriangle size={10}/> SLA Breached</span></td>
                  <td className="p-4 text-right"><button className="text-[10px] font-bold text-danger hover:underline">Escalate</button></td>
                </tr>

                <tr className="hover:bg-[#111111] transition-colors">
                  <td className="p-4 text-xs font-bold text-white">Tkt-835</td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-white">Main door smart lock issue</p>
                    <p className="text-[10px] text-[#71717A] flex items-center gap-1"><Clock size={10}/> Raised 2 days ago</p>
                  </td>
                  <td className="p-4 text-xs text-[#A1A1AA]">Carpentry / Locks</td>
                  <td className="p-4 text-xs text-white font-bold">Tower C - 102</td>
                  <td className="p-4"><span className="text-[9px] font-bold bg-success/10 text-success border border-success/30 px-2 py-0.5 rounded uppercase flex items-center gap-1 w-max"><CheckCircle2 size={10}/> Resolved</span></td>
                  <td className="p-4 text-right"><button className="text-[10px] font-bold text-[#A1A1AA] hover:text-white">View History</button></td>
                </tr>

              </tbody>
            </table>
         </div>
      </div>

    </div>
  );
}
