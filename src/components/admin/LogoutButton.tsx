'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function LogoutButton(){const router=useRouter();const [busy,setBusy]=useState(false);async function logout(){setBusy(true);try{await fetch('/api/auth/logout',{method:'POST',cache:'no-store'});}finally{router.replace('/admin/login');router.refresh();setBusy(false)}}return <button className="w-full rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 disabled:opacity-60" type="button" onClick={logout} disabled={busy}>{busy?'Signing out...':'Sign out'}</button>}
