'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Settings, Shield, Users, Building2, GitBranch, CheckSquare, Clock, 
  FileSearch, Activity, UploadCloud, DownloadCloud, Plug, Lock, HeartPulse, ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useEnterpriseStore } from '@/store/enterpriseStore';

const adminTabs = [
  { name: 'Org Center', href: '/admin', icon: Settings },
  { name: 'RBAC Roles', href: '/admin/roles', icon: Shield },
  { name: 'User Management', href: '/admin/users', icon: Users },
  { name: 'Multi-Company', href: '/admin/companies', icon: Building2 },
  { name: 'Workflow Builder', href: '/admin/workflows', icon: GitBranch },
  { name: 'Approvals', href: '/admin/approvals', icon: CheckSquare },
  { name: 'SLA Engine', href: '/admin/sla', icon: Clock },
  { name: 'Audit Logs', href: '/admin/audit', icon: FileSearch },
  { name: 'Activity Monitor', href: '/admin/activity', icon: Activity },
  { name: 'Data Import', href: '/admin/import', icon: UploadCloud },
  { name: 'Data Export', href: '/admin/export', icon: DownloadCloud },
  { name: 'Integrations', href: '/admin/integrations', icon: Plug },
  { name: 'Governance', href: '/admin/governance', icon: Lock },
  { name: 'Platform Health', href: '/admin/platform-health', icon: HeartPulse },
  { name: 'Completion Audit', href: '/admin/crm-audit', icon: ShieldCheck },
];

export function AdminNav({ activeTitle }: { activeTitle?: string }) {
  const pathname = usePathname();
  const { currentCompanyId, companies, setCompany } = useEnterpriseStore();
  const currentCompany = companies.find(c => c.id === currentCompanyId);

  return (
    <div className="bg-[#111111] border-b border-[#2A2A30] mb-8 sticky top-16 z-40">
      {/* Top bar of Admin Center */}
      <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A30]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#71717A] mb-1 font-mono">
            <span>ENTERPRISE GOVERNANCE</span>
            <ChevronRight size={12} />
            <span className="text-brand-blue uppercase">{activeTitle || 'ADMINISTRATION CENTER'}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
            Salesforce-Level Platform Administration
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wide uppercase">
              Enterprise Ready
            </span>
          </h1>
        </div>

        {/* Global Company Switcher inside Admin */}
        <div className="flex items-center gap-3 bg-[#1A1A20] px-4 py-2 rounded-xl border border-[#3F3F46]">
          <Building2 size={16} className="text-brand-blue" />
          <div className="text-xs">
            <span className="text-[#71717A] block">Active Entity:</span>
            <select 
              value={currentCompanyId} 
              onChange={(e) => setCompany(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer text-xs"
            >
              {companies.map(c => (
                <option key={c.id} value={c.id} className="bg-[#111111] text-white">
                  {c.name} ({c.currency})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Scrollable Tab Navigation */}
      <div className="px-6 overflow-x-auto flex items-center gap-1 scrollbar-none py-2">
        {adminTabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-brand-blue text-[#111111] shadow-lg shadow-brand-blue/20'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-[#1E1E24]'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-[#111111]' : 'text-[#71717A]'} />
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
