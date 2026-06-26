'use client';

import { useCrmStore } from '@/store/crmStore';
import { X, Check } from 'lucide-react';
import { toast } from 'sonner';

export function GlobalActionModal() {
  const { globalModalOpen, globalModalContext, closeGlobalModal } = useCrmStore();

  if (!globalModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeGlobalModal();
    toast.success('Action Completed', { description: `Successfully processed: ${globalModalContext}` });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#121212] border border-neutral-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-[#1A1C20]">
          <h2 className="text-lg font-medium text-white">Execute Action</h2>
          <button onClick={closeGlobalModal} className="p-1 text-neutral-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Context</label>
            <div className="text-[#00E5FF] font-medium text-lg">{globalModalContext || 'General Action'}</div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Notes / Details</label>
              <textarea 
                className="w-full h-24 bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#00E5FF] transition-colors resize-none"
                placeholder="Enter any necessary details for this action..."
              ></textarea>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button 
              type="button" 
              onClick={closeGlobalModal}
              className="flex-1 py-2.5 bg-transparent border border-neutral-700 hover:border-neutral-500 text-neutral-300 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-2.5 bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-[#0A1A2A] rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              Confirm
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
