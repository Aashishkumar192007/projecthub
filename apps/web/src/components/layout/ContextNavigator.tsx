'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Building, Landmark, BarChart3, HelpCircle, Settings, Building2, Banknote, FileText, FileBarChart, PieChart, ShoppingCart, Package, Home, FileCheck, Bot, FolderGit2, Activity, User, LayoutDashboard, Database, Users, Target } from 'lucide-react';

export function ContextNavigator() {
  const pathname = usePathname();
  const isProcurement = pathname.startsWith('/procurement');

  const mainNavItems = [
    { icon: LayoutDashboard, label: 'Executive', href: '/executive' },
    { icon: LayoutGrid, label: 'Dashboard', href: '/' },
    { icon: Building, label: 'Portfolio', href: '/portfolio' },
    { icon: Building2, label: 'Properties', href: '/properties' },
    { icon: Users, label: 'Tenants', href: '/tenants' },
    { icon: Target, label: 'CRM', href: '/crm' },
    { icon: FolderGit2, label: 'Projects', href: '/projects' },
    { icon: Activity, label: 'Facilities', href: '/facilities' },
    { icon: Banknote, label: 'Revenue', href: '/revenue' },
    { icon: FileText, label: 'Leases', href: '/leases' },
    { icon: FileText, label: 'Documents', href: '/documents' },
    { icon: FileBarChart, label: 'Reports', href: '/reports' },
    { icon: PieChart, label: 'Analytics', href: '/analytics' },
  ];

  const navGroups = [
    {
      title: 'Portals',
      items: [
        { icon: User, label: 'Resident Portal', href: '/resident' },
        { icon: Building2, label: 'Owner Portal', href: '/owner' }
      ]
    },
    {
      title: 'Core Platform',
      items: [
        { icon: LayoutDashboard, label: 'Command Center', href: '/' },
        { icon: Building, label: 'Portfolio', href: '/portfolio' },
        { icon: Building2, label: 'Properties', href: '/properties' },
        { icon: Target, label: 'CRM', href: '/crm' },
        { icon: FolderGit2, label: 'Projects', href: '/projects' },
        { icon: Activity, label: 'Facilities', href: '/facilities' },
        { icon: Banknote, label: 'Revenue', href: '/revenue' },
        { icon: FileText, label: 'Leases', href: '/leases' },
        { icon: FileText, label: 'Documents', href: '/documents' },
        { icon: FileBarChart, label: 'Reports', href: '/reports' },
        { icon: PieChart, label: 'Analytics', href: '/analytics' },
      ]
    }
  ];

  const procurementNavItems = [
    { icon: ShoppingCart, label: 'Procurement', href: '/procurement' },
    { icon: Building, label: 'Vendors', href: '/procurement/vendors' },
    { icon: FileText, label: 'Purchasing', href: '/procurement/purchasing' },
    { icon: Package, label: 'Inventory', href: '/procurement/inventory' },
    { icon: Home, label: 'Warehouses', href: '/procurement/warehouses' },
    { icon: Banknote, label: 'Budgets', href: '/procurement/budgets' },
    { icon: FileCheck, label: 'Contracts', href: '/procurement/contracts' },
    { icon: BarChart3, label: 'Analytics', href: '/procurement/analytics' },
  ];

  const navItems = isProcurement ? procurementNavItems : mainNavItems;

  return (
    <div className="w-64 border-r border-[#2A2A30] bg-[#161616] h-full flex flex-col relative z-20">
      
      {/* Active Ops Header */}
      <div className="p-5 flex items-center gap-3 border-b border-[#2A2A30]/50 mb-2 mt-2">
        <div className="w-8 h-8 rounded bg-[#1A2533] border border-brand-blue/30 flex items-center justify-center flex-shrink-0">
          <Building2 size={16} className="text-brand-blue" />
        </div>
        <div>
          <p className="text-sm font-bold text-white tracking-wide leading-tight">Command Center</p>
          <p className="text-[10px] text-[#A1A1AA] font-bold tracking-wide mt-0.5">INSTITUTIONAL GRADE</p>
        </div>
      </div>

      {/* Main Nav */}
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (isProcurement && item.href !== '/procurement' && pathname.startsWith(item.href));
            return (
              <Link 
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-colors relative ${
                  isActive 
                    ? 'bg-[#1A2533] text-brand-blue' 
                    : 'text-[#A1A1AA] hover:bg-[#1E1E22] hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue shadow-[0_0_8px_rgba(147,165,207,0.5)]"></div>
                )}
                <item.icon size={18} className={isActive ? 'text-brand-blue' : 'text-[#71717A]'} />
                <span className="text-sm font-bold">{item.label}</span>
              </Link>
            );
          })}

          {/* AI Procurement special link */}
          {isProcurement && (
            <Link 
              href="/procurement/ai"
              className="flex items-center gap-4 px-6 py-3 cursor-pointer transition-colors relative text-amber-500 hover:bg-[#1E1E22] mt-4"
            >
              <Bot size={18} />
              <span className="text-sm font-bold">AI Procurement</span>
            </Link>
          )}
        </nav>
      </div>

      {/* Footer Nav */}
      <div className="p-4 space-y-2 border-t border-[#2A2A30]/50">
        
        {isProcurement && (
          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#93A5CF] hover:bg-[#A5B4FC] text-[#111111] rounded font-bold transition-colors mb-4">
            + New PR
          </button>
        )}

        {!isProcurement && (
          <div className="mb-4">
            <p className="px-2 text-[10px] font-bold tracking-widest text-[#71717A] uppercase mb-2">Portals</p>
            <Link href="/resident" className="flex items-center gap-3 px-2 py-2 cursor-pointer text-[#A1A1AA] hover:text-white transition-colors rounded hover:bg-[#1E1E22]">
              <Building size={16} />
              <span className="text-xs font-bold">Resident Portal</span>
            </Link>
            <Link href="/procurement" className="flex items-center gap-3 px-2 py-2 cursor-pointer text-[#A1A1AA] hover:text-white transition-colors rounded hover:bg-[#1E1E22]">
              <ShoppingCart size={16} />
              <span className="text-xs font-bold">Procurement</span>
            </Link>
          </div>
        )}

        <div className="flex items-center gap-3 px-2 py-2 cursor-pointer text-[#A1A1AA] hover:text-white transition-colors rounded hover:bg-[#1E1E22]">
          <Settings size={16} />
          <span className="text-xs font-bold">Settings</span>
        </div>
        <div className="flex items-center gap-3 px-2 py-2 cursor-pointer text-[#A1A1AA] hover:text-white transition-colors rounded hover:bg-[#1E1E22]">
          <HelpCircle size={16} />
          <span className="text-xs font-bold">Support</span>
        </div>
      </div>
    </div>
  );
}
