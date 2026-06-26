import React from 'react';
import { ModuleCommandCenter } from '@/components/ui/ModuleCommandCenter';

export default function ProcurementInventoryPage() {
  return (
    <ModuleCommandCenter
      title="Material Inventory & Valuation Monitor"
      subtitle="Real-time SKU stock levels, FIFO/LIFO valuations, minimum reorder thresholds, and shrinkage audits"
      badge="INVENTORY CLOUD"
      stats={[
        { label: "Total SKUs Managed", value: "4,820", change: "Active Catalog", isPositive: true },
        { label: "Inventory Valuation", value: "$18.4M", change: "Rolling FIFO", isPositive: true },
        { label: "Below Reorder Level", value: "24", change: "Automated PR queued", isPositive: false },
        { label: "Stock Turn Rate", value: "8.2x", change: "High Efficiency", isPositive: true }
      ]}
      items={[
        { id: '1', title: 'SKU-ST-12MM - Fe500D TMT Steel Rebars', subtitle: 'Central Construction Yard Bay 4 • Min Reorder: 100 MT', status: 'OPTIMAL', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Last Audited Today', metric: '450 MT Available' },
        { id: '2', title: 'SKU-EL-CHILLER - HVAC R410A Refrigerant Cylinders', subtitle: 'Facility Maintenance Store • Min Reorder: 15 Cylinders', status: 'LOW STOCK', statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20', date: 'Reorder Queued', metric: '12 Cylinders' },
        { id: '3', title: 'SKU-PL-PPR - 50mm PN16 PPR Plumbing Pipes', subtitle: 'Warehouse Bay B • Min Reorder: 500 Meters', status: 'OPTIMAL', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Last Audited 2d ago', metric: '3,400 Meters' },
        { id: '4', title: 'SKU-SF-HELMET - Industrial Safety Helmets Grade 1', subtitle: 'Site Safety Depot • Min Reorder: 50 Units', status: 'CRITICAL', statusColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20', date: 'Urgent PR Created', metric: '18 Units' }
      ]}
      itemSectionTitle="Monitored Material SKUs"
      actionLabel="Perform Stock Take"
    />
  );
}
