'use client';

import { useEffect, useState } from 'react';

const bookingStatuses = ['pending', 'confirmed', 'cancelled', 'completed'] as const;
const paymentStatuses = ['unpaid', 'paid', 'refunded'] as const;

type BookingStatus = typeof bookingStatuses[number];
type PaymentStatus = typeof paymentStatuses[number];

export default function BookingManager() {
  const [items, setItems] = useState<any[]>([]);
  const [tailorMadeItems, setTailorMadeItems] = useState<any[]>([]);
  const [contactItems, setContactItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'tailor-made' | 'contact'>('bookings');
  const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all');
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  async function updateBooking(id: string, field: 'status' | 'paymentStatus', value: BookingStatus | PaymentStatus) {
    setSavingId(id);
    setError('');
    try {
      const response = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, [field]: value }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error?.message || 'Unable to update booking');
      setItems((current) => current.map((booking) => booking._id === id ? { ...booking, [field]: value } : booking));
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Unable to update booking');
    } finally {
      setSavingId(null);
    }
  }

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void (async () => {
        try {
          const [bookingResponse, tailorMadeResponse, contactResponse] = await Promise.all([
            fetch(`/api/bookings?pageSize=100${statusFilter === 'all' ? '' : `&status=${statusFilter}`}`),
            fetch('/api/tailor-made?pageSize=100'),
            fetch('/api/contact?pageSize=100')
          ]);
          const [bookingJson, tailorMadeJson, contactJson] = await Promise.all([
            bookingResponse.json(),
            tailorMadeResponse.json(),
            contactResponse.json()
          ]);
          if (!bookingResponse.ok || !tailorMadeResponse.ok || !contactResponse.ok) {
            throw new Error('Unable to load booking requests');
          }
          setItems(bookingJson.data?.items || []);
          setTailorMadeItems(tailorMadeJson.data?.items || []);
          setContactItems(contactJson.data?.items || []);
        } catch (loadError) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load booking requests');
        }
      })();
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [statusFilter]);

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-slate-100">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Bookings</h1>
          <p className="mt-1 text-sm text-slate-400">Review requests and keep payment records current.</p>
        </div>
        {activeTab === 'bookings' && (
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as 'all' | BookingStatus)}
            className="rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-accent"
            aria-label="Filter bookings by status"
          >
            <option value="all">All statuses</option>
            {bookingStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
        )}
      </div>
      {error && <p className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}
      <div role="tablist" aria-label="Booking form submissions" className="mb-5 grid grid-cols-1 border-b border-white/10 sm:grid-cols-3">
        <button id="tab-bookings" type="button" role="tab" aria-selected={activeTab === 'bookings'} aria-controls="panel-bookings" onClick={() => setActiveTab('bookings')} className={`border-b-2 px-3 py-3 text-left text-sm font-medium transition ${activeTab === 'bookings' ? 'border-accent text-white' : 'border-transparent text-slate-400 hover:text-white'}`}>
          Trip bookings <span className="ml-2 text-xs text-slate-400">{items.length}</span>
        </button>
        <button id="tab-tailor-made" type="button" role="tab" aria-selected={activeTab === 'tailor-made'} aria-controls="panel-tailor-made" onClick={() => setActiveTab('tailor-made')} className={`border-b-2 px-3 py-3 text-left text-sm font-medium transition ${activeTab === 'tailor-made' ? 'border-accent text-white' : 'border-transparent text-slate-400 hover:text-white'}`}>
          Tailor-made <span className="ml-2 text-xs text-slate-400">{tailorMadeItems.length}</span>
        </button>
        <button id="tab-contact" type="button" role="tab" aria-selected={activeTab === 'contact'} aria-controls="panel-contact" onClick={() => setActiveTab('contact')} className={`border-b-2 px-3 py-3 text-left text-sm font-medium transition ${activeTab === 'contact' ? 'border-accent text-white' : 'border-transparent text-slate-400 hover:text-white'}`}>
          Contact <span className="ml-2 text-xs text-slate-400">{contactItems.length}</span>
        </button>
      </div>
      {activeTab === 'bookings' && <div id="panel-bookings" role="tabpanel" aria-labelledby="tab-bookings" className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead><tr><th className="px-3 py-2 text-left font-medium text-slate-400">Booking No.</th><th className="px-3 py-2 text-left font-medium text-slate-400">Lead</th><th className="px-3 py-2 text-left font-medium text-slate-400">Email</th><th className="px-3 py-2 text-left font-medium text-slate-400">Travellers</th><th className="px-3 py-2 text-left font-medium text-slate-400">Total</th><th className="px-3 py-2 text-left font-medium text-slate-400">Status</th><th className="px-3 py-2 text-left font-medium text-slate-400">Payment</th><th className="px-3 py-2 text-left font-medium text-slate-400">Date</th></tr></thead>
          <tbody>{items.map((booking) => <tr key={booking._id} className="border-t border-white/5"><td className="px-3 py-3 font-mono text-xs text-slate-300">{booking.bookingNumber}</td><td className="px-3 py-3">{booking.leadName}</td><td className="px-3 py-3">{booking.leadEmail}</td><td className="px-3 py-3">{booking.travellersCount}</td><td className="px-3 py-3">{booking.currency} {booking.totalAmount}</td><td className="px-3 py-3"><select value={booking.status} disabled={savingId === booking._id} onChange={(event) => void updateBooking(booking._id, 'status', event.target.value as BookingStatus)} className="rounded-full border-0 bg-sky-500/20 px-2.5 py-1 text-xs font-semibold text-sky-300 outline-none"><option className="bg-slate-800" value="pending">pending</option><option className="bg-slate-800" value="confirmed">confirmed</option><option className="bg-slate-800" value="cancelled">cancelled</option><option className="bg-slate-800" value="completed">completed</option></select></td><td className="px-3 py-3"><select value={booking.paymentStatus || 'unpaid'} disabled={savingId === booking._id} onChange={(event) => void updateBooking(booking._id, 'paymentStatus', event.target.value as PaymentStatus)} className="rounded-full border-0 bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-300 outline-none"><option className="bg-slate-800" value="unpaid">unpaid</option><option className="bg-slate-800" value="paid">paid</option><option className="bg-slate-800" value="refunded">refunded</option></select></td><td className="px-3 py-3">{new Date(booking.createdAt).toLocaleString()}</td></tr>)}</tbody>
        </table>
        {!items.length && <p className="py-10 text-center text-sm text-slate-400">No bookings found.</p>}
      </div>}

      {activeTab === 'tailor-made' && <section id="panel-tailor-made" role="tabpanel" aria-labelledby="tab-tailor-made">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-sm">
            <thead><tr><th className="px-3 py-2 text-left font-medium text-slate-400">Request No.</th><th className="px-3 py-2 text-left font-medium text-slate-400">Name / Email</th><th className="px-3 py-2 text-left font-medium text-slate-400">Trip / Destination</th><th className="px-3 py-2 text-left font-medium text-slate-400">Travel plan</th><th className="px-3 py-2 text-left font-medium text-slate-400">Budget / Stay</th><th className="px-3 py-2 text-left font-medium text-slate-400">Activities / Notes</th><th className="px-3 py-2 text-left font-medium text-slate-400">Received</th></tr></thead>
            <tbody>{tailorMadeItems.map((request) => <tr key={request._id} className="border-t border-white/5 align-top"><td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-slate-300">{request.requestNumber}</td><td className="px-3 py-3">{request.leadName}<br /><a className="text-sky-300 hover:underline" href={`mailto:${request.leadEmail}`}>{request.leadEmail}</a><br /><span className="text-slate-400">{request.leadPhone || 'No phone'}</span></td><td className="px-3 py-3">{request.tripTitle}<br /><span className="text-slate-400">{request.preferredDestination}</span></td><td className="px-3 py-3">{request.travelDate ? new Date(request.travelDate).toLocaleDateString() : 'Flexible'}<br /><span className="text-slate-400">{request.durationDays ? `${request.durationDays} days` : 'Duration flexible'} / {request.travellersCount} travellers</span></td><td className="px-3 py-3">{request.budgetRange || 'Not specified'}<br /><span className="text-slate-400">{request.accommodationStyle || 'Stay not specified'}</span></td><td className="max-w-xs px-3 py-3">{request.activities || 'No activities specified'}<br /><span className="whitespace-pre-wrap text-slate-400">{request.specialRequests || 'No additional notes'}</span></td><td className="whitespace-nowrap px-3 py-3">{new Date(request.createdAt).toLocaleString()}</td></tr>)}</tbody>
          </table>
          {!tailorMadeItems.length && <p className="py-8 text-center text-sm text-slate-400">No tailor-made requests found.</p>}
        </div>
      </section>}

      {activeTab === 'contact' && <section id="panel-contact" role="tabpanel" aria-labelledby="tab-contact">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-sm">
            <thead><tr><th className="px-3 py-2 text-left font-medium text-slate-400">Name / Email</th><th className="px-3 py-2 text-left font-medium text-slate-400">Phone</th><th className="px-3 py-2 text-left font-medium text-slate-400">Subject</th><th className="px-3 py-2 text-left font-medium text-slate-400">Message</th><th className="px-3 py-2 text-left font-medium text-slate-400">Received</th></tr></thead>
            <tbody>{contactItems.map((enquiry) => <tr key={enquiry._id} className="border-t border-white/5 align-top"><td className="px-3 py-3">{enquiry.fullName}<br /><a className="text-sky-300 hover:underline" href={`mailto:${enquiry.email}`}>{enquiry.email}</a></td><td className="px-3 py-3">{enquiry.phone || 'Not provided'}</td><td className="px-3 py-3">{enquiry.subject}</td><td className="max-w-lg whitespace-pre-wrap px-3 py-3">{enquiry.message}</td><td className="whitespace-nowrap px-3 py-3">{new Date(enquiry.createdAt).toLocaleString()}</td></tr>)}</tbody>
          </table>
          {!contactItems.length && <p className="py-8 text-center text-sm text-slate-400">No contact enquiries found.</p>}
        </div>
      </section>}
    </div>
  );
}
