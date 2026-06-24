'use client';

import { useCrmStore } from '@/store/crmStore';
import { 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  Info,
  Trophy
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip } from 'recharts';

export function OverviewTab() {
  const { stats } = useCrmStore();

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    return `$${val.toLocaleString()}`;
  };

  const donutData = [
    { name: 'Direct', value: 40, color: '#3B82F6' },
    { name: 'Broker', value: 30, color: '#F59E0B' },
    { name: 'Digital', value: 20, color: '#10B981' },
    { name: 'Referral', value: 10, color: '#8B5CF6' },
  ];

  const barData = [
    { name: 'Q1', value: 120 },
    { name: 'Q2', value: 250 },
    { name: 'Q3', value: 180 },
    { name: 'Q4', value: 300 },
  ];

  return (
    <div className="p-6 space-y-6 bg-[#0A0A0A] min-h-full">
      
      {/* KPI Cards Row */}
      <div className="grid grid-cols-6 gap-4">
        {/* TOTAL LEADS */}
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">TOTAL LEADS</div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-medium text-white">{stats.totalLeads.toLocaleString()}</span>
            <span className="text-xs font-bold text-green-400 mb-1">+{stats.totalLeadsChange}%</span>
          </div>
        </div>

        {/* HOT LEADS */}
        <div className="bg-[#121212] border border-neutral-800 rounded p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1 h-full bg-blue-400"></div>
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">HOT LEADS</div>
          <div className="text-3xl font-medium text-blue-400">{stats.hotLeads}</div>
        </div>

        {/* QUALIFIED */}
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">QUALIFIED</div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-medium text-white">{stats.qualified}</span>
            <span className="text-xs font-bold text-green-400 mb-1">{stats.qualifiedPercentage}%</span>
          </div>
        </div>

        {/* SITE VISITS */}
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">SITE VISITS</div>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-medium text-white">{stats.siteVisits}</span>
            <TrendingUp className="w-4 h-4 text-green-400 mb-1" />
          </div>
        </div>

        {/* BOOKINGS */}
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">BOOKINGS</div>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-medium text-green-400">{stats.bookings}</span>
            <div className="w-4 h-4 rounded-full border-2 border-green-400 flex items-center justify-center mb-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* REVENUE PIPELINE */}
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">REVENUE PIPELINE</div>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-medium text-white">{formatCurrency(stats.pipelineValue)}</span>
            <span className="text-[10px] text-neutral-500 mb-1">Conv: {stats.conversionRate}%</span>
          </div>
        </div>
      </div>

      {/* Lifecycle Conversion Widget */}
      <div className="bg-[#121212] border border-neutral-800 rounded p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-medium text-white">Lead Lifecycle Conversion</h3>
          <Info className="w-4 h-4 text-neutral-500" />
        </div>

        <div className="flex items-center justify-between">
          {stats.lifecycleStages.map((stage, idx) => (
            <div key={stage.id} className="flex items-center flex-1">
              <div className={`flex flex-col items-center justify-center w-32 h-24 rounded border ${
                stage.id === 'won' ? 'border-green-400/30 bg-green-400/5' :
                stage.id === 'qualified' ? 'border-blue-400/30 bg-blue-400/5' :
                'border-neutral-800 bg-[#1A1A1A]'
              }`}>
                <div className={`text-2xl font-medium mb-1 ${
                  stage.id === 'won' ? 'text-green-400' :
                  stage.id === 'qualified' ? 'text-blue-400' : 'text-white'
                }`}>
                  {stage.value.toLocaleString()}
                </div>
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{stage.name}</div>
              </div>

              {stage.convToNext !== null && (
                <div className="flex-1 flex flex-col items-center justify-center px-2">
                  <ArrowRight className="w-4 h-4 text-neutral-600 mb-1" />
                  <div className="text-[10px] font-bold text-neutral-500">{stage.convToNext}%</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grid for Bottom Widgets */}
      <div className="grid grid-cols-2 gap-6">
        
        {/* Top Performing Projects */}
        <div className="bg-[#121212] border border-neutral-800 rounded p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-medium text-white">Top Performing Projects</h3>
            <button className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">VIEW ALL</button>
          </div>
          
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest border-b border-neutral-800">
                <th className="pb-3 font-medium">PROJECT</th>
                <th className="pb-3 font-medium text-right">LEADS</th>
                <th className="pb-3 font-medium text-right">VISITS</th>
                <th className="pb-3 font-medium text-right">REVENUE</th>
                <th className="pb-3 font-medium text-right">CONV.</th>
              </tr>
            </thead>
            <tbody>
              {stats.topProjects.map((proj) => (
                <tr key={proj.id} className="border-b border-neutral-800/50 last:border-0">
                  <td className="py-4 text-neutral-300">{proj.name}</td>
                  <td className="py-4 text-right text-neutral-400">{proj.leads}</td>
                  <td className="py-4 text-right text-neutral-400">{proj.visits}</td>
                  <td className="py-4 text-right text-white">{formatCurrency(proj.revenue)}</td>
                  <td className="py-4 text-right text-green-400">{proj.conv}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sales Leaderboard */}
        <div className="bg-[#121212] border border-neutral-800 rounded p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-medium text-white">Sales Leaderboard</h3>
            <Trophy className="w-4 h-4 text-neutral-500" />
          </div>

          <div className="space-y-4">
            {stats.salesLeaders.map((leader) => (
              <div key={leader.id} className="flex items-center justify-between p-3 rounded bg-[#1A1A1A] border border-neutral-800">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center relative overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${leader.name}`} alt={leader.name} className="w-full h-full object-cover" />
                    <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#1A1A1A] ${
                      leader.status === 'online' ? 'bg-green-400' :
                      leader.status === 'busy' ? 'bg-amber-400' : 'bg-neutral-500'
                    }`}></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{leader.name}</div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-widest">{leader.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-400">{formatCurrency(leader.revenue)}</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">Conv: {leader.conv}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Source Mix */}
        <div className="bg-[#121212] border border-neutral-800 rounded p-6 h-64 flex flex-col">
          <h3 className="text-sm font-medium text-white mb-4">Lead Source Mix</h3>
          <div className="flex-1 relative">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={donutData}
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {donutData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '4px', fontSize: '12px' }}
                   itemStyle={{ color: '#fff' }}
                 />
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">TOTAL</span>
                <span className="text-xl font-medium text-white">{stats.totalLeads}</span>
             </div>
          </div>
        </div>

        {/* Pipeline Distribution */}
        <div className="bg-[#121212] border border-neutral-800 rounded p-6 h-64 flex flex-col">
          <h3 className="text-sm font-medium text-white mb-4">Pipeline Distribution</h3>
          <div className="flex-1">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 10 }} />
                 <Tooltip 
                   cursor={{ fill: '#1A1A1A' }}
                   contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '4px', fontSize: '12px' }}
                   itemStyle={{ color: '#fff' }}
                 />
                 <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
