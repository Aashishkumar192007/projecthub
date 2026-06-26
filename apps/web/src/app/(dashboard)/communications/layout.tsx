import { ReactNode } from 'react';
import { CommunicationsHeader } from '@/components/communications/CommunicationsHeader';

export default function CommunicationsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden">
      <CommunicationsHeader />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
