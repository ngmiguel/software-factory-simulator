'use client';

import { Zap, Play, Pause } from 'lucide-react';
import { Card, CardDescription, CardTitle } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { FadeIn } from '@/shared/components/motion/PageTransition';
import { useAppStore } from '@/stores/app.store';

export default function SimulationPage() {
  const isRunning = useAppStore((s) => s.isSimulationRunning);
  const tick = useAppStore((s) => s.currentTick);
  const setRunning = useAppStore((s) => s.setSimulationRunning);
  const setTick = useAppStore((s) => s.setCurrentTick);

  const toggle = () => {
    setRunning(!isRunning);
    if (!isRunning) setTick(tick + 1);
  };

  return (
    <FadeIn className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Moteur de simulation</h1>
        <p className="text-gray-400">Bugs, burn-out, retards — univers 3D intensifié</p>
      </div>

      <Card glow className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-accent-600/10 animate-pulse" />
        <div className="relative z-10 flex flex-col items-center py-16">
          <Zap className="mb-4 h-16 w-16 text-yellow-400 animate-pulse" />
          <CardTitle className="text-2xl">Tick #{tick}</CardTitle>
          <CardDescription className="mt-2 mb-8">
            {isRunning ? 'Simulation en cours...' : 'Simulation en pause'}
          </CardDescription>
          <Button size="lg" onClick={toggle} className="glow-primary">
            {isRunning ? (
              <>
                <Pause className="h-5 w-5" /> Pause
              </>
            ) : (
              <>
                <Play className="h-5 w-5" /> Démarrer
              </>
            )}
          </Button>
        </div>
      </Card>
    </FadeIn>
  );
}
