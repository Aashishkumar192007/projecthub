'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Layers, Copy } from 'lucide-react';

interface CloneWizardProps {
  isOpen: boolean;
  onClose: () => void;
  sourceId: string;
  sourceName: string;
  sourceType: string;
  onSuccess?: () => void;
}

export function CloneWizard({ isOpen, onClose, sourceId, sourceName, sourceType, onSuccess }: CloneWizardProps) {
  const [cloneBlocks, setCloneBlocks] = useState(true);
  const [cloneTowers, setCloneTowers] = useState(true);
  const [cloneUnits, setCloneUnits] = useState(false);
  const [newName, setNewName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) setNewName(`${sourceName} (Copy)`);
  }, [isOpen, sourceName]);

  const handleClone = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('access_token') || '';
      // Currently the backend clone endpoint takes just the property ID. 
      // It clones everything natively. If we wanted to limit it, we'd pass query params.
      const res = await fetch(`http://localhost:3001/api/v1/properties/${sourceId}/clone`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to clone property');

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to clone property');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#0A0A0A] border-neutral-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Copy className="w-5 h-5 text-blue-500" />
            <span>Deep Clone {sourceType}</span>
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            You are about to recursively duplicate <strong>{sourceName}</strong>. Select the depth of the clone below.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <Label>New {sourceType} Name</Label>
            <Input 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              className="bg-neutral-900 border-neutral-800 focus:ring-blue-500" 
            />
          </div>

          <div className="space-y-4 border border-neutral-800 rounded-lg p-4 bg-neutral-900/50">
            <h4 className="text-sm font-medium flex items-center">
              <Layers className="w-4 h-4 mr-2 text-neutral-400" />
              Hierarchy Inclusion Strategy
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox id="clone-blocks" checked={cloneBlocks} onCheckedChange={(c) => setCloneBlocks(!!c)} />
                <Label htmlFor="clone-blocks" className="text-sm font-normal cursor-pointer">Include all nested Blocks</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="clone-towers" checked={cloneTowers} onCheckedChange={(c) => setCloneTowers(!!c)} disabled={!cloneBlocks} />
                <Label htmlFor="clone-towers" className={!cloneBlocks ? "text-neutral-600" : "cursor-pointer font-normal"}>Include all nested Towers</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="clone-units" checked={cloneUnits} onCheckedChange={(c) => setCloneUnits(!!c)} disabled={!cloneTowers} />
                <Label htmlFor="clone-units" className={!cloneTowers ? "text-neutral-600" : "cursor-pointer font-normal"}>Include all nested Units (Warning: Slow)</Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button 
            onClick={handleClone} 
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 disabled:opacity-50"
          >
            {isSubmitting ? 'Cloning...' : 'Execute Deep Clone'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
