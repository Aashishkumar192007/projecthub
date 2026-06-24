'use client';

import { useEffect, useState } from 'react';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { useGlobalSearch } from '@/hooks/useDashboard';
import { Search, X, Loader2, Building2, FileText, User, Wrench, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function GlobalSearchModal() {
  const { isSearchModalOpen, closeSearchModal, toggleSearchModal } = useDashboardStore();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce the query for the API hook
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard shortcut listener (CTRL+K or CMD+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearchModal();
      }
      if (e.key === 'Escape' && isSearchModalOpen) {
        closeSearchModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSearchModal, closeSearchModal, isSearchModalOpen]);

  const { data, isLoading, isError } = useGlobalSearch(debouncedQuery);

  if (!isSearchModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm p-4">
        <div 
          className="absolute inset-0" 
          onClick={closeSearchModal}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#161616] border border-[#2A2A30] rounded-xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Search Input */}
          <div className="flex items-center px-4 border-b border-[#2A2A30]">
            <Search className="text-[#A1A1AA] w-5 h-5" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search properties, tenants, leases, vendors... (CTRL + K)"
              className="flex-1 bg-transparent border-none text-white px-4 py-4 focus:outline-none placeholder:text-[#52525B]"
            />
            {isLoading && debouncedQuery && (
              <Loader2 className="w-5 h-5 text-brand-blue animate-spin" />
            )}
            <button 
              onClick={closeSearchModal}
              className="p-1 rounded hover:bg-[#2A2A30] text-[#71717A] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto">
            {!query && (
              <div className="p-8 text-center text-[#71717A] text-sm">
                Start typing to search across the entire ERP...
                <div className="mt-4 flex justify-center gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-[#222]">Properties</span>
                  <span className="px-2 py-1 rounded bg-[#222]">Leases</span>
                  <span className="px-2 py-1 rounded bg-[#222]">Work Orders</span>
                  <span className="px-2 py-1 rounded bg-[#222]">Vendors</span>
                </div>
              </div>
            )}

            {query && !isLoading && data?.results?.length === 0 && (
              <div className="p-8 text-center text-[#A1A1AA]">
                No results found for "{query}"
              </div>
            )}

            {query && isError && (
              <div className="p-8 text-center text-red-500">
                Failed to fetch search results.
              </div>
            )}

            {data?.results && data.results.length > 0 && (
              <div className="py-2">
                {data.results.map((item: any) => (
                  <div 
                    key={item.id}
                    className="flex items-center px-4 py-3 hover:bg-[#1E1E22] cursor-pointer border-l-2 border-transparent hover:border-brand-blue transition-colors group"
                  >
                    <div className="w-8 h-8 rounded bg-[#222] border border-[#333] flex items-center justify-center mr-4 group-hover:bg-[#1A2533] group-hover:border-brand-blue/30 transition-colors">
                      {item.type === 'Property' && <Building2 className="w-4 h-4 text-[#93A5CF]" />}
                      {item.type === 'Lease' && <FileText className="w-4 h-4 text-emerald-400" />}
                      {item.type === 'Tenant' && <User className="w-4 h-4 text-purple-400" />}
                      {item.type === 'Work Order' && <Wrench className="w-4 h-4 text-amber-500" />}
                      {item.type === 'Vendor' && <Activity className="w-4 h-4 text-blue-400" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-brand-blue transition-colors">{item.title}</p>
                      <p className="text-xs text-[#A1A1AA]">{item.subtitle}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-[10px] font-bold tracking-widest text-[#71717A] uppercase bg-[#111] px-2 py-1 rounded border border-[#222]">
                        {item.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
