'use client';
import { getStrings } from '@/lib/ui-strings';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  const ui = getStrings('en-US'); // error boundary runs client-side
  return <section className="px-4 py-20 text-center sm:px-6 lg:px-8"><div className="mx-auto max-w-3xl"><h1 className="text-[2.75rem] font-bold text-primary">{ui.errorTitle}</h1><p className="mt-3 text-body">{error.message}</p><button className="mt-6 rounded-full bg-primary px-5 py-2.5 font-semibold text-white transition hover:bg-primary-hover" onClick={reset}>{ui.errorRetry}</button></div></section>;
}
