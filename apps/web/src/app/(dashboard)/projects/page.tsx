'use client';

import { useProjectStore } from '@/store/projectStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProjectsRedirectPage() {
  const router = useRouter();
  const { projects } = useProjectStore();

  useEffect(() => {
    if (projects.length > 0) {
      router.replace(`/projects/${projects[0].id}`);
    }
  }, [projects, router]);

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#0A0C10] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-brand-blue border-t-transparent animate-spin"></div>
        <p className="text-xs font-bold text-[#71717A] tracking-widest uppercase">Loading Construction Project Workspace...</p>
      </div>
    </div>
  );
}
