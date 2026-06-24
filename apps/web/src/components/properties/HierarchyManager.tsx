'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Building2, LayoutTemplate, Layers, DoorOpen, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface HierarchyNode {
  id: string;
  name: string;
  type: 'PORTFOLIO' | 'PROPERTY' | 'BLOCK' | 'TOWER' | 'FLOOR' | 'UNIT';
  children?: HierarchyNode[];
}

export function HierarchyManager({ 
  data, 
  onRefresh, 
  onEdit, 
  onClone, 
  onArchive, 
  onAddChild,
  onAssignOwner
}: { 
  data: HierarchyNode[], 
  onRefresh?: () => void,
  onEdit?: (node: HierarchyNode) => void,
  onClone?: (node: HierarchyNode) => void,
  onArchive?: (node: HierarchyNode) => void,
  onAddChild?: (node: HierarchyNode) => void,
  onAssignOwner?: (node: HierarchyNode) => void
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'PORTFOLIO': return <Briefcase className="w-4 h-4 text-blue-500" />;
      case 'PROPERTY': return <Building2 className="w-4 h-4 text-indigo-500" />;
      case 'BLOCK': return <LayoutTemplate className="w-4 h-4 text-purple-500" />;
      case 'TOWER': return <Building2 className="w-4 h-4 text-violet-500" />;
      case 'FLOOR': return <Layers className="w-4 h-4 text-fuchsia-500" />;
      case 'UNIT': return <DoorOpen className="w-4 h-4 text-emerald-500" />;
      default: return null;
    }
  };

  const renderNode = (node: HierarchyNode, level = 0) => {
    const isExpanded = expanded[node.id];
    const hasChildren = node.children && node.children.length > 0;
    const canAddChild = node.type !== 'UNIT'; // Units can't have structural children here

    return (
      <div key={node.id} className="select-none">
        <div 
          className={cn(
            "flex items-center py-2 px-3 hover:bg-neutral-800/50 rounded-md cursor-pointer transition-colors group",
            level > 0 && "ml-6 border-l border-neutral-800"
          )}
          onClick={() => hasChildren && toggle(node.id)}
        >
          <div className="w-6 flex justify-center mr-2">
            {hasChildren ? (
              isExpanded ? <ChevronDown className="w-4 h-4 text-neutral-400" /> : <ChevronRight className="w-4 h-4 text-neutral-400" />
            ) : <div className="w-4" />}
          </div>
          
          <div className="flex items-center space-x-3">
            {getIcon(node.type)}
            <span className="text-sm font-medium text-neutral-200">{node.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700">
              {node.type}
            </span>
          </div>

          <div className="ml-auto opacity-0 group-hover:opacity-100 flex space-x-2">
            {canAddChild && onAddChild && (
               <Button variant="ghost" size="sm" className="h-7 text-xs text-green-400 hover:text-green-300" onClick={(e) => { e.stopPropagation(); onAddChild(node); }}>+ Add</Button>
            )}
            {onAssignOwner && node.type === 'UNIT' && !node.ownerId && <Button variant="ghost" size="sm" className="h-7 text-xs text-purple-400 hover:text-purple-300" onClick={(e) => { e.stopPropagation(); onAssignOwner(node); }}>Assign Owner</Button>}
            {node.type === 'UNIT' && node.ownerId && <Button variant="ghost" size="sm" className="h-7 text-xs text-teal-400 hover:text-teal-300" onClick={(e) => { e.stopPropagation(); window.location.href = `/resident/${node.ownerId}`; }}>View Owner</Button>}
            {onEdit && node.type === 'PROPERTY' && <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={(e) => { e.stopPropagation(); onEdit(node); }}>Edit</Button>}
            {onClone && node.type === 'PROPERTY' && <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-400 hover:text-blue-300" onClick={(e) => { e.stopPropagation(); onClone(node); }}>Clone</Button>}
            {onArchive && node.type !== 'PORTFOLIO' && <Button variant="ghost" size="sm" className="h-7 text-xs text-red-400 hover:text-red-300" onClick={(e) => { e.stopPropagation(); onArchive(node); }}>Archive</Button>}
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="mt-1">
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#0A0A0A] border border-neutral-800 rounded-xl p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Property Hierarchy</h3>
          <p className="text-sm text-neutral-400">Manage the deep real estate structure.</p>
        </div>
        <div className="flex gap-2">
           {onRefresh && <Button variant="outline" onClick={onRefresh} className="border-neutral-800 text-neutral-300 hover:bg-neutral-800">Refresh</Button>}
           <Button className="bg-blue-600 hover:bg-blue-700">Add Portfolio</Button>
        </div>
      </div>

      <div className="space-y-1">
        {data.map(node => renderNode(node))}
      </div>
    </div>
  );
}
