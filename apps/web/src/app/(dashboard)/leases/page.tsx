import React from 'react';
import { ModuleCommandCenter } from '@/components/ui/ModuleCommandCenter';

export default function LeasesPage() {
  return (
    <ModuleCommandCenter
      title="Lease Lifecycle Command Center"
      subtitle="Automated expiration monitoring, escalation schedules, lock-in tracking, and renewal workflows"
      badge="LEASE CLOUD"
      stats={[
        { label: "Active Leases", value: "842", change: "96.2% Occupancy", isPositive: true },
        { label: "Expiring in 90 Days", value: "34", change: "Renewal pipeline active", isPositive: true },
        { label: "Avg Lease Lock-In", value: "4.2 Yrs", change: "Institutional WALT", isPositive: true },
        { label: "Escalation Due", value: "18", change: "+5% avg increase", isPositive: true }
      ]}
      items={[
        { id: '1', title: 'Global Apex Bank Ltd - HQ Anchor Lease', subtitle: 'Lock-in Period Expires Dec 2028 • Automatic 8% Escalation every 3 years', status: 'ACTIVE', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Expires 2031', metric: '142,000 sqft' },
        { id: '2', title: 'Starbucks Retail Outlet - Ground Plaza', subtitle: 'Revenue Share (12%) + Base Rent Minimum Guarantee', status: 'RENEWAL DUE', statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20', date: 'Expires in 45 Days', metric: '2,400 sqft' },
        { id: '3', title: 'WeWork Coworking Floors 12-15', subtitle: 'Master Tenancy Agreement • Corporate Guarantee Provided', status: 'ACTIVE', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Expires 2029', metric: '64,000 sqft' },
        { id: '4', title: 'CloudNine Data Center - Basement Vault', subtitle: 'Special Power SLA Tenancy • Tri-party agreement', status: 'ACTIVE', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Expires 2035', metric: '18,000 sqft' }
      ]}
      itemSectionTitle="Master Tenancy Agreements"
      actionLabel="Draft New Lease"
    />
  );
}
