'use client';

import { useCrmStore } from '@/store/crmStore';
import { LayoutDashboard, Users, MapPin, DollarSign, PieChart, FileText, Download } from 'lucide-react';

export function PartnerPortalView() {
  const { brokers, commissions, leads, bookings } = useCrmStore();
  
  // Hardcoded for the prototype experience
  const currentBrokerId = brokers[0]?.id;
  const currentBroker = brokers[0];

  const brokerLeads = leads.filter(l => l.brokerId === currentBrokerId);
  const brokerCommissions = commissions.filter(c => c.brokerId === currentBrokerId);
  const brokerBookings = bookings.filter(b => b.brokerId === currentBrokerId);

  const totalCommissions = brokerCommissions.reduce((acc, c) => acc + c.amount, 0);
  const pendingCommissions = brokerCommissions.filter(c => c.status === 'PENDING').reduce((acc, c) => acc + c.amount, 0);

  if (!currentBroker) {
    return <div className="p-6 text-white">No broker data available for portal prototype.</div>;
  }

  return (
    <div className="h-full bg-[#0A0C10] flex flex-col overflow-y-auto">
      
      {/* Portal Header */}
      <div className="bg-[#111111] border-b border-neutral-800 p-6 flex items-center justify-between">
        <div>
          <div className="text-[#00E5FF] text-[10px] font-bold tracking-widest uppercase mb-1">PARTNER PORTAL PROTOTYPE</div>
          <h1 className="text-2xl font-medium text-white">Welcome back, {currentBroker.name}</h1>
          <p className="text-neutral-500 text-sm">{currentBroker.company}</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <div className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase">YOUR COMMISSION RATE</div>
            <div className="text-xl font-medium text-[#00E5FF]">{currentBroker.commissionRate}% Base</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 flex-1">
        
        {/* Top KPIs */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#121212] border border-neutral-800 rounded p-4">
            <div className="flex items-center gap-3 text-neutral-400 mb-2">
              <Users className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Leads Submitted</span>
            </div>
            <div className="text-2xl font-medium text-white">{brokerLeads.length}</div>
          </div>
          <div className="bg-[#121212] border border-neutral-800 rounded p-4">
            <div className="flex items-center gap-3 text-blue-400 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Site Visits</span>
            </div>
            <div className="text-2xl font-medium text-white">{brokerLeads.filter(l => l.stage === 'SITE_VISIT').length}</div>
          </div>
          <div className="bg-[#121212] border border-neutral-800 rounded p-4">
            <div className="flex items-center gap-3 text-green-400 mb-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Closed Bookings</span>
            </div>
            <div className="text-2xl font-medium text-white">{brokerBookings.length}</div>
          </div>
          <div className="bg-[#121212] border border-neutral-800 rounded p-4">
            <div className="flex items-center gap-3 text-amber-400 mb-2">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Pending Payout</span>
            </div>
            <div className="text-2xl font-medium text-white">${pendingCommissions.toLocaleString()}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          
          {/* Main Content Area */}
          <div className="col-span-2 space-y-6">
            
            <div className="bg-[#121212] border border-neutral-800 rounded flex flex-col overflow-hidden">
              <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-[#1A1C20]">
                <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-widest">Recent Leads</h3>
                <button className="text-xs text-[#00E5FF] hover:underline">View All</button>
              </div>
              <div className="p-0">
                <table className="w-full text-sm text-left">
                  <tbody>
                    {brokerLeads.slice(0, 5).map(lead => (
                      <tr key={lead.id} className="border-b border-neutral-800/50 last:border-0 hover:bg-[#1A1C20] transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-white">{lead.name}</div>
                          <div className="text-[10px] text-neutral-500">{lead.email}</div>
                        </td>
                        <td className="px-4 py-3 text-neutral-400">{lead.phone}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-[10px] font-bold tracking-widest uppercase rounded border bg-neutral-900 border-neutral-700 text-neutral-300">
                            {lead.stage}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {brokerLeads.length === 0 && (
                      <tr><td colSpan={3} className="px-4 py-6 text-center text-neutral-500">No leads submitted yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#121212] border border-neutral-800 rounded flex flex-col overflow-hidden">
              <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-[#1A1C20]">
                <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-widest">Commission History</h3>
              </div>
              <div className="p-0">
                <table className="w-full text-sm text-left">
                  <tbody>
                    {brokerCommissions.map(comm => (
                      <tr key={comm.id} className="border-b border-neutral-800/50 last:border-0 hover:bg-[#1A1C20] transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-white">Booking #{comm.bookingId.split('-')[0]}</div>
                          <div className="text-[10px] text-neutral-500">{new Date(comm.createdAt).toLocaleDateString()}</div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="text-[#00E5FF] font-medium">${comm.amount.toLocaleString()}</div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className={`px-2 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${
                            comm.status === 'PAID' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                            comm.status === 'PENDING' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                            'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          }`}>
                            {comm.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {brokerCommissions.length === 0 && (
                      <tr><td colSpan={3} className="px-4 py-6 text-center text-neutral-500">No commissions yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            <div className="bg-[#121212] border border-neutral-800 rounded p-4">
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full h-10 bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0A1A2A] rounded font-medium text-sm transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Submit New Lead
                </button>
                <button className="w-full h-10 bg-[#1A1C20] hover:bg-[#2A2D35] text-white border border-neutral-800 rounded font-medium text-sm transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" /> Download KYC Forms
                </button>
              </div>
            </div>

            <div className="bg-[#121212] border border-neutral-800 rounded p-4">
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Marketing Assets</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-neutral-800 rounded bg-[#1A1C20]">
                  <div className="flex items-center gap-3">
                    <PieChart className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="text-sm font-medium text-white">Project Orion Brochure</div>
                      <div className="text-[10px] text-neutral-500">PDF • 4.2 MB</div>
                    </div>
                  </div>
                  <button className="text-neutral-400 hover:text-white"><Download className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center justify-between p-3 border border-neutral-800 rounded bg-[#1A1C20]">
                  <div className="flex items-center gap-3">
                    <PieChart className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-sm font-medium text-white">Pricing Sheet (Q4)</div>
                      <div className="text-[10px] text-neutral-500">PDF • 1.1 MB</div>
                    </div>
                  </div>
                  <button className="text-neutral-400 hover:text-white"><Download className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircle(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
}
