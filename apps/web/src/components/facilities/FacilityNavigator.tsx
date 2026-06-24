'use client';

import { useFacilityStore, FacilityType, HealthStatus } from '@/store/facilityStore';
import { useRouter, useParams } from 'next/navigation';
import { Building2, ShieldAlert, CheckCircle2, AlertTriangle, Layers, MapPin, Wrench } from 'lucide-react';

export function FacilityNavigator() {
  const router = useRouter();
  const params = useParams();
  const currentId = params?.id as string;
  const { facilities, setActiveFacility } = useFacilityStore();

  const handleSelect = (id: string) => {
    setActiveFacility(id);
    router.push(`/facilities/${id}`);
  };

  const getStatusColor = (health: number) => {
    if (health >= 90) return 'text-success bg-success';
    if (health >= 70) return 'text-warning bg-warning';
    return 'text-danger bg-danger';
  };

  const getIcon = (type: FacilityType) => {
    switch (type) {
      case 'Campus': return <MapPin size={14} className="text-brand-blue" />;
      case 'Zone': return <Layers size={14} className="text-[#00E5FF]" />;
      case 'Building': return <Building2 size={14} className="text-white" />;
      case 'Common Area': return <Wrench size={14} className="text-[#A1A1AA]" />;
      case 'Critical Facility': return <ShieldAlert size={14} className="text-danger" />;
      default: return <Building2 size={14} />;
    }
  };

  const categories: FacilityType[] = ['Campus', 'Zone', 'Building', 'Common Area', 'Critical Facility'];

  return (
    <div className="w-72 border-r border-[#2A2A30] bg-[#111111] h-full flex flex-col shrink-0 z-10 overflow-y-auto no-scrollbar">
      
      <div className="p-5 border-b border-[#2A2A30] bg-[#161616] sticky top-0 z-10">
        <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Building2 size={16} className="text-[#00E5FF]" /> Facility Navigator
        </h2>
      </div>

      <div className="p-4 space-y-6">
        {categories.map((category) => {
          const groupFacilities = facilities.filter(f => f.type === category);
          
          if (groupFacilities.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-3 px-2">
                {category}s
              </h3>
              <div className="space-y-1.5">
                {groupFacilities.map((facility) => {
                  const isActive = currentId === facility.id;
                  
                  return (
                    <div 
                      key={facility.id}
                      onClick={() => handleSelect(facility.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all border ${
                        isActive 
                          ? 'bg-[#1A2533] border-brand-blue shadow-[0_0_15px_rgba(79,132,255,0.15)]' 
                          : 'bg-[#1A1A1A] border-[#2A2A30] hover:border-[#3F3F46] hover:bg-[#1E1E22]'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {getIcon(facility.type)}
                          <h4 className={`text-xs font-bold truncate max-w-[150px] ${isActive ? 'text-white' : 'text-[#A1A1AA]'}`}>
                            {facility.name}
                          </h4>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-[10px] mt-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#71717A] font-bold">Health</span>
                          <span className={`font-black ${getStatusColor(facility.healthScore).split(' ')[0]}`}>{facility.healthScore}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#71717A] font-bold">
                          <Wrench size={10} />
                          {facility.openWorkOrders} WO
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
