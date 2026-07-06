import Link from 'next/link';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export const metadata = { title: 'Inscription — Software Factory Simulator' };

export default function RegisterPage() {
  return (
    <>
      <h1 className="font-display mb-2 text-center text-2xl font-bold text-white">
        Créer votre entreprise
      </h1>
      <p className="mb-8 text-center text-sm text-gray-400">
        Devenez CTO et lancez votre software factory
      </p>
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-gray-500">
        Déjà inscrit ?{' '}
        <Link href="/login" className="text-brand-400 hover:text-brand-300">
          Se connecter
        </Link>
      </p>
    </>
  );
}
