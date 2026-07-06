'use client';

import { useQuery } from '@tanstack/react-query';
import { Activity, Database, Server, Shield, Users, Bug, Gauge, Wallet } from 'lucide-react';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import { authApi } from '@/features/auth/api/auth.api';
import { useHealthCheck, useHealthLive, useHealthReady } from '@/features/health/hooks/useHealth';
import { Card, CardDescription, CardTitle } from '@/shared/components/ui/Card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/shared/components/motion/PageTransition';
import { useAppStore } from '@/stores/app.store';

function StatusDot({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${ok ? 'bg-green-400 shadow-[0_0_8px_#4ade80]' : 'bg-red-400'}`}
    />
  );
}

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const isSimulationRunning = useAppStore((s) => s.isSimulationRunning);
  const currentTick = useAppStore((s) => s.currentTick);

  const { data: health } = useHealthCheck();
  const { data: live } = useHealthLive();
  const { data: ready } = useHealthReady();

  const { data: adminCheck } = useQuery({
    queryKey: ['admin-check'],
    queryFn: () => authApi.adminCheck(accessToken!),
    enabled: !!accessToken && ['CTO', 'CEO', 'ADMIN'].includes(user?.role ?? ''),
  });

  const dbUp = ready?.database === 'up';
  const apiUp = live?.status === 'ok';

  const kpis = [
    { label: 'Vélocité', value: '—', unit: 'pts/sprint', icon: Gauge, color: 'text-brand-400' },
    { label: 'Bugs ouverts', value: '—', unit: '', icon: Bug, color: 'text-red-400' },
    { label: 'Équipes', value: '—', unit: '', icon: Users, color: 'text-violet-400' },
    { label: 'Budget', value: '—', unit: '€', icon: Wallet, color: 'text-green-400' },
  ];

  return (
    <div className="space-y-8">
      <FadeIn>
        <div>
          <h1 className="font-display text-3xl font-bold text-white">
            Bonjour, {user?.firstName} 👋
          </h1>
          <p className="mt-1 text-gray-400">
            Console CTO — {user?.role} · Tick simulation : {currentTick}
          </p>
        </div>
      </FadeIn>

      <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <StaggerItem key={kpi.label}>
            <Card glow className="group hover:scale-[1.02]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400">{kpi.label}</p>
                  <p className="mt-2 font-display text-3xl font-bold text-white">
                    {kpi.value}
                    <span className="ml-1 text-sm font-normal text-gray-500">{kpi.unit}</span>
                  </p>
                </div>
                <kpi.icon className={`h-5 w-5 ${kpi.color} opacity-60 group-hover:opacity-100`} />
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.2}>
          <Card glow>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-brand-400" />
              Services API
            </CardTitle>
            <CardDescription className="mb-4">Connecté à NestJS en temps réel</CardDescription>
            <div className="space-y-3">
              {[
                { label: 'API Live', ok: apiUp, detail: live?.timestamp },
                { label: 'Database', ok: dbUp, detail: ready?.status },
                { label: 'Health Check', ok: health?.status === 'ok', detail: health?.status },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <StatusDot ok={s.ok} />
                    <span className="text-sm text-gray-300">{s.label}</span>
                  </div>
                  <span className="font-mono text-xs text-gray-500">{String(s.detail ?? '—')}</span>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Card glow>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent-400" />
              Authentification RBAC
            </CardTitle>
            <CardDescription className="mb-4">Session JWT active</CardDescription>
            <div className="space-y-3">
              <div className="rounded-xl bg-white/5 px-4 py-3">
                <p className="text-xs text-gray-500">Utilisateur</p>
                <p className="text-sm text-white">{user?.email}</p>
              </div>
              <div className="rounded-xl bg-white/5 px-4 py-3">
                <p className="text-xs text-gray-500">Rôle</p>
                <p className="text-sm text-brand-400">{user?.role}</p>
              </div>
              {adminCheck && (
                <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3">
                  <p className="text-sm text-green-400">✓ {adminCheck.message}</p>
                </div>
              )}
              <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3">
                <Activity className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-400">
                  Simulation : {isSimulationRunning ? 'active' : 'inactive'}
                </span>
              </div>
            </div>
          </Card>
        </FadeIn>
      </div>

      <FadeIn delay={0.4}>
        <Card>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-cyan-400" />
            Prochaines phases
          </CardTitle>
          <CardDescription>
            Modules Companies, Teams, Projects et Simulation Engine — Phase 5 à 7
          </CardDescription>
        </Card>
      </FadeIn>
    </div>
  );
}
