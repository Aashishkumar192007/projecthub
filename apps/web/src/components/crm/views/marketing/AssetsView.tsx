'use client';

import { useCrmStore } from '@/store/crmStore';
import { Image, FileText, Video, LayoutTemplate, Upload, Search, Download } from 'lucide-react';
import { toast } from 'sonner';


export function AssetsView() {
  const { assets } = useCrmStore();

  const getIcon = (type: string) => {
    switch(type) {
      case 'Brochure': return <FileText className="w-8 h-8 text-blue-400" />;
      case 'Image': return <Image className="w-8 h-8 text-green-400" />;
      case 'Video': return <Video className="w-8 h-8 text-purple-400" />;
      case 'Floor Plan': return <LayoutTemplate className="w-8 h-8 text-amber-400" />;
      default: return <FileText className="w-8 h-8 text-neutral-400" />;
    }
  };

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">Creative Asset Library</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="w-64 h-9 bg-[#121212] border border-neutral-800 rounded pl-9 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
          <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0A1A2A] px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span>Upload Asset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {assets.map(asset => (
          <div key={asset.id} className="bg-[#121212] border border-neutral-800 rounded p-5 hover:border-neutral-700 transition-colors flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-neutral-900 rounded-lg flex items-center justify-center mb-4">
              {getIcon(asset.type)}
            </div>
            <h3 className="text-sm font-medium text-white mb-1 line-clamp-2">{asset.name}</h3>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{asset.type}</span>
            <div className="mt-4 flex items-center justify-between w-full pt-4 border-t border-neutral-800">
              <span className="text-xs text-neutral-400">{asset.downloads} dl</span>
              <button onClick={(e) => { e.stopPropagation(); toast.info('Feature Coming Soon', { description: 'This action is part of the upcoming release.' }); }} className="text-neutral-500 hover:text-white"><Download className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
