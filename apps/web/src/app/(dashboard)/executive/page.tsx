'use client';

import { useRevenueIntelligenceStore } from '@/store/revenueIntelligenceStore';
import { ExecutiveNavigator } from '@/components/executive/ExecutiveNavigator';
import { ExecutiveWorkspaceRouter } from '@/components/executive/ExecutiveWorkspaceRouter';
import { ExecutiveCopilot } from '@/components/executive/ExecutiveCopilot';
import { useEffect, useState } from 'react';

export default function ExecutiveCloud() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] overflow-hidden flex font-sans">
      
      {/* LEFT PANEL: Navigator */}
      <ExecutiveNavigator />

      {/* CENTER WORKSPACE */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#121212]">
        <div className="flex-1 overflow-y-auto no-scrollbar">
           <ExecutiveWorkspaceRouter />
        </div>
      </div>

      {/* RIGHT PANEL: Copilot */}
      <ExecutiveCopilot />

    </div>
  );
}
