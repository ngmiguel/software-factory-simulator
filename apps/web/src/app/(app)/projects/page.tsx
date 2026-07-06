'use client';

import { FolderKanban } from 'lucide-react';
import { Card, CardDescription, CardTitle } from '@/shared/components/ui/Card';
import { FadeIn } from '@/shared/components/motion/PageTransition';

export default function ProjectsPage() {
  return (
    <FadeIn className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Projets</h1>
        <p className="text-gray-400">Backlog, sprints et releases</p>
      </div>
      <Card glow className="flex flex-col items-center justify-center py-20">
        <FolderKanban className="mb-4 h-12 w-12 text-brand-400 opacity-50" />
        <CardTitle>Module Projects — Phase 6</CardTitle>
        <CardDescription className="mt-2 text-center">
          Sprints, tâches et releases connectés à l&apos;API
        </CardDescription>
      </Card>
    </FadeIn>
  );
}
