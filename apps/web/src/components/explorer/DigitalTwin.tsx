'use client';

import { usePropertyStore } from '@/store/propertyStore';

export function DigitalTwin() {
  const { getActiveNode, getChildren, assets, setActiveNode } = usePropertyStore();
  const activeNode = getActiveNode();

  // We primarily want to show buildings if a property is selected, or floors if a building is selected.
  // For simplicity, we just use a static isometric scene but make the overlays dynamic based on the active node's children/assets.

  let relevantAssets = assets;
  if (activeNode) {
    // Basic filter: just show assets belonging to active node or its children
    const childIds = getChildren(activeNode.id).map(c => c.id);
    relevantAssets = assets.filter(a => a.nodeId === activeNode.id || childIds.includes(a.nodeId));
  }

  return (
    <div className="relative w-full h-full bg-[#0A0A0A] overflow-hidden flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0">
        <defs>
          <linearGradient id="glowLineTwin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0066FF" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="baseGridTwin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#111111" />
            <stop offset="100%" stopColor="#0A0A0A" />
          </linearGradient>
        </defs>

        <g transform="translate(400, 350) scale(1.5)">
          <polygon points="0,0 -200,-100 0,-200 200,-100" fill="url(#baseGridTwin)" stroke="#3F3F46" strokeWidth="0.5" strokeOpacity="0.8" />
          
          {/* Main Tower A */}
          <g transform="translate(0, -50)" className="cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setActiveNode('bldg-1')}>
            <polygon points="0,0 -40,-20 -40,-120 0,-100" fill="#1A1A1A" stroke="#4F84FF" strokeWidth="1" />
            <polygon points="0,0 40,-20 40,-120 0,-100" fill="#111111" stroke="#4F84FF" strokeWidth="1" />
            <polygon points="0,-100 -40,-120 0,-140 40,-120" fill="#2A2A30" stroke="#93A5CF" strokeWidth="1" />
            {/* Windows */}
            <line x1="-30" y1="-30" x2="-30" y2="-110" stroke="#93A5CF" strokeWidth="1" strokeDasharray="2 4" opacity="0.6"/>
            <line x1="-20" y1="-25" x2="-20" y2="-105" stroke="#93A5CF" strokeWidth="1" strokeDasharray="2 4" opacity="0.6"/>
            <line x1="20" y1="-25" x2="20" y2="-105" stroke="#93A5CF" strokeWidth="1" strokeDasharray="2 4" opacity="0.3"/>
          </g>

          {/* Tower B */}
          <g transform="translate(-80, -10)" className="cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setActiveNode('bldg-2')}>
            <polygon points="0,0 -30,-15 -30,-75 0,-60" fill="#1A1A1A" stroke="#4F84FF" strokeWidth="1" />
            <polygon points="0,0 30,-15 30,-75 0,-60" fill="#111111" stroke="#4F84FF" strokeWidth="1" />
            <polygon points="0,-60 -30,-75 0,-90 30,-75" fill="#2A2A30" stroke="#93A5CF" strokeWidth="1" />
          </g>

          {/* Street glow */}
          <path d="M-200,-100 L0,0 L200,-100" fill="none" stroke="url(#glowLineTwin)" strokeWidth="2" strokeOpacity="0.5"/>
        </g>
      </svg>

      {/* Dynamic Asset Overlays */}
      <div className="absolute top-8 left-8 flex flex-col gap-2">
        {relevantAssets.map(asset => (
          <div key={asset.id} className="bg-[#1A1A1A]/90 border border-[#2A2A30] px-3 py-2 flex items-center gap-2 rounded shadow-2xl backdrop-blur-sm">
            <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_6px_currentColor] ${
              asset.status === 'nominal' ? 'bg-success text-success' :
              asset.status === 'warning' ? 'bg-amber-500 text-amber-500' : 'bg-danger text-danger'
            }`}></div>
            <span className="text-[11px] font-bold text-white font-mono tracking-wide">
              {asset.name} ({asset.type}) - {asset.health}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
