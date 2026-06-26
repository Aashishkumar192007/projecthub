'use client';

import React, { useState } from 'react';
import { useComplianceStore } from '@/store/complianceStore';
import { ShieldCheck, FileText, CheckCircle2, AlertTriangle, History, Info, ChevronLeft, Bot, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CustomerKYCWorkspace() {
  const params = useParams();
  const kycId = params.id as string;
  const { kycRecords, documents } = useComplianceStore();
  const [activeTab, setActiveTab] = useState('overview');

  const record = kycRecords.find(r => r.id === kycId);
  const recordDocs = documents.filter(d => d.kycId === kycId);

  if (!record) {
    return <div className="p-8 text-white">KYC Record not found.</div>;
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'verification', label: 'Verification', icon: CheckCircle2 },
    { id: 'risk', label: 'Risk Assessment', icon: AlertTriangle },
    { id: 'audit', label: 'Audit Trail', icon: History },
  ];

  return (
    <div className="h-full flex flex-col bg-[#121212]">
      {/* Header */}
      <div className="p-6 border-b border-[#2A2A30] bg-[#161616] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/crm/kyc" className="p-2 hover:bg-[#2A2A30] rounded-lg transition-colors text-[#A1A1AA]">
            <ChevronLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-white tracking-tight">KYC Workspace: {record.id}</h1>
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                record.status === 'Verified' ? 'bg-emerald-500/20 text-emerald-400' :
                record.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' :
                'bg-[#2A2A30] text-[#A1A1AA]'
              }`}>
                {record.status}
              </span>
            </div>
            <p className="text-sm text-[#A1A1AA] mt-1">Customer ID: {record.customerId || record.leadId}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#2A2A30] text-white font-semibold rounded hover:bg-[#3A3A40] transition-colors">
            Request Documents
          </button>
          <button className="px-4 py-2 bg-brand-blue text-[#111111] font-bold rounded hover:bg-white transition-colors">
            Verify KYC
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-[#2A2A30]">
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
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-[#161616] p-5 rounded-xl border border-[#2A2A30]">
                    <p className="text-xs text-[#A1A1AA] uppercase tracking-wider font-bold mb-1">Compliance Score</p>
                    <p className="text-3xl font-bold text-white">{record.complianceScore}%</p>
                  </div>
                  <div className="bg-[#161616] p-5 rounded-xl border border-[#2A2A30]">
                    <p className="text-xs text-[#A1A1AA] uppercase tracking-wider font-bold mb-1">Risk Level</p>
                    <p className={`text-3xl font-bold ${
                      record.riskLevel === 'Low' ? 'text-emerald-400' :
                      record.riskLevel === 'Medium' ? 'text-amber-400' :
                      'text-rose-400'
                    }`}>{record.riskLevel}</p>
                  </div>
                  <div className="bg-[#161616] p-5 rounded-xl border border-[#2A2A30]">
                    <p className="text-xs text-[#A1A1AA] uppercase tracking-wider font-bold mb-1">Verification</p>
                    <p className="text-3xl font-bold text-white">{record.verificationPercentage}%</p>
                  </div>
                </div>

                <div className="bg-[#161616] rounded-xl border border-[#2A2A30] p-6">
                  <h3 className="text-lg font-bold text-white mb-4">KYC Details</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div>
                      <p className="text-[#A1A1AA] mb-1">Assigned Officer</p>
                      <p className="text-white font-medium">{record.assignedOfficer}</p>
                    </div>
                    <div>
                      <p className="text-[#A1A1AA] mb-1">Submitted Date</p>
                      <p className="text-white font-medium">{new Date(record.submittedDate).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[#A1A1AA] mb-1">Last Updated</p>
                      <p className="text-white font-medium">{new Date(record.lastUpdated).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Uploaded Documents</h3>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-[#2A2A30] text-white text-sm font-semibold rounded hover:bg-[#3A3A40] transition-colors">
                    <UploadCloud size={16} />
                    Upload Document
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recordDocs.map(doc => (
                    <div key={doc.id} className="bg-[#161616] border border-[#2A2A30] rounded-xl p-4 flex flex-col">
                      <div className="flex items-start justify-between mb-3">
                        <div className="p-2 bg-brand-blue/10 rounded-lg text-brand-blue">
                          <FileText size={20} />
                        </div>
                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                          doc.status === 'Verified' ? 'bg-emerald-500/20 text-emerald-400' :
                          doc.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-[#2A2A30] text-[#A1A1AA]'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                      <p className="text-white font-bold text-sm mb-1">{doc.type}</p>
                      <p className="text-[#A1A1AA] text-xs mb-4 truncate">{doc.name}</p>
                      <div className="mt-auto pt-3 border-t border-[#2A2A30] flex justify-between items-center text-xs">
                        <span className="text-[#71717A]">v{doc.version}</span>
                        <button className="text-brand-blue hover:underline">View</button>
                      </div>
                    </div>
                  ))}
                  {recordDocs.length === 0 && (
                    <div className="col-span-full p-8 border border-dashed border-[#2A2A30] rounded-xl flex flex-col items-center justify-center text-[#A1A1AA]">
                      <FileText size={32} className="mb-2 text-[#71717A]" />
                      <p>No documents uploaded yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {(activeTab === 'verification' || activeTab === 'risk' || activeTab === 'audit') && (
              <div className="flex flex-col items-center justify-center h-full text-[#A1A1AA]">
                <ShieldCheck size={48} className="mb-4 text-[#2A2A30]" />
                <p>Detailed {tab.label} data will appear here.</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Copilot Panel */}
        <div className="w-80 bg-[#161616] flex flex-col border-l border-[#2A2A30]">
          <div className="p-4 border-b border-[#2A2A30] flex items-center gap-2">
            <Bot className="text-brand-blue" size={20} />
            <h2 className="text-white font-bold">AI Compliance Copilot</h2>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="bg-[#111111] p-3 rounded-lg border border-[#2A2A30]">
              <p className="text-sm text-[#A1A1AA] mb-2 text-justify">
                I've analyzed the KYC file. The Aadhaar card is verified, but the PAN card is missing. 
                Risk level is considered <span className="text-amber-400 font-bold">Medium</span> until PAN is verified.
              </p>
              <button className="w-full mt-2 py-1.5 bg-brand-blue/10 text-brand-blue text-sm font-semibold rounded hover:bg-brand-blue/20 transition-colors">
                Request PAN Card
              </button>
            </div>
          </div>
          <div className="p-4 border-t border-[#2A2A30]">
            <input 
              type="text" 
              placeholder="Ask Copilot..." 
              className="w-full bg-[#111111] border border-[#2A2A30] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
