import React from 'react';
import { ModuleCommandCenter } from '@/components/ui/ModuleCommandCenter';

export default function ProcurementVendorsPage() {
  return (
    <ModuleCommandCenter
      title="Vendor Master & SLA Performance Directory"
      subtitle="Institutional supplier onboarding, KYC verification, GST compliance, and 3-way matching ratings"
      badge="SUPPLY CHAIN CLOUD"
      stats={[
        { label: "Approved Vendors", value: "342", change: "100% KYC Verified", isPositive: true },
        { label: "Active Contracts", value: "128", change: "Master Agreements", isPositive: true },
        { label: "Avg SLA Score", value: "96.4%", change: "On-time Delivery", isPositive: true },
        { label: "Blacklisted Suppliers", value: "3", change: "Quality failures", isPositive: true }
      ]}
      items={[
        { id: '1', title: 'UltraTech Cement India Ltd - National Supply Partner', subtitle: 'Grade 53 Portland Cement • GSTIN: 27AAACU1234F1Z1', status: 'PREFERRED', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Contract Active', metric: 'SLA 99.2%' },
        { id: '2', title: 'Schneider Electric Infrastructure India', subtitle: 'Switchgears, Transformers & Building Management Automation', status: 'PREFERRED', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Contract Active', metric: 'SLA 98.5%' },
        { id: '3', title: 'KONE Elevator India Pvt Ltd', subtitle: 'High-speed Commercial Elevators & Annual Maintenance Contract', status: 'ACTIVE', statusColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', date: 'Contract Active', metric: 'SLA 95.8%' },
        { id: '4', title: 'Apex Scaffolding & Formworks Rentals', subtitle: 'Phase 11 Construction Temporary Site Support Vendor', status: 'UNDER REVIEW', statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20', date: 'Audit Pending', metric: 'SLA 84.1%' }
      ]}
      itemSectionTitle="Onboarded Institutional Suppliers"
      actionLabel="Onboard New Vendor"
    />
  );
}
