'use client';

import { usePropertyStore } from '@/store/propertyStore';
import { X, Building2, User, Wrench, Activity, FileText } from 'lucide-react';
import { useState } from 'react';

export function ExplorerContextPanel() {
  const { getActiveNode, people, assets, leases, invoices, workOrders } = usePropertyStore();
  const activeNode = getActiveNode();
  
  const [activeTab, setActiveTab] = useState<'details' | 'relations' | 'actions'>('details');

  if (!activeNode) return null;

  const nodePeople = people.filter(p => p.nodeId === activeNode.id);
  const nodeAssets = assets.filter(a => a.nodeId === activeNode.id);
  const nodeWorkOrders = workOrders.filter(w => w.nodeId === activeNode.id);

  return (
    <div className="w-80 h-full bg-[#161616] border-l border-[#2A2A30] flex flex-col z-40 shrink-0">
      
      {/* Header */}
      <div className="p-4 border-b border-[#2A2A30] bg-[#1A1A1A] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#2A2A30] flex items-center justify-center">
            <Building2 size={16} className="text-brand-blue" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-tight">{activeNode.name}</h3>
            <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">{activeNode.type}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2A2A30]">
        <button 
          onClick={() => setActiveTab('details')}
          className={`flex-1 py-3 text-xs font-bold transition-colors ${activeTab === 'details' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-[#71717A] hover:text-white'}`}
        >
          Details
        </button>
        <button 
          onClick={() => setActiveTab('relations')}
          className={`flex-1 py-3 text-xs font-bold transition-colors ${activeTab === 'relations' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-[#71717A] hover:text-white'}`}
        >
          Relations
        </button>
        <button 
          onClick={() => setActiveTab('actions')}
          className={`flex-1 py-3 text-xs font-bold transition-colors ${activeTab === 'actions' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-[#71717A] hover:text-white'}`}
        >
          Actions
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        
        {activeTab === 'details' && (
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest mb-1">Status</p>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  activeNode.status === 'nominal' || activeNode.status === 'occupied' ? 'bg-success' :
                  activeNode.status === 'warning' || activeNode.status === 'maintenance' ? 'bg-warning' :
                  activeNode.status === 'available' ? 'bg-brand-blue' : 'bg-danger'
                }`} />
                <p className="text-xs font-bold text-white uppercase">{activeNode.status || 'Unknown'}</p>
              </div>
            </div>

            {(activeNode.health !== undefined) && (
              <div>
                <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest mb-1">Health Score</p>
                <div className="w-full bg-[#1A1A1A] rounded-full h-1.5 mt-2">
                  <div className="bg-brand-blue h-1.5 rounded-full" style={{ width: `${activeNode.health}%` }}></div>
                </div>
                <p className="text-xs text-white mt-1 text-right">{activeNode.health}%</p>
              </div>
            )}

            {activeNode.address && (
              <div>
                <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest mb-1">Address</p>
                <p className="text-sm text-white">{activeNode.address}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'relations' && (
          <div className="space-y-6">
            {/* People */}
            <div>
              <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest mb-3">Owners & Tenants</p>
              {nodePeople.length === 0 ? <p className="text-xs text-[#71717A]">No relations assigned.</p> : nodePeople.map(p => (
                <div key={p.id} className="flex items-center justify-between p-2 rounded bg-[#1A1A1A] border border-[#2A2A30] mb-2">
                  <div className="flex items-center gap-2">
                    <User size={14} className={p.role === 'owner' ? 'text-amber-500' : 'text-success'} />
                    <span className="text-xs text-white">{p.name}</span>
                  </div>
                  <span className="text-[10px] text-[#A1A1AA] uppercase">{p.role}</span>
                </div>
              ))}
            </div>

            {/* Assets */}
            <div>
              <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest mb-3">Physical Assets</p>
              {nodeAssets.length === 0 ? <p className="text-xs text-[#71717A]">No physical assets.</p> : nodeAssets.map(a => (
                <div key={a.id} className="flex items-center justify-between p-2 rounded bg-[#1A1A1A] border border-[#2A2A30] mb-2">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-brand-blue" />
                    <span className="text-xs text-white">{a.name}</span>
                  </div>
                  <span className={`text-[10px] uppercase ${a.status === 'nominal' ? 'text-success' : 'text-warning'}`}>{a.status}</span>
                </div>
              ))}
            </div>
            
            {/* Work Orders */}
            <div>
              <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest mb-3">Active Work Orders</p>
              {nodeWorkOrders.length === 0 ? <p className="text-xs text-[#71717A]">No active work orders.</p> : nodeWorkOrders.map(w => (
                <div key={w.id} className="flex items-center justify-between p-2 rounded bg-[#1A1A1A] border border-[#2A2A30] mb-2">
                  <div className="flex items-center gap-2">
                    <Wrench size={14} className="text-danger" />
                    <span className="text-xs text-white truncate max-w-[150px]">{w.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'actions' && (
          <div className="space-y-3">
            <button 
               className="w-full py-2.5 bg-[#1A1A1A] hover:bg-[#2A2A30] border border-[#3F3F46] rounded text-xs font-bold text-white transition-colors flex justify-center items-center gap-2"
               onClick={() => alert('Simulating adding relation...')}
            >
              <User size={14} /> Assign Person
            </button>
            <button 
               className="w-full py-2.5 bg-[#1A1A1A] hover:bg-[#2A2A30] border border-[#3F3F46] rounded text-xs font-bold text-white transition-colors flex justify-center items-center gap-2"
               onClick={() => alert('Simulating creating work order...')}
            >
              <Wrench size={14} /> Create Work Order
            </button>
            <button 
               className="w-full py-2.5 bg-brand-blue hover:bg-brand-blue/90 rounded text-xs font-bold text-white transition-colors shadow-[0_0_15px_rgba(79,132,255,0.3)] flex justify-center items-center gap-2 mt-6"
               onClick={() => alert('Simulating report generation...')}
            >
              <FileText size={14} /> Generate Report
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
