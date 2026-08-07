'use client';

import { useEffect, useState } from 'react';
import { File } from 'lucide-react';
import ImageUploadInput from './ImageUploadInput';

export default function MediaLibrary() {
  const [items, setItems] = useState<any[]>([]);
  const [busy, setBusy] = useState(false);

  async function load() {
    const response = await fetch('/api/admin/collections/media?pageSize=100');
    const json = await response.json();
    setItems(json.data?.items || []);
  }

  async function deleteMedia(mediaId: string) {
    if (!confirm('Delete this media file?')) return;
    setBusy(true);
    try {
      const response = await fetch(`/api/admin/collections/media/${mediaId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Delete failed');
      await load();
    } catch (err: any) {
      alert(err.message || 'Failed to delete media');
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void load();
    }, 0);

    return () => window.clearTimeout(timerId);
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-slate-100">
      <h1 className="mb-4 text-xl font-semibold">Media Library</h1>
      <div className="mb-4"><ImageUploadInput folder="media" onChange={load} /></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        {items.map((item) => (
          <div key={item._id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-2">
            {item.type === 'image' ? (
              <img src={item.url} alt={item.altText || item.originalName} className="h-28 w-full rounded-xl object-cover" loading="lazy" />
            ) : (
              <File size={48} className="text-slate-400" />
            )}
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition group-hover:opacity-100">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-white px-2 py-1 text-xs font-medium text-slate-900 hover:bg-slate-100"
              >
                View
              </a>
              <button
                type="button"
                onClick={() => deleteMedia(item._id)}
                disabled={busy}
                className="rounded-lg bg-red-500 px-2 py-1 text-xs font-medium text-white hover:bg-red-600 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
            <div className="mt-2 truncate text-sm text-slate-300">{item.originalName}</div>
            <code className="mt-1 block truncate text-xs text-slate-500">{item.url}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
