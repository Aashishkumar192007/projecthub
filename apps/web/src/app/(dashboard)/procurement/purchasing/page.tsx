import React from 'react';
import { ModuleCommandCenter } from '@/components/ui/ModuleCommandCenter';

export default function PurchasingPage() {
  return (
    <ModuleCommandCenter
      title="Purchase Requisitions & PO Command Center"
      subtitle="Automated PR-to-PO conversion, multi-tier executive approval matrix, and dispatch tracking"
      badge="PROCURE TO PAY v3"
      stats={[
        { label: "Open Requisitions", value: "84", change: "$1.4M Pending Approval", isPositive: true },
        { label: "Issued POs (MTD)", value: "210", change: "$8.2M Committed", isPositive: true },
        { label: "Avg Approval Time", value: "4.2 Hrs", change: "-1.5 Hrs vs target", isPositive: true },
        { label: "3-Way Match Rate", value: "98.9%", change: "Automated verification", isPositive: true }
      ]}
      chartData={[
        { name: 'W1', value: 1800 },
        { name: 'W2', value: 2400 },
        { name: 'W3', value: 2100 },
        { name: 'W4', value: 2900 },
      ]}
      chartTitle="Weekly Purchase Order Commitments ($ in Thousands)"
      items={[
        { id: '1', title: 'PO-2026-0842 - 500 MT Reinforcement Steel Bars', subtitle: 'Tata Steel Ltd • Phase 11 Commercial Tower Foundation', status: 'DISPATCHED', statusColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', date: 'ETA Tomorrow', metric: '$420,000' },
        { id: '2', title: 'PR-2026-1104 - Chiller Plant Replacement Units', subtitle: 'Daikin Airconditioning • Horizon Plaza Facility Upgrades', status: 'PENDING CFO', statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20', date: 'Submitted 3h ago', metric: '$185,000' },
        { id: '3', title: 'PO-2026-0810 - Italian Marble Flooring Slabs', subtitle: 'Classic Marble Company • Luxury Villa Phase 4', status: 'DELIVERED', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'GRN Matched', metric: '$94,500' },
        { id: '4', title: 'PR-2026-1098 - Annual Janitorial Consumables Pool', subtitle: 'JohnsonDiversey India • All Commercial Parks', status: 'APPROVED', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'PO Converting', metric: '$32,000' }
      ]}
      itemSectionTitle="Active Requisitions & Orders"
      actionLabel="Create Requisition (PR)"
    />
  );
}
