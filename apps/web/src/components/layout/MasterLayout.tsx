'use client';

import { useState, useEffect } from 'react';
import { GlobalCommandBar } from './GlobalCommandBar';
import { ContextNavigator } from './ContextNavigator';
import { AssetDetailsPanel } from './AssetDetailsPanel';

export default function MasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    setIsAuthenticated(!!token);
  }, []);

  // Render a clean dark loading state during hydration to avoid flashing
  if (isAuthenticated === null) {
    return <div className="h-screen w-full bg-[#121212]" />;
  }

  // If the user is not authenticated (e.g. visiting the landing page), 
  // render the page full-screen without dashboard sidebars and headers.
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-[#121212] overflow-y-auto">
        {children}
      </div>
    );
  }

  // If authenticated, render the institutional-grade dashboard workspace layout.
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
