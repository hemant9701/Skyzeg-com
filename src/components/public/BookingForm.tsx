'use client';

import { useState } from 'react';
import { getStrings } from '@/lib/ui-strings';

export default function BookingForm({ tripId, tripTitle, languageCode = 'en-US' }: { tripId: string; tripTitle: string; languageCode?: string }) {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const ui = getStrings(languageCode);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setStatus('');

    const form = new FormData(event.currentTarget);
    const payload = { ...Object.fromEntries(form.entries()), trip: tripId };
    const response = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json().catch(() => ({}));

    if (response.ok) {
      setStatus(`${ui.bookingSuccess} ${result?.data?.bookingNumber ? `Ref: ${result.data.bookingNumber}` : ''}`);
      event.currentTarget.reset();
    } else {
      setError(result?.message || ui.bookingError);
    }

    setBusy(false);
  }

  return (
    <form className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={submit}>
      <h4 className="mb-5 text-lg font-semibold text-[#0F172A]">{ui.tripsBookThis}: {tripTitle}</h4>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2"><label className="block text-sm font-medium text-[#334155]">{ui.bookingLeadName}</label><input className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" name="leadName" required minLength={2} /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-[#334155]">{ui.bookingEmail}</label><input className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" type="email" name="leadEmail" required /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-[#334155]">{ui.bookingPhone}</label><input className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" name="leadPhone" /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-[#334155]">{ui.bookingTravelDate}</label><input className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" type="date" name="travelDate" /></div>
        <div className="space-y-2 md:col-span-2"><label className="block text-sm font-medium text-[#334155]">{ui.bookingTravellers}</label><input className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" type="number" name="travellersCount" min={1} max={50} defaultValue={1} /></div>
        <div className="space-y-2 md:col-span-2"><label className="block text-sm font-medium text-[#334155]">{ui.bookingSpecialRequests}</label><textarea className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" name="specialRequests" rows={5} /></div>
        <div className="md:col-span-2"><button className="rounded-full bg-[#1C398E] px-5 py-2.5 font-semibold text-white transition hover:bg-[#152d73] disabled:opacity-60" disabled={busy}>{busy ? ui.bookingSubmitting : ui.bookingSubmit}</button></div>
        {status && <div className="md:col-span-2"><div className="rounded-2xl bg-sky-100 px-4 py-3 text-sm text-sky-800">{status}</div></div>}
        {error && <div className="md:col-span-2"><div className="rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-700">{error}</div></div>}
      </div>
    </form>
  );
}
