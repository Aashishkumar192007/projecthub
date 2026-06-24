'use client';

export function MockIntelligenceWidget({ title, type }: { title: string, type: 'Occupancy' | 'Risk' | 'Ecosystem' | 'Construction' | 'ESG' }) {
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8 relative overflow-hidden h-64 flex flex-col items-center justify-center group">
      
      {/* Decorative styling based on type */}
      {type === 'Occupancy' && <div className="absolute inset-0 bg-brand-blue/5 pointer-events-none"></div>}
      {type === 'Risk' && <div className="absolute inset-0 bg-danger/5 pointer-events-none"></div>}
      {type === 'Ecosystem' && <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(79,132,255,0.1)_0%,_transparent_70%)] pointer-events-none"></div>}
      {type === 'Construction' && <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.02)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.02)_50%,rgba(255,255,255,0.02)_75%,transparent_75%,transparent)] bg-[length:20px_20px] pointer-events-none"></div>}
      {type === 'ESG' && <div className="absolute inset-0 bg-[#00E5FF]/5 pointer-events-none"></div>}

      <div className="relative z-10 text-center">
        <h2 className="text-lg font-bold text-white mb-2">{title}</h2>
        <p className="text-xs text-[#71717A] max-w-sm">This module integrates directly with the {type} microservice architecture. UI implementation scheduled for Phase 3.</p>
        
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
