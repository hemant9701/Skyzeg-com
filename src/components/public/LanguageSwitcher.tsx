'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { languageCookieName } from '@/lib/language-cookie';

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
        className="rounded-full px-3 bg-slate-100 py-2 text-sm font-medium text-[#334155] transition hover:bg-slate-100"
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
      >
        {current?.short || current?.name || 'Language'}
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg" role="listbox">
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
              onClick={() => changeLanguage(language.code)}
            >
              {language.code === active && <span className="mr-2 text-[#1C398E]">✓</span>}
              {language.short || language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
