'use client';

import { useCrmStore } from '@/store/crmStore';
import { Search, ShieldCheck, AlertTriangle, FileText, Upload } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function BrokerComplianceView() {
  const { brokerCompliance, brokers, agencies } = useCrmStore();
  const [searchQuery, setSearchQuery] = useState('');

  const enrichedCompliance = brokerCompliance.map(comp => {
    const broker = comp.brokerId ? brokers.find(b => b.id === comp.brokerId) : null;
    const agency = comp.agencyId ? agencies.find(a => a.id === comp.agencyId) : null;
    
    return {
      ...comp,
      partnerName: broker?.name || agency?.name || 'Unknown Partner',
      partnerType: broker ? 'Broker' : agency ? 'Agency' : 'Unknown',
    };
  }).filter(c => c.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) || c.reraNumber.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalVerified = brokerCompliance.filter(c => c.kycStatus === 'VERIFIED').length;
  const totalPending = brokerCompliance.filter(c => c.kycStatus === 'PENDING').length;
  const totalRejected = brokerCompliance.filter(c => c.kycStatus === 'REJECTED').length;
  const docsExpiringSoon = 0; // Prototype placeholder

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-white tracking-wide">Broker Compliance & KYC</h2>
          <p className="text-sm text-neutral-500 mt-1">Manage RERA verification, tax documents, and onboarding compliance</p>
        </div>
        <div className="flex gap-3">
           <button onClick={() => toast.info('Request Documents', { description: 'Sending automated email for pending documents...' })} className="h-9 px-4 bg-[#121212] hover:bg-neutral-800 border border-neutral-800 text-white rounded flex items-center gap-2 text-sm font-medium transition-colors">
            <Upload className="w-4 h-4" />
            Request Documents
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-green-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Fully Verified</span>
          </div>
          <div className="text-2xl font-medium text-white">{totalVerified}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-amber-400 mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Pending Review</span>
          </div>
          <div className="text-2xl font-medium text-white">{totalPending}</div>
        </div>
        <div className="bg-[#2A1616] border border-red-900/50 rounded p-4">
          <div className="flex items-center gap-3 text-red-400 mb-2">
            <FileText className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Rejected KYC</span>
          </div>
          <div className="text-2xl font-medium text-white">{totalRejected}</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Docs Expiring Soon</span>
          </div>
          <div className="text-2xl font-medium text-white">{docsExpiringSoon}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search partners or RERA numbers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-80 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
          />
        </div>
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] border-b border-neutral-800">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">PARTNER</th>
                <th className="px-6 py-4 font-medium">RERA NUMBER</th>
                <th className="px-6 py-4 font-medium">TAX ID (PAN/GST)</th>
                <th className="px-6 py-4 font-medium">DOCUMENTS</th>
                <th className="px-6 py-4 font-medium text-center">KYC STATUS</th>
                <th className="px-6 py-4 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {enrichedCompliance.map(comp => (
                <tr key={comp.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{comp.partnerName}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{comp.partnerType}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-mono text-xs">{comp.reraNumber}</div>
                    <div className="text-[10px] text-green-400 mt-0.5">Verified</div>
                  </td>
                  <td className="px-6 py-4 text-neutral-300 font-mono text-xs">{comp.taxId}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {comp.documentsUploaded.map((doc, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-neutral-800 rounded text-[10px] text-neutral-400 border border-neutral-700">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${
                      comp.kycStatus === 'VERIFIED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      comp.kycStatus === 'REJECTED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {comp.kycStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {comp.kycStatus === 'PENDING' && (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => toast.success('KYC Approved', { description: `${comp.partnerName} is now verified.` })} className="px-3 py-1 text-xs font-medium rounded bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-colors">
                          Verify
                        </button>
                        <button onClick={() => toast.error('KYC Rejected', { description: `${comp.partnerName} KYC was rejected.` })} className="px-3 py-1 text-xs font-medium rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors">
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {enrichedCompliance.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">
                    No compliance records found.
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
