'use client';

import React, { useState } from 'react';
import { useComplianceStore } from '@/store/complianceStore';
import { useParams } from 'next/navigation';
import { FileText, CheckCircle2, AlertTriangle, UploadCloud, FileSignature, Download, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function BookingDocumentsWorkspace() {
  const params = useParams();
  const bookingId = params.id as string;
  const { documents } = useComplianceStore();
  
  const bookingDocs = documents.filter(d => d.bookingId === bookingId || d.category === 'Booking'); // Simplified for mock

  const requiredDocs = [
    { type: 'Application Form', status: 'Verified' },
    { type: 'Booking Form', status: 'Pending' },
    { type: 'Payment Receipts', status: 'Verified' },
    { type: 'Allotment Letter', status: 'Missing' },
    { type: 'Cost Sheet', status: 'Verified' },
    { type: 'Agreement Draft', status: 'Missing' }
  ];

  return (
    <div className="h-full flex flex-col bg-[#121212]">
      <div className="p-6 border-b border-[#2A2A30] bg-[#161616] flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="text-brand-blue" />
            Booking Documentation Workspace
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">Manage documents for Booking: {bookingId}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/document-generator" className="px-4 py-2 bg-[#2A2A30] text-white font-semibold rounded hover:bg-[#3A3A40] transition-colors flex items-center gap-2">
            <FileSignature size={18} />
            Generate Document
          </Link>
          <button className="px-4 py-2 bg-brand-blue text-[#111111] font-bold rounded hover:bg-white transition-colors flex items-center gap-2">
            <UploadCloud size={18} />
            Upload
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Document Checklist Panel */}
        <div className="w-80 border-r border-[#2A2A30] bg-[#161616] flex flex-col">
          <div className="p-4 border-b border-[#2A2A30]">
            <h3 className="font-bold text-white flex items-center gap-2">
              <ShieldCheck size={18} className="text-brand-blue" />
              Compliance Checklist
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {requiredDocs.map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-[#2A2A30] bg-[#111111]">
                <span className="text-sm font-medium text-white">{doc.type}</span>
                {doc.status === 'Verified' && <CheckCircle2 size={16} className="text-emerald-500" />}
                {doc.status === 'Pending' && <AlertTriangle size={16} className="text-amber-500" />}
                {doc.status === 'Missing' && <div className="w-4 h-4 rounded-full border-2 border-[#2A2A30]" />}
              </div>
            ))}
          </div>
        </div>

        {/* Uploaded Documents Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#121212]">
          <h2 className="text-lg font-bold text-white mb-4">Uploaded Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookingDocs.map(doc => (
              <div key={doc.id} className="bg-[#161616] border border-[#2A2A30] rounded-xl p-4 flex flex-col group hover:border-brand-blue transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue">
                    <FileText size={20} />
                  </div>
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${
                    doc.status === 'Verified' ? 'bg-emerald-500/20 text-emerald-400' :
                    doc.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-[#2A2A30] text-[#A1A1AA]'
                  }`}>
                    {doc.status}
                  </span>
                </div>
                
                <h3 className="text-white font-bold text-sm truncate" title={doc.name}>{doc.name}</h3>
                <p className="text-[#71717A] text-xs mt-1">{doc.type}</p>
                
                <div className="mt-auto pt-4 flex items-center justify-between text-xs text-[#71717A]">
                  <span suppressHydrationWarning>v{doc.version} • {doc.uploadedAt ? doc.uploadedAt.split('T')[0] : ''}</span>
                  <div className="flex gap-2">
                    <button className="text-brand-blue hover:underline"><Download size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
            {bookingDocs.length === 0 && (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-[#A1A1AA] border border-dashed border-[#2A2A30] rounded-xl">
                <FileText size={48} className="mb-4 text-[#2A2A30]" />
                <p>No documents uploaded for this booking yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
