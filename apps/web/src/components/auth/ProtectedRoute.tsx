'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../../stores/useAuthStore';

export function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (!isAuthenticated) {
      router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    if (allowedRoles && allowedRoles.length > 0) {
      const hasRole = allowedRoles.some(role => user?.roles.includes(role));
      if (!hasRole) {
        router.push('/unauthorized'); // Or dashboard
      }
    }
  }, [isAuthenticated, user, allowedRoles, router, pathname, isMounted]);

  if (!isMounted || !isAuthenticated) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
