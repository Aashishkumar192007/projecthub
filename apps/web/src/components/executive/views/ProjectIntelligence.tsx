'use client';

import { Building, TrendingUp, TrendingDown, Users, CheckCircle, BarChart2 } from 'lucide-react';
import { useState } from 'react';

export function ProjectIntelligence() {
  const [view, setView] = useState('ALL');

  const projects = [
    { id: '1', name: 'Project Orion', revenue: 150000000, bookings: 45, visits: 320, leads: 1200, conversion: 3.7, sold: 45, total: 200, profitability: 22, ranking: 1, status: 'HIGH_PERFORMER' },
    { id: '2', name: 'Sunset Valley', revenue: 85000000, bookings: 22, visits: 180, leads: 850, conversion: 2.5, sold: 85, total: 300, profitability: 18, ranking: 2, status: 'EMERGING' },
    { id: '3', name: 'Millennium Tower', revenue: 42000000, bookings: 12, visits: 110, leads: 600, conversion: 2.0, sold: 12, total: 150, profitability: 14, ranking: 4, status: 'UNDERPERFORMING' },
    { id: '4', name: 'Eco Heights', revenue: 110000000, bookings: 38, visits: 290, leads: 950, conversion: 4.0, sold: 180, total: 250, profitability: 24, ranking: 3, status: 'HIGH_PERFORMER' },
  ];

  const sortedProjects = [...projects].sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="p-8 h-full overflow-y-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-white tracking-wide">Project Performance Intelligence</h1>
          <p className="text-neutral-500 mt-2">Analyze sales velocity, profitability, and ranking across the portfolio.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center gap-3 text-green-400 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Top Performer</span>
          </div>
          <div className="text-xl font-medium text-white mb-1">Project Orion</div>
          <div className="text-xs text-neutral-500">${(150000000 / 1000000).toFixed(1)}M Revenue</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center gap-3 text-red-400 mb-2">
            <TrendingDown className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Highest Risk</span>
          </div>
          <div className="text-xl font-medium text-white mb-1">Millennium Tower</div>
          <div className="text-xs text-neutral-500">2.0% Conversion Rate</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center gap-3 text-amber-400 mb-2">
            <BarChart2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Avg Profit Margin</span>
          </div>
          <div className="text-3xl font-medium text-white mb-1">19.5%</div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center gap-3 text-blue-400 mb-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Inventory Sold</span>
          </div>
          <div className="text-3xl font-medium text-white mb-1">35%</div>
        </div>
      </div>

      <div className="bg-[#121212] border border-neutral-800 rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
           <h3 className="text-sm font-bold text-white uppercase tracking-widest">Portfolio Rankings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#1A1C20] border-b border-neutral-800">
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium w-16 text-center">RANK</th>
                <th className="px-6 py-4 font-medium">PROJECT</th>
                <th className="px-6 py-4 font-medium text-right">REVENUE</th>
                <th className="px-6 py-4 font-medium text-right">BOOKINGS</th>
                <th className="px-6 py-4 font-medium text-right">CONVERSION</th>
                <th className="px-6 py-4 font-medium text-right">INVENTORY SOLD</th>
                <th className="px-6 py-4 font-medium text-center">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {sortedProjects.map((project, idx) => (
                <tr key={project.id} className="border-b border-neutral-800/50 hover:bg-[#1A1C20] transition-colors">
                  <td className="px-6 py-4 text-center">
                     <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      idx === 0 ? 'bg-amber-500/20 text-amber-400' :
                      idx === 1 ? 'bg-neutral-300/20 text-neutral-300' :
                      idx === 2 ? 'bg-orange-800/30 text-orange-400' :
                      'text-neutral-500'
                    }`}>
                      {idx + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{project.name}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{project.profitability}% Profit Margin</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-green-400 font-medium">${(project.revenue / 1000000).toFixed(1)}M</div>
                  </td>
                  <td className="px-6 py-4 text-right text-white font-medium">
                    {project.bookings}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={project.conversion > 3.0 ? 'text-[#00E5FF]' : 'text-amber-400'}>{project.conversion}%</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-neutral-800 rounded-full h-1.5">
                        <div className="bg-white h-1.5 rounded-full" style={{ width: `${(project.sold / project.total) * 100}%` }}></div>
                      </div>
                      <span className="text-xs text-neutral-400 w-8">{((project.sold / project.total) * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded border ${
                      project.status === 'HIGH_PERFORMER' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      project.status === 'UNDERPERFORMING' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
