import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 py-16" role="status">
      <Loader2 className="h-10 w-10 animate-spin text-primary" aria-hidden="true" />
      <span className="text-sm font-medium text-muted">Loading…</span>
    </div>
  );
}
