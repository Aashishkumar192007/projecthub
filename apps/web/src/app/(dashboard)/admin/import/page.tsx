'use client';

import React, { useState } from 'react';
import { AdminNav } from '@/components/admin/AdminNav';
import { useEnterpriseStore } from '@/store/enterpriseStore';
import { 
  UploadCloud, FileSpreadsheet, CheckCircle2, AlertTriangle, ArrowRight, 
  RotateCcw, ShieldCheck, Sparkles, Layers, Database, Play
} from 'lucide-react';

export default function EnterpriseDataImportPage() {
  const { simulateDataImport } = useEnterpriseStore();
  const [targetEntity, setTargetEntity] = useState('Leads');
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fileName, setFileName] = useState('');
  const [recordCount, setRecordCount] = useState(1450);
  const [isImporting, setIsImporting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const entities = [
    'Leads', 'Customers', 'Bookings', 'Properties', 'Units', 
    'Owners', 'Residents', 'Brokers', 'Documents', 'Payments', 'Custom Objects'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setStep(2);
    }
  };

  const handleSimulateSelect = () => {
    setFileName(`${targetEntity.toLowerCase()}_bulk_enterprise_export.csv`);
    setStep(2);
  };

  const startBulkIngestion = () => {
    setIsImporting(true);
    setTimeout(() => {
      simulateDataImport(targetEntity, recordCount);
      setIsImporting(false);
      setIsComplete(true);
      setStep(3);
    }, 1500);
  };

  const resetWizard = () => {
    setStep(1);
    setFileName('');
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-16">
      <AdminNav activeTitle="DATA IMPORT ENGINE & BULK ETL" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-white mb-2 flex items-center gap-3">
            <UploadCloud className="text-brand-blue" /> High-Throughput Bulk Import Engine
          </h2>
          <p className="text-xs text-[#A1A1AA]">Ingest CSV & Excel datasets with automated field mapping, AI duplicate detection, and instant transaction rollback.</p>
        </div>

        {/* Wizard Step Indicator */}
        <div className="flex items-center justify-between gap-4 p-4 bg-[#111111] border border-[#2A2A30] rounded-2xl mb-8 text-xs font-bold font-mono">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-brand-blue' : 'text-[#71717A]'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-brand-blue text-[#111111]' : 'bg-[#2A2A30] text-white'}`}>1</span>
            Select Entity & Upload
          </div>
          <ArrowRight size={16} className="text-[#71717A]" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-purple-400' : 'text-[#71717A]'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-500 text-white' : 'bg-[#2A2A30] text-white'}`}>2</span>
            Field Mapping & Validation
          </div>
          <ArrowRight size={16} className="text-[#71717A]" />
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-emerald-400' : 'text-[#71717A]'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-emerald-500 text-[#111111]' : 'bg-[#2A2A30] text-white'}`}>3</span>
            Ingestion Summary
          </div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="bg-[#111111] rounded-2xl border border-[#2A2A30] p-8 space-y-8">
            <div>
              <label className="block text-sm font-bold text-white mb-3">1. Select Target CRM Entity</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {entities.map((ent) => (
                  <button
                    key={ent}
                    onClick={() => setTargetEntity(ent)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${targetEntity === ent ? 'bg-brand-blue/10 border-brand-blue text-brand-blue' : 'bg-[#16161C] border-[#2A2A30] text-[#A1A1AA] hover:text-white'}`}
                  >
                    {ent}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#2A2A30] pt-8">
              <label className="block text-sm font-bold text-white mb-2">2. Upload CSV or Excel Dataset (.csv, .xlsx)</label>
              <div className="border-2 border-dashed border-[#3F3F46] hover:border-brand-blue rounded-2xl p-10 text-center transition-all bg-[#16161C]/50 cursor-pointer relative group">
                <input type="file" accept=".csv,.xlsx" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                <FileSpreadsheet size={40} className="mx-auto text-[#71717A] group-hover:text-brand-blue mb-3 transition-colors" />
                <p className="text-sm font-bold text-white">Drag & drop spreadsheet here, or click to browse</p>
                <p className="text-xs text-[#71717A] mt-1">Maximum file throughput: 100MB (approx 500,000 rows)</p>
                <button type="button" onClick={handleSimulateSelect} className="mt-4 px-4 py-2 rounded-lg bg-[#2A2A30] hover:bg-[#3F3F46] text-xs font-bold text-white relative z-30">
                  Quick Simulate Demo File
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="bg-[#111111] rounded-2xl border border-[#2A2A30] p-8 space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#2A2A30] pb-6">
              <div>
                <span className="text-xs text-brand-blue font-mono font-bold">SOURCE FILE: {fileName}</span>
                <h3 className="text-lg font-bold text-white mt-1">Schema Mapping & AI Duplicate Inspection</h3>
              </div>
              <span className="px-3 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold font-mono">
                {recordCount} Valid Rows Detected
              </span>
            </div>

            {/* Field Mapping Simulator Table */}
            <div className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-3 gap-4 text-[#71717A] font-bold px-3 pb-2 border-b border-[#2A2A30]">
                <span>CSV HEADER COLUMN</span>
                <span>TARGET DB SCHEMA</span>
                <span>AI MATCH CONFIDENCE</span>
              </div>
              <div className="grid grid-cols-3 gap-4 p-3 bg-[#16161C] rounded-xl border border-[#2A2A30] items-center">
                <span className="text-white">full_contact_name</span>
                <span className="text-brand-blue">{targetEntity}.firstName + lastName</span>
                <span className="text-emerald-400">99.8% Auto-Matched</span>
              </div>
              <div className="grid grid-cols-3 gap-4 p-3 bg-[#16161C] rounded-xl border border-[#2A2A30] items-center">
                <span className="text-white">corporate_email</span>
                <span className="text-brand-blue">{targetEntity}.email</span>
                <span className="text-emerald-400">100% Auto-Matched</span>
              </div>
              <div className="grid grid-cols-3 gap-4 p-3 bg-[#16161C] rounded-xl border border-[#2A2A30] items-center">
                <span className="text-white">estimated_budget</span>
                <span className="text-brand-blue">{targetEntity}.budgetAmount</span>
                <span className="text-emerald-400">98.5% FX Converted</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs flex items-center gap-3 font-sans">
              <ShieldCheck size={18} className="shrink-0 text-blue-400" />
              <span>AI Duplicate Engine ran pre-validation against active database. <strong>0 conflicting records found.</strong> Safe to execute batch ETL.</span>
            </div>

            <div className="flex justify-between pt-4 border-t border-[#2A2A30]">
              <button onClick={() => setStep(1)} className="px-5 py-2.5 rounded-xl bg-[#1E1E24] text-[#A1A1AA] hover:text-white text-xs font-bold">Back</button>
              <button 
                onClick={startBulkIngestion} 
                disabled={isImporting}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#111111] text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2"
              >
                {isImporting ? 'Ingesting Batch to DB...' : <><Play size={14} /> Execute Bulk Ingestion</>}
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="bg-[#111111] rounded-2xl border border-[#2A2A30] p-10 text-center space-y-6 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white mb-1">Batch Ingestion Complete!</h3>
              <p className="text-xs text-[#A1A1AA]">Successfully committed {recordCount} {targetEntity} records to production database.</p>
            </div>

            <div className="max-w-md mx-auto p-4 bg-[#16161C] rounded-xl border border-[#2A2A30] text-left text-xs font-mono space-y-2">
              <div className="flex justify-between"><span>Batch Transaction ID:</span> <strong className="text-white">ETL-992019</strong></div>
              <div className="flex justify-between"><span>Throughput Rate:</span> <span className="text-emerald-400">14,200 rows/sec</span></div>
              <div className="flex justify-between"><span>Audit Log Entry:</span> <span className="text-brand-blue">Created in Audit Vault</span></div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button onClick={resetWizard} className="px-6 py-2.5 rounded-xl bg-brand-blue text-[#111111] text-xs font-bold shadow-lg">
                Import Another Dataset
              </button>
              <button onClick={() => alert('Batch Transaction ETL-992019 rolled back cleanly via ACID snapshot.')} className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-1.5">
                <RotateCcw size={14} /> Rollback Transaction
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
