'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Banknote, Users, Dumbbell, MessageSquare, Router, Lock, Settings, HelpCircle } from 'lucide-react';

export function ResidentSidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', href: '/resident' },
    { icon: Banknote, label: 'Payments', href: '/resident/payments' },
    { icon: Users, label: 'Visitors', href: '/resident/visitors' },
    { icon: Dumbbell, label: 'Facilities', href: '/resident/facilities' },
    { icon: MessageSquare, label: 'Community', href: '/resident/community' },
    { icon: Router, label: 'Smart Home', href: '/resident/smarthome' },
    { icon: Lock, label: 'Vault', href: '/resident/vault' },
    { icon: Settings, label: 'Complaints', href: '/resident/complaints' },
  ];

  return (
    <div className="w-64 border-r border-[#2A2A30] bg-[#111111] h-full flex flex-col relative z-20">
      
      {/* Top Logo Area */}
      <div className="p-6 border-b border-[#2A2A30] mb-4">
        <h1 className="text-lg font-bold tracking-wide text-brand-blue">PropertyHub360</h1>
        <p className="text-[10px] font-bold tracking-widest text-[#A1A1AA] uppercase mt-1">Resident Portal</p>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <nav className="space-y-1">
          {navItems.map((item) => {
            // Precise active matching
            const isActive = pathname === item.href || (item.href !== '/resident' && pathname.startsWith(item.href));
            
            return (
              <Link 
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-colors relative ${
                  isActive 
                    ? 'bg-[#153026] text-success' // dark green bg matching the design
                    : 'text-[#A1A1AA] hover:bg-[#1A1A1A] hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                )}
                <item.icon size={18} className={isActive ? 'text-success' : 'text-[#71717A]'} />
                <span className="text-sm font-bold">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Nav */}
      <div className="p-4 space-y-2 border-t border-[#2A2A30]">
        <div className="flex items-center gap-3 px-2 py-2 cursor-pointer text-[#A1A1AA] hover:text-white transition-colors rounded hover:bg-[#1A1A1A]">
          <Settings size={18} />
          <span className="text-sm font-bold">Settings</span>
        </div>
        <div className="flex items-center gap-3 px-2 py-2 cursor-pointer text-[#A1A1AA] hover:text-white transition-colors rounded hover:bg-[#1A1A1A]">
          <HelpCircle size={18} />
          <span className="text-sm font-bold">Support</span>
        </div>
      </div>
    </div>
  );
}
