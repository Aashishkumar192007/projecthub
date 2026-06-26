import React from 'react';
import { ModuleCommandCenter } from '@/components/ui/ModuleCommandCenter';

export default function UsersPage() {
  return (
    <ModuleCommandCenter
      title="IAM & Enterprise Access Control"
      subtitle="Institutional identity governance, multi-factor authentication policies, and role permissions"
      badge="IAM CLOUD v2"
      stats={[
        { label: "Active Identities", value: "1,420", change: "+12 this week", isPositive: true },
        { label: "Privileged Admins", value: "18", change: "100% MFA Active", isPositive: true },
        { label: "Active Roles", value: "34", change: "RBAC Enforced", isPositive: true },
        { label: "Security Health", value: "99.8%", change: "Zero breaches", isPositive: true }
      ]}
      chartData={[
        { name: 'Mon', value: 1200 },
        { name: 'Tue', value: 1320 },
        { name: 'Wed', value: 1250 },
        { name: 'Thu', value: 1410 },
        { name: 'Fri', value: 1420 },
        { name: 'Sat', value: 890 },
        { name: 'Sun', value: 950 },
      ]}
      chartTitle="Active Login Sessions & API Tokens"
      items={[
        { id: '1', title: 'Aashish Kumar', subtitle: 'Chief Technology Officer • Engineering', status: 'ACTIVE ADMIN', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Online now', metric: 'Superuser' },
        { id: '2', title: 'Rajesh Sharma', subtitle: 'Head of Procurement • Supply Chain', status: 'ACTIVE', statusColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', date: '2h ago', metric: 'Level 4 Approval' },
        { id: '3', title: 'Priya Patel', subtitle: 'VP Capital Markets • REIT Operations', status: 'ACTIVE', statusColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', date: '5h ago', metric: 'Treasury Access' },
        { id: '4', title: 'Site Supervisor Contractor #42', subtitle: 'External Vendor Agent • Phase 11 Site', status: 'PENDING MFA', statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20', date: '1d ago', metric: 'Restricted View' }
      ]}
      itemSectionTitle="System Identities & Roles"
      actionLabel="Provision User Account"
    />
  );
}
