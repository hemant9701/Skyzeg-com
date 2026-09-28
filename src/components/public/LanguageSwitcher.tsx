'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { languageCookieName } from '@/lib/language-cookie';
import { ChevronDown, Languages } from 'lucide-react';

export default function LanguageSwitcher({ languages, active }: { languages: { code: string; name: string; short?: string }[]; active: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function changeLanguage(code: string) {
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `${languageCookieName}=${encodeURIComponent(code)};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    setOpen(false);
    router.refresh();
  }

  const current = languages.find((language) => language.code === active) || languages[0];

  return (
    <div className="relative inline-flex" ref={containerRef}>
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-full border border-line bg-white/90 px-3 py-2 text-sm font-medium text-body shadow-sm transition hover:border-line-strong hover:bg-light"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
      >
        <Languages width={16} height={16} className="shrink-0" />
        <span className="leading-none">{current?.short || current?.name || 'Language'}</span>
        <ChevronDown size={14} className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-40 rounded-2xl border border-line bg-white p-2 shadow-lg" role="listbox">
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm text-body transition hover:bg-light"
              onClick={() => changeLanguage(language.code)}
            >
              {language.short || language.name}
              {language.code === active && <span className="ml-2 text-primary">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
