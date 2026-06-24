'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Download, Eye, TrendingUp, MoreHorizontal, ArrowUpRight, Loader2, Check } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useDashboardKpis, useDashboardCharts, useDashboardPortfolio, useDashboardTopAssets } from '@/hooks/useDashboard';

export default function OwnerDashboard() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
      setTimeout(() => setReportGenerated(false), 3000);
    }, 1500);
  };

  const handleDownloadStatement = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadComplete(true);
      setTimeout(() => setDownloadComplete(false), 3000);
    }, 1200);
  };
  const { data: kpis, isLoading: isKpisLoading } = useDashboardKpis();
  const { data: charts, isLoading: isChartsLoading } = useDashboardCharts();
  const { data: portfolio, isLoading: isPortfolioLoading } = useDashboardPortfolio();
  const { data: topAssets, isLoading: isTopAssetsLoading } = useDashboardTopAssets();

  const isLoading = isKpisLoading || isChartsLoading || isPortfolioLoading || isTopAssetsLoading;

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#121212]">
        <Loader2 className="w-10 h-10 text-brand-blue animate-spin mb-4" />
        <p className="text-[#A1A1AA] text-sm font-bold tracking-widest uppercase">Connecting to Command Center...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto p-10 bg-[#121212] font-sans">
      
      {/* Header Area */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
            Jonathan Sterling
          </h1>
          <p className="text-sm font-bold text-[#A1A1AA] tracking-wide">
            Owner & Investor Workspace
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleGenerateReport}
            disabled={isGenerating || reportGenerated}
            className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#3F3F46] hover:border-[#52525B] hover:bg-[#1A1A1A] text-white rounded text-xs font-bold transition-colors disabled:opacity-50"
          >
            {isGenerating ? <Loader2 size={14} className="animate-spin" /> : reportGenerated ? <Check size={14} className="text-success" /> : <FileText size={14} />} 
            {isGenerating ? 'Generating...' : reportGenerated ? 'Generated' : 'Generate Report'}
          </button>
          
          <button 
            onClick={handleDownloadStatement}
            disabled={isDownloading || downloadComplete}
            className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#3F3F46] hover:border-[#52525B] hover:bg-[#1A1A1A] text-white rounded text-xs font-bold transition-colors disabled:opacity-50"
          >
            {isDownloading ? <Loader2 size={14} className="animate-spin" /> : downloadComplete ? <Check size={14} className="text-success" /> : <Download size={14} />} 
            {isDownloading ? 'Downloading...' : downloadComplete ? 'Downloaded' : 'Download Statement'}
          </button>
          
          <button 
            onClick={() => router.push('/leases')}
            className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#3F3F46] hover:border-[#52525B] hover:bg-[#1A1A1A] text-white rounded text-xs font-bold transition-colors"
          >
            <Eye size={14} /> View Leases
          </button>
          
          <button 
            onClick={() => router.push('/portfolio')}
            className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#3F3F46] hover:border-[#52525B] hover:bg-[#1A1A1A] text-white rounded text-xs font-bold transition-colors"
          >
            <TrendingUp size={14} /> Portfolio Analysis
          </button>
        </div>
      </div>

      {/* Primary KPIs (3 Cards) */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        
        {/* KPI 1 */}
        <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-6">
          <p className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase mb-4">Total Portfolio Value</p>
          <p className="text-4xl font-black text-[#93A5CF] tracking-tight mb-4">{kpis?.portfolioValue?.value}</p>
          <p className="text-xs font-bold text-success flex items-center gap-1.5">
            <ArrowUpRight size={14} /> {kpis?.portfolioValue?.trend}
          </p>
        </div>

        {/* KPI 2 */}
        <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-6">
          <p className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase mb-4">Monthly Income</p>
          <p className="text-4xl font-black text-white tracking-tight mb-4">{kpis?.expectedCollection?.value}</p>
          <p className="text-xs font-bold text-success flex items-center gap-1.5">
            <ArrowUpRight size={14} /> {kpis?.expectedCollection?.trend}
          </p>
        </div>

        {/* KPI 3 */}
        <div className="bg-[#161616] border border-[#2A2A30] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase mb-4">Annual Yield</p>
            <p className="text-4xl font-black text-success tracking-tight mb-4">{kpis?.averageCapRate?.value}</p>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-[#2A2A30] rounded-full overflow-hidden mt-1">
            <div 
              className="h-full bg-success shadow-[0_0_8px_#10B981]" 
              style={{ width: `${kpis?.averageCapRate?.progress}%` }}
            ></div>
          </div>
        </div>

      </div>

      {/* Secondary KPIs (Horizontal Strip) */}
      <div className="flex items-center justify-between px-2 mb-10">
        <div>
          <p className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-1">Occupancy</p>
          <p className="text-sm font-bold text-[#E5E7EB]">{kpis?.occupancy}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-1">Vacant Units</p>
          <p className="text-sm font-bold text-danger">{kpis?.vacantUnits}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-1">Active Leases</p>
          <p className="text-sm font-bold text-[#E5E7EB]">{kpis?.activeLeases}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-1">Exp. Collection</p>
          <p className="text-sm font-bold text-[#E5E7EB]">{kpis?.expectedCollection?.value}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase mb-1">Avg. Cap Rate</p>
          <p className="text-sm font-bold text-success">{kpis?.averageCapRate?.value}</p>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Revenue Center (Area Chart) */}
        <div className="lg:col-span-2 border border-[#2A2A30] bg-[#161616] rounded-xl p-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-bold text-white tracking-wide">Revenue Center</h3>
            <MoreHorizontal size={16} className="text-[#71717A] cursor-pointer hover:text-white" />
          </div>
          
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts?.revenueData || []} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F84FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F84FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#3F3F46" tick={{ fill: '#71717A', fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis stroke="#3F3F46" tick={{ fill: '#71717A', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #3F3F46', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                  itemStyle={{ color: '#E5E7EB' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4F84FF" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lease Center (Donut Chart) */}
        <div className="border border-[#2A2A30] bg-[#161616] rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-white tracking-wide">Lease Center</h3>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="w-full h-[160px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Renewed', value: charts?.leaseData?.renewed?.percentage || 68, color: '#4F84FF' },
                      { name: 'Expiring', value: charts?.leaseData?.expiring?.percentage || 12, color: '#F59E0B' },
                      { name: 'Other', value: 20, color: '#2A2A30' }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    stroke="none"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {[{color: '#4F84FF'}, {color: '#F59E0B'}, {color: '#2A2A30'}].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #3F3F46', borderRadius: '4px', fontSize: '12px' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold text-white">{kpis?.activeLeases}</span>
              </div>
            </div>

            <div className="w-full mt-6 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-bold text-[#A1A1AA]">
                  <div className="w-2 h-2 rounded-full bg-brand-blue"></div>
                  {charts?.leaseData?.renewed?.label}
                </div>
                <span className="font-bold text-white">{charts?.leaseData?.renewed?.percentage}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-bold text-[#A1A1AA]">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  {charts?.leaseData?.expiring?.label}
                </div>
                <span className="font-bold text-white">{charts?.leaseData?.expiring?.percentage}%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
        
        {/* Portfolio Overview */}
        <div className="border border-[#2A2A30] bg-[#161616] rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-white tracking-wide">Portfolio Overview</h3>
            <span className="text-[10px] font-bold text-[#71717A]">{portfolio?.length} Total Assets</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {portfolio?.map((asset: any) => (
              <div key={asset.id} className="bg-[#1A1A1A] border border-[#2A2A30] rounded-lg p-4 relative group cursor-pointer hover:border-[#3F3F46] transition-colors">
                <div className={`absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-${asset.status === 'green' ? 'success' : 'amber-500'} shadow-[0_0_6px_var(--tw-colors-${asset.status === 'green' ? 'success' : 'amber-500'})]`}></div>
                <h4 className="text-sm font-bold text-white mb-0.5">{asset.name}</h4>
                <p className="text-[10px] font-bold text-[#71717A] tracking-wider mb-4">{asset.type}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase">Value</p>
                    <p className="text-xs font-bold text-white mt-1">{asset.value}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#71717A] tracking-widest uppercase">Yield</p>
                    <p className="text-xs font-bold text-success mt-1">{asset.yield}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Assets by Yield */}
        <div className="border border-[#2A2A30] bg-[#161616] rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-white tracking-wide">Top Assets by Yield</h3>
          </div>

          <div className="space-y-4">
            {topAssets?.map((asset: any) => (
              <div key={asset.id} className="flex items-center justify-between pb-4 border-b border-[#2A2A30] last:border-0 last:pb-0">
                <span className="text-xs font-bold text-[#E5E7EB]">{asset.name}</span>
                <span className="text-xs font-bold text-success">{asset.yield}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
