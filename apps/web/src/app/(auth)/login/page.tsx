import Link from 'next/link';
import { LoginForm } from '@/features/auth/components/LoginForm';

export const metadata = { title: 'Connexion — Software Factory Simulator' };

export default function LoginPage() {
  return (
    <>
      <h1 className="font-display mb-2 text-center text-2xl font-bold text-white">
        Bon retour, CTO
      </h1>
      <p className="mb-8 text-center text-sm text-gray-400">
        Connectez-vous à votre entreprise virtuelle
      </p>
      <LoginForm />
      <p className="mt-6 text-center text-sm text-gray-500">
        Pas encore de compte ?{' '}
        <Link href="/register" className="text-brand-400 hover:text-brand-300">
          Créer une entreprise
        </Link>
      </p>
    </>
  );
}
