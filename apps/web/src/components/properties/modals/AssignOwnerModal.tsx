import { useState } from 'react';

export function AssignOwnerModal({ 
  isOpen, 
  onClose, 
  unitNode, 
  onSuccess 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  unitNode: any,
  onSuccess: () => void 
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Single family member for quick enrollment
  const [fmName, setFmName] = useState('');
  const [fmRelation, setFmRelation] = useState('SPOUSE');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !unitNode) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('access_token') || '';
      
      const payload = {
        unitId: unitNode.id,
        name,
        email,
        phone,
        familyMembers: fmName ? [{ firstName: fmName.split(' ')[0] || '', lastName: fmName.split(' ')[1] || '', relation: fmRelation }] : []
      };

      const res = await fetch('http://localhost:3001/api/v1/residents/assign-unit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Failed to assign owner');
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to assign owner to unit.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#161616] border border-[#2A2A30] rounded-xl w-[500px] shadow-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-[#2A2A30] bg-[#1A1A1A]">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Assign Owner to {unitNode.name}</h2>
          <p className="text-xs text-neutral-400 mt-1">This will register them into the Resident Portal.</p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <form id="assign-owner-form" onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Primary Owner Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest border-b border-[#2A2A30] pb-2">Owner Profile</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase">Full Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. John Doe" className="w-full bg-[#111111] border border-[#3F3F46] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" className="w-full bg-[#111111] border border-[#3F3F46] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase">Phone</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 234 567 8900" className="w-full bg-[#111111] border border-[#3F3F46] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue" />
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Family Member */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest border-b border-[#2A2A30] pb-2">Primary Family Member (Optional)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase">Name</label>
                  <input type="text" value={fmName} onChange={e => setFmName(e.target.value)} placeholder="e.g. Jane Doe" className="w-full bg-[#111111] border border-[#3F3F46] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase">Relation</label>
                  <select value={fmRelation} onChange={e => setFmRelation(e.target.value)} className="w-full bg-[#111111] border border-[#3F3F46] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-blue">
                    <option value="SPOUSE">Spouse</option>
                    <option value="CHILD">Child</option>
                    <option value="PARENT">Parent</option>
                    <option value="SIBLING">Sibling</option>
                  </select>
                </div>
              </div>
            </div>

          </form>
        </div>

        <div className="px-6 py-4 border-t border-[#2A2A30] bg-[#1A1A1A] flex justify-end gap-3">
          <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 text-xs font-bold text-[#A1A1AA] hover:text-white hover:bg-[#2A2A30] rounded transition-colors disabled:opacity-50">Cancel</button>
          <button type="submit" form="assign-owner-form" disabled={isSubmitting} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs font-bold transition-colors disabled:opacity-50">{isSubmitting ? 'Assigning...' : 'Assign Owner'}</button>
        </div>
      </div>
    </div>
  );
}
