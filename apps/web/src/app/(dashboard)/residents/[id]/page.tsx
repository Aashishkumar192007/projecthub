'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useResidentStore } from '@/store/residentStore';
import { ResidentProfileNavigator } from '@/components/residents/ResidentProfileNavigator';
import { ResidentAICopilot } from '@/components/residents/ResidentAICopilot';
import { 
  Activity, Users, Car, ParkingCircle, FileText, 
  UserCheck, Dumbbell, AlertTriangle, CreditCard, Clock 
} from 'lucide-react';

const TABS = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'family', label: 'Family', icon: Users },
  { id: 'vehicles', label: 'Vehicles', icon: Car },
  { id: 'parking', label: 'Parking', icon: ParkingCircle },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'visitors', label: 'Visitors', icon: UserCheck },
  { id: 'amenities', label: 'Amenities', icon: Dumbbell },
  { id: 'complaints', label: 'Complaints', icon: AlertTriangle },
  { id: 'financials', label: 'Financials', icon: CreditCard },
  { id: 'timeline', label: 'Timeline', icon: Clock },
];

export default function ResidentWorkspace() {
  const params = useParams();
  const router = useRouter();
  const residentId = params.id as string;
  const { getResidentById, fetchResidentDetails, isLoading } = useResidentStore();
  const resident = getResidentById(residentId);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (residentId) {
      fetchResidentDetails(residentId);
    }
  }, [residentId, fetchResidentDetails]);

  if (isLoading && !resident) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white/60">Loading resident workspace...</p>
        </div>
      </div>
    );
  }

  if (!resident) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Resident Not Found</h2>
          <button 
            onClick={() => router.push('/residents')}
            className="text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Return to Registry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-black text-white overflow-hidden">
      {/* Left Panel: Profile Navigator */}
      <ResidentProfileNavigator resident={resident} />

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
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="text-center py-20 text-white/50">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50 text-emerald-400" />
              <h3 className="text-xl font-medium text-white/80 mb-2 capitalize">{activeTab} Tab</h3>
              <p>Resident workspace module for {activeTab} coming soon.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: AI Copilot */}
      <ResidentAICopilot />
    </div>
  );
}
