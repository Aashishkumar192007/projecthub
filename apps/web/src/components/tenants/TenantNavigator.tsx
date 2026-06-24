'use client';

import { useTenantStore, TenantCategory } from '@/store/tenantStore';
import { useRouter, useParams } from 'next/navigation';
import { Users, AlertTriangle, Clock, Building2, Search, Building } from 'lucide-react';
import { useEffect, useState } from 'react';

const categoryIcons: Record<TenantCategory, any> = {
  active: Users,
  expiring: Clock,
  high_risk: AlertTriangle,
  delinquent: AlertTriangle,
  corporate: Building2
};

const categoryLabels: Record<TenantCategory, string> = {
  active: 'Active Tenants',
  expiring: 'Expiring Leases',
  high_risk: 'High Risk',
  delinquent: 'Delinquent',
  corporate: 'Corporate'
};

export function TenantNavigator() {
  const { tenants, activeTenantId, setActiveTenant } = useTenantStore();
  const router = useRouter();
  const params = useParams();
  const [search, setSearch] = useState('');

  // Sync route param with store state
  useEffect(() => {
    if (params.id && params.id !== activeTenantId) {
      setActiveTenant(params.id as string);
    }
  }, [params.id, activeTenantId, setActiveTenant]);

  const handleSelect = (id: string) => {
    setActiveTenant(id);
    router.push(`/tenants/${id}`);
  };

  // Group tenants
  const categories: TenantCategory[] = ['active', 'corporate', 'expiring', 'delinquent', 'high_risk'];

  return (
    <div className="w-64 border-r border-[#2A2A30] bg-[#111111] h-full flex flex-col shrink-0 z-10">
      
      {/* Header */}
      <div className="p-4 border-b border-[#2A2A30] bg-[#161616]">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded bg-brand-blue/20 flex items-center justify-center">
            <Users size={12} className="text-brand-blue" />
          </div>
          <h2 className="text-sm font-bold text-white tracking-wide">Tenant Directory</h2>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#71717A]" />
          <input 
            type="text" 
            placeholder="Search tenants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1A1A1A] border border-[#3F3F46] rounded px-3 py-1.5 pl-8 text-xs text-white placeholder:text-[#71717A] focus:outline-none focus:border-brand-blue transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-6">
        {categories.map(category => {
          const categoryTenants = tenants.filter(t => t.category === category && t.name.toLowerCase().includes(search.toLowerCase()));
          if (categoryTenants.length === 0) return null;
          
          const Icon = categoryIcons[category];

          return (
            <div key={category} className="px-3">
              <h3 className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-2 flex items-center gap-2 px-3">
                <Icon size={12} /> {categoryLabels[category]}
              </h3>
              
              <div className="space-y-1">
                {categoryTenants.map(tenant => {
                  const isActive = tenant.id === activeTenantId;
                  return (
                    <div 
                      key={tenant.id}
                      onClick={() => handleSelect(tenant.id)}
                      className={`flex items-center gap-3 px-3 py-2 cursor-pointer rounded transition-colors ${
                        isActive ? 'bg-[#1A2533] border-l-2 border-brand-blue' : 'hover:bg-[#1E1E22] border-l-2 border-transparent'
                      }`}
                    >
                      {/* Avatar */}
                      <img src={tenant.photoUrl} alt={tenant.name} className="w-6 h-6 rounded-full object-cover bg-[#2A2A30]" />
                      
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs truncate ${isActive ? 'font-bold text-white' : 'font-medium text-[#A1A1AA]'}`}>
                          {tenant.name}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {tenant.type === 'Corporate' ? <Building size={10} className="text-[#71717A]"/> : <Users size={10} className="text-[#71717A]"/>}
                          <span className="text-[9px] text-[#71717A] truncate">{tenant.units[0]?.unitName || 'No Unit'}</span>
                          {tenant.units.length > 1 && (
                            <span className="text-[9px] text-brand-blue bg-brand-blue/10 px-1 rounded">+{tenant.units.length - 1}</span>
                          )}
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
