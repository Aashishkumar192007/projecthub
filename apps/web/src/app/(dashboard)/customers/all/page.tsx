'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useCustomerStore, computeFilteredCustomers } from '@/store/customerStore';
import { CustomerNavigator } from '@/components/customers/CustomerNavigator';
import { CustomerKPIs } from '@/components/customers/CustomerKPIs';
import { CustomerFilters } from '@/components/customers/CustomerFilters';
import { CustomerTable } from '@/components/customers/CustomerTable';
import { CustomerAICopilot } from '@/components/customers/CustomerAICopilot';
import {
  Search, Filter, Download, UserPlus, RefreshCw,
  SlidersHorizontal, LayoutGrid, List, X
} from 'lucide-react';

export default function CustomerCommandCenter() {
  const customers      = useCustomerStore(s => s.customers);
  const searchQuery    = useCustomerStore(s => s.searchQuery);
  const setSearchQuery = useCustomerStore(s => s.setSearchQuery);
  const resetFilters   = useCustomerStore(s => s.resetFilters);
  const filters        = useCustomerStore(s => s.filters);
  const activeCategory = useCustomerStore(s => s.activeCategory);
  const sortField      = useCustomerStore(s => s.sortField);
  const sortDirection  = useCustomerStore(s => s.sortDirection);

  // Derive count stably – no new array created in selector
  const filteredCount = useMemo(
    () => computeFilteredCustomers(customers, activeCategory, searchQuery, filters, sortField, sortDirection).length,
    [customers, activeCategory, searchQuery, filters, sortField, sortDirection]
  );

  const [showFilters, setShowFilters] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const hasActiveFilters = filters.type !== 'All' || filters.status !== 'All' ||
    filters.paymentRisk !== 'All' || filters.assignedExecutive !== '' ||
    filters.dateFrom !== '' || filters.dateTo !== '';

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, [setSearchQuery]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, [setSearchQuery]);

  if (!mounted) return null;

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] overflow-hidden flex font-sans">
      {/* Left Panel: Customer Navigator */}
      <CustomerNavigator />

      {/* Center Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#121212]">

        {/* Top Toolbar */}
        <div className="shrink-0 h-14 border-b border-[#2A2A30] bg-[#0E0E10] flex items-center justify-between px-6 gap-4">
          {/* Left: Title + Count */}
          <div className="flex items-center gap-4 min-w-0">
            <div>
              <h1 className="text-sm font-black tracking-wide text-white">Customer Command Center</h1>
              <p className="text-[10px] text-[#71717A] font-bold tracking-widest uppercase">
                {filteredCount.toLocaleString()} customers
              </p>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search */}
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
              <input
                type="text"
                id="customer-search"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-60 bg-[#161616] border border-[#2A2A30] hover:border-[#3A3A40] focus:border-[#93A5CF]/60 focus:outline-none rounded-lg pl-8 pr-8 py-2 text-sm text-white placeholder:text-[#4A4A50] font-bold transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white transition-colors"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Filter Button */}
            <button
              id="customer-filter-toggle"
              onClick={() => setShowFilters(v => !v)}
              aria-label="Toggle advanced filters"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-black border transition-all ${
                showFilters || hasActiveFilters
                  ? 'bg-[#93A5CF]/15 border-[#93A5CF]/30 text-[#93A5CF]'
                  : 'bg-[#161616] border-[#2A2A30] text-[#A1A1AA] hover:border-[#3A3A40] hover:text-white'
              }`}
            >
              <Filter size={13} />
              Filters
              {hasActiveFilters && (
                <span className="w-4 h-4 rounded-full bg-[#93A5CF] text-[#0A0C10] text-[9px] flex items-center justify-center">
                  !
                </span>
              )}
            </button>

            {/* Column Picker */}
            <button
              id="customer-columns-btn"
              aria-label="Column settings"
              className="p-2 rounded-lg text-[#71717A] hover:text-white hover:bg-[#161616] border border-transparent hover:border-[#2A2A30] transition-all"
            >
              <SlidersHorizontal size={14} />
            </button>

            <div className="h-4 w-px bg-[#2A2A30]" />

            {/* Export */}
            <button
              id="customer-export-btn"
              aria-label="Export customers"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-black bg-[#161616] border border-[#2A2A30] text-[#A1A1AA] hover:border-[#3A3A40] hover:text-white transition-all"
            >
              <Download size={13} />
              Export
            </button>

            {/* New Customer */}
            <button
              id="customer-new-btn"
              aria-label="Add new customer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black bg-[#93A5CF] text-[#0A0C10] hover:bg-[#A5B4FC] transition-all shadow-[0_0_16px_rgba(147,165,207,0.25)]"
            >
              <UserPlus size={13} />
              New Customer
            </button>
          </div>
        </div>

        {/* KPI Bar */}
        <CustomerKPIs />

        {/* Advanced Filters (collapsible) */}
        <CustomerFilters isOpen={showFilters} onClose={() => setShowFilters(false)} />

        {/* Data Grid */}
        <CustomerTable />
      </div>

      {/* Right Panel: AI Copilot */}
      <CustomerAICopilot />
    </div>
  );
}
