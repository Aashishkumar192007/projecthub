'use client';

import { Download, Plus, QrCode, FileText, Upload } from 'lucide-react';

export function LeadCaptureView() {
  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">Lead Capture Engine</h2>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { title: 'Landing Forms', icon: FileText, color: 'text-blue-400' },
          { title: 'QR Code Capture', icon: QrCode, color: 'text-green-400' },
          { title: 'CSV Import', icon: Upload, color: 'text-amber-400' },
          { title: 'Manual Entry', icon: Plus, color: 'text-purple-400' }
        ].map((tool, i) => (
          <div key={i} className="bg-[#121212] border border-neutral-800 rounded p-4 flex flex-col items-center justify-center text-center hover:border-neutral-700 cursor-pointer transition-colors">
            <tool.icon className={`w-8 h-8 mb-3 ${tool.color}`} />
            <h3 className="text-sm font-medium text-white">{tool.title}</h3>
            <p className="text-xs text-neutral-500 mt-1">Configure & Manage</p>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-[#121212] border border-neutral-800 rounded p-6">
        <h3 className="text-sm font-medium text-white mb-4">Recent Lead Sources</h3>
        <p className="text-sm text-neutral-400">Integration with forms and API endpoints active.</p>
      </div>
    </div>
  );
}
