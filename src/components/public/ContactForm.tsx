'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { getStrings } from '@/lib/ui-strings';

export default function ContactForm({ languageCode = 'en-US' }: { languageCode?: string }) {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const ui = getStrings(languageCode);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setStatus('');

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json().catch(() => ({}));

    if (response.ok) {
      const emailSent = result?.data?.emailNotification?.sent !== false;
      setStatus(emailSent ? ui.contactSuccess : `${ui.contactSuccess} ${ui.emailDeliveryWarning}`);
      formElement.reset();
    } else {
      setError(result?.message || ui.contactError);
    }

    setBusy(false);
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      onSubmit={submit}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2"><label className="block text-sm font-medium text-[#334155]">{ui.contactFullName}</label><input className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" name="fullName" required minLength={2} /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-[#334155]">{ui.contactEmail}</label><input className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" type="email" name="email" required /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-[#334155]">{ui.contactPhone}</label><input className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" name="phone" /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-[#334155]">{ui.contactSubject}</label><input className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" name="subject" required minLength={2} /></div>
        <div className="space-y-2 md:col-span-2"><label className="block text-sm font-medium text-[#334155]">{ui.contactMessage}</label><textarea className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" name="message" rows={6} required minLength={5} /></div>
        <div className="md:col-span-2"><button className="rounded-full bg-[#1C398E] px-5 py-2.5 font-semibold text-white transition hover:bg-[#152d73] disabled:opacity-60" disabled={busy}>{busy ? ui.contactSending : ui.contactSend}</button></div>
        {status && <div className="md:col-span-2"><div className="rounded-2xl bg-sky-100 px-4 py-3 text-sm text-sky-800">{status}</div></div>}
        {error && <div className="md:col-span-2"><div className="rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-700">{error}</div></div>}
      </div>
    </motion.form>
  );
}
