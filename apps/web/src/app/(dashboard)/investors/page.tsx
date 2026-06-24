'use client';

import { useInvestorStore } from '@/store/investorStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function InvestorRedirectPage() {
  const router = useRouter();
  const { investors } = useInvestorStore();

  useEffect(() => {
    if (investors.length > 0) {
      router.replace(`/investors/${investors[0].id}`);
    }
  }, [investors, router]);

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-brand-blue border-t-transparent animate-spin"></div>
        <p className="text-xs font-bold text-[#71717A] tracking-widest uppercase">Initializing Portfolio Command Center...</p>
      </div>
    </div>
  );
}
