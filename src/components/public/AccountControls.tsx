'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { LayoutDashboard, LoaderCircle, LogIn, LogOut, UserRound } from 'lucide-react';
import { getStrings } from '@/lib/ui-strings';

type AccountUser = { fullName: string; email: string; roles: string[] };

export default function AccountControls({ user, staff, language }: { user: AccountUser | null; staff: boolean; language: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const ui = getStrings(language);

  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
    }
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  async function logout() {
    setBusy(true);
    setFailed(false);
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (!response.ok) throw new Error();
      setOpen(false);
      router.replace('/login');
      router.refresh();
    } catch { setFailed(true); } finally { setBusy(false); }
  }

  const actionClass = 'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';
  return (
    <div ref={container} className="relative shrink-0" onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
    }}>
      <button ref={trigger} type="button" aria-label={ui.authAccount} aria-expanded={open} aria-controls={panelId}
        onClick={() => setOpen(value => !value)}
        className={`flex h-8 w-8 items-center justify-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${open ? 'border-primary bg-primary text-white shadow-md' : 'border-current/20 bg-white/10 text-inherit hover:bg-primary hover:text-white'}`}>
        <UserRound size={18} strokeWidth={1.8} aria-hidden="true" />
      </button>
      {open && (
        <div id={panelId} className="absolute right-0 top-full z-50 mt-3 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-line bg-white text-body shadow-xl shadow-dark/10">
          {user && <div className="border-b border-line bg-light/60 px-5 py-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"><UserRound size={20} aria-hidden="true" /></div>
            <p className="break-words text-sm font-semibold text-dark">{user.fullName}</p>
            <p className="mt-1 break-all text-xs text-muted">{user.email}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">{user.roles.map(role => <span key={role} className="rounded-full border border-line bg-white px-2 py-0.5 text-xs font-medium text-subtle">{role}</span>)}</div>
          </div>}
          <div className="space-y-1 p-2">
            {!user ? <Link href="/login" onClick={() => setOpen(false)} className={`${actionClass} hover:bg-light`}><LogIn size={17} aria-hidden="true" />{ui.authSignIn}</Link> : <>
              {staff && <Link href="/admin" onClick={() => setOpen(false)} className={`${actionClass} hover:bg-light`}><LayoutDashboard size={17} aria-hidden="true" />{ui.authDashboard}</Link>}
              <button type="button" disabled={busy} onClick={logout} className={`${actionClass} text-danger-dark hover:bg-danger-light disabled:cursor-wait disabled:opacity-60`}>
                {busy ? <LoaderCircle size={17} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <LogOut size={17} aria-hidden="true" />}
                {busy ? ui.authSigningOut : ui.authSignOut}
              </button>
              {failed && <p role="alert" className="px-3 pb-2 text-xs leading-5 text-danger-dark">{ui.authSignOutError}</p>}
            </>}
          </div>
        </div>
      )}
    </div>
  );
}
