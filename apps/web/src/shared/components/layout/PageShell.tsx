'use client';

import { type ReactNode } from 'react';
import { SceneCanvas } from '@/shared/components/3d/SceneCanvas';
import type { SceneVariant } from '@/shared/components/3d/scenes/FactoryUniverse';
import { PageTransition } from '@/shared/components/motion/PageTransition';

interface PageShellProps {
  children: ReactNode;
  variant?: SceneVariant;
  className?: string;
}

export function PageShell({ children, variant = 'hero', className }: PageShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712]">
      <SceneCanvas variant={variant} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#030712]/40 to-[#030712]/90" />
      <PageTransition className={className}>{children}</PageTransition>
    </div>
  );
}
