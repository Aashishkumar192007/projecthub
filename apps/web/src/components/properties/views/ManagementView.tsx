'use client';

import { usePropertyStore, PropertyNode } from '@/store/propertyStore';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export function ManagementView() {
  const { getActiveNode, getChildren, deleteNode, setAddNodeModalOpen } = usePropertyStore();
  const activeNode = getActiveNode();

  if (!activeNode) return null;

  const children = getChildren(activeNode.id);
  
  // Determine what type of children we are managing based on active node type
  let childType = 'Node';
  if (activeNode.type === 'portfolio') childType = 'Property';
  if (activeNode.type === 'property') childType = 'Building';
  if (activeNode.type === 'building') childType = 'Floor';
  if (activeNode.type === 'floor') childType = 'Unit';

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Manage {childType}s</h2>
        <button 
          onClick={() => setAddNodeModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 text-white rounded text-xs font-bold transition-colors shadow-[0_0_15px_rgba(79,132,255,0.3)]"
        >
          <Plus size={14} /> Add {childType}
        </button>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A30] rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-[#A1A1AA]">
          <thead className="bg-[#1E1E22] text-xs uppercase text-[#71717A] border-b border-[#2A2A30]">
            <tr>
              <th className="px-6 py-4 font-bold">Name</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold">Health / Occ</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {children.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-[#71717A]">
                  No {childType.toLowerCase()}s found. Click "Add {childType}" to create one.
                </td>
              </tr>
            ) : (
              children.map((child: PropertyNode) => (
                <tr key={child.id} className="border-b border-[#2A2A30] hover:bg-[#1E1E22] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{child.name}</td>
                  <td className="px-6 py-4">
                    {child.status ? (
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                        child.status === 'nominal' || child.status === 'occupied' ? 'bg-success/20 text-success' :
                        child.status === 'warning' || child.status === 'maintenance' ? 'bg-warning/20 text-warning' :
                        child.status === 'available' ? 'bg-brand-blue/20 text-brand-blue' : 'bg-danger/20 text-danger'
                      }`}>
                        {child.status}
                      </span>
                    ) : (
                      <span className="text-[#71717A]">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {child.health ? `${child.health}%` : child.occupancy ? `${child.occupancy}%` : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-[#71717A] hover:text-white transition-colors mr-2">
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => deleteNode(child.id)}
                      className="p-1.5 text-[#71717A] hover:text-danger transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
