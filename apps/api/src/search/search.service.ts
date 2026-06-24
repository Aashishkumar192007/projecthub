import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  
  globalSearch(query: string) {
    if (!query || query.trim() === '') {
      return { results: [], total: 0 };
    }

    const q = query.toLowerCase();
    const results: any[] = [];

    // Mock search logic across categories
    
    // Properties
    if ('skyline plaza'.includes(q) || 'commercial'.includes(q)) {
      results.push({ id: 'p1', type: 'Property', title: 'Skyline Plaza', subtitle: 'Commercial • NY', url: '/portfolio/skyline-plaza' });
    }
    if ('marina heights'.includes(q) || 'residential'.includes(q)) {
      results.push({ id: 'p2', type: 'Property', title: 'Marina Heights', subtitle: 'Multi-Family • FL', url: '/portfolio/marina-heights' });
    }

    // Leases
    if ('apex'.includes(q) || 'industrial'.includes(q) || 'lease'.includes(q)) {
      results.push({ id: 'l1', type: 'Lease', title: 'Apex Industrial - Unit 402', subtitle: 'Expiring in 90 days', url: '/leases/apex-402' });
    }

    // Work Orders
    if ('hvac'.includes(q) || 'maintenance'.includes(q)) {
      results.push({ id: 'w1', type: 'Work Order', title: 'WO-8829: HVAC Repair', subtitle: 'Assigned to: Metro Services', url: '/facilities/wo/8829' });
    }

    // Vendors
    if ('metro'.includes(q) || 'vendor'.includes(q)) {
      results.push({ id: 'v1', type: 'Vendor', title: 'Metro Services Inc.', subtitle: 'Category: Maintenance', url: '/procurement/vendors/metro' });
    }

    // Customers/Tenants
    if ('john'.includes(q) || 'smith'.includes(q)) {
      results.push({ id: 'c1', type: 'Tenant', title: 'John Smith', subtitle: 'Unit 4B • Skyline Plaza', url: '/tenants/john-smith' });
    }

    return {
      results,
      total: results.length,
    };
  }
}
