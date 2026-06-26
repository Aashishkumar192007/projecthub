'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCustomerStore, Customer, SortField } from '@/store/customerStore';
import {
  ChevronUp, ChevronDown, ChevronsUpDown, MoreHorizontal,
  CheckSquare, Square, ArrowRight, Phone, Mail
} from 'lucide-react';

function formatCurrency(v: number): string {
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)}Cr`;
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
  return `₹${v.toLocaleString('en-IN')}`;
}

function StatusBadge({ status }: { status: Customer['status'] }) {
  const config: Record<string, { dot: string; text: string }> = {
    Active:     { dot: 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]', text: 'text-emerald-400' },
    Inactive:   { dot: 'bg-[#71717A]',                                          text: 'text-[#71717A]' },
    'High Risk':{ dot: 'bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.5)]',    text: 'text-red-400' },
    VIP:        { dot: 'bg-yellow-400 shadow-[0_0_6px_rgba(251,191,36,0.5)]',  text: 'text-yellow-400' },
    Archived:   { dot: 'bg-[#4A4A50]',                                          text: 'text-[#4A4A50]' },
  };
  const c = config[status] ?? config.Active;
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
      <span className={`text-xs font-bold ${c.text}`}>{status}</span>
    </div>
  );
}

function TypeBadge({ type }: { type: Customer['type'] }) {
  const colors: Record<string, string> = {
    Owner: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
    Resident: 'bg-violet-500/15 text-violet-400 border-violet-500/25',
    Corporate: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
    Investor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    Buyer: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
    Tenant: 'bg-pink-500/15 text-pink-400 border-pink-500/25',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-bold ${colors[type] ?? 'bg-[#2A2A30] text-[#A1A1AA] border-[#3A3A40]'}`}>
      {type}
    </span>
  );
}

