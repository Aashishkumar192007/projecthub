'use client';

import { Lead } from '@/lib/crmMockData';
import { useCrmStore } from '@/store/crmStore';
import { useState } from 'react';

export function LeadNegotiationsTab({ lead }: { lead: Lead }) {
  const { negotiations, startNegotiation } = useCrmStore();
  const leadNegs = negotiations.filter(n => n.leadId === lead.id);

  const [showForm, setShowForm] = useState(false);
  const [unit, setUnit] = useState('UNIT-A101');
  const [quoted, setQuoted] = useState(lead.budget);
  const [offer, setOffer] = useState(lead.budget * 0.95);

  const handleCreate = () => {
    const discount = quoted - offer;
    const discountPercentage = (discount / quoted) * 100;
    startNegotiation({
      leadId: lead.id,
      unitId: unit,
      quotedPrice: quoted,
      offerPrice: offer,
      discount,
      discountPercentage,
      marginImpact: discountPercentage * 0.8, // simplified metric
      status: 'PENDING',
      notes: ''
    });
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium text-white">Negotiations</h3>
        <button 
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-[#00E5FF]/10 text-[#00E5FF] hover:bg-[#00E5FF]/20 text-xs font-medium rounded transition-colors"
        >
          New Quote
        </button>
      </div>

      {showForm && (
        <div className="bg-[#1A1C20] border border-neutral-800 rounded p-4 mb-6">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Unit</label>
              <input type="text" value={unit} onChange={e => setUnit(e.target.value)} className="w-full bg-[#121212] border border-neutral-800 rounded px-3 py-2 text-sm text-white" />
            </div>
            <div>
              <label className="block text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Quoted Price ($)</label>
              <input type="number" value={quoted} onChange={e => setQuoted(Number(e.target.value))} className="w-full bg-[#121212] border border-neutral-800 rounded px-3 py-2 text-sm text-white" />
            </div>
            <div>
              <label className="block text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Offer Price ($)</label>
              <input type="number" value={offer} onChange={e => setOffer(Number(e.target.value))} className="w-full bg-[#121212] border border-neutral-800 rounded px-3 py-2 text-sm text-white" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleCreate} className="px-4 py-2 bg-[#00E5FF] text-[#0A0C10] hover:bg-[#00BCCC] text-xs font-medium rounded transition-colors">Start Negotiation</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-neutral-800 text-white hover:bg-neutral-700 text-xs font-medium rounded transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {leadNegs.length === 0 && <div className="text-sm text-neutral-500">No active negotiations.</div>}
        {leadNegs.map(neg => (
          <div key={neg.id} className="bg-[#1A1C20] border border-neutral-800 rounded p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-white">Unit: {neg.unitId}</div>
              <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${
                neg.status === 'APPROVED' ? 'bg-green-500/10 text-green-400' :
                neg.status === 'REJECTED' ? 'bg-red-500/10 text-red-400' :
                'bg-amber-500/10 text-amber-400'
              }`}>
                {neg.status}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Quoted</div>
                <div className="text-sm text-neutral-300">${(neg.quotedPrice / 1000000).toFixed(2)}M</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Offer</div>
                <div className="text-sm text-neutral-300">${(neg.offerPrice / 1000000).toFixed(2)}M</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Discount</div>
                <div className="text-sm text-red-400">{neg.discountPercentage.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Margin Impact</div>
                <div className="text-sm text-amber-400">-{neg.marginImpact.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
