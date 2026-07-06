'use client';

import { type ReactNode } from 'react';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { Sidebar } from '@/shared/components/layout/Sidebar';
import { PageShell } from '@/shared/components/layout/PageShell';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <PageShell variant="dashboard" className="min-h-screen">
        <Sidebar />
        <main className="pointer-events-auto ml-72 min-h-screen p-8">{children}</main>
      </PageShell>
    </AuthGuard>
  );
}
