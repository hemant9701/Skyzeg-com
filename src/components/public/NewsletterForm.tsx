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

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    const formElement = event.currentTarget;
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, languageCode })
    });
    const result = await response.json().catch(() => ({}));
    if (response.ok) {
      const emailSent = result?.data?.emailNotification?.sent !== false;
      setMessage(emailSent ? ui.newsletterSuccess : `${ui.newsletterSuccess} ${ui.emailDeliveryWarning}`);
    } else {
      setMessage(result?.message || ui.newsletterSuccess);
    }
    if (response.ok) {
      setFullName('');
      setEmail('');
      formElement.reset();
    }
    setBusy(false);
  }

  return (
    <form onSubmit={submit}>
      <div className={`flex flex-col gap-3 ${isImageBanner ? 'md:flex-row md:items-center' : 'sm:flex-row'}`}>
        <input
          className={`w-full border bg-white px-4 py-2.5 text-sm text-dark outline-none transition focus:border-primary ${isImageBanner ? 'rounded-md border-dark/70' : 'rounded-full border-line-strong'}`}
          type="text"
          name="fullName"
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder={ui.newsletterNamePlaceholder}
          suppressHydrationWarning
        />
        <input
          className={`w-full border bg-white px-4 py-2.5 text-sm text-dark outline-none transition focus:border-primary ${isImageBanner ? 'rounded-md border-dark/70' : 'rounded-full border-line-strong'}`}
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={ui.newsletterPlaceholder}
          required
          suppressHydrationWarning
        />
        <button
          className={`${isImageBanner ? 'rounded-md bg-dark px-6 py-2.5 text-xs tracking-[0.15em]' : 'rounded-full bg-primary px-4 py-2.5 text-sm'} font-semibold uppercase text-white transition hover:bg-primary-hover disabled:opacity-60`}
          type="submit"
          disabled={busy}
        >
          {busy ? ui.newsletterJoining : isImageBanner ? ui.newsletterSubmit : ui.newsletterJoin}
        </button>
      </div>
      {message && <p className={`mt-2 text-sm ${isImageBanner ? 'text-body' : 'text-faint'}`}>{message}</p>}
    </form>
  );
}
