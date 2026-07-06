'use client';

import Link from 'next/link';
import { Factory } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { FadeIn } from '@/shared/components/motion/PageTransition';
import { PageShell } from '@/shared/components/layout/PageShell';

export function LandingPage() {
  return (
    <PageShell variant="hero">
      <header className="pointer-events-auto flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 glow-primary">
            <Factory className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-lg font-bold text-white">
            Software Factory Simulator
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost">Connexion</Button>
          </Link>
          <Link href="/register">
            <Button>Commencer</Button>
          </Link>
        </div>
      </header>

      <main className="pointer-events-auto mx-auto max-w-6xl px-8 pb-24 pt-16">
        <FadeIn>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            Simulation temps réel — Clean Architecture
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="font-display text-balance text-6xl font-bold leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl">
            Pilotez votre
            <br />
            <span className="text-gradient">Software Factory</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-gray-400">
            Devenez CTO d&apos;une entreprise logicielle virtuelle. Gérez équipes, sprints, bugs et
            recrutements dans un univers 3D immersif connecté à votre API NestJS.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/register">
              <Button size="lg" className="glow-primary">
                Lancer la simulation
              </Button>
            </Link>
            <a
              href="https://github.com/ngmiguel/software-factory-simulator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="secondary">
                Voir sur GitHub
              </Button>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="mt-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Équipes 3D', desc: 'Visualisez vos développeurs en orbite' },
              { title: 'API Live', desc: 'Auth JWT, Health, RBAC connectés' },
              { title: 'Simulation', desc: 'Bugs, burn-out, retards en temps réel' },
              { title: 'Analytics', desc: 'KPIs CTO mis à jour en direct' },
            ].map((f) => (
              <div
                key={f.title}
                className="glass rounded-2xl p-6 transition hover:border-brand-500/30 hover:glow-primary"
              >
                <h3 className="font-display font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </main>
    </PageShell>
  );
}
