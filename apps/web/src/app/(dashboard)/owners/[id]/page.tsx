'use client';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function OwnerDetailPlaceholder() {
  const router = useRouter();
  const params = useParams();
  const ownerId = params.id as string;

  return (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-[#0A0C10] text-white">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#161616] border border-[#2A2A30] flex items-center justify-center mx-auto">
          <span className="text-2xl">🏗️</span>
        </div>
        <h2 className="text-xl font-black tracking-tight">Owner Workspace</h2>
        <p className="text-[#71717A] font-bold text-sm">Owner profile <span className="font-mono text-[#93A5CF]">{ownerId}</span> is being built.</p>
        <p className="text-[#4A4A50] text-xs">This workspace will be available in the next sprint.</p>
        <button
          onClick={() => router.push('/customers')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#93A5CF] text-[#0A0C10] font-black text-sm hover:bg-[#A5B4FC] transition-colors"
        >
          ← Back to Customers
        </button>
      </div>
    </div>
  );
}
