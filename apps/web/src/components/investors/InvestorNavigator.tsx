'use client';

import { useInvestorStore, InvestorType } from '@/store/investorStore';
import { useRouter, useParams } from 'next/navigation';
import { Briefcase, Landmark, Building2, Shield, HeartHandshake, Gem, Users2, Building } from 'lucide-react';

export function InvestorNavigator() {
  const router = useRouter();
  const params = useParams();
  const currentId = params?.id as string;
  const { investors, setActiveInvestor } = useInvestorStore();

  const handleSelect = (id: string) => {
    setActiveInvestor(id);
    router.push(`/investors/${id}`);
  };

  const getIcon = (type: InvestorType) => {
    switch (type) {
      case 'Institutional': return <Landmark size={14} className="text-brand-blue" />;
      case 'Private': return <Briefcase size={14} className="text-[#A1A1AA]" />;
      case 'REIT': return <Building2 size={14} className="text-warning" />;
      case 'Family Office': return <Shield size={14} className="text-success" />;
      case 'Strategic': return <HeartHandshake size={14} className="text-[#00E5FF]" />;
      case 'High Net Worth': return <Gem size={14} className="text-purple-400" />;
      case 'Portfolio Owner': return <Building size={14} className="text-orange-400" />;
      case 'Joint Venture': return <Users2 size={14} className="text-pink-400" />;
      default: return <Briefcase size={14} />;
    }
  };

  const categories: InvestorType[] = ['Institutional', 'Private', 'REIT', 'Family Office', 'Strategic', 'High Net Worth', 'Portfolio Owner', 'Joint Venture'];

  return (
    <div className="w-80 border-r border-[#2A2A30] bg-[#111111] h-full flex flex-col shrink-0 z-10 overflow-y-auto no-scrollbar">
      
      <div className="p-5 border-b border-[#2A2A30] bg-[#161616] sticky top-0 z-10 flex items-center justify-between">
        <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Briefcase size={16} className="text-[#00E5FF]" /> Investor Directory
        </h2>
      </div>

      <div className="p-4 space-y-6">
        {categories.map((category) => {
          const groupInvestors = investors.filter(i => i.type === category);
          
          if (groupInvestors.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-3 px-2">
                {category}s
              </h3>
              <div className="space-y-1.5">
                {groupInvestors.map((investor) => {
                  const isActive = currentId === investor.id;
                  
                  return (
                    <div 
                      key={investor.id}
                      onClick={() => handleSelect(investor.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all border ${
                        isActive 
                          ? 'bg-[#1A2533] border-brand-blue shadow-[0_0_15px_rgba(79,132,255,0.15)]' 
                          : 'bg-[#1A1A1A] border-[#2A2A30] hover:border-[#3F3F46] hover:bg-[#1E1E22]'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 w-6 h-6 rounded bg-[#2A2A30] flex items-center justify-center shrink-0 border border-[#3F3F46]">
                            {getIcon(investor.type)}
                          </div>
                          <div>
                            <h4 className={`text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-[#E4E4E7]'}`}>
                              {investor.name}
                            </h4>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="bg-[#111111] border border-[#2A2A30] rounded p-1.5 flex flex-col items-center justify-center">
                          <span className="text-[#71717A] font-bold uppercase tracking-wider text-[8px] mb-0.5">Value</span>
                          <span className="text-white font-black">${investor.portfolioValue}M</span>
                        </div>
                        <div className="bg-[#111111] border border-[#2A2A30] rounded p-1.5 flex flex-col items-center justify-center">
                          <span className="text-[#71717A] font-bold uppercase tracking-wider text-[8px] mb-0.5">ROI</span>
                          <span className={`font-black ${investor.currentRoi >= 15 ? 'text-success' : 'text-brand-blue'}`}>
                            {investor.currentRoi}%
                          </span>
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
