'use client';

import { type ReactNode } from 'react';
import Link from 'next/link';
import { Factory } from 'lucide-react';
import { PageShell } from '@/shared/components/layout/PageShell';
import { FadeIn } from '@/shared/components/motion/PageTransition';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <PageShell variant="auth" className="flex min-h-screen items-center justify-center p-6">
      <div className="pointer-events-auto w-full max-w-md">
        <FadeIn>
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-600 glow-primary">
                <Factory className="h-6 w-6 text-white" />
              </div>
            </Link>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="glass-strong rounded-3xl p-8 glow-primary">{children}</div>
        </FadeIn>
      </div>
    </PageShell>
  );
}
