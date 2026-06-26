'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCustomerStore } from '@/store/customerStore';
import { CustomerProfileNavigator } from '@/components/customers/CustomerProfileNavigator';
import { CustomerAICopilot } from '@/components/customers/CustomerAICopilot';
import { OverviewTab } from '@/components/customers/tabs/OverviewTab';
import { 
  Activity, Home, Building2, Users, Car, FileText, 
  CreditCard, MessageSquare, Wrench, BarChart2, Clock 
} from 'lucide-react';

const TABS = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'properties', label: 'Properties', icon: Home },
  { id: 'ownership', label: 'Ownership', icon: Building2 },
  { id: 'family', label: 'Family', icon: Users },
  { id: 'vehicles', label: 'Vehicles', icon: Car },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'financials', label: 'Financials', icon: CreditCard },
  { id: 'interactions', label: 'Interactions', icon: MessageSquare },
  { id: 'requests', label: 'Service Requests', icon: Wrench },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'timeline', label: 'Timeline', icon: Clock },
];

export default function CustomerWorkspace() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id as string;
  const customer = useCustomerStore(state => state.getCustomerById(customerId));
  const [activeTab, setActiveTab] = useState('overview');

  if (!customer) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Customer Not Found</h2>
          <button 
            onClick={() => router.push('/customers')}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Return to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-black text-white overflow-hidden">
      {/* Left Panel: Profile Navigator */}
      <CustomerProfileNavigator customer={customer} />

      {/* Center Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Horizontal Tabs Header */}
        <div className="h-16 border-b border-white/10 bg-black/40 backdrop-blur-xl flex items-center px-4 shrink-0 z-10 overflow-x-auto no-scrollbar">
          <div className="flex gap-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    isActive 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                      : 'text-white/60 hover:text-white/90 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-auto p-6 relative">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10">
            {activeTab === 'overview' && (
              <OverviewTab customer={customer} />
            )}
            
            {activeTab === 'properties' && (
              <div className="text-center py-20 text-white/50">
                <Home className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-white/80 mb-2">Properties Tab</h3>
                <p>Complete ownership structure coming soon.</p>
              </div>
            )}

            {activeTab === 'ownership' && (
              <div className="text-center py-20 text-white/50">
                <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-white/80 mb-2">Ownership Intelligence</h3>
                <p>ROI and Rental Yield charts coming soon.</p>
              </div>
            )}

            {activeTab === 'family' && (
              <div className="text-center py-20 text-white/50">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-white/80 mb-2">Family Management</h3>
                <p>Family hierarchy and resident assignments coming soon.</p>
              </div>
            )}

            {activeTab === 'vehicles' && (
              <div className="text-center py-20 text-white/50">
                <Car className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-white/80 mb-2">Vehicle Registry</h3>
                <p>Parking slots and RFID tags coming soon.</p>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="text-center py-20 text-white/50">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-white/80 mb-2">Customer DMS</h3>
                <p>Agreements, receipts, and KYC documents coming soon.</p>
              </div>
            )}

            {activeTab === 'financials' && (
              <div className="text-center py-20 text-white/50">
                <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-white/80 mb-2">Financial Ledger</h3>
                <p>Invoices, receipts, and payment trends coming soon.</p>
              </div>
            )}

            {activeTab === 'interactions' && (
              <div className="text-center py-20 text-white/50">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-white/80 mb-2">Interactions History</h3>
                <p>Calls, emails, and meetings timeline coming soon.</p>
              </div>
            )}

            {activeTab === 'requests' && (
              <div className="text-center py-20 text-white/50">
                <Wrench className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-white/80 mb-2">Service Requests</h3>
                <p>Open tickets and SLAs coming soon.</p>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="text-center py-20 text-white/50">
                <BarChart2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-white/80 mb-2">Customer Intelligence</h3>
                <p>Growth charts and health trends coming soon.</p>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="text-center py-20 text-white/50">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-white/80 mb-2">Master Timeline</h3>
                <p>Chronological timeline across all modules coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel: AI Copilot */}
      <CustomerAICopilot />
    </div>
  );
}
