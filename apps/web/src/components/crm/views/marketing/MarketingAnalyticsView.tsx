'use client';

import { BarChart3, TrendingUp, DollarSign, Target } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, AreaChart, Area } from 'recharts';

export function MarketingAnalyticsView() {
  const data = [
    { name: 'Mon', value: 120 },
    { name: 'Tue', value: 250 },
    { name: 'Wed', value: 180 },
    { name: 'Thu', value: 300 },
    { name: 'Fri', value: 280 },
    { name: 'Sat', value: 450 },
    { name: 'Sun', value: 390 },
  ];

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">Marketing Analytics Center</h2>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2 mb-2"><BarChart3 className="w-4 h-4"/> LEADS GENERATED</div>
          <div className="text-2xl font-medium text-white">2,450</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4"/> CAMPAIGN ROI</div>
          <div className="text-2xl font-medium text-green-400">240%</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2 mb-2"><Target className="w-4 h-4"/> COST PER LEAD</div>
          <div className="text-2xl font-medium text-white">$45.00</div>
        </div>
        <div className="bg-[#121212] border border-neutral-800 rounded p-4">
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2 mb-2"><DollarSign className="w-4 h-4"/> ATTR. REVENUE</div>
          <div className="text-2xl font-medium text-[#00E5FF]">$4.2M</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1 min-h-[300px]">
        <div className="bg-[#121212] border border-neutral-800 rounded p-6 flex flex-col">
          <h3 className="text-sm font-medium text-white mb-4">Lead Generation Trend</h3>
          <div className="flex-1 min-h-[200px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 10 }} />
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '4px', fontSize: '12px' }}
                   itemStyle={{ color: '#fff' }}
                 />
                 <Area type="monotone" dataKey="value" stroke="#00E5FF" fill="#00E5FF" fillOpacity={0.1} />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded p-6 flex flex-col">
          <h3 className="text-sm font-medium text-white mb-4">Campaign Performance</h3>
          <div className="flex-1 min-h-[200px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
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
