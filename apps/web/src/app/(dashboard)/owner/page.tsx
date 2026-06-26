import React from 'react';
import { ModuleCommandCenter } from '@/components/ui/ModuleCommandCenter';

export default function OwnerPage() {
  return (
    <ModuleCommandCenter
      title="Asset Owner & REIT Shareholder Portal"
      subtitle="Fractional ownership ledger, dividend statement vaults, tax certificates, and voting rights"
      badge="OWNER CLOUD"
      stats={[
        { label: "My Fractional Units", value: "25,000", change: "0.45% of Trust Pool", isPositive: true },
        { label: "Annual Dividend Yield", value: "8.6%", change: "Quarterly Payouts", isPositive: true },
        { label: "Total Distributions", value: "$48,500", change: "Direct Bank Deposit", isPositive: true },
        { label: "Portfolio Value", value: "$325,000", change: "+$25K Capital Gain", isPositive: true }
      ]}
      items={[
        { id: '1', title: 'Q1 2026 Dividend Distribution Advice', subtitle: 'Net rental yield disbursement after withholding tax deduction', status: 'PAID', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Deposited Apr 15', metric: '$6,875.00' },
        { id: '2', title: 'Annual Trust Audit Certificate & Valuation Advice', subtitle: 'Independent surveyor asset appraisal report for REIT portfolio', status: 'AVAILABLE', statusColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', date: 'Document Vault', metric: 'Certified PDF' },
        { id: '3', title: 'Shareholder Resolution #14 - Solar Expansion', subtitle: 'Extraordinary General Meeting voting ballot • Solar plant capital allocation', status: 'VOTED YES', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Passed 88% Majority', metric: 'Governance' },
        { id: '4', title: 'Form 1099-DIV Tax Equivalent Statement', subtitle: 'Consolidated income summary for annual tax returns', status: 'READY', statusColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', date: 'FY 2025', metric: 'Tax Vault' }
      ]}
      itemSectionTitle="My Shareholder Statements"
      actionLabel="Download Tax Statement"
    />
  );
}
