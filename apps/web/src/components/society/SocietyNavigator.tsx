'use client';

import { useSocietyStore, CommunityCategory } from '@/store/societyStore';
import { Home, Building2, Users, UserSquare2, Shield, UserPlus, Map, Calendar, AlertOctagon, Headset, PieChart, Vote, Layers } from 'lucide-react';

export function SocietyNavigator() {
  const { entities, activeCategoryId, setActiveCategory } = useSocietyStore();

  const getIcon = (category: CommunityCategory) => {
    switch (category) {
      case 'Societies': return <Home size={14} className="text-[#00E5FF]" />;
      case 'Towers': return <Building2 size={14} className="text-brand-blue" />;
      case 'Committees': return <Users size={14} className="text-purple-400" />;
      case 'Residents': return <UserSquare2 size={14} className="text-success" />;
      case 'Staff': return <Shield size={14} className="text-warning" />;
      case 'Visitors': return <UserPlus size={14} className="text-[#A1A1AA]" />;
      case 'Facilities': return <Map size={14} className="text-[#00E5FF]" />;
      case 'Events': return <Calendar size={14} className="text-purple-400" />;
      case 'Violations': return <AlertOctagon size={14} className="text-danger" />;
      case 'Complaints': return <Headset size={14} className="text-brand-blue" />;
      case 'Polls': return <PieChart size={14} className="text-success" />;
      case 'Elections': return <Vote size={14} className="text-warning" />;
      default: return <Layers size={14} />;
    }
  };

  const categories: CommunityCategory[] = [
    'Societies', 'Towers', 'Committees', 'Residents',
    'Staff', 'Visitors', 'Facilities', 'Events', 
    'Violations', 'Complaints', 'Polls', 'Elections'
  ];

  return (
    <div className="w-80 border-r border-[#2A2A30] bg-[#111111] h-full flex flex-col shrink-0 z-10 overflow-y-auto no-scrollbar">
      
      <div className="p-5 border-b border-[#2A2A30] bg-[#161616] sticky top-0 z-10">
        <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Home size={16} className="text-[#00E5FF]" /> Community Hub
        </h2>
      </div>

      <div className="p-4 space-y-6">
        {categories.map((category) => {
          const groupEntities = entities.filter(l => l.category === category);
          const isActiveGroup = activeCategoryId === category;
          
          return (
            <div key={category}>
              <h3 
                onClick={() => setActiveCategory(category)}
                className={`text-[10px] font-bold tracking-widest uppercase mb-3 px-2 flex items-center gap-2 cursor-pointer transition-colors ${
                  isActiveGroup ? 'text-white' : 'text-[#71717A] hover:text-[#A1A1AA]'
                }`}
              >
                {getIcon(category)} {category}
              </h3>
              
              {groupEntities.length > 0 && (
                <div className="space-y-1.5">
                  {groupEntities.map((entity) => {
                    return (
                      <div 
                        key={entity.id}
                        className={`p-3 rounded-lg border bg-[#1A1A1A] border-[#2A2A30]`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-xs font-bold leading-tight text-white">
                              {entity.name}
                            </h4>
                            <p className="text-[10px] text-[#71717A] font-bold mt-1 uppercase tracking-wider">{entity.owner}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-[10px] mt-2 pt-2 border-t border-[#2A2A30]">
                          <div className="flex items-center gap-1.5">
                            {entity.value && (
                              <>
                                <span className="text-[#71717A] font-bold uppercase">Val:</span>
                                <span className="font-black text-white">₹{(entity.value / 100000).toFixed(1)}L</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={`font-bold px-1.5 py-0.5 rounded border ${
                              entity.status === 'Healthy' || entity.status === 'Active' || entity.status === 'Resolved' ? 'bg-success/10 text-success border-success/30' :
                              entity.status === 'At Risk' || entity.status === 'Delayed' || entity.status === 'Open' ? 'bg-danger/10 text-danger border-danger/30' :
                              'bg-warning/10 text-warning border-warning/30'
                            }`}>
                              {entity.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
