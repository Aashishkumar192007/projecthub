'use client';

import { useExecutiveStore, PortfolioCategory } from '@/store/executiveStore';
import { Building2, Building, Store, HardHat, Wrench, Globe } from 'lucide-react';

export function PortfolioNavigator() {
  const { activeCategory, setActiveCategory } = useExecutiveStore();

  const categories = [
    { id: 'All', label: 'Global Portfolio', icon: Globe },
    { id: 'Residential', label: 'Residential', icon: Building2 },
    { id: 'Commercial', label: 'Commercial', icon: Building },
    { id: 'Mixed Use', label: 'Mixed Use', icon: Store },
    { id: 'Construction', label: 'Construction Projects', icon: HardHat },
    { id: 'Facilities', label: 'Facilities Management', icon: Wrench },
  ];

  return (
    <div className="w-64 border-r border-[#2A2A30] bg-[#111111] h-full flex flex-col shrink-0 z-10">
      
      <div className="p-4">
        <h3 className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-4 px-2">Portfolio Segments</h3>
        
        <div className="space-y-1">
          {categories.map(category => {
            const isActive = activeCategory === category.id;
            const Icon = category.icon;

            return (
              <div 
                key={category.id}
                onClick={() => setActiveCategory(category.id as PortfolioCategory | 'All')}
                className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer rounded transition-colors ${
                  isActive ? 'bg-[#1A2533] border-l-2 border-brand-blue' : 'hover:bg-[#1E1E22] border-l-2 border-transparent'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-brand-blue' : 'text-[#71717A]'} />
                <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-[#A1A1AA]'}`}>
                  {category.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
