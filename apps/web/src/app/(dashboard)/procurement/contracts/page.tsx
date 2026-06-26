import React from 'react';
import { ModuleCommandCenter } from '@/components/ui/ModuleCommandCenter';

export default function ProcurementContractsPage() {
  return (
    <ModuleCommandCenter
      title="Supplier Contracts & Agreement Vault"
      subtitle="Master vendor agreements, rate contracts, SLA penalty clauses, and compliance signatures"
      badge="CONTRACT CLOUD"
      stats={[
        { label: "Active Agreements", value: "128", change: "Digitally Signed", isPositive: true },
        { label: "Rate Contracts", value: "84", change: "Fixed price lock", isPositive: true },
        { label: "Expiring in 60 Days", value: "12", change: "Auto renewal alert", isPositive: true },
        { label: "SLA Penalties Enforced", value: "$42K", change: "Deducted from invoices", isPositive: true }
      ]}
      items={[
        { id: '1', title: 'CNT-2025-882 - Master Rate Contract for Structural Steel', subtitle: 'Tata Steel Ltd • Fixed pricing locked at $840/MT until Dec 2027', status: 'ACTIVE', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Expires 2027', metric: '$12.5M Cap' },
        { id: '2', title: 'CNT-2025-901 - Elevator AMC & Emergency Rescue SLA', subtitle: 'KONE Elevator India • 15-minute response time SLA across 18 towers', status: 'ACTIVE', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Expires 2028', metric: '$450K ARR' },
        { id: '3', title: 'CNT-2026-014 - Chiller Plant Preventive AMC', subtitle: 'Johnson Controls India • Quarterly servicing & parts replacement warranty', status: 'RENEWAL DUE', statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20', date: 'Expires in 30 Days', metric: '$180K ARR' },
        { id: '4', title: 'CNT-2026-102 - External Façade Cleaning Contract', subtitle: 'Apex Facilities • Bi-annual rope access cleaning across all glass towers', status: 'ACTIVE', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Expires 2029', metric: '$95K ARR' }
      ]}
      itemSectionTitle="Executed Vendor Agreements"
      actionLabel="Draft Supplier Contract"
    />
  );
}
