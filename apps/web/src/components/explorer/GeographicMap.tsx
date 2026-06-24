'use client';

import { usePropertyStore } from '@/store/propertyStore';
import { MapPin } from 'lucide-react';

export function GeographicMap() {
  const { nodes, setActiveNode, activeNodeId } = usePropertyStore();
  const properties = nodes.filter(n => n.type === 'property');

  return (
    <div className="relative w-full h-full bg-[#0A0C10] overflow-hidden">
      {/* Background Grids for stylized map */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Simulated Map Coordinates for Pins */}
      {properties.map((prop, index) => {
        // Just mock some coordinates
        const x = index === 0 ? '30%' : index === 1 ? '70%' : '50%';
        const y = index === 0 ? '40%' : index === 1 ? '60%' : '20%';

        const isActive = activeNodeId === prop.id;

        return (
          <div 
            key={prop.id}
            onClick={() => setActiveNode(prop.id)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
            style={{ left: x, top: y }}
          >
            {/* Radius overlay simulation */}
            {isActive && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-blue/5 rounded-full border border-brand-blue/20 animate-pulse pointer-events-none" />
            )}

            <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-xl transition-all ${
              isActive ? 'bg-brand-blue shadow-[0_0_20px_rgba(79,132,255,0.5)] scale-110' : 'bg-[#1A1A1A] border border-[#3F3F46] group-hover:border-brand-blue'
            }`}>
              <MapPin size={16} className={isActive ? 'text-white' : 'text-[#A1A1AA] group-hover:text-brand-blue'} />
            </div>

            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-[#1A1A1A] border border-[#2A2A30] px-3 py-1.5 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
              <p className="text-xs font-bold text-white">{prop.name}</p>
              <p className="text-[10px] text-[#A1A1AA]">{prop.address}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
