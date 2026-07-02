export default function DashboardPage() {
  const kpis = [
    { label: 'Vélocité équipe', value: '—', unit: 'pts/sprint', trend: 'neutral' },
    { label: 'Bugs ouverts', value: '—', unit: 'bugs', trend: 'neutral' },
    { label: 'Dette technique', value: '—', unit: '%', trend: 'neutral' },
    { label: 'Moral équipe', value: '—', unit: '%', trend: 'neutral' },
    { label: 'Budget restant', value: '—', unit: '€', trend: 'neutral' },
    { label: 'Satisfaction client', value: '—', unit: '%', trend: 'neutral' },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Dashboard CTO</h1>
            <p className="text-sm text-gray-400">Vue d&apos;ensemble de votre entreprise</p>
          </div>
          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">
            Simulation inactive — Phase 8
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-gray-400">{kpi.label}</p>
              <p className="mt-2 text-3xl font-bold text-white">
                {kpi.value}
                <span className="ml-1 text-sm font-normal text-gray-500">{kpi.unit}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-gray-400">
            Les données du dashboard seront connectées au moteur de simulation en Phase 8.
          </p>
        </div>
      </main>
    </div>
  );
}
