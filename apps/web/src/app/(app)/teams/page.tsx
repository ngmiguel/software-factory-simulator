'use client';

import { Users } from 'lucide-react';
import { Card, CardDescription, CardTitle } from '@/shared/components/ui/Card';
import { FadeIn } from '@/shared/components/motion/PageTransition';

export default function TeamsPage() {
  return (
    <FadeIn className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Équipes</h1>
        <p className="text-gray-400">Gérez vos développeurs, QA et DevOps</p>
      </div>
      <Card glow className="flex flex-col items-center justify-center py-20">
        <Users className="mb-4 h-12 w-12 text-violet-400 opacity-50" />
        <CardTitle>Module Teams — Phase 5</CardTitle>
        <CardDescription className="mt-2 text-center">
          API REST connectée · données en orbite 3D dans le dashboard
        </CardDescription>
      </Card>
    </FadeIn>
  );
}
