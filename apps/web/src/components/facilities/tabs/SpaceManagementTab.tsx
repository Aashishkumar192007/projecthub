'use client';

import { useFacilityStore } from '@/store/facilityStore';
import { LayoutDashboard, Users, DoorOpen, Activity } from 'lucide-react';

export function SpaceManagementTab() {
  const { facilities, activeFacilityId } = useFacilityStore();
  
  if (!activeFacilityId) return null;
  const activeFacility = facilities.find(f => f.id === activeFacilityId);
  if (!activeFacility) return null;

  // Mock Space Data
  const spaceData = [
    { floor: 'Floor 10', rooms: 24, occupancy: 92, utilization: 88, status: 'High' },
    { floor: 'Floor 9', rooms: 24, occupancy: 85, utilization: 80, status: 'Optimal' },
    { floor: 'Floor 8', rooms: 20, occupancy: 45, utilization: 40, status: 'Underutilized' },
    { floor: 'Floor 7', rooms: 20, occupancy: 98, utilization: 95, status: 'High' },
    { floor: 'Floor 6', rooms: 35, occupancy: 75, utilization: 70, status: 'Optimal' },
  ];

  return (
    <div className="p-8 space-y-8">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><LayoutDashboard size={16} className="text-[#00E5FF]"/> Space Utilization Heatmap</h3>
        <span className="text-[10px] text-[#A1A1AA] uppercase font-bold px-3 py-1 bg-[#1A1A1A] border border-[#2A2A30] rounded-lg">
          IWMS Data Layer
        </span>
      </div>

      {/* Aggregate KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center border border-[#00E5FF]/30">
            <LayoutDashboard size={18} className="text-[#00E5FF]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">Total Usable Space</p>
            <p className="text-xl font-black text-white">125,000 sq ft</p>
          </div>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center border border-warning/30">
            <Users size={18} className="text-warning" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">Current Occupancy</p>
            <p className="text-xl font-black text-white">{activeFacility.occupancy}%</p>
          </div>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center border border-success/30">
            <Activity size={18} className="text-success" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">Space Efficiency</p>
            <p className="text-xl font-black text-white">82%</p>
          </div>
        </div>
      </div>

      {/* Heatmap Table */}
      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#111111] border-b border-[#2A2A30]">
            <tr>
              <th className="p-4 text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Zone / Floor</th>
              <th className="p-4 text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Rooms</th>
              <th className="p-4 text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Occupancy</th>
              <th className="p-4 text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Utilization Heatmap</th>
              <th className="p-4 text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A30]">
            {spaceData.map((space, idx) => (
              <tr key={idx} className="hover:bg-[#1E1E22] transition-colors group">
                <td className="p-4 text-xs font-bold text-white">{space.floor}</td>
                <td className="p-4 text-xs text-[#A1A1AA] flex items-center gap-1.5"><DoorOpen size={12}/> {space.rooms}</td>
                <td className="p-4 text-xs font-bold text-white">{space.occupancy}%</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white w-8">{space.utilization}%</span>
                    <div className="w-48 h-2 bg-[#111111] rounded-full overflow-hidden border border-[#2A2A30]">
                      <div 
                        className={`h-full ${
                          space.utilization >= 90 ? 'bg-danger' : 
                          space.utilization >= 70 ? 'bg-success' : 'bg-warning'
                        }`} 
                        style={{ width: `${space.utilization}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                    space.status === 'High' ? 'text-danger border-danger/30 bg-danger/10' :
                    space.status === 'Optimal' ? 'text-success border-success/30 bg-success/10' :
                    'text-warning border-warning/30 bg-warning/10'
                  }`}>
                    {space.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
