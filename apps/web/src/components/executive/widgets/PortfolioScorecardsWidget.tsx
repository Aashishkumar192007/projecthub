'use client';

import { useExecutiveStore } from '@/store/executiveStore';
import { LayoutDashboard, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function PortfolioScorecardsWidget() {
  const { scorecards, activeCategory } = useExecutiveStore();

  const filteredScorecards = activeCategory === 'All' 
    ? scorecards 
    : scorecards.filter(s => s.category === activeCategory);

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <LayoutDashboard size={20} className="text-brand-blue" />
          Property Scorecards
        </h2>
        <span className="text-xs font-bold text-[#A1A1AA] uppercase">{filteredScorecards.length} Assets</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#111111] border-y border-[#2A2A30]">
            <tr>
              <th className="p-4 text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Property</th>
              <th className="p-4 text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Revenue</th>
              <th className="p-4 text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Occupancy</th>
              <th className="p-4 text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Tenant Health</th>
              <th className="p-4 text-[10px] font-bold text-[#71717A] uppercase tracking-wider">ESG Score</th>
              <th className="p-4 text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Risk Score</th>
              <th className="p-4 text-[10px] font-bold text-[#71717A] uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A30]">
            {filteredScorecards.map(scorecard => (
              <tr key={scorecard.id} className="hover:bg-[#1E1E22] transition-colors group">
                <td className="p-4">
                  <p className="text-xs font-bold text-white">{scorecard.name}</p>
                  <p className="text-[10px] text-[#A1A1AA] uppercase mt-0.5">{scorecard.category}</p>
                </td>
                <td className="p-4">
                  <span className="text-xs font-bold text-success flex items-center gap-1">
                    ₹{scorecard.revenue} Cr <TrendingUp size={10} />
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white w-8">{scorecard.occupancy}%</span>
                    <div className="w-16 h-1 bg-[#111111] rounded-full overflow-hidden">
                      <div className="h-full bg-brand-blue" style={{ width: `${scorecard.occupancy}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-xs font-bold ${scorecard.tenantHealth >= 80 ? 'text-success' : 'text-warning'}`}>
                    {scorecard.tenantHealth}%
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-xs font-bold text-[#00E5FF]">{scorecard.esgScore}</span>
                </td>
                <td className="p-4">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                    scorecard.riskScore > 30 ? 'border-danger text-danger bg-danger/10' :
                    scorecard.riskScore > 15 ? 'border-warning text-warning bg-warning/10' :
                    'border-success text-success bg-success/10'
                  }`}>
                    {scorecard.riskScore}%
                  </span>
                </td>
                <td className="p-4">
                  <Link href={`/properties`} className="text-[10px] font-bold text-brand-blue uppercase hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
