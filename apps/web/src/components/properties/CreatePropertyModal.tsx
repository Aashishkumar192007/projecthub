'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CreatePropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreatePropertyModal({ isOpen, onClose, onSuccess }: CreatePropertyModalProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    type: 'COMMERCIAL',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    try {
      const res = await fetch('http://localhost:3001/api/v1/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token') || ''}`
        },
        body: JSON.stringify({
          ...formData,
          totalAreaSqFt: 0,
          constructionStatus: 'COMPLETED'
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create property');
      }

      setLoading(false);
      onClose();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || 'An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#0A0A0A] border-neutral-800 text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Property</DialogTitle>
            <DialogDescription className="text-neutral-400">
              Add a new property to your portfolio hierarchy.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-4">
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-md text-sm">
                {errorMsg}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Property Name <span className="text-red-500">*</span></Label>
                <Input 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. The Skyline Residences" 
                  className="bg-neutral-900 border-neutral-800" 
                />
              </div>
              <div className="space-y-2">
                <Label>Asset Type</Label>
                <select 
                  className="flex h-10 w-full items-center justify-between rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="COMMERCIAL">Commercial</option>
                  <option value="RESIDENTIAL">Residential</option>
                  <option value="MIXED_USE">Mixed Use</option>
                  <option value="INDUSTRIAL">Industrial</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Street Address</Label>
              <Input 
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="123 Financial District" 
                className="bg-neutral-900 border-neutral-800" 
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>City</Label>
                <Input 
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="New York" 
                  className="bg-neutral-900 border-neutral-800" 
                />
              </div>
              <div className="space-y-2">
                <Label>State / Region</Label>
                <Input 
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  placeholder="NY" 
                  className="bg-neutral-900 border-neutral-800" 
                />
              </div>
              <div className="space-y-2">
                <Label>Zip Code <span className="text-red-500">*</span></Label>
                <Input 
                  required
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                  placeholder="10001" 
                  className="bg-neutral-900 border-neutral-800" 
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20">
              {loading ? 'Creating...' : 'Create Property'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
