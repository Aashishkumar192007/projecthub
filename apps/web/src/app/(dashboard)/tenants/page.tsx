'use client';

import { useTenantStore } from '@/store/tenantStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TenantsRedirectPage() {
  const router = useRouter();
  const { tenants } = useTenantStore();

  useEffect(() => {
    if (tenants.length > 0) {
      router.replace(`/tenants/${tenants[0].id}`);
    }
  }, [tenants, router]);

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-brand-blue border-t-transparent animate-spin"></div>
        <p className="text-xs font-bold text-[#71717A] tracking-widest uppercase">Loading Tenant Workspace...</p>
      </div>
    </div>
  );
}
