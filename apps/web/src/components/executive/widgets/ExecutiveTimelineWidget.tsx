'use client';

import { useExecutiveStore } from '@/store/executiveStore';
import { Clock, TrendingDown, AlertTriangle, CheckCircle2, HardHat } from 'lucide-react';

export function ExecutiveTimelineWidget() {
  const { timeline } = useExecutiveStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'Revenue': return <CheckCircle2 size={14} className="text-success" />;
      case 'Risk': return <TrendingDown size={14} className="text-danger" />;
      case 'Operations': return <AlertTriangle size={14} className="text-warning" />;
      case 'Project': return <HardHat size={14} className="text-brand-blue" />;
      default: return <Clock size={14} className="text-[#A1A1AA]" />;
    }
  };

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Clock size={20} className="text-brand-blue" />
          Live Executive Feed
        </h2>
        <span className="flex items-center gap-2 text-xs font-bold text-success uppercase tracking-widest">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
          Live
        </span>
      </div>

      <div className="space-y-4">
        {timeline.map((event) => (
          <div key={event.id} className="flex items-start gap-4 p-4 bg-[#111111] border border-[#2A2A30] rounded-xl hover:border-brand-blue/30 transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#2A2A30] flex items-center justify-center shrink-0">
              {getIcon(event.type)}
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-white">{event.message}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] text-[#71717A]">{event.time}</span>
                <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border ${
                  event.type === 'Revenue' ? 'border-success text-success bg-success/10' :
                  event.type === 'Risk' ? 'border-danger text-danger bg-danger/10' :
                  event.type === 'Operations' ? 'border-warning text-warning bg-warning/10' :
                  'border-brand-blue text-brand-blue bg-brand-blue/10'
                }`}>
                  {event.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
