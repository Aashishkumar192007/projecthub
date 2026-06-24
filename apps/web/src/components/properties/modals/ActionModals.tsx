'use client';

import { useState } from 'react';
import { HierarchyNode } from '@/app/(dashboard)/properties/page';

export function ActionModals({
  isOpen,
  onClose,
  parentNode,
  onSuccess
}: {
  isOpen: boolean;
  onClose: () => void;
  parentNode: HierarchyNode | null;
  onSuccess: () => void;
}) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<any>('nominal');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !parentNode) return null;

  // Determine what type of child we are adding
  let childType = 'PROPERTY';
  if (parentNode.type === 'PORTFOLIO') childType = 'PROPERTY';
  if (parentNode.type === 'PROPERTY') childType = 'TOWER';
  if (parentNode.type === 'TOWER') childType = 'FLOOR';
  if (parentNode.type === 'FLOOR') childType = 'UNIT';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('access_token') || '';
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      let url = '';
      let body: any = { name };

      if (childType === 'TOWER') {
        url = 'http://localhost:3001/api/v1/buildings';
        body = { name, projectId: parentNode.id };
      } else if (childType === 'FLOOR') {
        url = 'http://localhost:3001/api/v1/floors';
        body = { name, towerId: parentNode.id };
      } else if (childType === 'UNIT') {
        url = 'http://localhost:3001/api/v1/units';
        body = { unitNumber: name, unitType: 'COMMERCIAL_OFFICE', areaSqFt: 1000, floorId: parentNode.id };
      }

      if (url) {
        const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
        if (!res.ok) throw new Error(`Failed to create ${childType}`);
      }

      setName('');
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to create child node');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#161616] border border-[#2A2A30] rounded-xl w-[400px] shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2A2A30] bg-[#1A1A1A]">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Add {childType}</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase">
              {childType === 'UNIT' ? 'Unit Number' : 'Name'}
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`Enter ${childType} ${childType === 'UNIT' ? 'number' : 'name'}...`}
              className="w-full bg-[#111111] border border-[#3F3F46] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase">Initial Status</label>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-[#111111] border border-[#3F3F46] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue"
            >
              <option value="nominal">Nominal / Ready</option>
              <option value="maintenance">Under Maintenance</option>
              {childType === 'UNIT' && <option value="available">Available</option>}
              {childType === 'UNIT' && <option value="occupied">Occupied</option>}
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-[#2A2A30] mt-6">
             <button 
               type="button" 
               onClick={onClose}
               disabled={isSubmitting}
               className="px-4 py-2 text-xs font-bold text-[#A1A1AA] hover:text-white hover:bg-[#2A2A30] rounded transition-colors disabled:opacity-50"
             >
               Cancel
             </button>
             <button 
               type="submit" 
               disabled={isSubmitting}
               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold transition-colors disabled:opacity-50"
             >
               {isSubmitting ? 'Creating...' : `Create ${childType}`}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
