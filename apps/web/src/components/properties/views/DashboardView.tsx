'use client';

import { usePropertyStore } from '@/store/propertyStore';
import { Building2, Layers, Box, DollarSign, Activity, Users } from 'lucide-react';

export function DashboardView() {
  const { getActiveNode, getChildren } = usePropertyStore();
  const activeNode = getActiveNode();

  if (!activeNode) return null;

  const children = getChildren(activeNode.id);

  // Aggregation logic
  const occupancy = activeNode.occupancy || 0;
  const revenue = activeNode.monthlyRevenue || 0;

  return (
    <div className="p-8">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
          <p className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase mb-4">Total Children Nodes</p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#2A2A30] flex items-center justify-center">
              <Layers size={20} className="text-[#93A5CF]" />
            </div>
            <p className="text-3xl font-black text-white">{children.length}</p>
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
          <p className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase mb-4">Occupancy Rate</p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#2A2A30] flex items-center justify-center">
              <Users size={20} className="text-brand-blue" />
            </div>
            <p className="text-3xl font-black text-white">{occupancy}%</p>
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
          <p className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase mb-4">Monthly Revenue</p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#2A2A30] flex items-center justify-center">
              <DollarSign size={20} className="text-success" />
            </div>
            <p className="text-3xl font-black text-white">${(revenue / 1000).toFixed(1)}k</p>
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6">
          <p className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase mb-4">Health Score</p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#2A2A30] flex items-center justify-center">
              <Activity size={20} className="text-warning" />
            </div>
            <p className="text-3xl font-black text-white">{activeNode.health || 100}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
         {/* Placeholder for charts */}
         <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 h-[300px] flex items-center justify-center">
            <p className="text-[#71717A] text-sm">Revenue Chart Placeholder</p>
         </div>
         <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-6 h-[300px] flex items-center justify-center">
            <p className="text-[#71717A] text-sm">Occupancy Analytics Placeholder</p>
         </div>
      </div>
    </div>
  );
}
