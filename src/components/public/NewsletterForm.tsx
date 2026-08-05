'use client';

import { useState } from 'react';
import { getStrings } from '@/lib/ui-strings';

interface NewsletterFormProps {
  languageCode: string;
  variant?: 'default' | 'image-banner';
}

export default function NewsletterForm({ languageCode, variant = 'default' }: NewsletterFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const ui = getStrings(languageCode);
  const isImageBanner = variant === 'image-banner';

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, languageCode })
    });
    const result = await response.json().catch(() => ({}));
    setMessage(response.ok ? ui.newsletterSuccess : result?.message || ui.newsletterSuccess);
    if (response.ok) {
      setFullName('');
      setEmail('');
    }
    setBusy(false);
  }

  return (
    <form onSubmit={submit}>
      <div className={`flex flex-col gap-3 ${isImageBanner ? 'md:flex-row md:items-center' : 'sm:flex-row'}`}>
        <input
          className={`w-full border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E] ${isImageBanner ? 'rounded-md border-slate-900/70' : 'rounded-full border-slate-300'}`}
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your name"
        />
        <input
          className={`w-full border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E] ${isImageBanner ? 'rounded-md border-slate-900/70' : 'rounded-full border-slate-300'}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={ui.newsletterPlaceholder}
          required
        />
        <button
          className={`${isImageBanner ? 'rounded-md bg-[#0F172A] px-6 py-2.5 text-xs tracking-[0.15em]' : 'rounded-full bg-[#1C398E] px-4 py-2.5 text-sm'} font-semibold uppercase text-white transition hover:bg-[#152d73] disabled:opacity-60`}
          type="submit"
          disabled={busy}
        >
          {busy ? ui.newsletterJoining : isImageBanner ? 'Submit' : ui.newsletterJoin}
        </button>
      </div>
      {message && <p className={`mt-2 text-sm ${isImageBanner ? 'text-slate-700' : 'text-slate-400'}`}>{message}</p>}
    </form>
  );
}
