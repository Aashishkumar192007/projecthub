'use client';

import { useState } from 'react';
import { HierarchyNode } from '@/app/(dashboard)/properties/page';
import { AlertTriangle } from 'lucide-react';

export function ArchiveConfirmModal({
  isOpen,
  onClose,
  node,
  onSuccess
}: {
  isOpen: boolean;
  onClose: () => void;
  node: HierarchyNode | null;
  onSuccess: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !node) return null;

  const handleArchive = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('access_token') || '';
      
      let endpoint = '';
      if (node.type === 'PROPERTY') endpoint = 'properties';
      else if (node.type === 'TOWER') endpoint = 'buildings';
      else if (node.type === 'FLOOR') endpoint = 'floors';
      else if (node.type === 'UNIT') endpoint = 'units';
      
      if (!endpoint) throw new Error('Unsupported node type for archiving');

      const res = await fetch(`http://localhost:3001/api/v1/${endpoint}/${node.id}/archive`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error(`Failed to archive ${node.type}`);

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert(`Failed to archive ${node.type}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#161616] border border-[#2A2A30] rounded-xl w-full max-w-sm shadow-2xl overflow-hidden relative p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>
        
        <h2 className="text-lg font-bold text-white mb-2">Archive {node.type}?</h2>
        <p className="text-sm text-neutral-400 mb-6">
          Are you sure you want to archive <strong>{node.name}</strong>? It will be hidden from the active hierarchy, along with all its children. This action can be undone later by an administrator.
        </p>

        <div className="flex gap-3 justify-center">
          <button 
            type="button" 
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={handleArchive}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
          >
            {isSubmitting ? 'Archiving...' : 'Yes, Archive'}
          </button>
        </div>
      </div>
    </div>
  );
}
