'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, Mail, MessageSquare, FileText, Bot, BarChart3, Settings } from 'lucide-react';

export function CommunicationsHeader() {
  const pathname = usePathname();

  const tabs = [
    { name: 'WhatsApp Cloud', href: '/communications/whatsapp', icon: MessageCircle },
    { name: 'Email Center', href: '/communications/email', icon: Mail },
    { name: 'SMS Gateway', href: '/communications/sms', icon: MessageSquare },
    { name: 'Templates', href: '/communications/templates', icon: FileText },
    { name: 'Automation Engine', href: '/communications/automation', icon: Bot },
    { name: 'Analytics', href: '/communications/analytics', icon: BarChart3 },
  ];

  return (
    <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur px-6 py-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            PropertyHub360 Enterprise
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2 mt-1">
            <MessageCircle className="h-6 w-6 text-emerald-400" />
            Communications Cloud
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/settings/whatsapp"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <Settings className="h-4 w-4 text-emerald-400" />
            WhatsApp Session Settings
          </Link>
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto mt-6 border-b border-transparent">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-xs font-semibold whitespace-nowrap transition border-b-2 ${
                isActive
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
