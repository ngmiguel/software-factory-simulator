'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FolderKanban, Zap, Settings, LogOut, Factory } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import { useRouter } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/teams', label: 'Équipes', icon: Users },
  { href: '/projects', label: 'Projets', icon: FolderKanban },
  { href: '/simulation', label: 'Simulation', icon: Zap },
  { href: '/settings', label: 'Paramètres', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <aside className="glass-strong fixed left-4 top-4 z-50 flex h-[calc(100vh-2rem)] w-64 flex-col rounded-2xl p-4">
      <div className="mb-8 flex items-center gap-3 px-2 pt-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 shadow-lg shadow-brand-500/30">
          <Factory className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-display text-sm font-bold text-white">Factory Sim</p>
          <p className="text-xs text-gray-500">CTO Console</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
              pathname === href
                ? 'bg-brand-500/20 text-brand-400 shadow-inner'
                : 'text-gray-400 hover:bg-white/5 hover:text-white',
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-white/10 pt-4">
        <div className="mb-3 px-2">
          <p className="truncate text-sm font-medium text-white">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="truncate text-xs text-gray-500">{user?.role}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
