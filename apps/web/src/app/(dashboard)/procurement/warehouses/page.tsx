import React from 'react';
import { ModuleCommandCenter } from '@/components/ui/ModuleCommandCenter';

export default function ProcurementWarehousesPage() {
  return (
    <ModuleCommandCenter
      title="Regional Warehouses & Dispatch Network"
      subtitle="Multi-site storage capacity, gate pass automation, fleet dispatches, and inter-yard transfers"
      badge="LOGISTICS CLOUD"
      stats={[
        { label: "Active Warehouses", value: "6 Site Yards", change: "Pan-India Network", isPositive: true },
        { label: "Total Storage Area", value: "480K sqft", change: "88% Utilization", isPositive: true },
        { label: "Gate Passes Today", value: "142", change: "QR Verified", isPositive: true },
        { label: "In-Transit Transfers", value: "18 Trucks", change: "GPS Live Tracked", isPositive: true }
      ]}
      items={[
        { id: '1', title: 'Central Yard - Bhiwandi Logistics Hub', subtitle: 'Capacity: 150,000 sqft • Primary Heavy Equipment & Structural Steel Depot', status: 'OPERATIONAL', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Gate Open 24/7', metric: '94% Full' },
        { id: '2', title: 'South Depot - Hoskote Bangalore Yard', subtitle: 'Capacity: 120,000 sqft • Interior Finishing & MEP Fittings Vault', status: 'OPERATIONAL', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: 'Gate Open', metric: '82% Full' },
        { id: '3', title: 'NCR Site Depot - Gurugram Sector 62', subtitle: 'Capacity: 80,000 sqft • Phase 11 Dedicated Project Store', status: 'HIGH CONGESTION', statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20', date: 'Gate Open', metric: '98% Full' },
        { id: '4', title: 'Inter-Yard Fleet Transfer TRK-MH-04-8821', subtitle: 'Transferring 40 MT Structural Steel from Bhiwandi to Gurugram Yard', status: 'IN TRANSIT', statusColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', date: 'ETA 18 Hrs', metric: 'GPS Synced' }
      ]}
      itemSectionTitle="Logistics Network & Transfers"
      actionLabel="Issue Gate Pass"
    />
  );
}
