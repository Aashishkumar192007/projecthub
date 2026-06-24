'use client';

import { GlobalCommandBar } from './GlobalCommandBar';
import { ContextNavigator } from './ContextNavigator';
import { AssetDetailsPanel } from './AssetDetailsPanel';

export default function MasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex flex-col bg-[#121212] text-text-primary overflow-hidden font-sans">
      <GlobalCommandBar />
      
      <div className="flex-1 flex overflow-hidden relative">
        <ContextNavigator />
        
        <main className="flex-1 relative z-0 overflow-hidden bg-[#121212]">
          {children}
        </main>
        
        <AssetDetailsPanel />
      </div>
    </div>
  );
}
