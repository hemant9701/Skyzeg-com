'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const form = new FormData(event.currentTarget);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Invalid email or password');
      const requested = params.get('returnUrl');
      const target = requested?.startsWith('/admin') && !requested.startsWith('//') ? requested : '/admin';
      router.replace(target);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unable to sign in');
    } finally {
      setBusy(false);
    }
  }

  const inputClass = 'w-full rounded-xl border border-admin-line bg-admin-canvas/50 py-3 pl-12 pr-4 text-white outline-none transition placeholder:text-admin-muted focus:border-admin-accent focus:ring-4 focus:ring-admin-accent/10';

  return (
    <form className="w-full" onSubmit={submit} aria-busy={busy}>
      <div className="mb-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-admin-accent">Admin workspace</p>
        <h1 className="font-semibold tracking-tight text-3xl text-white sm:text-4xl">Welcome back.</h1>
        <p className="mt-2 text-sm leading-6 text-admin-muted">Sign in to manage your trips, destinations, bookings and stories.</p>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-white">Email address</label>
          <div className="relative">
            <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-admin-muted" aria-hidden="true" />
            <input id="login-email" className={inputClass} name="email" type="email" autoComplete="email" placeholder="you@skyzeg.com" required />
          </div>
        </div>
        <div>
          <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-white">Password</label>
          <div className="relative">
            <LockKeyhole size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-admin-muted" aria-hidden="true" />
            <input id="login-password" className={`${inputClass} pr-14`} name="password" type={show ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" required />
            <button type="button" onClick={() => setShow(value => !value)} aria-label={show ? 'Hide password' : 'Show password'} aria-pressed={show} className="absolute inset-y-1 right-1 flex w-12 items-center justify-center rounded-lg text-admin-muted transition hover:text-admin-accent focus-visible:outline-2 focus-visible:outline-admin-accent">
              {show ? <EyeOff size={19} aria-hidden="true" /> : <Eye size={19} aria-hidden="true" />}
            </button>
          </div>
        </div>
        {error && <div role="alert" className="rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">{error}</div>}
        <button type="submit" disabled={busy} className="flex w-full items-center justify-center gap-3 rounded-xl bg-admin-accent px-4 py-3 font-semibold text-admin-canvas shadow-lg shadow-black/10 transition hover:bg-admin-accent/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-admin-accent disabled:cursor-not-allowed disabled:opacity-60">
          {busy ? <><LoaderCircle size={18} className="animate-spin" aria-hidden="true" />Signing in…</> : <>Sign in<ArrowRight size={18} aria-hidden="true" /></>}
        </button>
      </div>
      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-admin-muted"><LockKeyhole size={13} aria-hidden="true" />For authorized SkyZeg team members</p>
    </form>
  );
}
