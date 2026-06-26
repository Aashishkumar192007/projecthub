'use client';

import { useState, useEffect } from 'react';
import { HierarchyManager } from '@/components/properties/HierarchyManager';
import { CloneWizard } from '@/components/properties/CloneWizard';
import { CreatePropertyModal } from '@/components/properties/CreatePropertyModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Upload, Download, Plus } from 'lucide-react';
import { usePropertyStore } from '@/store/propertyStore';
import { EditPropertyModal } from '@/components/properties/modals/EditPropertyModal';
import { ArchiveConfirmModal } from '@/components/properties/modals/ArchiveConfirmModal';
import { ActionModals } from '@/components/properties/modals/ActionModals';
import { AssignOwnerModal } from '@/components/properties/modals/AssignOwnerModal';
import { QuickFilterMenu } from '@/components/ui/QuickFilterMenu';

export interface HierarchyNode {
  id: string;
  name: string;
  type: 'PORTFOLIO' | 'PROPERTY' | 'BLOCK' | 'TOWER' | 'FLOOR' | 'UNIT';
  ownerId?: string;
  children?: HierarchyNode[];
}

export default function PropertiesPage() {
  const [isCloneOpen, setIsCloneOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filterType, setFilterType] = useState('All Types');
  
  // Node actions state
  const [editNode, setEditNode] = useState<HierarchyNode | null>(null);
  const [archiveNode, setArchiveNode] = useState<HierarchyNode | null>(null);
  const [addChildNode, setAddChildNode] = useState<HierarchyNode | null>(null);
  const [cloneNode, setCloneNode] = useState<HierarchyNode | null>(null);
  const [assignOwnerNode, setAssignOwnerNode] = useState<HierarchyNode | null>(null);

  const [hierarchyData, setHierarchyData] = useState<HierarchyNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProperties = async (search = '') => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('access_token') || '';
      const url = `http://localhost:3001/api/v1/properties?page=1&limit=50${search ? `&search=${encodeURIComponent(search)}` : ''}`;
      const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
      
      if (!res.ok) throw new Error('Failed to fetch properties');
      
      const { data } = await res.json();
      
      const formattedNodes: HierarchyNode[] = data.map((prop: any) => ({
        id: prop.id,
        name: prop.name || 'Unnamed Property',
        type: 'PROPERTY',
        children: prop.towers?.map((tower: any) => ({
          id: tower.id,
          name: tower.name,
          type: 'TOWER',
          children: tower.floors?.map((floor: any) => ({
            id: floor.id,
            name: floor.floorNumber || 'Unnamed Floor',
            type: 'FLOOR',
            children: floor.units?.map((unit: any) => ({
              id: unit.id,
              name: unit.unitNumber,
              type: 'UNIT',
              ownerId: unit.ownerId,
              children: []
            })) || []
          })) || []
        })) || []
      }));

      setHierarchyData([
        {
          id: 'root-portfolio',
          name: 'My Real Estate Portfolio',
          type: 'PORTFOLIO',
          children: formattedNodes
        }
      ]);
    } catch (error) {
      console.error(error);
      setHierarchyData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProperties(searchTerm);
    }, 400); // 400ms debounce
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="p-8 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Property Hub</h1>
          <p className="text-neutral-400 mt-1">Manage your entire real estate hierarchy.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-neutral-800 text-neutral-300 hover:bg-neutral-800">
            <Upload className="w-4 h-4 mr-2" /> Import
          </Button>
          <Button variant="outline" className="border-neutral-800 text-neutral-300 hover:bg-neutral-800">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> New Property
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4 bg-[#0A0A0A] p-4 rounded-xl border border-neutral-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <Input 
            placeholder="Search properties, towers, units..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-neutral-900 border-neutral-800 text-white focus:ring-blue-500"
          />
        </div>
        <QuickFilterMenu 
          value={filterType} 
          onChange={setFilterType} 
          options={['All Types', 'Commercial', 'Residential', 'Mixed Use']} 
          label="Filters" 
        />
      </div>

      {isLoading ? (
        <div className="h-64 flex items-center justify-center border border-neutral-800 rounded-xl bg-[#0A0A0A] text-neutral-500">
          <div className="animate-pulse flex space-x-4 items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            <span>Loading hierarchy...</span>
          </div>
        </div>
      ) : (
        <HierarchyManager 
          data={hierarchyData} 
          onRefresh={() => fetchProperties(searchTerm)} 
          onEdit={(node) => setEditNode(node)}
          onClone={(node) => setCloneNode(node)}
          onArchive={(node) => setArchiveNode(node)}
          onAddChild={(node) => setAddChildNode(node)}
          onAssignOwner={(node) => setAssignOwnerNode(node)}
        />
      )}

      <CloneWizard 
        isOpen={!!cloneNode} 
        onClose={() => setCloneNode(null)} 
        sourceId={cloneNode?.id || ''}
        sourceName={cloneNode?.name || ''} 
        sourceType="Property" 
        onSuccess={() => fetchProperties(searchTerm)}
      />

      <CreatePropertyModal 
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={() => fetchProperties(searchTerm)}
      />

      <EditPropertyModal 
        isOpen={!!editNode}
        onClose={() => setEditNode(null)}
        propertyNode={editNode}
        onSuccess={() => fetchProperties(searchTerm)}
      />

      <ArchiveConfirmModal 
        isOpen={!!archiveNode}
        onClose={() => setArchiveNode(null)}
        node={archiveNode}
        onSuccess={() => fetchProperties(searchTerm)}
      />

      <ActionModals 
        isOpen={!!addChildNode}
        onClose={() => setAddChildNode(null)}
        parentNode={addChildNode}
        onSuccess={() => fetchProperties(searchTerm)}
      />

      <AssignOwnerModal
        isOpen={!!assignOwnerNode}
        onClose={() => setAssignOwnerNode(null)}
        unitNode={assignOwnerNode}
        onSuccess={() => fetchProperties(searchTerm)}
      />
    </div>
  );
}
