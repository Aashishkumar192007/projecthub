'use client';

import { CrmFolder, useCrmStore } from '@/store/crmStore';
import { 
  Users, Filter, MapPin, CalendarCheck, UserCircle, Briefcase, Megaphone, Plus,
  Phone, CheckSquare, Mail, MessageCircle, Building2, DollarSign, CreditCard,
  Download, Layout, Workflow, MailOpen, MessageSquare, UsersRound, BarChart3, Image, Gift,
  Activity, Target, ShieldCheck
} from 'lucide-react';
import { useEffect, useState, Fragment } from 'react';
import { toast } from 'sonner';


export function CrmNavigator() {
  const { activeFolder, setActiveFolder, setActiveTab, stats } = useCrmStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navCategories = [
    {
      title: 'SALES PIPELINE',
      items: [
        { id: 'HOT_LEADS' as CrmFolder, label: 'Hot Leads', icon: Users },
        { id: 'ALL_LEADS' as CrmFolder, label: 'All Leads', icon: Users },
        { id: 'QUALIFIED_LEADS' as CrmFolder, label: 'Qualified Leads', icon: Filter },
        { id: 'SITE_VISITS' as CrmFolder, label: 'Site Visits', icon: MapPin },
        { id: 'NEGOTIATIONS' as CrmFolder, label: 'Negotiations', icon: Briefcase },
        { id: 'BOOKINGS' as CrmFolder, label: 'Bookings', icon: CalendarCheck },
      ]
    },
    {
      title: 'COMMUNICATIONS',
      items: [
        { id: 'CALLS' as CrmFolder, label: 'Calls', icon: Phone },
        { id: 'TASKS' as CrmFolder, label: 'Tasks', icon: CheckSquare },
        { id: 'EMAILS' as CrmFolder, label: 'Email Center', icon: Mail },
        { id: 'WHATSAPP' as CrmFolder, label: 'WhatsApp', icon: MessageCircle },
      ]
    },
    {
      title: 'MARKETING & LEAD GEN',
      items: [
        { id: 'CAMPAIGNS' as CrmFolder, label: 'Campaigns', icon: Megaphone },
        { id: 'LEAD_CAPTURE' as CrmFolder, label: 'Lead Capture', icon: Download },
        { id: 'LANDING_PAGES' as CrmFolder, label: 'Landing Pages', icon: Layout },
        { id: 'AUTOMATIONS' as CrmFolder, label: 'Automations', icon: Workflow },
        { id: 'EMAIL_MARKETING' as CrmFolder, label: 'Email Marketing', icon: MailOpen },
        { id: 'SMS_CAMPAIGNS' as CrmFolder, label: 'SMS Campaigns', icon: MessageSquare },
        { id: 'AUDIENCES' as CrmFolder, label: 'Audiences', icon: UsersRound },
        { id: 'MARKETING_ANALYTICS' as CrmFolder, label: 'Analytics', icon: BarChart3 },
        { id: 'ASSETS' as CrmFolder, label: 'Asset Library', icon: Image },
        { id: 'REFERRALS' as CrmFolder, label: 'Referrals', icon: Gift },
      ]
    },
    {
      title: 'PARTNER ECOSYSTEM',
      items: [
        { id: 'AGENCIES' as CrmFolder, label: 'Agencies', icon: Building2 },
        { id: 'BROKERS' as CrmFolder, label: 'Brokers', icon: Briefcase },
        { id: 'PROJECT_ALLOCATIONS' as CrmFolder, label: 'Allocations', icon: Filter },
        { id: 'BROKER_WORKSPACE' as CrmFolder, label: 'Workspaces', icon: Layout },
        { id: 'PARTNER_PORTAL' as CrmFolder, label: 'Portal Prototype', icon: UserCircle },
        { id: 'BROKER_PERFORMANCE' as CrmFolder, label: 'Performance', icon: Activity },
        { id: 'PARTNER_MARKETING' as CrmFolder, label: 'Marketing Hub', icon: Megaphone },
        { id: 'CORPORATE_SALES' as CrmFolder, label: 'Corporate Sales', icon: Target },
        { id: 'BROKER_COMPLIANCE' as CrmFolder, label: 'Compliance', icon: ShieldCheck },
      ]
    },
    {
      title: 'COMMISSION ENGINE',
      items: [
        { id: 'COMMISSIONS' as CrmFolder, label: 'Commissions', icon: DollarSign },
        { id: 'BROKER_PAYMENTS' as CrmFolder, label: 'Payouts', icon: CreditCard },
      ]
    },
    {
      title: 'DIRECTORY',
      items: [
        { id: 'CUSTOMERS' as CrmFolder, label: 'Customers', icon: UserCircle },
      ]
    }
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
        <nav className="space-y-4">
          {navCategories.map((category, idx) => (
            <div key={idx}>
              <div className="px-6 mb-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                {category.title}
              </div>
              <div className="space-y-1">
                {category.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveFolder(item.id); setActiveTab('operations'); }}
                    className={`w-full flex items-center gap-3 px-6 py-2 text-sm transition-colors ${
                      (mounted && activeFolder === item.id) 
                        ? 'text-[#00E5FF] bg-[#00E5FF]/10 border-l-[3px] border-[#00E5FF]' 
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border-l-[3px] border-transparent'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${(mounted && activeFolder === item.id) ? 'text-[#00E5FF]' : 'text-neutral-500'}`} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Metrics & Actions */}
      <div className="p-4 border-t border-neutral-800 space-y-4 shrink-0">
        <div className="flex gap-2">
          <div className="flex-1 bg-[#121212] rounded border border-neutral-800 p-3">
            <div className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold mb-1">TODAY'S LEADS</div>
            <div className="text-green-400 font-medium text-lg">
              {mounted ? (stats?.todaysLeads || 0) : '-'}
            </div>
          </div>
          <div className="flex-1 bg-[#121212] rounded border border-neutral-800 p-3">
            <div className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold mb-1">FOLLOW-UPS</div>
            <div className="text-amber-400 font-medium text-lg">
              {mounted ? (stats?.followUps || 0) : '-'}
            </div>
          </div>
        </div>
        
        <button onClick={(e) => { e.stopPropagation(); useCrmStore.getState().openGlobalModal('Requested Action'); }} className="w-full h-10 bg-[#BDE0FF] hover:bg-[#A3D3FF] text-[#0A1A2A] font-medium rounded flex items-center justify-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Asset</span>
        </button>
      </div>
      
    </div>
  );
}
