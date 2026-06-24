'use client';

import { usePropertyStore } from '@/store/propertyStore';

export function DetailsView() {
  const { getActiveNode } = usePropertyStore();
  const activeNode = getActiveNode();

  if (!activeNode) return null;

  return (
    <div className="p-8">
      <h2 className="text-lg font-bold text-white mb-6">Overview & Information</h2>
      
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 max-w-2xl">
        <form className="space-y-6">
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase">Name</label>
              <input 
                type="text" 
                defaultValue={activeNode.name}
                className="w-full bg-[#111111] border border-[#3F3F46] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase">Type</label>
              <input 
                type="text" 
                defaultValue={activeNode.type.toUpperCase()}
                disabled
                className="w-full bg-[#111111]/50 border border-[#2A2A30] rounded px-3 py-2 text-sm text-[#71717A] cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase">Category</label>
              <input 
                type="text" 
                defaultValue={activeNode.typeCategory || ''}
                placeholder="e.g. Commercial, Residential"
                className="w-full bg-[#111111] border border-[#3F3F46] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase">Status</label>
              <select className="w-full bg-[#111111] border border-[#3F3F46] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue">
                <option value="nominal">Nominal</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase">Address / Location</label>
            <input 
              type="text" 
              defaultValue={activeNode.address || ''}
              className="w-full bg-[#111111] border border-[#3F3F46] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-[#2A2A30]">
             <button type="button" className="px-4 py-2 text-xs font-bold text-white hover:bg-[#2A2A30] rounded transition-colors">
               Cancel
             </button>
             <button type="button" className="px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 text-white rounded text-xs font-bold transition-colors shadow-[0_0_15px_rgba(79,132,255,0.3)]">
               Save Changes
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
