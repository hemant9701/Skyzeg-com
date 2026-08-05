'use client';

import { useState } from 'react';
import { getStrings } from '@/lib/ui-strings';

interface TripOption {
  id: string;
  title: string;
}

interface DestinationOption {
  id: string;
  title: string;
}

interface TailorMadeBookingFormProps {
  trips: TripOption[];
  destinations: DestinationOption[];
  languageCode?: string;
}

export default function TailorMadeBookingForm({ trips, destinations, languageCode = 'en-US' }: TailorMadeBookingFormProps) {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const ui = getStrings(languageCode);
  const hasTrips = trips.length > 0;
  const hasDestinations = destinations.length > 0;
  const defaultTripId = trips[0]?.id ?? '';

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasTrips) {
      setError('No trips are available right now. Please contact us directly.');
      return;
    }

    setBusy(true);
    setError('');
    setStatus('');

    const form = new FormData(event.currentTarget);
    const baseTrip = String(form.get('trip') || defaultTripId);
    const preferredDestination = String(form.get('preferredDestination') || '').trim();
    const durationDays = String(form.get('durationDays') || '').trim();
    const budgetRange = String(form.get('budgetRange') || '').trim();
    const accommodationStyle = String(form.get('accommodationStyle') || '').trim();
    const activities = String(form.get('activities') || '').trim();
    const baseNotes = String(form.get('specialRequests') || '').trim();

    const customRequest = [
      'Tailor-made request details:',
      preferredDestination ? `Preferred destination: ${preferredDestination}` : '',
      durationDays ? `Planned duration (days): ${durationDays}` : '',
      budgetRange ? `Estimated budget: ${budgetRange}` : '',
      accommodationStyle ? `Accommodation style: ${accommodationStyle}` : '',
      activities ? `Preferred activities: ${activities}` : '',
      baseNotes ? `Additional notes: ${baseNotes}` : ''
    ]
      .filter(Boolean)
      .join('\n');

    const payload = {
      trip: baseTrip,
      leadName: String(form.get('leadName') || ''),
      leadEmail: String(form.get('leadEmail') || ''),
      leadPhone: String(form.get('leadPhone') || ''),
      travelDate: String(form.get('travelDate') || ''),
      travellersCount: String(form.get('travellersCount') || '1'),
      specialRequests: customRequest
    };

    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
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
      <h3 className="mb-2 text-2xl font-bold text-[#1C398E]">Tailor-Made Trip Booking</h3>
      <p className="mb-6 text-sm text-slate-600">Share your travel idea and our team will personalize the route, stay options, and pace for your group.</p>

      <div className="grid gap-4 md:grid-cols-2">
        {!hasTrips && <div className="md:col-span-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">No active trips available right now.</div>}

        <div className="space-y-2"><label className="block text-sm font-medium text-[#334155]">{ui.bookingLeadName}</label><input className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" name="leadName" required minLength={2} /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-[#334155]">{ui.bookingEmail}</label><input className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" type="email" name="leadEmail" required /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-[#334155]">{ui.bookingPhone}</label><input className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" name="leadPhone" /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-[#334155]">{ui.bookingTravelDate}</label><input className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" type="date" name="travelDate" /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-[#334155]">{ui.bookingTravellers}</label><input className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" type="number" name="travellersCount" min={1} max={50} defaultValue={2} /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-[#334155]">Preferred destination</label><select className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" name="preferredDestination" defaultValue="" required disabled={!hasDestinations}><option value="">Select destination</option>{destinations.map((destination) => <option value={destination.title} key={destination.id}>{destination.title}</option>)}</select>{!hasDestinations && <p className="text-sm text-rose-600">No destinations available right now.</p>}</div>
        <div className="space-y-2"><label className="block text-sm font-medium text-[#334155]">Preferred duration (days)</label><input className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" type="number" min={1} max={60} name="durationDays" placeholder="e.g. 10" /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-[#334155]">Budget range</label><input className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" name="budgetRange" placeholder="e.g. USD 1500 - 2500 per person" /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-[#334155]">Accommodation style</label><select className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" name="accommodationStyle" defaultValue=""><option value="">Choose</option><option value="Budget">Budget</option><option value="Comfort">Comfort</option><option value="Luxury">Luxury</option><option value="Mixed">Mixed</option></select></div>
        <div className="space-y-2 md:col-span-2"><label className="block text-sm font-medium text-[#334155]">Preferred activities</label><input className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" name="activities" placeholder="Trekking, culture, wildlife, photography, food" /></div>
        <div className="space-y-2 md:col-span-2"><label className="block text-sm font-medium text-[#334155]">{ui.bookingSpecialRequests}</label><textarea className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]" name="specialRequests" rows={5} placeholder="Share pace, accessibility needs, group details, and must-see experiences." /></div>

        <div className="md:col-span-2">
          <button className="rounded-full bg-[#1C398E] px-5 py-2.5 font-semibold text-white transition hover:bg-[#152d73] disabled:opacity-60" disabled={busy || !hasTrips}>
            {busy ? ui.bookingSubmitting : 'Request Tailor-Made Plan'}
          </button>
        </div>

        {status && <div className="md:col-span-2"><div className="rounded-2xl bg-sky-100 px-4 py-3 text-sm text-sky-800">{status}</div></div>}
        {error && <div className="md:col-span-2"><div className="rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-700">{error}</div></div>}
      </div>
    </form>
  );
}