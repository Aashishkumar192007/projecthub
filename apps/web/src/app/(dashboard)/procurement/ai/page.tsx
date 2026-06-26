import React from 'react';
import { ModuleCommandCenter } from '@/components/ui/ModuleCommandCenter';

export default function ProcurementAiPage() {
  return (
    <ModuleCommandCenter
      title="AI Procurement Copilot & Price Prediction Engine"
      subtitle="Autonomous purchase requisition validation, commodity price forecasting, anomaly detection, and fraud prevention"
      badge="GEMINI 3.1 PRO ENGINE"
      stats={[
        { label: "AI Validated PRs", value: "3,420", change: "99.9% Accuracy", isPositive: true },
        { label: "Fraud Attempt Blocks", value: "14", change: "$320K Protected", isPositive: true },
        { label: "Price Forecast Accuracy", value: "96.8%", change: "30-day commodity window", isPositive: true },
        { label: "Autonomous POs", value: "1,104", change: "Low-value catalog auto-po", isPositive: true }
      ]}
      chartData={[
        { name: 'Day 1', value: 840 },
        { name: 'Day 5', value: 835 },
        { name: 'Day 10', value: 820 },
        { name: 'Day 15', value: 805 },
        { name: 'Day 20', value: 790 },
        { name: 'Day 25', value: 810 },
        { name: 'Day 30 (Pred)', value: 780 },
      ]}
      chartTitle="AI Steel Rebar Commodity Price Prediction ($/MT Rolling Window)"
      items={[
        { id: '1', title: '🤖 Autonomous Price Prediction Action - HOLD PURCHASE', subtitle: 'AI predicts 4.5% drop in structural steel prices over next 12 days. Advise delaying non-urgent PR-1104', status: 'AI REC: HOLD', statusColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', date: 'Commodity Model v4', metric: 'Save $48,000' },
        { id: '2', title: '🛡️ Anomaly Detection Trigger - Invoice Duplicate Check', subtitle: 'Blocked Invoice INV-99281 from Vendor #42 due to identical bank details and near-exact amount match with INV-88102', status: 'BLOCKED FRAUD', statusColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20', date: 'AI Audit Sentinel', metric: '$14,200' },
        { id: '3', title: '⚡ Autonomous Requisition Approval PR-2026-1199', subtitle: 'Standard plumbing consumables under $2,000 threshold matched with pre-approved rate contract #84', status: 'AUTO APPROVED', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Executed 1m ago', metric: '$1,450.00' },
        { id: '4', title: '🔍 Vendor KYC Risk Radar - Financial Distress Signal', subtitle: 'External intelligence feed indicates credit downgrade for Vendor #18. Suggesting security deposit review', status: 'RISK RADAR', statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20', date: 'Live Feed Synced', metric: 'Review Required' }
      ]}
      itemSectionTitle="Autonomous AI Decisions & Sentinel Logs"
      actionLabel="Ask Procurement AI"
    />
  );
}
