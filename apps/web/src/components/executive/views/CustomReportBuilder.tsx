'use client';

import { FileText, Plus, Download, Filter, Save, Calendar, CheckSquare, Settings } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function CustomReportBuilder() {
  const [reportName, setReportName] = useState('Q3 Revenue Forecast & Pipeline Health');
  
  const savedReports = [
    { id: '1', name: 'Weekly Sales Velocity', lastRun: 'Today, 8:00 AM', format: 'PDF' },
    { id: '2', name: 'Monthly Board Pack', lastRun: 'Aug 1, 9:00 AM', format: 'PPTX' },
    { id: '3', name: 'Broker Commission Ledger', lastRun: 'Yesterday', format: 'CSV' },
  ];

  const handleGenerate = () => {
    toast.success('Report Generation Started', { description: 'The AI is compiling the data. This will take ~30 seconds.' });
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-white tracking-wide">Custom Report Builder</h1>
          <p className="text-neutral-500 mt-2">Design, schedule, and export custom intelligence reports.</p>
        </div>
        <button onClick={handleGenerate} className="h-10 px-4 bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0A1A2A] rounded flex items-center gap-2 text-sm font-medium transition-colors">
          <Download className="w-4 h-4" />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        
        {/* Report Builder Interface */}
        <div className="col-span-2 space-y-6">
          
          <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Report Details</h3>
            <input 
              type="text" 
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              className="w-full h-12 bg-neutral-900 border border-neutral-800 rounded-lg px-4 text-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF] transition-colors"
            />
          </div>

          <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-6">Data Modules to Include</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-4 border border-neutral-800 rounded-lg hover:border-neutral-600 cursor-pointer bg-[#1A1C20] transition-colors">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#00E5FF]" />
                <span className="text-sm text-white">Executive KPI Summary</span>
              </label>
              
              <label className="flex items-center gap-3 p-4 border border-neutral-800 rounded-lg hover:border-neutral-600 cursor-pointer bg-[#1A1C20] transition-colors">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#00E5FF]" />
                <span className="text-sm text-white">Revenue Forecast (AI Model)</span>
              </label>

              <label className="flex items-center gap-3 p-4 border border-neutral-800 rounded-lg hover:border-neutral-600 cursor-pointer bg-[#1A1C20] transition-colors">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#00E5FF]" />
                <span className="text-sm text-white">Sales Pipeline Velocity</span>
              </label>

              <label className="flex items-center gap-3 p-4 border border-neutral-800 rounded-lg hover:border-neutral-600 cursor-pointer bg-neutral-900 transition-colors">
                <input type="checkbox" className="w-4 h-4 accent-[#00E5FF]" />
                <span className="text-sm text-white">Inventory Aging Report</span>
              </label>

              <label className="flex items-center gap-3 p-4 border border-neutral-800 rounded-lg hover:border-neutral-600 cursor-pointer bg-neutral-900 transition-colors">
                <input type="checkbox" className="w-4 h-4 accent-[#00E5FF]" />
                <span className="text-sm text-white">Broker Performance Ledger</span>
              </label>

              <label className="flex items-center gap-3 p-4 border border-neutral-800 rounded-lg hover:border-neutral-600 cursor-pointer bg-neutral-900 transition-colors">
                <input type="checkbox" className="w-4 h-4 accent-[#00E5FF]" />
                <span className="text-sm text-white">Marketing Campaign ROI</span>
              </label>
            </div>
          </div>

          <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-6">Filters & Parameters</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-2">Date Range</label>
                <select className="w-full h-10 bg-neutral-900 border border-neutral-800 rounded px-3 text-sm text-white focus:outline-none focus:border-[#00E5FF]">
                  <option>Current Quarter (Q3)</option>
                  <option>Next 6 Months Forecast</option>
                  <option>Year to Date (YTD)</option>
                  <option>Custom Range</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-2">Export Format</label>
                <select className="w-full h-10 bg-neutral-900 border border-neutral-800 rounded px-3 text-sm text-white focus:outline-none focus:border-[#00E5FF]">
                  <option>Executive PDF</option>
                  <option>Raw Data (CSV)</option>
                  <option>Presentation (PPTX)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-2">Region Filter</label>
                <select className="w-full h-10 bg-neutral-900 border border-neutral-800 rounded px-3 text-sm text-white focus:outline-none focus:border-[#00E5FF]">
                  <option>All Regions</option>
                  <option>North</option>
                  <option>South</option>
                  <option>West</option>
                  <option>East</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-2">Project Filter</label>
                <select className="w-full h-10 bg-neutral-900 border border-neutral-800 rounded px-3 text-sm text-white focus:outline-none focus:border-[#00E5FF]">
                  <option>All Projects</option>
                  <option>Project Orion</option>
                  <option>Sunset Valley</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar: Saved & Scheduled */}
        <div className="space-y-6">
          
          <div className="bg-[#1A1C20] border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-[#00E5FF] uppercase tracking-widest">Saved Templates</h3>
              <Save className="w-4 h-4 text-neutral-500" />
            </div>
            
            <div className="space-y-3">
              {savedReports.map(report => (
                <div key={report.id} className="p-3 bg-[#121212] border border-neutral-800 rounded hover:border-neutral-600 cursor-pointer transition-colors group">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-medium text-white group-hover:text-[#00E5FF] transition-colors">{report.name}</span>
                    <span className="text-[10px] font-bold bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">{report.format}</span>
                  </div>
                  <div className="text-[10px] text-neutral-500">Last run: {report.lastRun}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1A1C20] border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-[#00E5FF] uppercase tracking-widest">Delivery Schedule</h3>
              <Calendar className="w-4 h-4 text-neutral-500" />
            </div>
            
            <div className="p-4 border border-neutral-800 bg-[#121212] rounded text-center">
              <Settings className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
              <p className="text-sm text-white font-medium mb-1">Automated Delivery</p>
              <p className="text-xs text-neutral-500 mb-4">Schedule this report to be emailed to stakeholders automatically.</p>
              <button className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium rounded transition-colors">
                Setup Schedule
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
