import React from 'react';
import { ModuleCommandCenter } from '@/components/ui/ModuleCommandCenter';

export default function SettingsPage() {
  return (
    <ModuleCommandCenter
      title="Global Platform Settings"
      subtitle="Tenant configurations, API webhooks, regional data residency, and audit logging"
      badge="SYSTEM CONTROL"
      stats={[
        { label: "Data Residency", value: "ap-south-1", change: "AWS Mumbai", isPositive: true },
        { label: "Active Webhooks", value: "24", change: "99.9% Delivery", isPositive: true },
        { label: "API Latency", value: "42ms", change: "-8ms vs avg", isPositive: true },
        { label: "Storage Used", value: "842 GB", change: "45% of Quota", isPositive: true }
      ]}
      items={[
        { id: '1', title: 'Multi-Tenant Isolation Protocol', subtitle: 'Strict Row Level Security (RLS) enforcement on Prisma models', status: 'ENFORCED', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'System Core', metric: 'Level 5' },
        { id: '2', title: 'Automated Nightly Backups', subtitle: 'Point-in-time recovery enabled with 30-day retention vault', status: 'ACTIVE', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: '03:00 UTC Daily', metric: 'Encrypted' },
        { id: '3', title: 'NestJS CORS & Rate Limiting', subtitle: 'Global throttle limit set to 100 requests per minute per IP', status: 'ACTIVE', statusColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', date: 'API Gateway', metric: '100 req/m' },
        { id: '4', title: 'ERP Webhook Sync - SAP Integration', subtitle: 'Bi-directional financial ledger replication endpoint', status: 'HEALTHY', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Last sync 4m ago', metric: 'v2.4' }
      ]}
      itemSectionTitle="Active Configuration Rules"
      actionLabel="Add Webhook Endpoint"
    />
  );
}
