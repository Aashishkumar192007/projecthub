'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Users, UserPlus, CheckCircle2, ShieldCheck, FileText, ChevronLeft, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function CoApplicantManagement() {
  const params = useParams();
  const customerId = params.id as string;
  const [ownershipStructure, setOwnershipStructure] = useState('Joint Owner');

  const coApplicants = [
    { id: 'co-1', name: 'Sneha Verma', relationship: 'Spouse', kycStatus: 'Verified', ownershipShare: 50, email: 'sneha@example.com' }
  ];

  return (
    <div className="h-full flex flex-col bg-[#121212]">
      <div className="p-6 border-b border-[#2A2A30] bg-[#161616] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/customers/${customerId}`} className="p-2 hover:bg-[#2A2A30] rounded-lg transition-colors text-[#A1A1AA]">
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Users className="text-brand-blue" />
              Co-Applicant & Ownership Engine
            </h1>
            <p className="text-sm text-[#A1A1AA] mt-1">Manage secondary applicants and ownership structures for Customer {customerId}</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-brand-blue text-[#111111] font-bold rounded hover:bg-white transition-colors flex items-center gap-2">
          <UserPlus size={18} />
          Add Co-Applicant
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Structure Config */}
        <div className="w-80 border-r border-[#2A2A30] bg-[#161616] p-6 flex flex-col">
          <h3 className="font-bold text-white mb-4">Ownership Structure</h3>
          <div className="space-y-3 flex-1">
            {['Single Owner', 'Joint Owner', 'Corporate Ownership', 'Trust Ownership', 'Partnership'].map(type => (
              <label key={type} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                ownershipStructure === type ? 'border-brand-blue bg-brand-blue/10 text-brand-blue' : 'border-[#2A2A30] text-[#A1A1AA] hover:border-[#3A3A40]'
              }`}>
                <input 
                  type="radio" 
                  name="ownership" 
                  className="hidden" 
                  checked={ownershipStructure === type}
                  onChange={() => setOwnershipStructure(type)} 
                />
                <div className="flex-1 font-semibold text-sm">{type}</div>
                {ownershipStructure === type && <CheckCircle2 size={16} />}
              </label>
            ))}
          </div>

          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
              <ShieldCheck size={16} /> Structure Verified
            </div>
            <p className="text-xs text-emerald-500/70">
              The {ownershipStructure.toLowerCase()} structure meets all compliance requirements for the associated property type.
            </p>
          </div>
        </div>

        {/* Co-Applicants List */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#121212]">
          <h2 className="text-lg font-bold text-white mb-6">Secondary Applicants</h2>
          
          <div className="space-y-4">
            {coApplicants.map(applicant => (
              <div key={applicant.id} className="bg-[#161616] border border-[#2A2A30] rounded-xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2A2A30] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {applicant.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white">{applicant.name}</h4>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-[#2A2A30] text-[#A1A1AA] rounded uppercase">
                        {applicant.relationship}
                      </span>
                    </div>
                    <p className="text-sm text-[#A1A1AA]">{applicant.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-xs text-[#A1A1AA] font-semibold mb-1">Ownership</p>
                    <p className="text-xl font-bold text-white">{applicant.ownershipShare}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#A1A1AA] font-semibold mb-1">KYC Status</p>
                    <span className="flex items-center gap-1 text-sm font-bold text-emerald-400">
                      <ShieldCheck size={14} /> {applicant.kycStatus}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-[#2A2A30] text-[#A1A1AA] hover:text-white rounded transition-colors" title="View KYC">
                      <ShieldCheck size={18} />
                    </button>
                    <button className="p-2 bg-[#2A2A30] text-[#A1A1AA] hover:text-white rounded transition-colors" title="View Documents">
                      <FileText size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 border border-dashed border-[#2A2A30] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-4 text-[#A1A1AA]">
              <Building2 size={32} />
              <div>
                <p className="font-bold text-white">Corporate Entity?</p>
                <p className="text-sm">Link this application to a registered corporate entity instead of individuals.</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#1A2533] text-brand-blue border border-brand-blue/30 font-semibold rounded hover:bg-brand-blue hover:text-[#111111] transition-colors">
              Link Corporate Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
