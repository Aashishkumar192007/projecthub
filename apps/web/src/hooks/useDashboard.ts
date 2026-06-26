import { useQuery } from '@tanstack/react-query';

const API_BASE = 'http://localhost:3001/api/v1'; // Standard API prefix

export function useDashboardKpis() {
  return useQuery({
    queryKey: ['dashboardKpis'],
    queryFn: async () => {
      // Mock data for rich presentation
      return {
        portfolioValue: { value: '$1.42B', trend: '+12.5%' },
        expectedCollection: { value: '$8.5M', trend: '+4.2%' },
        averageCapRate: { value: '6.8%', progress: 68 },
        occupancy: '94%',
        vacantUnits: 142,
        activeLeases: 2150,
      };
    },
  });
}

export function useDashboardCharts() {
  return useQuery({
    queryKey: ['dashboardCharts'],
    queryFn: async () => {
      return {
        revenueData: [
          { month: 'Jan', revenue: 7200 },
          { month: 'Feb', revenue: 7500 },
          { month: 'Mar', revenue: 7800 },
          { month: 'Apr', revenue: 8100 },
          { month: 'May', revenue: 8500 },
          { month: 'Jun', revenue: 8900 },
        ],
        leaseData: {
          renewed: { label: 'Renewed', percentage: 68 },
          expiring: { label: 'Expiring 90d', percentage: 12 },
        }
      };
    },
  });
}

export function useDashboardPortfolio() {
  return useQuery({
    queryKey: ['dashboardPortfolio'],
    queryFn: async () => {
      return [
        { id: '1', name: 'Manhattan Campus', type: 'Commercial', value: '$450M', yield: '5.2%', status: 'green' },
        { id: '2', name: 'Marina Heights', type: 'Residential', value: '$280M', yield: '6.1%', status: 'green' },
        { id: '3', name: 'Silicon Park', type: 'Mixed Use', value: '$320M', yield: '7.4%', status: 'warning' },
        { id: '4', name: 'London Station', type: 'Commercial', value: '$370M', yield: '4.8%', status: 'green' },
      ];
    },
  });
}

export function useDashboardTopAssets() {
  return useQuery({
    queryKey: ['dashboardTopAssets'],
    queryFn: async () => {
      return [
        { id: '3', name: 'Silicon Park', yield: '7.4%' },
        { id: '2', name: 'Marina Heights', yield: '6.1%' },
        { id: '1', name: 'Manhattan Campus', yield: '5.2%' },
      ];
    },
  });
}

export function useGlobalSearch(query: string) {
  return useQuery({
    queryKey: ['globalSearch', query],
    queryFn: async () => {
      if (!query || query.trim() === '') return { results: [], total: 0 };
      
      const q = query.toLowerCase().trim();
      
      // Comprehensive mock ERP records for client-side search
      const allRecords = [
        { id: 'prop-1', title: 'Manhattan Campus', subtitle: 'Commercial Tower • 450M Valuation • 98% Occupancy', type: 'Property', url: '/properties' },
        { id: 'prop-2', title: 'Marina Heights', subtitle: 'Residential Complex • 280M Valuation • 92% Occupancy', type: 'Property', url: '/properties' },
        { id: 'prop-3', title: 'Silicon Park Tech Hub', subtitle: 'Mixed Use Campus • Palo Alto, CA', type: 'Property', url: '/properties' },
        { id: 'prop-4', title: 'London Station Plaza', subtitle: 'Commercial Retail Hub • London, UK', type: 'Property', url: '/properties' },
        { id: 'lease-1', title: 'L-2024-892: Apex Global Corp', subtitle: 'Active Lease • $45,000/mo • Expiring Nov 2026', type: 'Lease', url: '/leases' },
        { id: 'lease-2', title: 'L-2023-104: Quantum Logistics', subtitle: 'Active Lease • $120,000/mo • Manhattan Tower', type: 'Lease', url: '/leases' },
        { id: 'lease-3', title: 'L-2025-011: Horizon Retailers', subtitle: 'Pending Renewal • $28,500/mo', type: 'Lease', url: '/leases' },
        { id: 'tenant-1', title: 'Apex Global Corp', subtitle: 'Enterprise Tenant • Tier 1 Verified • 3 Units Occupied', type: 'Tenant', url: '/tenants/t-1' },
        { id: 'tenant-2', title: 'Quantum Logistics LLC', subtitle: 'Commercial Tenant • Good Standing', type: 'Tenant', url: '/tenants/t-1' },
        { id: 'tenant-3', title: 'Starlight Financial Services', subtitle: 'Corporate Banking • Marina Heights Unit 402', type: 'Tenant', url: '/tenants/t-1' },
        { id: 'wo-1', title: 'WO-8912: HVAC Chillers Inspection', subtitle: 'In Progress • Manhattan Tower Roof Central', type: 'Work Order', url: '/facilities' },
        { id: 'wo-2', title: 'WO-9041: Elevator Bank B Maintenance', subtitle: 'Scheduled • High Priority Safety Check', type: 'Work Order', url: '/maintenance' },
        { id: 'vendor-1', title: 'Otis Elevator Services', subtitle: 'Preferred Vendor • Annual CAPEX Contract Active', type: 'Vendor', url: '/procurement/vendors' },
        { id: 'vendor-2', title: 'Johnson Controls HVAC', subtitle: 'Verified Supplier • Facilities Master Agreement', type: 'Vendor', url: '/procurement/vendors' },
        { id: 'doc-1', title: 'Master Institutional Rent Roll Q2', subtitle: 'PDF Document • Verified Audit Report', type: 'Property', url: '/reports' },
        { id: 'agr-1', title: 'Commercial Escalation Agreement 2026', subtitle: 'E-Sign Completed • Legal Vault Verified', type: 'Lease', url: '/agreements' },
      ];

      try {
        const token = localStorage.getItem('access_token') || '';
        const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const apiData = await res.json();
          if (apiData.results && apiData.results.length > 0) return apiData;
        }
      } catch (e) {
        // Fallback silently to client search
      }

      const results = allRecords.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.subtitle.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q)
      );

      return { results, total: results.length };
    },
    enabled: query.trim().length > 0,
  });
}
