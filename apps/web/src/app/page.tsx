import Link from 'next/link';

const features = [
  {
    title: "Gestion d'équipes",
    description: 'Développeurs, QA, DevOps — recrutez et organisez vos équipes.',
  },
  {
    title: 'Projets & Sprints',
    description: 'Backlog, sprints, releases — pilotez vos livraisons.',
  },
  {
    title: 'Moteur de simulation',
    description: 'Bugs, burn-out, retards — le monde réel simulé en temps réel.',
  },
  {
    title: 'Analytics & KPIs',
    description: 'Vélocité, productivité, dette technique — mesurez tout.',
  },
];

const techStack = [
  'Next.js 15',
  'NestJS',
  'PostgreSQL',
  'Redis',
  'Prisma',
  'Clean Architecture',
  'DDD',
  'CQRS',
  'WebSockets',
  'Docker',
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-gray-950 to-gray-950" />

      <header className="relative z-10 border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 font-mono text-sm font-bold">
              SF
            </div>
            <span className="font-semibold tracking-tight">Software Factory Simulator</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium transition hover:bg-brand-700"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            Portfolio Project — Clean Architecture
          </div>

          <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl">
            Devenez{' '}
            <span className="bg-gradient-to-r from-brand-400 to-blue-300 bg-clip-text text-transparent">
              CTO
            </span>
            <br />
            de votre entreprise logicielle
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Gérez équipes, projets, sprints et recrutements. Le moteur de simulation génère bugs,
            burn-out et demandes clients en temps réel.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-xl bg-brand-600 px-8 py-3 font-semibold transition hover:bg-brand-700"
            >
              Commencer la simulation
            </Link>
            <a
              href="https://github.com/ngmiguel/software-factory-simulator"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/20 px-8 py-3 font-semibold transition hover:bg-white/5"
            >
              Voir sur GitHub
            </a>
          </div>
        </div>

        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-brand-500/30"
            >
              <h3 className="font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gray-500">
            Stack technique
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
