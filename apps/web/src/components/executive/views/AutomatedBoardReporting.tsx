'use client';

import { FileText, Download, Mail, Presentation, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export function AutomatedBoardReporting() {
  const reports = [
    { id: '1', name: 'Q3 Executive Summary Pack', type: 'PDF', status: 'READY', lastGenerated: 'Today, 9:00 AM' },
    { id: '2', name: 'Board Presentation Deck', type: 'PPTX', status: 'GENERATING', lastGenerated: 'In Progress (~2 mins)' },
    { id: '3', name: 'Financial Audit Extract', type: 'CSV', status: 'READY', lastGenerated: 'Yesterday, 6:00 PM' },
    { id: '4', name: 'Monthly Investor Update', type: 'PDF', status: 'SCHEDULED', lastGenerated: 'Next run: Aug 1st' },
  ];

  return (
    <div className="p-8 h-full overflow-y-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-white tracking-wide">Automated Board Reporting</h1>
          <p className="text-neutral-500 mt-2">Pre-compiled, AI-narrated reporting packs for stakeholders and investors.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-[#00E5FF] mb-3">
            <Presentation className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Active Board Packs</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">4</div>
          <div className="text-xs text-neutral-500">Configured for auto-generation</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-green-400 mb-3">
            <CheckCircle className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Data Accuracy</span>
          </div>
          <div className="text-3xl font-medium text-white mb-2">100%</div>
          <div className="text-xs text-green-400">All data sources synced</div>
        </div>
      </div>

      <div className="bg-[#121212] border border-neutral-800 rounded-xl overflow-hidden flex flex-col mb-8">
        <div className="p-4 border-b border-neutral-800 bg-[#1A1C20] flex items-center justify-between">
          <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Standardized Reporting Queue</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] border-b border-neutral-800">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">REPORT NAME</th>
                <th className="px-6 py-4 font-medium">FORMAT</th>
                <th className="px-6 py-4 font-medium">STATUS</th>
                <th className="px-6 py-4 font-medium">LAST UPDATED</th>
                <th className="px-6 py-4 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white flex items-center gap-3">
                      <FileText className="w-4 h-4 text-neutral-500" />
                      {report.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold bg-neutral-800 text-neutral-400 px-2 py-1 rounded">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {report.status === 'READY' && <CheckCircle className="w-4 h-4 text-green-400" />}
                      {report.status === 'GENERATING' && <Clock className="w-4 h-4 text-amber-400 animate-spin-slow" />}
                      {report.status === 'SCHEDULED' && <Clock className="w-4 h-4 text-blue-400" />}
                      <span className={`text-xs font-medium ${
                        report.status === 'READY' ? 'text-green-400' : 
                        report.status === 'GENERATING' ? 'text-amber-400' : 'text-blue-400'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-400 text-xs">
                    {report.lastGenerated}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => toast.success('Sent', { description: `Emailed ${report.name} to stakeholder group.` })}
                        className="p-2 text-neutral-400 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 rounded transition-colors"
                        title="Email Report"
                        disabled={report.status !== 'READY'}
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => toast.success('Downloaded', { description: `Downloading ${report.name}...` })}
                        className="p-2 text-neutral-400 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 rounded transition-colors"
                        title="Download"
                        disabled={report.status !== 'READY'}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
