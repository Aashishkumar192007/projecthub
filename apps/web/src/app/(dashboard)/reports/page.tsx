import React from 'react';
import { ModuleCommandCenter } from '@/components/ui/ModuleCommandCenter';

export default function ReportsPage() {
  return (
    <ModuleCommandCenter
      title="Institutional Report Vault"
      subtitle="Automated GAAP financials, rent rolls, ESG compliance audits, and investor statements"
      badge="ANALYTICS ENGINE"
      stats={[
        { label: "Generated Reports", value: "3,410", change: "Encrypted PDF/XLSX", isPositive: true },
        { label: "Scheduled Runs", value: "48", change: "Nightly & Monthly", isPositive: true },
        { label: "Audit Compliance", value: "100%", change: "Big 4 Certified Format", isPositive: true },
        { label: "Data Accuracy", value: "99.99%", change: "Direct DB Ledger Sync", isPositive: true }
      ]}
      items={[
        { id: '1', title: 'Consolidated Monthly Rent Roll - Portfolio Wide', subtitle: 'Detailed unit-level tenancy, security deposit balances, and lease terms', status: 'READY', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Generated 06:00 AM', metric: 'PDF • 4.2 MB' },
        { id: '2', title: 'Quarterly ESG Sustainability & Carbon Report', subtitle: 'Scope 1 & 2 emissions, solar energy offset, and water recycling metrics', status: 'READY', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Q2 Finalized', metric: 'XLSX • 1.8 MB' },
        { id: '3', title: 'Phase 11 Construction WIP & BOQ Variance Report', subtitle: 'Planned vs Actual procurement cost breakdown for construction projects', status: 'READY', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Yesterday', metric: 'PDF • 8.4 MB' },
        { id: '4', title: 'REIT Annual Tax & Statutory Compliance Ledger', subtitle: 'Form 1099 equivalents and depreciation schedules for asset holders', status: 'ARCHIVED', statusColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', date: 'FY 2025-26', metric: 'ZIP • 24.1 MB' }
      ]}
      itemSectionTitle="Available Institutional Reports"
      actionLabel="Generate Custom Report"
    />
  );
}
