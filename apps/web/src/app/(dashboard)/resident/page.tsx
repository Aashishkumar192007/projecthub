'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Search, Filter, Layers, DoorOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QuickFilterMenu } from '@/components/ui/QuickFilterMenu';

interface UnitNode {
  id: string;
  unitNumber: string;
  floor: {
    tower: {
      name: string;
      propertyProject: {
        name: string;
      }
    }
  }
}

interface Resident {
  id: string;
  name: string;
  email: string;
  phone: string;
  ownedUnits: UnitNode[];
}

export default function ResidentDirectoryPage() {
  const router = useRouter();
  const [residents, setResidents] = useState<Resident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    try {
      const token = localStorage.getItem('access_token') || '';
      const res = await fetch('http://localhost:3001/api/v1/residents', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setResidents(data);
      }
    } catch (error) {
      console.error('Failed to fetch residents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredResidents = residents.filter(r => {
    const matchesSearch = r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email?.toLowerCase().includes(searchTerm.toLowerCase());
    if (roleFilter === 'All Roles') return matchesSearch;
    return matchesSearch && r.role?.toLowerCase() === roleFilter.toLowerCase();
  });

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] overflow-y-auto font-sans p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Resident Directory</h1>
            <p className="text-sm text-neutral-400 mt-1">Centralized directory of all owners, tenants, and family members.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            + Invite Resident
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 bg-[#121212] p-4 rounded-xl border border-[#2A2A30]">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <Input 
              placeholder="Search by name, email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#1A1A1A] border-[#3F3F46] text-white focus:ring-blue-500"
            />
          </div>
          <QuickFilterMenu value={roleFilter} onChange={setRoleFilter} options={['All Roles', 'Owner', 'Tenant', 'Admin']} />
        </div>

        {/* Directory List */}
        <div className="bg-[#121212] border border-[#2A2A30] rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-neutral-500">Loading residents...</div>
          ) : filteredResidents.length === 0 ? (
            <div className="p-12 text-center text-neutral-500">No residents found. Assign owners to flats first!</div>
          ) : (
            <div className="divide-y divide-[#2A2A30]">
              {filteredResidents.map(resident => {
                // Determine their primary unit context
                const primaryUnit = resident.ownedUnits?.[0];
                const societyName = primaryUnit?.floor?.tower?.propertyProject?.name || 'Unassigned Society';
                const towerName = primaryUnit?.floor?.tower?.name || 'Unassigned Building';
                const flatNumber = primaryUnit?.unitNumber || 'Unassigned Flat';

                return (
                  <div 
                    key={resident.id} 
                    onClick={() => router.push(`/resident/${resident.id}`)}
                    className="p-4 flex items-center justify-between hover:bg-[#1A1A1A] cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center border border-blue-800/50">
                        <span className="text-blue-400 font-bold">{resident.name?.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{resident.name}</h3>
                        <p className="text-xs text-neutral-400 mt-0.5">{resident.email} • {resident.phone}</p>
                      </div>
                    </div>

                    <div className="flex space-x-6">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase flex items-center"><Building2 className="w-3 h-3 mr-1"/> Society</span>
                        <span className="text-xs text-neutral-200 mt-1">{societyName}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase flex items-center"><Layers className="w-3 h-3 mr-1"/> Building</span>
                        <span className="text-xs text-neutral-200 mt-1">{towerName}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase flex items-center"><DoorOpen className="w-3 h-3 mr-1"/> Flat</span>
                        <span className="text-sm font-bold text-blue-400 mt-1">{flatNumber}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
