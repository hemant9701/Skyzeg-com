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

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = { ...Object.fromEntries(form.entries()), trip: tripId };
    const response = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json().catch(() => ({}));

    if (response.ok) {
      const reference = result?.data?.bookingNumber ? `Ref: ${result.data.bookingNumber}` : '';
      const emailSent = result?.data?.emailNotification?.sent !== false;
      const warning = emailSent ? '' : ` ${ui.emailDeliveryWarning}`;
      setStatus(`${ui.bookingSuccess} ${reference}${warning}`.trim());
      formElement.reset();
    } else {
      setError(result?.message || ui.bookingError);
    }

    setBusy(false);
  }

  return (
    <form className="rounded-3xl border border-line bg-white p-6 shadow-sm" onSubmit={submit}>
      <h4 className="mb-5 text-lg font-semibold text-dark">{ui.tripsBookThis}: {tripTitle}</h4>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2"><label className="block text-sm font-medium text-body">{ui.bookingLeadName}</label><input className="w-full rounded-2xl border border-line-strong bg-white px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary" name="leadName" autoComplete="name" required minLength={2} suppressHydrationWarning /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-body">{ui.bookingEmail}</label><input className="w-full rounded-2xl border border-line-strong bg-white px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary" type="email" name="leadEmail" autoComplete="email" required suppressHydrationWarning /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-body">{ui.bookingPhone}</label><input className="w-full rounded-2xl border border-line-strong bg-white px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary" name="leadPhone" autoComplete="tel" suppressHydrationWarning /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-body">{ui.bookingTravelDate}</label><input className="w-full rounded-2xl border border-line-strong bg-white px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary" type="date" name="travelDate" autoComplete="off" suppressHydrationWarning /></div>
        <div className="space-y-2 md:col-span-2"><label className="block text-sm font-medium text-body">{ui.bookingTravellers}</label><input className="w-full rounded-2xl border border-line-strong bg-white px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary" type="number" name="travellersCount" autoComplete="off" min={1} max={50} defaultValue={1} suppressHydrationWarning /></div>
        <div className="space-y-2 md:col-span-2"><label className="block text-sm font-medium text-body">{ui.bookingSpecialRequests}</label><textarea className="w-full rounded-2xl border border-line-strong bg-white px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary" name="specialRequests" autoComplete="off" rows={5} suppressHydrationWarning /></div>
        <div className="md:col-span-2"><button className="rounded-full bg-primary px-5 py-2.5 font-semibold text-white transition hover:bg-primary-hover disabled:opacity-60" disabled={busy}>{busy ? ui.bookingSubmitting : ui.bookingSubmit}</button></div>
        {status && <div className="md:col-span-2"><div className="rounded-2xl bg-success-light px-4 py-3 text-sm text-success-dark">{status}</div></div>}
        {error && <div className="md:col-span-2"><div className="rounded-2xl bg-danger-light px-4 py-3 text-sm text-danger-dark">{error}</div></div>}
      </div>
    </form>
  );
}
