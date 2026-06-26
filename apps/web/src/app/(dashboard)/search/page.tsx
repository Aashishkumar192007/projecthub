'use client';

import React, { useState } from 'react';
import { 
  Search, Filter, ArrowRight, Building2, User, Briefcase, FileText, 
  DollarSign, CheckSquare, Sparkles, Layers, SlidersHorizontal
} from 'lucide-react';
import Link from 'next/link';

export default function EnterpriseGlobalSearchPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [entityFilter, setEntityFilter] = useState('All Entities');

  const categories = [
    'All', 'Leads', 'Customers', 'Bookings', 'Properties', 
    'Units', 'Owners', 'Residents', 'Brokers', 'Documents', 'Payments', 'Approvals'
  ];

  const dummyResults = [
    { id: 'LD-1092', title: 'Marcus Vance', sub: 'Lead • Seeking 4BHK Penthouse in Marina Heights', cat: 'Leads', href: '/crm', tag: 'Hot Deal ($2.4M)' },
    { id: 'BK-8841', title: 'Unit 4202 Agreement', sub: 'Booking • Awaiting E-Sign off by Resident', cat: 'Bookings', href: '/bookings', tag: 'Pending E-Sign' },
    { id: 'PR-4401', title: 'Skyline Azure Towers', sub: 'Properties • 450 Units Active in EMEA Syndicate', cat: 'Properties', href: '/properties', tag: '94% Occupied' },
    { id: 'PY-9912', title: 'Institutional Wire $450,000', sub: 'Payments • Escrow Cleared via Stripe Connect', cat: 'Payments', href: '/accounting', tag: 'Cleared' },
    { id: 'AP-1102', title: 'Discount Authorization 8.5%', sub: 'Approvals • Submitted by Liam Cunningham', cat: 'Approvals', href: '/admin/approvals', tag: 'Pending Director' },
  ];

  const filteredResults = dummyResults.filter(r => {
    const matchesCat = category === 'All' || r.cat === category;
    const matchesQuery = !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.sub.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 pb-6 border-b border-[#2A2A30]">
          <span className="text-xs font-mono text-brand-blue uppercase mb-1 block font-bold tracking-wider">UNIVERSAL PLATFORM INDEX</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            Enterprise Search & Discovery Hub
          </h1>
        </div>

        {/* Big Search Input */}
        <div className="bg-[#111111] p-4 rounded-2xl border border-[#2A2A30] flex items-center gap-4 shadow-2xl mb-8 focus-within:border-brand-blue transition-all">
          <Search size={24} className="text-brand-blue ml-2 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across 10,000+ records: leads, agreements, bookings, owners, syndicates..."
            className="w-full bg-transparent text-white text-base focus:outline-none placeholder:text-[#71717A]"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs text-[#71717A] hover:text-white px-2">Clear</button>
          )}
          <div className="hidden sm:flex items-center gap-2 border-l border-[#2A2A30] pl-4">
            <SlidersHorizontal size={16} className="text-[#A1A1AA]" />
            <select
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
              className="bg-transparent text-xs text-neutral-300 font-bold focus:outline-none cursor-pointer"
            >
              <option className="bg-[#111111]">All Entities</option>
              <option className="bg-[#111111]">EMEA Group</option>
              <option className="bg-[#111111]">APAC REIT</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto items-center gap-2 pb-4 mb-8 scrollbar-none border-b border-[#2A2A30]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                category === cat 
                  ? 'bg-brand-blue text-[#111111] shadow-lg shadow-brand-blue/20' 
                  : 'bg-[#111111] text-[#A1A1AA] border border-[#2A2A30] hover:text-white hover:bg-[#1A1A24]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results Feed */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-[#71717A] uppercase px-1">
            Displaying {filteredResults.length} instant index hits
          </div>

          {filteredResults.map((res) => (
            <Link
              key={res.id}
              href={res.href}
              className="p-5 rounded-2xl bg-[#111111] border border-[#2A2A30] hover:border-brand-blue transition-all flex items-center justify-between gap-4 group block shadow-md hover:shadow-brand-blue/5"
            >
              <div className="flex items-center gap-4">
                <span className="px-2.5 py-1 rounded font-mono text-[11px] font-bold bg-[#1A1A24] border border-[#3F3F46] text-brand-blue shrink-0">
                  {res.id}
                </span>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-brand-blue transition-colors flex items-center gap-2">
                    {res.title}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">{res.sub}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-neutral-300 font-mono">
                  {res.tag}
                </span>
                <ArrowRight size={18} className="text-[#71717A] group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
