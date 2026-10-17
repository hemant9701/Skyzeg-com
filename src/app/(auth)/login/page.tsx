import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/admin/LoginForm';
import { getCurrentUserFromCookies } from '@/lib/auth';
export default async function LoginPage() {
  if (await getCurrentUserFromCookies()) redirect('/');
  return <main className="flex min-h-dvh items-center justify-center bg-admin-canvas px-4 py-12"><div className="mx-auto w-full max-w-md rounded-3xl bg-admin-panel p-8"><Suspense><LoginForm frontend /></Suspense></div></main>;
}
