import React from 'react';
import { ModuleCommandCenter } from '@/components/ui/ModuleCommandCenter';

export default function AnalyticsPage() {
  return (
    <ModuleCommandCenter
      title="Portfolio Yield & Predictive Analytics"
      subtitle="AI-driven cap rate forecasting, tenant churn probability, valuation modeling, and market benchmarks"
      badge="GEMINI AI ANALYTICS"
      stats={[
        { label: "Portfolio IRR", value: "18.4%", change: "+2.1% vs benchmark", isPositive: true },
        { label: "Average Cap Rate", value: "7.8%", change: "Institutional Tier 1", isPositive: true },
        { label: "AI Valuation", value: "$542.5M", change: "+$18M Appreciation", isPositive: true },
        { label: "Tenant Churn Risk", value: "3.2%", change: "Extremely Low", isPositive: true }
      ]}
      chartData={[
        { name: '2021', value: 340 },
        { name: '2022', value: 390 },
        { name: '2023', value: 440 },
        { name: '2024', value: 495 },
        { name: '2025', value: 542 },
        { name: '2026 (Est)', value: 610 },
      ]}
      chartTitle="Total Asset Valuation Trajectory ($ in Millions)"
      items={[
        { id: '1', title: 'AI Rent Optimization Recommendation #84', subtitle: 'Commercial Tower B • Suggesting 6.5% base rent upward revision on lease renewals', status: 'AI INSIGHT', statusColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', date: 'High Confidence (94%)', metric: '+$240K ARR' },
        { id: '2', title: 'Energy Consumption Arbitrage - Solar Battery', subtitle: 'Peak load shaving analysis predicts 18% reduction in grid utility billing', status: 'OPTIMIZATION', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Simulated Action', metric: '$82K Saving' },
        { id: '3', title: 'Retail Anchor Footfall Heatmap Correlation', subtitle: 'Weekend footfall up 22% following ground floor atrium renovation', status: 'BENCHMARK', statusColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', date: 'Computer Vision AI', metric: "+22% Traffic" },
        { id: '4', title: 'Macro Interest Rate Sensitivity Stress Test', subtitle: 'Portfolio debt service coverage ratio (DSCR) remains robust at +200bps hike', status: 'STRESS TEST', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'DSCR 2.4x', metric: "Safe Tier" }
      ]}
      itemSectionTitle="AI Predictive Insights & Models"
      actionLabel="Run Monte Carlo Simulation"
    />
  );
}
