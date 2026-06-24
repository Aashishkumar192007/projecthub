'use client';

import { useFacilityStore } from '@/store/facilityStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FacilitiesRedirectPage() {
  const router = useRouter();
  const { facilities } = useFacilityStore();

  useEffect(() => {
    if (facilities.length > 0) {
      router.replace(`/facilities/${facilities[0].id}`);
    }
  }, [facilities, router]);

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-[#00E5FF] border-t-transparent animate-spin"></div>
        <p className="text-xs font-bold text-[#71717A] tracking-widest uppercase">Initializing Facility Command Center...</p>
      </div>
    </div>
  );
}
