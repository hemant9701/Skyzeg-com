'use client';

import { useState, useEffect } from 'react';
import { File, Folder, Loader2 } from 'lucide-react';

export default function ImageUploadInput({ value, onChange, folder = 'media' }: { value?: string; onChange: (value: string) => void; folder?: string }) {
  const [busy, setBusy] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [canDeleteMedia, setCanDeleteMedia] = useState(false);
  const [libraryBusy, setLibraryBusy] = useState(false);
  const [uploadError, setUploadError] = useState('');

  async function loadMediaLibrary() {
    setLibraryBusy(true);
    try {
      const response = await fetch(`/api/admin/collections/media?pageSize=200`);
      const json = await response.json();
      setMediaItems(json.data?.items || []);
      setCanDeleteMedia(Boolean(json.data?.canDelete));
    } finally {
      setLibraryBusy(false);
    }
  }

  async function upload(file?: File) {
    if (!file) return;
    setUploadError('');
    setBusy(true);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('folder', folder);
      form.append('convertToWebp', 'true');
      const response = await fetch('/api/media/upload', { method: 'POST', body: form });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.message || `Upload failed (${response.status})`);
      if (!result?.data?.url) throw new Error('Upload completed without returning a file URL');
      onChange(result.data.url);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
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
      {value && <img src={value} alt="Preview" className="h-40 w-full rounded-lg border border-admin-line object-cover" />}
      <input
        className="w-full rounded-lg border border-admin-line bg-admin-canvas/50 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-admin-accent"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/images/placeholder.svg"
      />
      <div className="flex flex-wrap gap-2">
        <input
          className="min-w-0 flex-1 rounded-lg border border-admin-line bg-admin-canvas/50 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-admin-accent"
          type="file"
          accept="image/*,.svg,.pdf,video/*"
          onChange={(e) => {
            const file = e.currentTarget.files?.[0];
            e.currentTarget.value = '';
            void upload(file);
          }}
          disabled={busy}
        />
        <button
          type="button"
          onClick={() => {
            setShowLibrary(true);
            loadMediaLibrary();
          }}
          className="rounded-lg border border-admin-line bg-admin-panel px-4 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-admin-canvas/40 flex items-center gap-2"
        >
          <Folder size={18} />
          Library
        </button>
      </div>
      {uploadError && <p role="alert" className="text-sm text-danger">{uploadError}</p>}

      {/* Media Library Modal */}
      {showLibrary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-screen w-full max-w-4xl overflow-y-auto rounded-xl bg-admin-panel p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-100">Media Library</h3>
              <button
                type="button"
                onClick={() => setShowLibrary(false)}
                className="rounded-lg border border-admin-line px-3 py-1.5 text-sm text-admin-muted hover:bg-admin-canvas/40"
              >
                Close
              </button>
            </div>
            {libraryBusy ? (
              <div className="flex items-center justify-center gap-2 py-8 text-admin-muted"><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading...</div>
            ) : mediaItems.length === 0 ? (
              <div className="py-8 text-center text-admin-muted">No media files uploaded yet</div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {mediaItems.map((item) => (
                  <div
                    key={item._id}
                    className="group relative overflow-hidden rounded-lg border border-admin-line bg-admin-canvas/40"
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
                        className="rounded-lg bg-admin-panel px-2 py-1 text-xs font-medium text-slate-100 hover:bg-slate-100"
                      >
                        Select
                      </button>
                      {canDeleteMedia && <button
                        type="button"
                        onClick={() => deleteMedia(item._id)}
                        className="rounded-lg bg-red-500 px-2 py-1 text-xs font-medium text-white hover:bg-red-600"
                      >
                        Delete
                      </button>}
                    </div>
                    <div className="truncate p-2 text-xs text-admin-muted">{item.originalName}</div>
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
