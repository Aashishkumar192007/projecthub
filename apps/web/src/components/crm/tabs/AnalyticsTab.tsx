'use client';

import { useCrmStore } from '@/store/crmStore';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, AreaChart, Area, CartesianGrid, YAxis } from 'recharts';

export function AnalyticsTab() {
  const { stats, campaigns } = useCrmStore();

  const funnelData = stats.lifecycleStages.map(s => ({
    name: s.name,
    value: s.value
  }));

  const sourceData = campaigns.reduce((acc, curr) => {
    const existing = acc.find(a => a.name === curr.platform);
    if (existing) existing.value += curr.leadsGenerated;
    else acc.push({ name: curr.platform, value: curr.leadsGenerated });
    return acc;
  }, [] as {name: string, value: number}[]);

  return (
    <div className="p-6 bg-[#0A0C10] min-h-full space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white tracking-wide">CRM Analytics</h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        
        {/* Funnel Chart */}
        <div className="bg-[#121212] border border-neutral-800 rounded p-6 h-80 flex flex-col">
          <h3 className="text-sm font-medium text-white mb-4">Lead Conversion Funnel</h3>
          <div className="flex-1">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={funnelData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 10 }} />
                 <Tooltip cursor={{ fill: '#1A1A1A' }} contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '4px' }} itemStyle={{ color: '#00E5FF' }} />
                 <Bar dataKey="value" fill="#00E5FF" radius={[0, 4, 4, 0]} barSize={20} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Source Analysis */}
        <div className="bg-[#121212] border border-neutral-800 rounded p-6 h-80 flex flex-col">
          <h3 className="text-sm font-medium text-white mb-4">Leads by Source Platform</h3>
          <div className="flex-1">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={sourceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 10 }} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 10 }} />
                 <Tooltip cursor={{ fill: '#1A1A1A' }} contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '4px' }} itemStyle={{ color: '#8B5CF6' }} />
                 <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={40} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Forecast Area Chart */}
        <div className="col-span-2 bg-[#121212] border border-neutral-800 rounded p-6 h-80 flex flex-col">
          <h3 className="text-sm font-medium text-white mb-4">Revenue Forecast (Pipeline Projection)</h3>
          <div className="flex-1">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={[
                 { month: 'Jan', revenue: 1200000 },
                 { month: 'Feb', revenue: 2100000 },
                 { month: 'Mar', revenue: 1800000 },
                 { month: 'Apr', revenue: 3200000 },
                 { month: 'May', revenue: stats.pipelineValue * 0.1 },
                 { month: 'Jun', revenue: stats.pipelineValue * 0.25 },
               ]} margin={{ top: 10, right: 0, left: 20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 10 }} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 10 }} tickFormatter={v => `$${v/1000000}M`} />
                 <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '4px' }} itemStyle={{ color: '#10B981' }} />
                 <Area type="monotone" dataKey="revenue" stroke="#10B981" fillOpacity={1} fill="url(#colorRev)" />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
