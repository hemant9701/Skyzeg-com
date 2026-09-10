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
      setError(ui.tailorMadeNoTripsError);
      return;
    }

    setBusy(true);
    setError('');
    setStatus('');

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
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
      <h3 className="mb-2 text-2xl font-bold text-primary">{ui.tailorMadeTitle}</h3>
      <p className="mb-6 text-sm text-subtle">{ui.tailorMadeSubtitle}</p>

      <div className="grid gap-4 md:grid-cols-2">
        {!hasTrips && <div className="md:col-span-2 rounded-2xl bg-danger-light px-4 py-3 text-sm text-danger-dark">{ui.tailorMadeNoTrips}</div>}

        <div className="space-y-2"><label className="block text-sm font-medium text-body">{ui.bookingLeadName}</label><input className="w-full rounded-2xl border border-line-strong bg-white px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary" name="leadName" autoComplete="name" required minLength={2} suppressHydrationWarning /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-body">{ui.bookingEmail}</label><input className="w-full rounded-2xl border border-line-strong bg-white px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary" type="email" name="leadEmail" autoComplete="email" required suppressHydrationWarning /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-body">{ui.bookingPhone}</label><input className="w-full rounded-2xl border border-line-strong bg-white px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary" name="leadPhone" autoComplete="tel" suppressHydrationWarning /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-body">{ui.bookingTravelDate}</label><input className="w-full rounded-2xl border border-line-strong bg-white px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary" type="date" name="travelDate" autoComplete="off" suppressHydrationWarning /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-body">{ui.bookingTravellers}</label><input className="w-full rounded-2xl border border-line-strong bg-white px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary" type="number" name="travellersCount" autoComplete="off" min={1} max={50} defaultValue={2} suppressHydrationWarning /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-body">{ui.tailorMadePreferredDestination}</label><select className="w-full rounded-2xl border border-line-strong bg-white px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary" name="preferredDestination" autoComplete="off" defaultValue="" required disabled={!hasDestinations} suppressHydrationWarning><option value="">{ui.tailorMadeSelectDestination}</option>{destinations.map((destination) => <option value={destination.title} key={destination.id}>{destination.title}</option>)}</select>{!hasDestinations && <p className="text-sm text-danger">{ui.tailorMadeNoDestinations}</p>}</div>
        <div className="space-y-2"><label className="block text-sm font-medium text-body">{ui.tailorMadePreferredDuration}</label><input className="w-full rounded-2xl border border-line-strong bg-white px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary" type="number" min={1} max={60} name="durationDays" autoComplete="off" placeholder="e.g. 10" suppressHydrationWarning /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-body">{ui.tailorMadeBudgetRange}</label><input className="w-full rounded-2xl border border-line-strong bg-white px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary" name="budgetRange" autoComplete="off" placeholder="e.g. USD 1500 - 2500 per person" suppressHydrationWarning /></div>
        <div className="space-y-2"><label className="block text-sm font-medium text-body">{ui.tailorMadeAccommodationStyle}</label><select className="w-full rounded-2xl border border-line-strong bg-white px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary" name="accommodationStyle" autoComplete="off" defaultValue="" suppressHydrationWarning><option value="">{ui.tailorMadeAccommodationChoose}</option><option value="Budget">{ui.tailorMadeAccommodationBudget}</option><option value="Comfort">{ui.tailorMadeAccommodationComfort}</option><option value="Luxury">{ui.tailorMadeAccommodationLuxury}</option><option value="Mixed">{ui.tailorMadeAccommodationMixed}</option></select></div>
        <div className="space-y-2 md:col-span-2"><label className="block text-sm font-medium text-body">{ui.tailorMadeActivities}</label><input className="w-full rounded-2xl border border-line-strong bg-white px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary" name="activities" autoComplete="off" placeholder={ui.tailorMadeActivitiesPlaceholder} suppressHydrationWarning /></div>
        <div className="space-y-2 md:col-span-2"><label className="block text-sm font-medium text-body">{ui.bookingSpecialRequests}</label><textarea className="w-full rounded-2xl border border-line-strong bg-white px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary" name="specialRequests" autoComplete="off" rows={5} placeholder={ui.tailorMadeNotesPlaceholder} suppressHydrationWarning /></div>

        <div className="md:col-span-2">
          <button className="rounded-full bg-primary px-5 py-2.5 font-semibold text-white transition hover:bg-primary-hover disabled:opacity-60" disabled={busy || !hasTrips}>
            {busy ? ui.bookingSubmitting : ui.tailorMadeRequestButton}
          </button>
        </div>

        {status && <div className="md:col-span-2"><div className="rounded-2xl bg-success-light px-4 py-3 text-sm text-success-dark">{status}</div></div>}
        {error && <div className="md:col-span-2"><div className="rounded-2xl bg-danger-light px-4 py-3 text-sm text-danger-dark">{error}</div></div>}
      </div>
    </form>
  );
}