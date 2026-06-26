'use client';

import React, { useState } from 'react';
import { useComplianceStore } from '@/store/complianceStore';
import { FileText, UploadCloud, Search, Filter, Download, Trash2, ShieldCheck, Clock, CheckCircle2, AlertTriangle, Eye, RefreshCw } from 'lucide-react';
import { QuickFilterMenu } from '@/components/ui/QuickFilterMenu';

export default function DocumentVault() {
  const { documents } = useComplianceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'KYC', 'Booking', 'Legal', 'Property', 'Financial', 'Corporate'];

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="text-brand-blue" />
            Document Vault
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">Central repository for all compliance, legal, and operational documents.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#1A2533] border border-brand-blue/30 text-brand-blue font-semibold rounded hover:bg-brand-blue hover:text-[#111111] transition-colors flex items-center gap-2">
            <RefreshCw size={16} />
            Run OCR Sync
          </button>
          <button className="px-4 py-2 bg-brand-blue text-[#111111] font-bold rounded hover:bg-white transition-colors flex items-center gap-2">
            <UploadCloud size={18} />
            Upload Document
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#161616] border border-[#2A2A30] rounded-lg p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">Total Documents</p>
            <p className="text-2xl font-bold text-white mt-1">{documents.length}</p>
          </div>
        </div>
        <div className="bg-[#161616] border border-[#2A2A30] rounded-lg p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">Verified</p>
            <p className="text-2xl font-bold text-white mt-1">{documents.filter(d => d.status === 'Verified').length}</p>
          </div>
        </div>
        <div className="bg-[#161616] border border-[#2A2A30] rounded-lg p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">Pending Review</p>
            <p className="text-2xl font-bold text-white mt-1">{documents.filter(d => d.status === 'Pending').length}</p>
          </div>
        </div>
        <div className="bg-[#161616] border border-[#2A2A30] rounded-lg p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">Expired</p>
            <p className="text-2xl font-bold text-white mt-1">{documents.filter(d => d.status === 'Expired').length}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#161616] border border-[#2A2A30] rounded-xl flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-[#2A2A30] flex flex-col gap-4">
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  activeCategory === cat 
                    ? 'bg-brand-blue text-[#111111]' 
                    : 'bg-[#111111] text-[#A1A1AA] hover:text-white border border-[#2A2A30]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
              <input 
                type="text" 
                placeholder="Search documents by name or type..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#111111] border border-[#2A2A30] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>
            <QuickFilterMenu value={activeCategory} onChange={setActiveCategory} options={categories} />
          </div>
        </div>

        {/* Grid */}
        <div className="overflow-x-auto flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="bg-[#111111] border border-[#2A2A30] rounded-xl p-4 flex flex-col group hover:border-brand-blue transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-2 rounded-lg ${
                    doc.category === 'KYC' ? 'bg-amber-500/10 text-amber-500' :
                    doc.category === 'Legal' ? 'bg-rose-500/10 text-rose-500' :
                    'bg-brand-blue/10 text-brand-blue'
                  }`}>
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
                
                {doc.extractedData && (
                  <div className="mt-3 p-2 bg-[#1A2533] border border-brand-blue/30 rounded text-xs flex items-center gap-2">
                    <ShieldCheck size={14} className="text-brand-blue flex-shrink-0" />
                    <span className="text-brand-blue truncate">Data extracted & verified</span>
                  </div>
                )}
                
                <div className="mt-auto pt-4 flex items-center justify-between text-xs text-[#71717A]">
                  <span suppressHydrationWarning>v{doc.version} • {doc.uploadedAt ? doc.uploadedAt.split('T')[0] : ''}</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="hover:text-white"><Eye size={16} /></button>
                    <button className="hover:text-brand-blue"><Download size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
            {filteredDocs.length === 0 && (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-[#A1A1AA]">
                <FileText size={48} className="mb-4 text-[#2A2A30]" />
                <p>No documents found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
