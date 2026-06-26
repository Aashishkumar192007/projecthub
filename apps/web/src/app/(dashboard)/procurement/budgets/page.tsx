import React from 'react';
import { ModuleCommandCenter } from '@/components/ui/ModuleCommandCenter';

export default function ProcurementBudgetsPage() {
  return (
    <ModuleCommandCenter
      title="Procurement Budget & Cost Variance Ledger"
      subtitle="Project capital allocation, milestone drawdown limits, cost overrun alerts, and savings tracking"
      badge="CAPEX CONTROL"
      stats={[
        { label: "Total CAPEX Budget", value: "$120.0M", change: "FY 2026 Allocation", isPositive: true },
        { label: "Committed Spend", value: "$84.2M", change: "70.1% Utilized", isPositive: true },
        { label: "Realized Savings", value: "$4.8M", change: "Negotiation gains", isPositive: true },
        { label: "Budget Overruns", value: "$0.00", change: "Zero breaches", isPositive: true }
      ]}
      chartData={[
        { name: 'Q1', value: 28000 },
        { name: 'Q2', value: 32000 },
        { name: 'Q3', value: 35000 },
        { name: 'Q4 (Est)', value: 25000 },
      ]}
      chartTitle="Quarterly CAPEX Drawdown Trajectory ($ in Thousands)"
      items={[
        { id: '1', title: 'Phase 11 Construction - Substructure & Foundation Pool', subtitle: 'Allocated: $45.0M • Committed: $38.2M • Remaining: $6.8M', status: 'ON TRACK', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Milestone 4', metric: '84.8% Used' },
        { id: '2', title: 'Portfolio Facility Maintenance & MEP Upgrades Pool', subtitle: 'Allocated: $18.0M • Committed: $12.4M • Remaining: $5.6M', status: 'ON TRACK', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Annual Pool', metric: '68.8% Used' },
        { id: '3', title: 'IT Infrastructure & Cloud ERP Licensing Pool', subtitle: 'Allocated: $4.5M • Committed: $4.4M • Remaining: $100K', status: 'NEAR THRESHOLD', statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20', date: 'Annual Pool', metric: '97.7% Used' },
        { id: '4', title: 'Emergency Repair & Unplanned Contingency Reserve', subtitle: 'Allocated: $5.0M • Committed: $800K • Remaining: $4.2M', status: 'HEALTHY', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Contingency', metric: '16.0% Used' }
      ]}
      itemSectionTitle="Capital Allocation Pools"
      actionLabel="Allocate Budget Pool"
    />
  );
}
