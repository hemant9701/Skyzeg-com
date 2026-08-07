'use client';

import { useCallback, useEffect, useState } from 'react';
import { Roles } from '@/domain/constants/roles';

type UserRow = {
  _id: string;
  fullName: string;
  email: string;
  roles: string[];
  isActive: boolean;
  lastLoginAt?: string;
};

type EditableState = {
  fullName: string;
  roles: string[];
  isActive: boolean;
};

type NewUserState = {
  fullName: string;
  email: string;
  password: string;
  roles: string[];
  isActive: boolean;
};

const roleOptions = Object.values(Roles);

export default function UserManager() {
  const [items, setItems] = useState<UserRow[]>([]);
  const [currentUserId, setCurrentUserId] = useState('');
  const [editing, setEditing] = useState<Record<string, EditableState>>({});
  const [resetPassword, setResetPassword] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  const [newUser, setNewUser] = useState<NewUserState>({
    fullName: '',
    email: '',
    password: '',
    roles: [Roles.Editor],
    isActive: true
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  async function loadUsers() {
    const response = await fetch('/api/admin/users?pageSize=100');
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result?.message || 'Failed to load users');
    }

    const list = (result.data?.items || []) as UserRow[];
    setItems(list);
    const nextEditing: Record<string, EditableState> = {};
    list.forEach((user) => {
      nextEditing[user._id] = {
        fullName: user.fullName || '',
        roles: Array.isArray(user.roles) ? user.roles : [],
        isActive: Boolean(user.isActive)
      };
    });
    setEditing(nextEditing);
  }

  async function loadCurrentUser() {
    const response = await fetch('/api/auth/me');
    const result = await response.json().catch(() => ({}));
    setCurrentUserId(result?.data?.id || '');
  }

  const refresh = useCallback(async () => {
    setBusy(true);
    setNotice('');
    try {
      await Promise.all([loadUsers(), loadCurrentUser()]);
    } catch (error: any) {
      setNotice(error?.message || 'Unable to load users');
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void refresh();
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [refresh]);

  function toggleRole(userId: string, role: string) {
    setEditing((current) => {
      const selected = current[userId]?.roles || [];
      const hasRole = selected.includes(role);
      const nextRoles = hasRole ? selected.filter((item) => item !== role) : [...selected, role];
      return {
        ...current,
        [userId]: {
          ...current[userId],
          roles: nextRoles
        }
      };
    });
  }

  async function createUser(event: React.FormEvent) {
    event.preventDefault();
    setNotice('');
    if (newUser.roles.length === 0) {
      setNotice('Select at least one role for the new user.');
      return;
    }
    setBusy(true);
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result?.message || 'Unable to create user');

      setNewUser({ fullName: '', email: '', password: '', roles: [Roles.Editor], isActive: true });
      setNotice('User created successfully.');
      await refresh();
    } catch (error: any) {
      setNotice(error?.message || 'Unable to create user');
    } finally {
      setBusy(false);
    }
  }

  async function saveUser(userId: string) {
    const draft = editing[userId];
    if (!draft) return;
    if (draft.roles.length === 0) {
      setNotice('Each user must have at least one role.');
      return;
    }

    setBusy(true);
    setNotice('');
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result?.message || 'Unable to update user');

      setNotice('User updated successfully.');
      await refresh();
    } catch (error: any) {
      setNotice(error?.message || 'Unable to update user');
    } finally {
      setBusy(false);
    }
  }

  async function applyPasswordReset(userId: string) {
    const password = (resetPassword[userId] || '').trim();
    if (password.length < 8) {
      setNotice('Reset password must be at least 8 characters.');
      return;
    }

    setBusy(true);
    setNotice('');
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetPassword: password })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result?.message || 'Unable to reset password');

      setResetPassword((current) => ({ ...current, [userId]: '' }));
      setNotice('Password reset successfully.');
    } catch (error: any) {
      setNotice(error?.message || 'Unable to reset password');
    } finally {
      setBusy(false);
    }
  }

  async function changeOwnPassword(event: React.FormEvent) {
    event.preventDefault();
    setNotice('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setNotice('New password and confirm password do not match.');
      return;
    }

    setBusy(true);
    try {
      const response = await fetch('/api/admin/users/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result?.message || 'Unable to change password');

      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setNotice('Your password was changed successfully.');
    } catch (error: any) {
      setNotice(error?.message || 'Unable to change password');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-slate-100">
      <div>
        <h1 className="text-xl font-semibold">Users</h1>
        <p className="mt-1 text-sm text-slate-400">Manage admin users, roles, account access, and passwords.</p>
      </div>

      {notice && <div className="rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">{notice}</div>}

      <form onSubmit={createUser} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
        <h2 className="mb-4 text-lg font-semibold text-white">Create New User</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm" placeholder="Full name" value={newUser.fullName} onChange={(event) => setNewUser((current) => ({ ...current, fullName: event.target.value }))} required />
          <input className="rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm" type="email" placeholder="Email" value={newUser.email} onChange={(event) => setNewUser((current) => ({ ...current, email: event.target.value }))} required />
          <input className="rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm md:col-span-2" type="password" placeholder="Password (minimum 8 characters)" value={newUser.password} onChange={(event) => setNewUser((current) => ({ ...current, password: event.target.value }))} required minLength={8} />
          <label className="inline-flex items-center gap-3 text-sm text-slate-300">
            <input type="checkbox" checked={newUser.isActive} onChange={(event) => setNewUser((current) => ({ ...current, isActive: event.target.checked }))} />
            Active account
          </label>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {roleOptions.map((role) => (
            <label key={role} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm">
              <input
                type="checkbox"
                checked={newUser.roles.includes(role)}
                onChange={(event) => {
                  setNewUser((current) => ({
                    ...current,
                    roles: event.target.checked
                      ? [...current.roles, role]
                      : current.roles.filter((item) => item !== role)
                  }));
                }}
              />
              {role}
            </label>
          ))}
        </div>
        <div className="mt-4">
          <button type="submit" disabled={busy} className="rounded-full bg-[#1C398E] px-5 py-2 text-sm font-semibold text-white hover:bg-[#152d73] disabled:opacity-60">Create user</button>
        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-slate-950/60">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-slate-400">Name</th>
              <th className="px-3 py-2 text-left font-medium text-slate-400">Email</th>
              <th className="px-3 py-2 text-left font-medium text-slate-400">Roles</th>
              <th className="px-3 py-2 text-left font-medium text-slate-400">Access</th>
              <th className="px-3 py-2 text-left font-medium text-slate-400">Password Reset</th>
              <th className="px-3 py-2 text-left font-medium text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((user) => {
              const draft = editing[user._id];
              if (!draft) return null;
              const isSelf = user._id === currentUserId;

              return (
                <tr key={user._id} className="border-t border-white/5 align-top">
                  <td className="px-3 py-3">
                    <input
                      className="w-full rounded-md border border-white/10 bg-slate-900/60 px-2 py-1"
                      value={draft.fullName}
                      onChange={(event) => setEditing((current) => ({
                        ...current,
                        [user._id]: { ...current[user._id], fullName: event.target.value }
                      }))}
                    />
                    <div className="mt-1 text-xs text-slate-500">{isSelf ? 'Current account' : user.lastLoginAt ? `Last login: ${new Date(user.lastLoginAt).toLocaleString()}` : 'Never logged in'}</div>
                  </td>
                  <td className="px-3 py-3 text-slate-300">{user.email}</td>
                  <td className="px-3 py-3">
                    <div className="grid gap-1">
                      {roleOptions.map((role) => (
                        <label key={role} className="inline-flex items-center gap-2 text-xs text-slate-300">
                          <input type="checkbox" checked={draft.roles.includes(role)} onChange={() => toggleRole(user._id, role)} />
                          {role}
                        </label>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <label className="inline-flex items-center gap-2 text-xs text-slate-300">
                      <input type="checkbox" checked={draft.isActive} onChange={(event) => setEditing((current) => ({ ...current, [user._id]: { ...current[user._id], isActive: event.target.checked } }))} />
                      Active
                    </label>
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="password"
                      className="w-full rounded-md border border-white/10 bg-slate-900/60 px-2 py-1"
                      value={resetPassword[user._id] || ''}
                      placeholder="New password"
                      onChange={(event) => setResetPassword((current) => ({ ...current, [user._id]: event.target.value }))}
                    />
                    <button type="button" onClick={() => applyPasswordReset(user._id)} disabled={busy} className="mt-2 rounded-md border border-white/15 px-2 py-1 text-xs hover:bg-white/10 disabled:opacity-60">Reset password</button>
                  </td>
                  <td className="px-3 py-3">
                    <button type="button" onClick={() => saveUser(user._id)} disabled={busy} className="rounded-md bg-[#1C398E] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#152d73] disabled:opacity-60">Save</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <form onSubmit={changeOwnPassword} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
        <h2 className="mb-4 text-lg font-semibold text-white">Change My Password</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <input type="password" className="rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm" placeholder="Current password" value={passwordForm.currentPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, currentPassword: event.target.value }))} required />
          <input type="password" className="rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm" placeholder="New password" value={passwordForm.newPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))} required minLength={8} />
          <input type="password" className="rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm" placeholder="Confirm new password" value={passwordForm.confirmPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, confirmPassword: event.target.value }))} required minLength={8} />
        </div>
        <button type="submit" disabled={busy} className="mt-4 rounded-full bg-[#1C398E] px-5 py-2 text-sm font-semibold text-white hover:bg-[#152d73] disabled:opacity-60">Update password</button>
      </form>
    </div>
  );
}
