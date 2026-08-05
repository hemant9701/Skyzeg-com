'use client';

import { useEffect, useState } from 'react';

export default function UserManager() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => { fetch('/api/admin/collections/users?pageSize=100').then((r) => r.json()).then((j) => setItems(j.data?.items || [])); }, []);
  return <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-slate-100"><h1 className="mb-4 text-xl font-semibold">Users</h1><div className="overflow-x-auto"><table className="min-w-full divide-y divide-white/10 text-sm"><thead><tr><th className="px-3 py-2 text-left font-medium text-slate-400">Name</th><th className="px-3 py-2 text-left font-medium text-slate-400">Email</th><th className="px-3 py-2 text-left font-medium text-slate-400">Roles</th><th className="px-3 py-2 text-left font-medium text-slate-400">Status</th></tr></thead><tbody>{items.map((user) => <tr key={user._id} className="border-t border-white/5"><td className="px-3 py-3">{user.fullName}</td><td className="px-3 py-3">{user.email}</td><td className="px-3 py-3">{(user.roles || []).join(', ')}</td><td className="px-3 py-3">{user.isActive ? 'Active' : 'Disabled'}</td></tr>)}</tbody></table></div><p className="mt-4 text-sm text-slate-400">Create additional users with scripts/create-admin.ts or extend this view with password management.</p></div>;
}
