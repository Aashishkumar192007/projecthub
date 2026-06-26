'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  Map, 
  Users, 
  Settings,
  LogOut,
  Briefcase,
  Globe,
  FileText,
  CreditCard,
  ClipboardList,
  FolderOpen,
  Wrench,
  Shield,
  Bell,
  Search,
  Activity
} from 'lucide-react';

const navigation = [
  { name: 'Global Search', href: '/search', icon: Search },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'C-Suite Governance', href: '/executive/governance', icon: Activity },
  { name: 'Enterprise Admin', href: '/admin', icon: Shield },
  { name: 'Properties', href: '/properties', icon: Building2 },
  { name: 'Projects', href: '/projects', icon: Map },
  { name: 'CRM & Leads', href: '/crm', icon: Briefcase },
  { name: 'Contracts & ERP', href: '/contracts', icon: FileText },
  { name: 'Accounting', href: '/accounting', icon: CreditCard },
  { name: 'Operations', href: '/operations/work-orders', icon: Wrench },
  { name: 'Documents', href: '/operations/documents', icon: ClipboardList },
  { name: 'Resident Portal', href: '/resident-portal/dues', icon: Users },
  { name: 'Facility Bookings', href: '/resident-portal/facilities', icon: FolderOpen },
  { name: 'Listings', href: '/listings', icon: Globe },
  { name: 'Users & IAM', href: '/users', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="flex flex-col flex-grow bg-slate-900 overflow-y-auto border-r border-slate-800">
      <div className="flex items-center flex-shrink-0 px-4 py-5">
        <span className="text-xl font-bold text-white tracking-tight">PROPERTYHUB360</span>
      </div>
      <div className="mt-5 flex-1 flex flex-col">
        <nav className="flex-1 px-2 pb-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors'
                )}
              >
                <item.icon
                  className={classNames(
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-white',
                    'mr-3 flex-shrink-0 h-5 w-5 transition-colors'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="flex-shrink-0 flex bg-slate-800 p-4">
        <button 
          onClick={handleLogout}
          className="flex-shrink-0 w-full group block text-left"
        >
          <div className="flex items-center text-slate-300 group-hover:text-white transition-colors">
            <div>
              <LogOut className="inline-block h-5 w-5 mr-2 text-slate-400 group-hover:text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Logout</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
