'use client';

import { useState } from 'react';
import { Network, ChevronDown, ChevronRight, Building2, Plus, Home, Layers, Box, Globe, MoreHorizontal } from 'lucide-react';
import { usePropertyStore, PropertyNode, NodeType } from '@/store/propertyStore';

const TypeIcon = ({ type, expanded }: { type: NodeType, expanded?: boolean }) => {
  switch (type) {
    case 'portfolio': return <Globe size={14} className="text-white" />;
    case 'property': return <Building2 size={14} className="text-brand-blue" />;
    case 'building': return <Home size={14} className="text-[#A1A1AA]" />;
    case 'floor': return <Layers size={14} className="text-[#71717A]" />;
    case 'unit': return <Box size={14} className="text-[#71717A]" />;
    default: return <Building2 size={14} />;
  }
};

const TreeNode = ({ node, level = 0 }: { node: PropertyNode, level?: number }) => {
  const { getChildren, activeNodeId, setActiveNode } = usePropertyStore();
  const children = getChildren(node.id);
  const hasChildren = children.length > 0;
  
  // Auto-expand logic based on active node can be complex; we use simple local state
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const isActive = activeNodeId === node.id;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      <div 
        className={`flex items-center py-2 px-2 cursor-pointer transition-colors group ${
          isActive ? 'bg-[#1A2533] border-l-2 border-brand-blue' : 'hover:bg-[#1E1E22] border-l-2 border-transparent'
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => setActiveNode(node.id)}
      >
        <div className="flex items-center gap-2 flex-1">
          <span 
            className="w-4 flex justify-center text-[#71717A] hover:text-white transition-colors"
            onClick={handleToggle}
          >
            {hasChildren && (isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
          </span>
          <TypeIcon type={node.type} />
          <span className={`text-xs truncate ${isActive ? 'font-bold text-white' : 'font-medium text-[#A1A1AA] group-hover:text-white'}`}>
            {node.name}
          </span>
        </div>

        {/* Quick Indicators */}
        {node.health && (
          <div className="flex items-center gap-1.5 text-[10px] font-bold mr-2">
            <span className={`w-1.5 h-1.5 rounded-full ${node.health > 90 ? 'bg-success' : node.health > 70 ? 'bg-warning' : 'bg-danger'}`}></span>
            <span className={isActive ? 'text-brand-blue' : 'text-[#71717A]'}>{node.health}%</span>
          </div>
        )}
        
        {/* Context Menu Icon (Mocked for now) */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={14} className="text-[#71717A] hover:text-white" />
        </div>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="border-l border-[#2A2A30] ml-[22px] mt-0.5 flex flex-col">
          {children.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export function PropertyHierarchy() {
  const { nodes } = usePropertyStore();
  const rootNodes = nodes.filter(n => n.parentId === null);

  return (
    <div className="w-64 border-r border-[#2A2A30] bg-[#111111] h-full flex flex-col z-10 shrink-0">
      <div className="p-4 border-b border-[#2A2A30] flex items-center justify-between bg-[#161616]">
        <h3 className="text-xs font-bold text-white tracking-wide">ASSET HIERARCHY</h3>
        <button className="text-[#A1A1AA] hover:text-white transition-colors p-1 rounded hover:bg-[#2A2A30]">
          <Plus size={14} />
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="p-3 border-b border-[#2A2A30]">
        <input 
          type="text" 
          placeholder="Search properties..." 
          className="w-full bg-[#1E1E22] border border-[#3F3F46] rounded px-3 py-1.5 text-xs text-white placeholder:text-[#71717A] focus:outline-none focus:border-brand-blue transition-colors"
        />
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {rootNodes.map(node => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}
