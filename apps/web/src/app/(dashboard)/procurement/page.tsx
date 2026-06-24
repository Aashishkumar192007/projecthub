'use client';

import { useState, useEffect } from 'react';
import { ProcurementNavigator } from '@/components/procurement/ProcurementNavigator';
import { ProcurementCopilot } from '@/components/procurement/ProcurementCopilot';
import { ProcurementHeader } from '@/components/procurement/ProcurementHeader';
import { ProcurementTabs } from '@/components/procurement/ProcurementTabs';
import { useProcurementStore } from '@/store/procurementStore';

import { OverviewTab } from '@/components/procurement/tabs/OverviewTab';
import { PurchaseOrdersTab } from '@/components/procurement/tabs/PurchaseOrdersTab';
import { InventoryTab } from '@/components/procurement/tabs/InventoryTab';
import { RelationsTab } from '@/components/procurement/tabs/RelationsTab';
import { TimelineTab } from '@/components/procurement/tabs/TimelineTab';

import { 
  RequisitionsTab, RfqsTab, GoodsReceiptsTab, WarehousesTab, 
  VendorsTab, ContractsTab, BudgetsTab, ApprovalsTab, AnalyticsTab
} from '@/components/procurement/tabs/MockProcurementTabs';

export default function ProcurementWorkspace() {
  const [activeTab, setActiveTab] = useState('overview');
  const { activeCategoryId, setActiveCategory } = useProcurementStore();

  useEffect(() => {
    if (!activeCategoryId) {
      setActiveCategory('Purchase Orders');
    }
  }, [activeCategoryId, setActiveCategory]);

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview': return <OverviewTab />;
      case 'pos': return <PurchaseOrdersTab />;
      case 'inventory': return <InventoryTab />;
      case 'relations': return <RelationsTab />;
      case 'timeline': return <TimelineTab />;
      case 'requisitions': return <RequisitionsTab />;
      case 'rfqs': return <RfqsTab />;
      case 'receipts': return <GoodsReceiptsTab />;
      case 'warehouses': return <WarehousesTab />;
      case 'vendors': return <VendorsTab />;
      case 'contracts': return <ContractsTab />;
      case 'budgets': return <BudgetsTab />;
      case 'approvals': return <ApprovalsTab />;
      case 'analytics': return <AnalyticsTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] overflow-hidden flex font-sans">
      
      {/* LEFT PANEL */}
      <ProcurementNavigator />

      {/* CENTER WORKSPACE */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#121212]">
        <ProcurementHeader />
        <ProcurementTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-y-auto">
           {renderTabContent()}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <ProcurementCopilot />

    </div>
  );
}
