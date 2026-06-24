'use client';

import { useFacilityStore } from '@/store/facilityStore';
import { Settings, ShieldAlert, Activity, FileCheck, ArrowRight } from 'lucide-react';

export function AssetsTab() {
  const { assets, activeFacilityId } = useFacilityStore();
  
  if (!activeFacilityId) return null;
  const facilityAssets = assets.filter(a => a.facilityId === activeFacilityId);

  return (
    <div className="p-8 space-y-8">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><Settings size={16} className="text-[#00E5FF]"/> Asset Lifecycle Engine</h3>
        <span className="text-[10px] text-[#A1A1AA] uppercase font-bold px-3 py-1 bg-[#1A1A1A] border border-[#2A2A30] rounded-lg">
          {facilityAssets.length} Critical Assets
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {facilityAssets.map((asset) => (
          <div key={asset.id} className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-5 hover:border-[#00E5FF]/50 transition-colors group">
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center border-2 ${
                  asset.health >= 90 ? 'bg-success/10 border-success text-success' :
                  asset.health >= 60 ? 'bg-warning/10 border-warning text-warning' :
                  'bg-danger/10 border-danger text-danger'
                }`}>
                  <Activity size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{asset.name}</h4>
                  <p className="text-[10px] text-[#A1A1AA] uppercase tracking-widest mt-1">{asset.type}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                
                {/* Health Ring */}
                <div className="text-center">
                  <p className="text-[10px] font-bold text-[#71717A] uppercase mb-1">Health</p>
                  <span className={`text-sm font-black ${
                    asset.health >= 90 ? 'text-success' : asset.health >= 60 ? 'text-warning' : 'text-danger'
                  }`}>{asset.health}%</span>
                </div>

                {/* Depreciation */}
                <div className="text-center">
                  <p className="text-[10px] font-bold text-[#71717A] uppercase mb-1">Depreciation</p>
                  <span className="text-sm font-black text-white">{asset.depreciation}%</span>
                </div>

                {/* Lifecycle */}
                <div className="text-center">
                  <p className="text-[10px] font-bold text-[#71717A] uppercase mb-1">Lifecycle</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                    asset.lifecycleStage === 'New' ? 'text-[#00E5FF] border-[#00E5FF]/30 bg-[#00E5FF]/10' :
                    asset.lifecycleStage === 'Mid-Life' ? 'text-warning border-warning/30 bg-warning/10' :
                    'text-danger border-danger/30 bg-danger/10'
                  }`}>
                    {asset.lifecycleStage}
                  </span>
                </div>

              </div>
            </div>

            {/* Asset Details Footer */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#2A2A30]">
              
              <div className="flex items-center gap-2">
                <ShieldAlert size={14} className={asset.warranty === 'Active' ? 'text-success' : asset.warranty === 'Expired' ? 'text-danger' : 'text-warning'} />
                <div>
                  <p className="text-[9px] text-[#71717A] uppercase font-bold">Warranty Status</p>
                  <p className="text-[11px] font-bold text-white">{asset.warranty}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FileCheck size={14} className={asset.amcStatus === 'Valid' ? 'text-success' : 'text-danger'} />
                <div>
                  <p className="text-[9px] text-[#71717A] uppercase font-bold">AMC Status</p>
                  <p className="text-[11px] font-bold text-white">{asset.amcStatus}</p>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button className="flex items-center gap-2 text-[10px] font-bold text-[#00E5FF] hover:underline">
                  View Service History <ArrowRight size={12} />
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
