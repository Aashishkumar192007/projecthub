import React from 'react';
import { ModuleCommandCenter } from '@/components/ui/ModuleCommandCenter';

export default function ProcurementAnalyticsPage() {
  return (
    <ModuleCommandCenter
      title="Supply Chain Spend & Saving Analytics"
      subtitle="Multi-category spend Pareto analysis, supplier negotiation leverage, lead time trends, and inflation benchmarking"
      badge="SPEND INTELLIGENCE"
      stats={[
        { label: "Total Spend (YTD)", value: "$84.2M", change: "Supply Chain Wide", isPositive: true },
        { label: "Direct Savings", value: "$4.8M", change: "5.7% Spend Reduction", isPositive: true },
        { label: "Avg Delivery Lead Time", value: "3.4 Days", change: "-1.2 Days improvement", isPositive: true },
        { label: "Catalog Compliance", value: "94.2%", change: "On-contract purchasing", isPositive: true }
      ]}
      chartData={[
        { name: 'Steel', value: 34000 },
        { name: 'Concrete', value: 22000 },
        { name: 'MEP & HVAC', value: 16000 },
        { name: 'Finishing', value: 8200 },
        { name: 'Services', value: 4000 },
      ]}
      chartTitle="Spend by Major Category ($ in Thousands)"
      items={[
        { id: '1', title: 'Spend Consolidation Arbitrage Opportunity #18', subtitle: 'Combining steel rebars PRs across Phase 10 & 11 sites yields 4.2% bulk discount', status: 'INSIGHT', statusColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', date: 'AI Spend Analyzer', metric: '+$140K Saving' },
        { id: '2', title: 'Supplier Concentration Risk Alert - Cement', subtitle: '82% of cement spend is concentrated with single vendor in Western region', status: 'RISK ALERT', statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20', date: 'Diversification Req', metric: 'Moderate Risk' },
        { id: '3', title: 'Lead Time Bottleneck Analysis - MEP Valves', subtitle: 'Import lead times from German suppliers up 14 days due to Red Sea transit delays', status: 'SUPPLY DELAY', statusColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20', date: 'Logistics Monitor', metric: '+14 Days' },
        { id: '4', title: 'Contract Inflation Benchmark Verification', subtitle: 'Our renegotiated HVAC AMC rates are 3.5% below market index average', status: 'BENCHMARK', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Market Index', metric: '-3.5% vs Index' }
      ]}
      itemSectionTitle="Strategic Procurement Intelligence"
      actionLabel="Export Spend Cube"
    />
  );
}
