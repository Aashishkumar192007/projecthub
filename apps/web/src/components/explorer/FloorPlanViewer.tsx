'use client';

import { usePropertyStore } from '@/store/propertyStore';

export function FloorPlanViewer() {
  const { getActiveNode, getChildren, setActiveNode } = usePropertyStore();
  const activeNode = getActiveNode();

  // Show units inside a floor, or the floor itself if a unit is selected
  let currentFloor = activeNode;
  if (activeNode?.type === 'unit') {
    currentFloor = usePropertyStore.getState().nodes.find(n => n.id === activeNode.parentId) || null;
  } else if (activeNode?.type !== 'floor') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0A0A0A]">
        <p className="text-[#71717A] text-sm">Select a Floor or Unit to view the Floor Plan.</p>
      </div>
    );
  }

  if (!currentFloor) return null;

  const units = getChildren(currentFloor.id);

  return (
    <div className="relative w-full h-full bg-[#111111] overflow-hidden flex items-center justify-center p-8">
      {/* The Blueprint Canvas */}
      <div className="relative w-full max-w-4xl aspect-[16/9] border-2 border-[#3F3F46] bg-[#1A1A1A] p-4 flex gap-4">
        
        {units.map((unit, index) => {
          // Mock layout sizing based on index
          const isSelected = unit.id === activeNode?.id;
          const statusColors = {
            available: 'border-brand-blue bg-brand-blue/10 text-brand-blue',
            occupied: 'border-success bg-success/10 text-success',
            maintenance: 'border-amber-500 bg-amber-500/10 text-amber-500',
            nominal: 'border-[#71717A] bg-[#2A2A30]/50 text-[#A1A1AA]',
            warning: 'border-amber-500 bg-amber-500/10 text-amber-500',
            critical: 'border-danger bg-danger/10 text-danger'
          };
          
          const colorClass = statusColors[unit.status as keyof typeof statusColors] || statusColors.nominal;

          return (
            <div 
              key={unit.id}
              onClick={() => setActiveNode(unit.id)}
              className={`flex-1 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${colorClass} ${isSelected ? 'border-solid shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] scale-[1.02]' : 'hover:bg-[#2A2A30]'}`}
            >
              <span className="text-sm font-bold tracking-widest uppercase">{unit.name}</span>
              <span className="text-[10px] mt-2 opacity-80">{unit.sqft ? `${unit.sqft} SQFT` : ''}</span>
              {unit.status && <span className="text-[10px] mt-1 uppercase font-bold px-2 py-0.5 rounded border border-current opacity-80">{unit.status}</span>}
            </div>
          );
        })}

        {units.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-[#71717A]">
            No Units defined for this floor.
          </div>
        )}
      </div>

      <div className="absolute bottom-8 right-8 bg-[#1A1A1A]/90 border border-[#2A2A30] px-4 py-3 rounded backdrop-blur shadow-2xl flex gap-4">
        <div className="flex items-center gap-2">
           <div className="w-3 h-3 border-2 border-brand-blue bg-brand-blue/20"></div>
           <span className="text-[10px] text-[#A1A1AA] font-bold uppercase tracking-wider">Available</span>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-3 h-3 border-2 border-success bg-success/20"></div>
           <span className="text-[10px] text-[#A1A1AA] font-bold uppercase tracking-wider">Occupied</span>
        </div>
      </div>
    </div>
  );
}
