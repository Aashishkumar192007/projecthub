import React from 'react';
import { ModuleCommandCenter } from '@/components/ui/ModuleCommandCenter';

export default function RevenuePage() {
  return (
    <ModuleCommandCenter
      title="Revenue & Treasury Intelligence"
      subtitle="Real-time rent collections, REIT yield distributions, NOI calculations, and arrears monitoring"
      badge="TREASURY CLOUD"
      stats={[
        { label: "Annualized ARR", value: "$42.8M", change: "+14% YoY", isPositive: true },
        { label: "Net Operating Income", value: "$31.4M", change: "73.3% Margin", isPositive: true },
        { label: "Collection Efficiency", value: "98.4%", change: "-0.2% vs target", isPositive: false },
        { label: "Outstanding Arrears", value: "$340K", change: "In legal recovery", isPositive: false }
      ]}
      chartData={[
        { name: 'Jan', value: 3200 },
        { name: 'Feb', value: 3400 },
        { name: 'Mar', value: 3350 },
        { name: 'Apr', value: 3600 },
        { name: 'May', value: 3800 },
        { name: 'Jun', value: 4100 },
        { name: 'Jul', value: 4280 },
      ]}
      chartTitle="Monthly Gross Rental Receipts ($ in Thousands)"
      items={[
        { id: '1', title: 'Horizon Towers - Commercial Retail Anchor', subtitle: 'Quarterly Lease Dues • Q3 Advance Payment', status: 'SETTLED', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Received Today', metric: '$450,000' },
        { id: '2', title: 'TechPark SEZ - Floor 4 & 5 Tech Inc', subtitle: 'Monthly CAM & Utility Recovery Billing', status: 'SETTLED', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Yesterday', metric: '$128,400' },
        { id: '3', title: 'Metro Logistics Hub - Warehouse Bay A', subtitle: 'Overdue Dues Penalty & Base Rent', status: 'ARREARS', statusColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20', date: '14 Days Overdue', metric: '$84,200' },
        { id: '4', title: 'REIT Dividend Distribution Escrow', subtitle: 'Fractional Shareholder Yield Disbursement Pool', status: 'PROCESSING', statusColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', date: 'Scheduled Jun 30', metric: '$1,250,000' }
      ]}
      itemSectionTitle="Recent Treasury Transactions"
      actionLabel="Record Manual Receipt"
    />
  );
}
