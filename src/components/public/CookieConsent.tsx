'use client';

import Link from 'next/link';
import { Cookie } from 'lucide-react';
import { useSyncExternalStore } from 'react';

const CONSENT_KEY = 'cookie-consent';

function getConsentSnapshot() {
  if (typeof window === 'undefined') return false;
  return !window.localStorage.getItem(CONSENT_KEY);
}

function subscribeToConsent(callback: () => void) {
  if (typeof window === 'undefined') return () => {};

  const handleStorage = () => callback();
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener('storage', handleStorage);
  };
}

export default function CookieConsent() {
  const visible = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, () => false);

  function respond(value: 'accepted' | 'declined') {
    window.localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event('storage'));
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-line bg-white p-5 shadow-2xl sm:inset-x-6 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <Cookie className="h-8 w-8 shrink-0 text-accent" aria-hidden="true" />
          <div>
            <p className="font-semibold text-dark">Let&apos;s Talk Cookies&hellip;</p>
            <p className="mt-1 text-sm text-muted">
              We use cookies to enhance your experience with personalized content and ads. By selecting
              &lsquo;Accept&rsquo;, you agree to this use and our{' '}
              <Link href="/privacy-policy" className="text-primary underline underline-offset-2 hover:text-primary-hover">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => respond('declined')}
            className="rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/5"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => respond('accepted')}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
