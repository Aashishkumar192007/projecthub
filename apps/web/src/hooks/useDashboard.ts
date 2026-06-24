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
      const token = localStorage.getItem('access_token') || '';
      const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to search');
      return res.json();
    },
    enabled: query.trim().length > 0,
  });
}
