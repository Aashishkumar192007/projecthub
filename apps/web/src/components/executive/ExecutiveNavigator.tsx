'use client';

import { ExecutiveFolder, useRevenueIntelligenceStore } from '@/store/revenueIntelligenceStore';
import { 
  BarChart2, Target, Crosshair, 
  TrendingUp, BarChart3, LineChart, PieChart,
  Building, Map, Users, Briefcase, Megaphone, UserCircle,
  Box, Sparkles, AlertTriangle, FileText, Database
} from 'lucide-react';
import { useEffect, useState } from 'react';

export function ExecutiveNavigator() {
  const { activeFolder, setActiveFolder } = useRevenueIntelligenceStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navCategories = [
    {
      title: 'COMMAND CENTERS',
      items: [
        { id: 'SALES_COMMAND_CENTER' as ExecutiveFolder, label: 'Sales Command', icon: BarChart2 },
        { id: 'REVENUE_WAR_ROOM' as ExecutiveFolder, label: 'Live War Room', icon: Target },
        { id: 'DYNAMIC_TARGETS' as ExecutiveFolder, label: 'Dynamic Targets', icon: Crosshair },
      ]
    },
    {
      title: 'FORECASTING',
      items: [
        { id: 'REVENUE_FORECAST' as ExecutiveFolder, label: 'Revenue Forecast', icon: TrendingUp },
        { id: 'SALES_FORECAST' as ExecutiveFolder, label: 'Sales Forecast', icon: BarChart3 },
        { id: 'SCENARIO_PLANNER' as ExecutiveFolder, label: 'Scenario Planner', icon: LineChart },
        { id: 'FORECAST_ACCURACY' as ExecutiveFolder, label: 'Forecast Accuracy', icon: PieChart },
      ]
    },
    {
      title: 'INTELLIGENCE LAYER',
      items: [
        { id: 'PROJECT_INTELLIGENCE' as ExecutiveFolder, label: 'Projects', icon: Building },
        { id: 'REGIONAL_INTELLIGENCE' as ExecutiveFolder, label: 'Regions', icon: Map },
        { id: 'SALES_TEAM_INTELLIGENCE' as ExecutiveFolder, label: 'Sales Team', icon: Users },
        { id: 'BROKER_INTELLIGENCE' as ExecutiveFolder, label: 'Brokers', icon: Briefcase },
        { id: 'CAMPAIGN_INTELLIGENCE' as ExecutiveFolder, label: 'Campaigns', icon: Megaphone },
        { id: 'CUSTOMER_INTELLIGENCE' as ExecutiveFolder, label: 'Customers', icon: UserCircle },
      ]
    },
    {
      title: 'PREDICTIVE ENGINES',
      items: [
        { id: 'INVENTORY_INTELLIGENCE' as ExecutiveFolder, label: 'Inventory AI', icon: Box },
        { id: 'DEMAND_PREDICTION' as ExecutiveFolder, label: 'Demand Prediction', icon: Sparkles },
        { id: 'CHURN_INTELLIGENCE' as ExecutiveFolder, label: 'Churn Intelligence', icon: AlertTriangle },
      ]
    },
    {
      title: 'ENTERPRISE & COPILOT',
      items: [
        { id: 'LEAD_CONVERSION_PREDICTION' as ExecutiveFolder, label: 'Lead Scoring AI', icon: Target },
        { id: 'CUSTOM_REPORT_BUILDER' as ExecutiveFolder, label: 'Custom Reports', icon: FileText },
        { id: 'BOARD_REPORTING' as ExecutiveFolder, label: 'Board Reporting', icon: Database },
        { id: 'AI_COPILOT' as ExecutiveFolder, label: 'Palantir Copilot', icon: Sparkles },
      ]
    }
  ];

  return (
    <div className="w-[280px] h-full bg-[#0A0A0A] border-r border-neutral-800 flex flex-col font-sans shrink-0 z-10">
      
      {/* Brand Header */}
      <div className="h-[72px] flex items-center px-6 border-b border-neutral-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-neutral-800 rounded flex items-center justify-center text-white font-bold text-xs bg-neutral-900 overflow-hidden">
            <span className="text-[10px] tracking-widest text-[#00E5FF]">AI_REV</span>
          </div>
          <div>
            <div className="text-[#00E5FF] font-bold text-xs tracking-widest uppercase">REVENUE CLOUD</div>
            <div className="text-neutral-500 text-[10px] uppercase tracking-widest mt-0.5">Executive Suite</div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-4 no-scrollbar">
        <nav className="space-y-6">
          {navCategories.map((category, idx) => (
            <div key={idx}>
              <div className="px-6 mb-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                {category.title}
              </div>
              <div className="space-y-1">
                {category.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveFolder(item.id)}
                    className={`w-full flex items-center gap-3 px-6 py-2 text-sm transition-colors ${
                      (mounted && activeFolder === item.id) 
                        ? 'text-[#00E5FF] bg-[#00E5FF]/10 border-l-[3px] border-[#00E5FF]' 
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border-l-[3px] border-transparent'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${(mounted && activeFolder === item.id) ? 'text-[#00E5FF]' : 'text-neutral-500'}`} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

    </div>
  );
}
