'use client';

import { useCrmStore } from '@/store/crmStore';
import { 
  LayoutDashboard, 
  Users, 
  Filter, 
  MapPin, 
  CalendarCheck, 
  UserCircle, 
  Briefcase, 
  Megaphone, 
  BarChart3, 
  Plus
} from 'lucide-react';

export function CrmNavigator() {
  const { activeFolder, setActiveFolder, stats } = useCrmStore();

  const navItems = [
    { id: 'hot_leads', label: 'Hot Leads', icon: Users },
    { id: 'all_leads', label: 'All Leads', icon: Users },
    { id: 'qualified_leads', label: 'Qualified Leads', icon: Filter },
    { id: 'site_visits', label: 'Site Visits', icon: MapPin },
    { id: 'negotiations', label: 'Negotiations', icon: Briefcase },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
    { id: 'customers', label: 'Customers', icon: UserCircle },
    { id: 'brokers', label: 'Brokers', icon: Briefcase },
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
  ];

  return (
    <div className="w-[280px] h-full bg-[#0A0A0A] border-r border-neutral-800 flex flex-col font-sans shrink-0 z-10">
      
      {/* Brand Header */}
      <div className="h-[72px] flex items-center px-6 border-b border-neutral-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-neutral-800 rounded flex items-center justify-center text-white font-bold text-xs bg-neutral-900 overflow-hidden">
            <span className="text-[10px] tracking-widest text-[#00E5FF]">O_COER</span>
          </div>
          <div>
            <div className="text-[#00E5FF] font-bold text-xs tracking-widest uppercase">COMMAND CENTER</div>
            <div className="text-neutral-500 text-[10px] uppercase tracking-widest mt-0.5">Institutional View</div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveFolder(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                activeFolder === item.id 
                  ? 'text-[#00E5FF] bg-[#00E5FF]/10 border-l-[3px] border-[#00E5FF]' 
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border-l-[3px] border-transparent'
              }`}
            >
              <item.icon className={`w-4 h-4 ${activeFolder === item.id ? 'text-[#00E5FF]' : 'text-neutral-500'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom Metrics & Actions */}
      <div className="p-4 border-t border-neutral-800 space-y-4 shrink-0">
        <div className="flex gap-2">
          <div className="flex-1 bg-[#121212] rounded border border-neutral-800 p-3">
            <div className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold mb-1">TODAY'S LEADS</div>
            <div className="text-green-400 font-medium text-lg">{stats?.todaysLeads || 24}</div>
          </div>
          <div className="flex-1 bg-[#121212] rounded border border-neutral-800 p-3">
            <div className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold mb-1">FOLLOW-UPS</div>
            <div className="text-amber-400 font-medium text-lg">{stats?.followUps || 18}</div>
          </div>
        </div>
        
        <button className="w-full h-10 bg-[#BDE0FF] hover:bg-[#A3D3FF] text-[#0A1A2A] font-medium rounded flex items-center justify-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Asset</span>
        </button>
      </div>
      
    </div>
  );
}
