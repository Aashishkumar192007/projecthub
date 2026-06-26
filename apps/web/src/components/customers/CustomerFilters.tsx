'use client';

import React, { useState } from 'react';
import { useCustomerStore, CustomerType, CustomerStatus } from '@/store/customerStore';
import { Filter, X, ChevronDown } from 'lucide-react';

const EXECUTIVES = ['Priya Kapoor', 'Rahul Nair', 'Ankit Sharma', 'Sunita Rao', 'Vikash Mehta'];
const TYPES: (CustomerType | 'All')[] = ['All', 'Owner', 'Resident', 'Corporate', 'Investor', 'Buyer', 'Tenant'];
const STATUSES: (CustomerStatus | 'All')[] = ['All', 'Active', 'Inactive', 'High Risk', 'VIP', 'Archived'];
const PAYMENT_RISKS = ['All', 'Low', 'Medium', 'High'];

interface SelectFieldProps {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}

function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold tracking-widest uppercase text-[#71717A]">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-[#121212] border border-[#2A2A30] hover:border-[#93A5CF]/40 focus:border-[#93A5CF]/60 focus:outline-none rounded-lg px-3 py-2 text-sm text-[#F4F4F5] pr-8 cursor-pointer transition-colors"
        >
          {options.map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" />
      </div>
    </div>
  );
}

export function CustomerFilters({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const filters = useCustomerStore(s => s.filters);
  const setFilter = useCustomerStore(s => s.setFilter);
  const resetFilters = useCustomerStore(s => s.resetFilters);

  if (!isOpen) return null;

  return (
    <div className="shrink-0 border-b border-[#2A2A30]/50 bg-[#0E0E10] px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-[#93A5CF]" />
          <span className="text-sm font-bold text-white">Advanced Filters</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={resetFilters}
            className="text-xs text-[#A1A1AA] hover:text-white transition-colors font-bold"
          >
            Reset All
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#71717A] hover:text-white hover:bg-[#2A2A30] transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <SelectField
          label="Customer Type"
          value={filters.type}
          options={TYPES}
          onChange={v => setFilter('type', v as CustomerType | 'All')}
        />
        <SelectField
          label="Status"
          value={filters.status}
          options={STATUSES}
          onChange={v => setFilter('status', v as CustomerStatus | 'All')}
        />
        <SelectField
          label="Payment Risk"
          value={filters.paymentRisk}
          options={PAYMENT_RISKS}
          onChange={v => setFilter('paymentRisk', v as 'Low' | 'Medium' | 'High' | 'All')}
        />
        <SelectField
          label="Executive"
          value={filters.assignedExecutive}
          options={['', ...EXECUTIVES]}
          onChange={v => setFilter('assignedExecutive', v)}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold tracking-widest uppercase text-[#71717A]">Joined From</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={e => setFilter('dateFrom', e.target.value)}
            className="bg-[#121212] border border-[#2A2A30] hover:border-[#93A5CF]/40 focus:border-[#93A5CF]/60 focus:outline-none rounded-lg px-3 py-2 text-sm text-[#F4F4F5] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold tracking-widest uppercase text-[#71717A]">Joined To</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={e => setFilter('dateTo', e.target.value)}
            className="bg-[#121212] border border-[#2A2A30] hover:border-[#93A5CF]/40 focus:border-[#93A5CF]/60 focus:outline-none rounded-lg px-3 py-2 text-sm text-[#F4F4F5] transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
