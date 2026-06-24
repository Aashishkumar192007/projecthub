'use client';

import { usePropertyStore } from '@/store/propertyStore';
import { Building2, User, Users, FileText, Banknote, Wrench } from 'lucide-react';
import { useState } from 'react';

export function RelationshipGraph() {
  const { nodes, people, leases, invoices, workOrders, activeNodeId, setActiveNode } = usePropertyStore();
  const activeNode = nodes.find(n => n.id === activeNodeId);

  // We build a simple local star-topology graph around the active node.
  // Real implementation would use D3/React Flow, but we stick to local SVGs/Absolute positioning.

  const renderRelatedNodes = () => {
    if (!activeNode) return null;

    // Find related entities
    const relatedPeople = people.filter(p => p.nodeId === activeNode.id);
    const relatedWorkOrders = workOrders.filter(w => w.nodeId === activeNode.id);
    const relatedChildren = nodes.filter(n => n.parentId === activeNode.id).slice(0, 3); // Max 3 for visualization

    const totalNodes = relatedPeople.length + relatedWorkOrders.length + relatedChildren.length;
    let index = 0;

    const elements = [];
    const radius = 160;
    const centerX = 250;
    const centerY = 200;

    const renderNode = (id: string, label: string, icon: any, colorClass: string, isClickable: boolean = false) => {
      const angle = (index / totalNodes) * 2 * Math.PI - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      index++;

      return (
        <div key={id}>
          {/* Line to center */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
            <line x1={`${centerX}px`} y1={`${centerY}px`} x2={`${x}px`} y2={`${y}px`} stroke="#3F3F46" strokeWidth="1.5" strokeDasharray="4" />
          </svg>
          
          <div 
            className={`absolute z-20 flex flex-col items-center gap-2 transform -translate-x-1/2 -translate-y-1/2 ${isClickable ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            style={{ left: `${x}px`, top: `${y}px` }}
            onClick={() => isClickable && setActiveNode(id)}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-[#1A1A1A] border border-[#2A2A30] shadow-lg`}>
              {icon}
            </div>
            <span className={`text-[10px] font-bold ${colorClass} bg-[#111111] px-2 py-0.5 rounded border border-[#2A2A30]`}>{label}</span>
          </div>
        </div>
      );
    };

    relatedChildren.forEach(c => {
      elements.push(renderNode(c.id, c.name, <Building2 size={16} className="text-brand-blue" />, 'text-brand-blue', true));
    });

    relatedPeople.forEach(p => {
      elements.push(renderNode(p.id, p.name, p.role === 'owner' ? <User size={16} className="text-amber-500" /> : <Users size={16} className="text-success" />, p.role === 'owner' ? 'text-amber-500' : 'text-success'));
    });

    relatedWorkOrders.forEach(w => {
      elements.push(renderNode(w.id, w.title, <Wrench size={16} className="text-danger" />, 'text-danger'));
    });

    return elements;
  };

  return (
    <div className="relative w-full h-full bg-[#0A0C10] overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A2533]/20 via-[#0A0C10] to-[#0A0C10] pointer-events-none"></div>

      <div className="relative w-[500px] h-[400px]">
        {/* Center Active Node */}
        {activeNode && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-[#1A1A1A] border border-brand-blue rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(79,132,255,0.2)]">
              <Building2 size={32} className="text-brand-blue" />
            </div>
            <span className="text-xs font-bold text-white bg-brand-blue/20 px-3 py-1 rounded-full border border-brand-blue/30">{activeNode.name}</span>
          </div>
        )}

        {/* Orbiting Nodes */}
        {renderRelatedNodes()}
      </div>
    </div>
  );
}
