'use client';

import { useEffect, useState } from 'react';

export default function BookingManager() {
  const [items, setItems] = useState<any[]>([]);

  async function load() {
    const response = await fetch('/api/bookings?pageSize=100');
    const json = await response.json();
    setItems(json.data?.items || []);
  }

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void load();
    }, 0);

    return () => window.clearTimeout(timerId);
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-slate-100">
      <h1 className="mb-4 text-xl font-semibold">Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead><tr><th className="px-3 py-2 text-left font-medium text-slate-400">Booking No.</th><th className="px-3 py-2 text-left font-medium text-slate-400">Lead</th><th className="px-3 py-2 text-left font-medium text-slate-400">Email</th><th className="px-3 py-2 text-left font-medium text-slate-400">Travellers</th><th className="px-3 py-2 text-left font-medium text-slate-400">Total</th><th className="px-3 py-2 text-left font-medium text-slate-400">Status</th><th className="px-3 py-2 text-left font-medium text-slate-400">Date</th></tr></thead>
          <tbody>{items.map((booking) => <tr key={booking._id} className="border-t border-white/5"><td className="px-3 py-3 font-mono text-xs text-slate-300">{booking.bookingNumber}</td><td className="px-3 py-3">{booking.leadName}</td><td className="px-3 py-3">{booking.leadEmail}</td><td className="px-3 py-3">{booking.travellersCount}</td><td className="px-3 py-3">{booking.currency} {booking.totalAmount}</td><td className="px-3 py-3"><span className="rounded-full bg-sky-500/20 px-2.5 py-1 text-xs font-semibold text-sky-300">{booking.status}</span></td><td className="px-3 py-3">{new Date(booking.createdAt).toLocaleString()}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
