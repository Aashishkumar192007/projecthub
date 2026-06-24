'use client';

import { useResidentStore, SmartDevice } from '@/store/residentStore';
import { Home, Lightbulb, Thermometer, Lock, Camera, Zap, Power } from 'lucide-react';

export function SmartHomeTab() {
  const { residents, activeResidentId, toggleDevice } = useResidentStore();
  
  if (!activeResidentId) return null;
  const activeResident = residents.find(r => r.id === activeResidentId);
  if (!activeResident) return null;

  const devices = activeResident.smartDevices;

  const getDeviceIcon = (type: SmartDevice['type'], status: string) => {
    const isActive = status === 'On' || status === 'Locked' || status === 'Active';
    const color = isActive ? 'text-[#00E5FF]' : 'text-[#71717A]';
    
    switch (type) {
      case 'Light': return <Lightbulb size={24} className={color} />;
      case 'AC': return <Thermometer size={24} className={color} />;
      case 'Lock': return <Lock size={24} className={color} />;
      case 'Camera': return <Camera size={24} className={color} />;
      case 'Sensor': return <Zap size={24} className={color} />;
      default: return <Power size={24} className={color} />;
    }
  };

  return (
    <div className="p-8 space-y-8">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><Home size={16} className="text-[#00E5FF]"/> Smart Home Control</h3>
        <span className="text-[10px] text-[#A1A1AA] uppercase font-bold px-3 py-1 bg-[#1A1A1A] border border-[#2A2A30] rounded-lg">
          {devices.length} Connected Devices
        </span>
      </div>

      <div className="grid grid-cols-3 gap-6">
        
        {devices.map(device => {
          const isActive = device.status === 'On' || device.status === 'Locked' || device.status === 'Active';
          
          return (
            <div 
              key={device.id} 
              className={`relative bg-[#1A1A1A] rounded-2xl p-6 border transition-all duration-300 overflow-hidden ${
                isActive 
                  ? 'border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.1)] hover:border-[#00E5FF]/50' 
                  : 'border-[#2A2A30] hover:border-[#3F3F46]'
              }`}
            >
              {/* Background Glow */}
              {isActive && (
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00E5FF]/10 rounded-full blur-[30px] pointer-events-none"></div>
              )}

              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${
                  isActive ? 'bg-[#00E5FF]/10 border-[#00E5FF]/30' : 'bg-[#111111] border-[#2A2A30]'
                }`}>
                  {getDeviceIcon(device.type, device.status)}
                </div>
                
                <button 
                  onClick={() => toggleDevice(activeResident.id, device.id)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    isActive ? 'bg-[#00E5FF]' : 'bg-[#2A2A30]'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    isActive ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </button>
              </div>

              <div className="relative z-10">
                <h4 className={`text-lg font-bold mb-1 transition-colors ${isActive ? 'text-white' : 'text-[#A1A1AA]'}`}>
                  {device.name}
                </h4>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className={isActive ? 'text-[#00E5FF]' : 'text-[#71717A]'}>{device.status}</span>
                  {device.value && isActive && (
                    <>
                      <span className="text-[#3F3F46]">•</span>
                      <span className="text-white">{device.value}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {devices.length === 0 && (
          <div className="col-span-3 p-12 text-center border border-dashed border-[#2A2A30] rounded-xl bg-[#1A1A1A]">
            <Home size={32} className="mx-auto text-[#3F3F46] mb-4" />
            <p className="text-sm font-bold text-white mb-2">No Smart Devices Connected</p>
            <p className="text-xs text-[#71717A] max-w-md mx-auto">Link your smart home devices (Lights, Locks, AC) to control them directly from this workspace.</p>
            <button className="mt-6 px-4 py-2 bg-[#00E5FF] hover:bg-[#00B3CC] text-[#0A0C10] font-bold rounded-lg transition-colors">
              Connect Device
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
