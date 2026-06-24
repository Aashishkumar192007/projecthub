'use client';

import { useState, useEffect } from 'react';
import { HierarchyNode } from '@/app/(dashboard)/properties/page';
import { X } from 'lucide-react';

export function EditPropertyModal({
  isOpen,
  onClose,
  propertyNode,
  onSuccess
}: {
  isOpen: boolean;
  onClose: () => void;
  propertyNode: HierarchyNode | null;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    status: 'ACTIVE',
    description: '',
    type: 'COMMERCIAL'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (propertyNode) {
      setFormData(prev => ({ ...prev, name: propertyNode.name }));
      // In a full implementation, we would fetch the details or pass them down
    }
  }, [propertyNode]);

  if (!isOpen || !propertyNode) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('access_token') || '';
      const res = await fetch(`http://localhost:3001/api/v1/properties/${propertyNode.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: formData.name, type: formData.type })
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      alert('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#161616] border border-[#2A2A30] rounded-xl w-full max-w-lg shadow-2xl overflow-hidden relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
        
        <div className="px-6 py-4 border-b border-[#2A2A30] bg-[#1A1A1A]">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Edit Property</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <label className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase">Property Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#111111] border border-[#3F3F46] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase">Code</label>
              <input 
                type="text" 
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
                className="w-full bg-[#111111] border border-[#3F3F46] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase">Property Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full bg-[#111111] border border-[#3F3F46] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="COMMERCIAL">Commercial</option>
                <option value="RESIDENTIAL">Residential</option>
                <option value="MIXED_USE">Mixed Use</option>
                <option value="INDUSTRIAL">Industrial</option>
              </select>
            </div>
            
            <div className="space-y-2 col-span-2">
              <label className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase">Description</label>
              <textarea 
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-[#111111] border border-[#3F3F46] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>
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
               {isSubmitting ? 'Saving...' : 'Save Changes'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
