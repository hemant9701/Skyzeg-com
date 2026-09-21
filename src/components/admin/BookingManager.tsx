'use client';

import { useEffect, useState } from 'react';

const bookingStatuses = ['pending', 'confirmed', 'cancelled', 'completed'] as const;
const paymentStatuses = ['unpaid', 'paid', 'refunded'] as const;

type BookingStatus = typeof bookingStatuses[number];
type PaymentStatus = typeof paymentStatuses[number];

export default function BookingManager() {
  const [items, setItems] = useState<any[]>([]);
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
        const response = await fetch(`/api/bookings?pageSize=100${statusFilter === 'all' ? '' : `&status=${statusFilter}`}`);
        const json = await response.json();
        setItems(json.data?.items || []);
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
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as 'all' | BookingStatus)}
          className="rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-accent"
          aria-label="Filter bookings by status"
        >
          <option value="all">All statuses</option>
          {bookingStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
        </select>
      </div>
      {error && <p className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead><tr><th className="px-3 py-2 text-left font-medium text-slate-400">Booking No.</th><th className="px-3 py-2 text-left font-medium text-slate-400">Lead</th><th className="px-3 py-2 text-left font-medium text-slate-400">Email</th><th className="px-3 py-2 text-left font-medium text-slate-400">Travellers</th><th className="px-3 py-2 text-left font-medium text-slate-400">Total</th><th className="px-3 py-2 text-left font-medium text-slate-400">Status</th><th className="px-3 py-2 text-left font-medium text-slate-400">Payment</th><th className="px-3 py-2 text-left font-medium text-slate-400">Date</th></tr></thead>
          <tbody>{items.map((booking) => <tr key={booking._id} className="border-t border-white/5"><td className="px-3 py-3 font-mono text-xs text-slate-300">{booking.bookingNumber}</td><td className="px-3 py-3">{booking.leadName}</td><td className="px-3 py-3">{booking.leadEmail}</td><td className="px-3 py-3">{booking.travellersCount}</td><td className="px-3 py-3">{booking.currency} {booking.totalAmount}</td><td className="px-3 py-3"><select value={booking.status} disabled={savingId === booking._id} onChange={(event) => void updateBooking(booking._id, 'status', event.target.value as BookingStatus)} className="rounded-full border-0 bg-sky-500/20 px-2.5 py-1 text-xs font-semibold text-sky-300 outline-none"><option className="bg-slate-800" value="pending">pending</option><option className="bg-slate-800" value="confirmed">confirmed</option><option className="bg-slate-800" value="cancelled">cancelled</option><option className="bg-slate-800" value="completed">completed</option></select></td><td className="px-3 py-3"><select value={booking.paymentStatus || 'unpaid'} disabled={savingId === booking._id} onChange={(event) => void updateBooking(booking._id, 'paymentStatus', event.target.value as PaymentStatus)} className="rounded-full border-0 bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-300 outline-none"><option className="bg-slate-800" value="unpaid">unpaid</option><option className="bg-slate-800" value="paid">paid</option><option className="bg-slate-800" value="refunded">refunded</option></select></td><td className="px-3 py-3">{new Date(booking.createdAt).toLocaleString()}</td></tr>)}</tbody>
        </table>
        {!items.length && <p className="py-10 text-center text-sm text-slate-400">No bookings found.</p>}
      </div>
    </div>
  );
}
