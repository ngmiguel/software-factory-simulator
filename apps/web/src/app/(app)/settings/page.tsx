'use client';

import { Settings } from 'lucide-react';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import { Card, CardDescription, CardTitle } from '@/shared/components/ui/Card';
import { FadeIn } from '@/shared/components/motion/PageTransition';

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <FadeIn className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Paramètres</h1>
        <p className="text-gray-400">Profil et configuration</p>
      </div>
      <Card glow>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-600 font-display text-2xl font-bold text-white">
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </div>
          <div>
            <CardTitle>
              {user?.firstName} {user?.lastName}
            </CardTitle>
            <CardDescription>
              {user?.email} · {user?.role}
            </CardDescription>
          </div>
        </div>
        <div className="mt-6 space-y-2 rounded-xl bg-white/5 p-4 font-mono text-xs text-gray-500">
          <p>API: {process.env.NEXT_PUBLIC_API_URL}</p>
          <p>User ID: {user?.id}</p>
        </div>
      </Card>
      <Card className="flex items-center gap-4 py-8">
        <Settings className="h-8 w-8 text-gray-600" />
        <CardDescription>Paramètres avancés — Phase 10</CardDescription>
      </Card>
    </FadeIn>
  );
}