function HealthBar({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-[#F59E0B]' : 'bg-red-500';
  const glow  = score >= 80 ? 'shadow-[0_0_4px_rgba(16,185,129,0.4)]' : '';
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-[#2A2A30] rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color} ${glow}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-mono font-bold text-[#A1A1AA] w-6 text-right">{score}</span>
    </div>
  );
}

function SortIcon({ field, active, dir }: { field: SortField; active: SortField; dir: 'asc' | 'desc' }) {
  if (field !== active) return <ChevronsUpDown size={12} className="text-[#4A4A50]" />;
  return dir === 'asc'
    ? <ChevronUp size={12} className="text-[#93A5CF]" />
    : <ChevronDown size={12} className="text-[#93A5CF]" />;
}

const COLUMNS: { key: string; label: string; sortable?: SortField; align?: string }[] = [
  { key: 'select', label: '' },
  { key: 'customer', label: 'Customer', sortable: 'name' },
  { key: 'type', label: 'Type' },
  { key: 'properties', label: 'Properties / Units' },
  { key: 'outstanding', label: 'Outstanding', sortable: 'outstandingBalance', align: 'right' },
  { key: 'portfolio', label: 'Portfolio Value', sortable: 'portfolioValue', align: 'right' },
  { key: 'health', label: 'Health', sortable: 'healthScore' },
  { key: 'status', label: 'Status' },
  { key: 'executive', label: 'Executive' },
  { key: 'actions', label: '', align: 'right' },
];

export function CustomerTable() {
  const router = useRouter();
  const customers = useCustomerStore(s => s.getPaginatedCustomers());
  const filteredTotal = useCustomerStore(s => s.getFilteredCustomers().length);
  const selectedIds = useCustomerStore(s => s.selectedIds);
  const toggleSelect = useCustomerStore(s => s.toggleSelectCustomer);
  const selectAll = useCustomerStore(s => s.selectAll);
  const clearSelection = useCustomerStore(s => s.clearSelection);
  const sortField = useCustomerStore(s => s.sortField);
  const sortDirection = useCustomerStore(s => s.sortDirection);
  const setSortField = useCustomerStore(s => s.setSortField);
  const currentPage = useCustomerStore(s => s.currentPage);
  const totalPages = useCustomerStore(s => s.getTotalPages());
  const setCurrentPage = useCustomerStore(s => s.setCurrentPage);
  const pageSize = useCustomerStore(s => s.pageSize);

  const allSelected = customers.length > 0 && customers.every(c => selectedIds.has(c.id));

  const handleRowClick = useCallback((id: string) => {
    router.push(`/customers/${id}`);
  }, [router]);

  const handleSort = useCallback((field: SortField) => {
    setSortField(field);
  }, [setSortField]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Selection bar */}
      {selectedIds.size > 0 && (
        <div className="shrink-0 flex items-center gap-4 px-6 py-2 bg-[#93A5CF]/10 border-b border-[#93A5CF]/20">
          <span className="text-sm font-bold text-[#93A5CF]">{selectedIds.size} selected</span>
          <button onClick={() => clearSelection()} className="text-xs text-[#A1A1AA] hover:text-white font-bold transition-colors">Clear</button>
          <div className="h-4 w-px bg-[#2A2A30]" />
          <button className="text-xs text-[#A1A1AA] hover:text-white font-bold transition-colors">Archive</button>
          <button className="text-xs text-[#A1A1AA] hover:text-white font-bold transition-colors">Export</button>
          <button className="text-xs text-[#A1A1AA] hover:text-white font-bold transition-colors">Assign Executive</button>
          <button className="text-xs text-[#A1A1AA] hover:text-white font-bold transition-colors">Tag</button>
        </div>
      )}

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm text-left min-w-[900px]">
          <thead className="sticky top-0 z-10 bg-[#0E0E10] border-b border-[#2A2A30]">
            <tr>
              {/* Select All */}
              <th className="px-4 py-3 w-10">
                <button
                  onClick={allSelected ? clearSelection : selectAll}
                  aria-label="Select all"
                  className="text-[#71717A] hover:text-[#93A5CF] transition-colors"
                >
                  {allSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                </button>
              </th>
              {COLUMNS.slice(1).map(col => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-[10px] font-black tracking-widest uppercase text-[#71717A] whitespace-nowrap ${col.align === 'right' ? 'text-right' : ''} ${col.sortable ? 'cursor-pointer hover:text-[#A1A1AA] select-none' : ''}`}
                  onClick={col.sortable ? () => handleSort(col.sortable!) : undefined}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && (
                      <SortIcon field={col.sortable} active={sortField} dir={sortDirection} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A30]/50">
            {customers.map(customer => {
              const isSelected = selectedIds.has(customer.id);
              return (
                <tr
                  key={customer.id}
                  className={`group transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#93A5CF]/8 hover:bg-[#93A5CF]/12'
                      : 'hover:bg-[#1A1A1A]'
                  }`}
                  onClick={() => handleRowClick(customer.id)}
                >
                  {/* Checkbox */}
                  <td className="px-4 py-3 w-10">
                    <button
                      onClick={e => { e.stopPropagation(); toggleSelect(customer.id); }}
                      aria-label={`Select ${customer.name}`}
                      className="text-[#71717A] hover:text-[#93A5CF] transition-colors"
                    >
                      {isSelected ? <CheckSquare size={16} className="text-[#93A5CF]" /> : <Square size={16} />}
                    </button>
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0 border border-white/10"
                        style={{ backgroundColor: customer.avatarColor + '33', borderColor: customer.avatarColor + '44' }}
                      >
                        <span style={{ color: customer.avatarColor }}>{customer.avatarInitials}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-white group-hover:text-[#93A5CF] transition-colors truncate flex items-center gap-1.5">
                          {customer.name}
                          {customer.isVIP && <span className="text-yellow-400 text-[9px]">★</span>}
                          {customer.isDelinquent && <span className="text-red-400 text-[9px]">!</span>}
                        </div>
                        <div className="text-xs text-[#71717A] font-mono mt-0.5 truncate">{customer.customerCode} · {customer.phone}</div>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-4 py-3">
                    <TypeBadge type={customer.type} />
                  </td>

                  {/* Properties / Units */}
                  <td className="px-4 py-3">
                    <div className="font-bold text-[#F4F4F5] font-mono">{customer.propertiesOwned} <span className="text-[#71717A] font-normal text-xs">props</span></div>
                    <div className="text-xs text-[#71717A] font-mono">{customer.unitsOwned} units</div>
                  </td>

                  {/* Outstanding */}
                  <td className="px-4 py-3 text-right">
                    <span className={`font-mono font-bold text-sm ${customer.outstandingBalance > 0 ? 'text-[#F59E0B]' : 'text-[#10B981]'}`}>
                      {formatCurrency(customer.outstandingBalance)}
                    </span>
                  </td>

                  {/* Portfolio Value */}
                  <td className="px-4 py-3 text-right">
                    <span className="font-mono font-bold text-sm text-[#F4F4F5]">
                      {formatCurrency(customer.portfolioValue)}
                    </span>
                  </td>

                  {/* Health */}
                  <td className="px-4 py-3">
                    <HealthBar score={customer.healthScore} />
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <StatusBadge status={customer.status} />
                  </td>

                  {/* Executive */}
                  <td className="px-4 py-3">
                    <span className="text-xs text-[#A1A1AA] font-bold truncate max-w-[100px] block">{customer.assignedExecutive}</span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={e => { e.stopPropagation(); window.open(`tel:${customer.phone}`, '_blank'); }}
                        className="p-1.5 rounded-lg text-[#71717A] hover:text-white hover:bg-[#2A2A30] transition-colors"
                        aria-label="Call customer"
                      >
                        <Phone size={13} />
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); window.open(`mailto:${customer.email}`, '_blank'); }}
                        className="p-1.5 rounded-lg text-[#71717A] hover:text-white hover:bg-[#2A2A30] transition-colors"
                        aria-label="Email customer"
                      >
                        <Mail size={13} />
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); router.push(`/customers/${customer.id}`); }}
                        className="p-1.5 rounded-lg text-[#71717A] hover:text-[#93A5CF] hover:bg-[#2A2A30] transition-colors"
                        aria-label="View customer profile"
                      >
                        <ArrowRight size={13} />
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); }}
                        className="p-1.5 rounded-lg text-[#71717A] hover:text-white hover:bg-[#2A2A30] transition-colors"
                        aria-label="More options"
                      >
                        <MoreHorizontal size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {customers.length === 0 && (
              <tr>
                <td colSpan={10} className="py-24 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#2A2A30] flex items-center justify-center">
                      <span className="text-[#71717A] text-xl">∅</span>
                    </div>
                    <p className="text-[#71717A] font-bold">No customers match your criteria</p>
                    <p className="text-[#4A4A50] text-xs">Try adjusting your filters or search query</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="shrink-0 flex items-center justify-between px-6 py-3 border-t border-[#2A2A30]/50 bg-[#0E0E10]">
        <div className="text-xs text-[#71717A] font-bold">
          Showing <span className="text-[#F4F4F5]">{Math.min((currentPage - 1) * pageSize + 1, filteredTotal)}</span>
          {' '}–{' '}
          <span className="text-[#F4F4F5]">{Math.min(currentPage * pageSize, filteredTotal)}</span>
          {' '}of{' '}
          <span className="text-[#F4F4F5]">{filteredTotal}</span> customers
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#A1A1AA] hover:text-white hover:bg-[#2A2A30] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-black transition-colors ${
                  page === currentPage
                    ? 'bg-[#93A5CF]/20 text-[#93A5CF] border border-[#93A5CF]/30'
                    : 'text-[#A1A1AA] hover:bg-[#2A2A30] hover:text-white'
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#A1A1AA] hover:text-white hover:bg-[#2A2A30] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
