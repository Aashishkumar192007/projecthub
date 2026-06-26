'use client';

import { useCrmStore } from '@/store/crmStore';
import { Search, Image, Megaphone, Share2, Download, BarChart2, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function PartnerMarketingView() {
  const [searchQuery, setSearchQuery] = useState('');

  const marketingAssets = [
    { id: '1', title: 'Q4 Global Launch Brochure', type: 'PDF', size: '4.2 MB', downloads: 142, status: 'ACTIVE' },
    { id: '2', title: 'Instagram Reel - Luxury Villa Tour', type: 'VIDEO', size: '28 MB', downloads: 350, status: 'ACTIVE' },
    { id: '3', title: 'Pricing Matrix (Standard)', type: 'SHEET', size: '1.1 MB', downloads: 89, status: 'ACTIVE' },
    { id: '4', title: 'Site Map & Master Plan', type: 'IMAGE', size: '8.5 MB', downloads: 210, status: 'ACTIVE' },
    { id: '5', title: 'Q3 Broker Incentive Program', type: 'PDF', size: '2.4 MB', downloads: 45, status: 'EXPIRED' },
  ];

  const filteredAssets = marketingAssets.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-white tracking-wide">Partner Marketing Hub</h2>
          <p className="text-sm text-neutral-500 mt-1">Manage and distribute marketing assets to the broker network</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.success('Upload Started', { description: 'Opening asset uploader...' })} className="h-9 px-4 bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0A1A2A] rounded flex items-center gap-2 text-sm font-medium transition-colors">
            <Image className="w-4 h-4" />
            Upload Asset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-blue-400 mb-2">
            <Share2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Active Assets</span>
          </div>
          <div className="text-2xl font-medium text-white">24</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-green-400 mb-2">
            <Download className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Downloads</span>
          </div>
          <div className="text-2xl font-medium text-white">1,482</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-amber-400 mb-2">
            <Megaphone className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Active Campaigns</span>
          </div>
          <div className="text-2xl font-medium text-white">3</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="flex items-center gap-3 text-[#00E5FF] mb-2">
            <BarChart2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Partner Engagement</span>
          </div>
          <div className="text-2xl font-medium text-white">64%</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search marketing assets..." 
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
                <th className="px-6 py-4 font-medium">ASSET NAME</th>
                <th className="px-6 py-4 font-medium">TYPE</th>
                <th className="px-6 py-4 font-medium text-right">SIZE</th>
                <th className="px-6 py-4 font-medium text-right">PARTNER DOWNLOADS</th>
                <th className="px-6 py-4 font-medium text-center">STATUS</th>
                <th className="px-6 py-4 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map(asset => (
                <tr key={asset.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{asset.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-[10px] font-bold tracking-widest uppercase rounded border bg-neutral-900 border-neutral-700 text-neutral-300">
                      {asset.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-neutral-400">{asset.size}</td>
                  <td className="px-6 py-4 text-right text-white font-medium">{asset.downloads}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${
                      asset.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => toast.info('Link Copied', { description: 'Asset link copied to clipboard.' })} className="p-2 text-neutral-400 hover:text-white bg-neutral-900 rounded border border-neutral-800 transition-colors inline-flex">
                      <Share2 className="w-4 h-4" />
                    </button>
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
