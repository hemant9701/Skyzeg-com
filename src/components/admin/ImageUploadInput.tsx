'use client';

import { useState, useEffect } from 'react';
import { File, Folder } from 'lucide-react';

export default function ImageUploadInput({ value, onChange, folder = 'media' }: { value?: string; onChange: (value: string) => void; folder?: string }) {
  const [busy, setBusy] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [libraryBusy, setLibraryBusy] = useState(false);

  async function loadMediaLibrary() {
    setLibraryBusy(true);
    try {
      const response = await fetch(`/api/admin/collections/media?pageSize=200`);
      const json = await response.json();
      setMediaItems(json.data?.items || []);
    } finally {
      setLibraryBusy(false);
    }
  }

  async function upload(file?: File) {
    if (!file) return;
    setBusy(true);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('folder', folder);
      form.append('convertToWebp', 'true');
      const response = await fetch('/api/media/upload', { method: 'POST', body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Upload failed');
      onChange(result.data.url);
      await loadMediaLibrary();
    } finally {
      setBusy(false);
    }
  }

  async function deleteMedia(mediaId: string) {
    if (!confirm('Delete this media file?')) return;
    try {
      const response = await fetch(`/api/admin/collections/media/${mediaId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Delete failed');
      await loadMediaLibrary();
    } catch (err: any) {
      alert(err.message || 'Failed to delete media');
    }
  }

  return (
    <div className="grid gap-2">
      {value && <img src={value} alt="Preview" className="h-32 rounded-2xl object-cover" />}
      <input
        className="rounded-2xl w-2/3 border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/uploads/..."
      />
      <div className="flex gap-2">
        <input
          className="flex-1 w-1/2 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1C398E]"
          type="file"
          accept="image/*,.svg,.pdf,video/*"
          onChange={(e) => upload(e.target.files?.[0])}
          disabled={busy}
        />
        <button
          type="button"
          onClick={() => {
            setShowLibrary(true);
            loadMediaLibrary();
          }}
          className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-50 flex items-center gap-2"
        >
          <Folder size={18} />
          Library
        </button>
      </div>

      {/* Media Library Modal */}
      {showLibrary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-screen w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Media Library</h3>
              <button
                type="button"
                onClick={() => setShowLibrary(false)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
            {libraryBusy ? (
              <div className="py-8 text-center text-slate-500">Loading...</div>
            ) : mediaItems.length === 0 ? (
              <div className="py-8 text-center text-slate-500">No media files uploaded yet</div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {mediaItems.map((item) => (
                  <div
                    key={item._id}
                    className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
                  >
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt={item.originalName}
                        className="h-32 w-full cursor-pointer object-cover transition group-hover:opacity-75"
                        onClick={() => {
                          onChange(item.url);
                          setShowLibrary(false);
                        }}
                      />
                    ) : (
                      <div className="flex h-32 w-full items-center justify-center bg-slate-200">
                        <File size={32} className="text-slate-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => {
                          onChange(item.url);
                          setShowLibrary(false);
                        }}
                        className="rounded-lg bg-white px-2 py-1 text-xs font-medium text-slate-900 hover:bg-slate-100"
                      >
                        Select
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteMedia(item._id)}
                        className="rounded-lg bg-red-500 px-2 py-1 text-xs font-medium text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="truncate p-2 text-xs text-slate-600">{item.originalName}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
