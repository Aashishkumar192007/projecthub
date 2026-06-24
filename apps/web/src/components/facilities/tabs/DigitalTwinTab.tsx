'use client';

import { useState } from 'react';
import { useFacilityStore, FacilityAsset } from '@/store/facilityStore';
import { Map, Activity, X, ShieldAlert, Wrench, Settings } from 'lucide-react';

export function DigitalTwinTab() {
  const { assets, activeFacilityId } = useFacilityStore();
  const [selectedAsset, setSelectedAsset] = useState<FacilityAsset | null>(null);
  
  if (!activeFacilityId) return null;
  const facilityAssets = assets.filter(a => a.facilityId === activeFacilityId);

  return (
    <div className="p-8 h-full flex flex-col relative">
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Map size={20} className="text-[#00E5FF]" />
          Digital Twin 2.0
        </h3>
        <span className="flex items-center gap-2 text-xs font-bold text-success uppercase tracking-widest">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div> Live Sensor Telemetry
        </span>
      </div>

      <div className="relative w-full flex-1 bg-[#0A0C10] overflow-hidden flex items-center justify-center rounded-xl border border-[#2A2A30] min-h-[500px]">
        {/* Abstract Blueprint Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        {/* Blueprint Layout Polygons */}
        <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" viewBox="0 0 1000 600">
          {/* Main Building Frame */}
          <rect x="100" y="100" width="800" height="400" fill="none" stroke="#3F3F46" strokeWidth="2" />
          {/* Internal Zones */}
          <rect x="150" y="150" width="200" height="300" fill="none" stroke="#2A2A30" strokeWidth="1" />
          <rect x="400" y="150" width="450" height="150" fill="none" stroke="#2A2A30" strokeWidth="1" />
          <rect x="400" y="350" width="200" height="100" fill="none" stroke="#2A2A30" strokeWidth="1" />
          <rect x="650" y="350" width="200" height="100" fill="none" stroke="#2A2A30" strokeWidth="1" />
        </svg>

        {/* Asset Overlays */}
        {facilityAssets.map(asset => {
          const isCritical = asset.health < 60;
          const isWarning = asset.health >= 60 && asset.health < 90;
          
          return (
            <div 
              key={asset.id} 
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
              style={{ top: asset.coordinates.top, left: asset.coordinates.left }}
              onClick={() => setSelectedAsset(asset)}
            >
              {/* Pulsing Aura */}
              <div className={`absolute -inset-6 rounded-full opacity-20 group-hover:opacity-40 transition-opacity animate-pulse ${
                isCritical ? 'bg-danger' : isWarning ? 'bg-warning' : 'bg-success'
              }`}></div>

              <div className={`relative w-12 h-12 rounded-lg border-2 flex items-center justify-center bg-[#1A1A1A] shadow-xl transition-transform group-hover:scale-110 ${
                isCritical ? 'border-danger text-danger shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 
                isWarning ? 'border-warning text-warning' : 
                'border-success text-success'
              }`}>
                 <Settings size={20} />
              </div>

              {/* Minimal Tag */}
              <div className="absolute top-14 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-[10px] font-bold text-white bg-[#111111] px-2 py-0.5 rounded border border-[#2A2A30]">
                  {asset.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-out Asset Drawer */}
      <div className={`absolute top-0 right-0 bottom-0 w-[400px] bg-[#161616] border-l border-[#2A2A30] shadow-2xl transform transition-transform duration-300 z-50 ${selectedAsset ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedAsset && (
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-[#2A2A30] flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black text-white mb-1">{selectedAsset.name}</h3>
                <span className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-widest px-2 py-0.5 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded">{selectedAsset.type}</span>
              </div>
              <button onClick={() => setSelectedAsset(null)} className="p-2 hover:bg-[#2A2A30] rounded-lg transition-colors">
                <X size={20} className="text-[#A1A1AA]" />
              </button>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              
              <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-5">
                <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest mb-3">Health Status</p>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                    selectedAsset.health >= 90 ? 'border-success text-success' :
                    selectedAsset.health >= 60 ? 'border-warning text-warning' : 'border-danger text-danger'
                  }`}>
                    <span className="text-xl font-black">{selectedAsset.health}%</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      {selectedAsset.health >= 90 ? 'Operating Optimally' : selectedAsset.health >= 60 ? 'Requires Monitoring' : 'Critical Failure Risk'}
                    </p>
                    <p className="text-xs text-[#A1A1AA] mt-1">Lifecycle: {selectedAsset.lifecycleStage}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4">
                  <ShieldAlert size={16} className="text-[#A1A1AA] mb-2" />
                  <p className="text-[10px] font-bold text-[#71717A] uppercase">Warranty</p>
                  <p className="text-sm font-bold text-white">{selectedAsset.warranty}</p>
                </div>
                <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-4">
                  <Wrench size={16} className="text-[#A1A1AA] mb-2" />
                  <p className="text-[10px] font-bold text-[#71717A] uppercase">Open Work Orders</p>
                  <p className="text-sm font-bold text-warning">2 Active</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest mb-3">Recent Maintenance</p>
                <div className="space-y-2">
                  <div className="bg-[#1A1A1A] p-3 rounded-lg border border-[#2A2A30] flex justify-between items-center">
                    <span className="text-xs font-bold text-white">Quarterly Servicing</span>
                    <span className="text-[10px] text-[#A1A1AA]">2 weeks ago</span>
                  </div>
                  <div className="bg-[#1A1A1A] p-3 rounded-lg border border-[#2A2A30] flex justify-between items-center">
                    <span className="text-xs font-bold text-white">Filter Replacement</span>
                    <span className="text-[10px] text-[#A1A1AA]">1 month ago</span>
                  </div>
                </div>
              </div>

            </div>
            
            <div className="p-6 border-t border-[#2A2A30] bg-[#1A1A1A]">
              <button className="w-full py-3 bg-[#00E5FF] hover:bg-[#00B3CC] text-[#0A0C10] font-bold rounded-lg transition-colors">
                Create Work Order
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
