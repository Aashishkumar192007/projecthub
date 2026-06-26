'use client';

import React, { useState } from 'react';
import { useAgreementStore } from '@/store/agreementStore';
import { useParams } from 'next/navigation';
import { BookCheck, FileText, CheckCircle2, History, ChevronLeft, Users, Send, Edit, FileSignature } from 'lucide-react';
import Link from 'next/link';

export default function AgreementWorkspace() {
  const params = useParams();
  const agreementId = params.id as string;
  const { agreements } = useAgreementStore();
  const [activeTab, setActiveTab] = useState('overview');

  const agreement = agreements.find(a => a.id === agreementId);

  if (!agreement) {
    return <div className="p-8 text-white">Agreement not found.</div>;
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'parties', label: 'Parties', icon: Users },
    { id: 'clauses', label: 'Clauses', icon: BookCheck },
    { id: 'signatures', label: 'Signatures', icon: FileSignature },
    { id: 'audit', label: 'Audit Trail', icon: History },
  ];

  return (
    <div className="h-full flex flex-col bg-[#121212]">
      {/* Header */}
      <div className="p-6 border-b border-[#2A2A30] bg-[#161616] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/agreements" className="p-2 hover:bg-[#2A2A30] rounded-lg transition-colors text-[#A1A1AA]">
            <ChevronLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-white tracking-tight">{agreement.title}</h1>
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                agreement.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' :
                agreement.status === 'Sent for Signature' ? 'bg-brand-blue/20 text-brand-blue' :
                agreement.status === 'Pending Review' ? 'bg-amber-500/20 text-amber-400' :
                'bg-[#2A2A30] text-[#A1A1AA]'
              }`}>
                {agreement.status}
              </span>
            </div>
            <p className="text-sm text-[#A1A1AA] mt-1">{agreement.type} • v{agreement.version}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#2A2A30] text-white font-semibold rounded hover:bg-[#3A3A40] transition-colors flex items-center gap-2">
            <Edit size={16} />
            Edit Agreement
          </button>
          <button className="px-4 py-2 bg-brand-blue text-[#111111] font-bold rounded hover:bg-white transition-colors flex items-center gap-2">
            <Send size={16} />
            Send for Signature
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tabs */}
          <div className="flex px-6 border-b border-[#2A2A30] bg-[#161616]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-brand-blue text-brand-blue'
                    : 'border-transparent text-[#A1A1AA] hover:text-white'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'overview' && (
              <div className="bg-[#161616] rounded-xl border border-[#2A2A30] p-6">
                 <h3 className="text-lg font-bold text-white mb-4">Agreement Details</h3>
                 <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-sm">
                   <div>
                     <p className="text-[#A1A1AA] mb-1">Booking ID</p>
                     <p className="text-white font-medium">{agreement.bookingId || 'N/A'}</p>
                   </div>
                   <div>
                     <p className="text-[#A1A1AA] mb-1">Customer ID</p>
                     <p className="text-white font-medium">{agreement.customerId || 'N/A'}</p>
                   </div>
                   <div>
                     <p className="text-[#A1A1AA] mb-1">Created At</p>
                     <p className="text-white font-medium">{new Date(agreement.createdAt).toLocaleString()}</p>
                   </div>
                   <div>
                     <p className="text-[#A1A1AA] mb-1">Last Updated</p>
                     <p className="text-white font-medium">{new Date(agreement.updatedAt).toLocaleString()}</p>
                   </div>
                 </div>
              </div>
            )}

            {activeTab === 'parties' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agreement.parties.map((party) => (
                  <div key={party.id} className="bg-[#161616] p-4 rounded-xl border border-[#2A2A30]">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-bold">{party.name}</h4>
                        <p className="text-[#A1A1AA] text-xs">{party.role}</p>
                      </div>
                      <span className="px-2 py-1 text-[10px] font-bold uppercase rounded-full bg-[#2A2A30] text-[#A1A1AA]">
                        {party.type}
                      </span>
                    </div>
                    <p className="text-[#A1A1AA] text-sm mt-2">{party.email}</p>
                    <div className="mt-4 pt-3 border-t border-[#2A2A30] flex items-center gap-2">
                      <FileSignature size={14} className={party.signatureStatus === 'Signed' ? 'text-emerald-500' : 'text-[#71717A]'} />
                      <span className={`text-xs font-semibold ${party.signatureStatus === 'Signed' ? 'text-emerald-500' : 'text-[#A1A1AA]'}`}>
                        Signature: {party.signatureStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {(activeTab === 'clauses' || activeTab === 'signatures' || activeTab === 'audit') && (
              <div className="flex flex-col items-center justify-center h-full text-[#A1A1AA]">
                <BookCheck size={48} className="mb-4 text-[#2A2A30]" />
                <p>Detailed {tabs.find(t => t.id === activeTab)?.label} workspace will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
