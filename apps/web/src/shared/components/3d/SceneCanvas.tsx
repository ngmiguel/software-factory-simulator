'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { SceneVariant } from './scenes/FactoryUniverse';

const FactoryUniverse = dynamic(() => import('./scenes/FactoryUniverse'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[#030712]">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-brand-900/20 to-transparent" />
    </div>
  ),
});

interface SceneCanvasProps {
  variant?: SceneVariant;
  className?: string;
}

export function SceneCanvas({ variant = 'hero', className }: SceneCanvasProps) {
  return (
    <div className={className ?? 'canvas-root'}>
      <Suspense fallback={null}>
        <FactoryUniverse variant={variant} />
      </Suspense>
    </div>
  );
}
