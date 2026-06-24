'use client';

import { useResidentStore, ResidentCategory } from '@/store/residentStore';
import { useRouter, useParams } from 'next/navigation';
import { User, Users, Star, AlertTriangle, UserCheck, Shield } from 'lucide-react';

export function ResidentNavigator() {
  const router = useRouter();
  const params = useParams();
  const currentId = params?.id as string;
  const { residents, setActiveResident } = useResidentStore();

  const handleSelect = (id: string) => {
    setActiveResident(id);
    router.push(`/resident/${id}`);
  };

  const getIcon = (category: ResidentCategory) => {
    switch (category) {
      case 'Owner': return <UserCheck size={14} className="text-success" />;
      case 'Tenant': return <User size={14} className="text-brand-blue" />;
      case 'Family Member': return <Users size={14} className="text-[#A1A1AA]" />;
      case 'Committee Member': return <Shield size={14} className="text-[#00E5FF]" />;
      case 'VIP Resident': return <Star size={14} className="text-warning" />;
      case 'Defaulter': return <AlertTriangle size={14} className="text-danger" />;
      default: return <User size={14} />;
    }
  };

  const categories: ResidentCategory[] = ['Owner', 'Tenant', 'Family Member', 'Committee Member', 'VIP Resident', 'Defaulter'];

  return (
    <div className="w-72 border-r border-[#2A2A30] bg-[#111111] h-full flex flex-col shrink-0 z-10 overflow-y-auto no-scrollbar">
      
      <div className="p-5 border-b border-[#2A2A30] bg-[#161616] sticky top-0 z-10">
        <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Users size={16} className="text-[#00E5FF]" /> Resident Navigator
        </h2>
      </div>

      <div className="p-4 space-y-6">
        {categories.map((category) => {
          const groupResidents = residents.filter(r => r.category === category);
          
          if (groupResidents.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-3 px-2">
                {category}s
              </h3>
              <div className="space-y-1.5">
                {groupResidents.map((resident) => {
                  const isActive = currentId === resident.id;
                  
                  return (
                    <div 
                      key={resident.id}
                      onClick={() => handleSelect(resident.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all border ${
                        isActive 
                          ? 'bg-[#1A2533] border-brand-blue shadow-[0_0_15px_rgba(79,132,255,0.15)]' 
                          : 'bg-[#1A1A1A] border-[#2A2A30] hover:border-[#3F3F46] hover:bg-[#1E1E22]'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#2A2A30] flex items-center justify-center shrink-0 border border-[#3F3F46]">
                            {getIcon(resident.category)}
                          </div>
                          <div>
                            <h4 className={`text-xs font-bold truncate max-w-[140px] ${isActive ? 'text-white' : 'text-[#A1A1AA]'}`}>
                              {resident.name}
                            </h4>
                            <p className="text-[10px] text-[#71717A] font-bold">{resident.tower} • {resident.unit}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-[10px] mt-2 pt-2 border-t border-[#2A2A30]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#71717A] font-bold">Score</span>
                          <span className={`font-black ${
                            resident.communityScore >= 90 ? 'text-success' : resident.communityScore >= 60 ? 'text-warning' : 'text-danger'
                          }`}>{resident.communityScore}</span>
                        </div>
                        {resident.pendingDues > 0 && (
                          <div className="flex items-center gap-1.5 text-danger font-bold">
                            ₹{resident.pendingDues.toLocaleString()} Due
                          </div>
                        )}
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
