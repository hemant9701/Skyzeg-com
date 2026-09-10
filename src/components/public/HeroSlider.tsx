'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { pickTranslation } from '@/shared/utils/localize';
import { getStrings } from '@/lib/ui-strings';

export default function HeroSlider({ slides, languageCode }: { slides: any[]; languageCode: string }) {
  const ui = getStrings(languageCode);
  const slidesList = Array.isArray(slides) ? slides : [];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slidesList.length < 2) return;
    const id = window.setInterval(() => {
      setActiveIndex((value) => (value + 1) % slidesList.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [slidesList.length]);

  if (!slidesList.length) {
    return (
      <section className="site-hero relative min-h-[560px] overflow-hidden bg-[var(--color-light)] text-white sm:min-h-[600px]">
        <div className="absolute inset-0 bg-center bg-cover md:bg-fixed" style={{ backgroundImage: 'url(/images/placeholder.svg)' }} aria-hidden="true" />
        <div className="absolute inset-0 bg-dark/55" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-light/60 to-light" aria-hidden="true" />
        <div className="site-hero-slider-content relative mx-auto flex min-h-[560px] max-w-7xl items-center px-4 sm:min-h-[600px] sm:px-6 lg:px-8">
          <div className="max-w-2xl pb-10">
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">{ui.heroTitle}</h1>
            <p className="mt-4 text-lg text-white/90">{ui.heroSubtitle}</p>
            <Link href="/trips" className="mt-8 inline-flex rounded-full bg-primary px-5 py-1 font-semibold text-white transition hover:bg-primary-hover">{ui.heroCta}</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="site-hero relative overflow-hidden bg-[var(--color-light)]">
      <div className="relative h-[75vh] min-h-[560px] overflow-hidden sm:min-h-[600px]">
        {slidesList.map((slide, index) => {
          const t = pickTranslation(slide, languageCode) as any;
          const imageSrc = slide.imageUrl || '/images/placeholder.svg';
          const isActive = index === activeIndex;

          return (
            <section
              className={`absolute inset-0 h-full w-full bg-center bg-cover transition-opacity duration-700 md:bg-fixed ${isActive ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
              style={{ backgroundImage: `url(${imageSrc})` }}
              key={String(slide._id)}
            >
              <div className="absolute inset-0 bg-dark/55" />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-light/60 to-light" />
              <div className="site-hero-slider-content relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                  <span className="mb-3 inline-flex rounded-full bg-white/90 px-4 py-1 text-sm font-semibold text-dark">{ui.heroBadge}</span>
                  <h1 className="text-4xl font-semibold text-white sm:text-5xl">{t?.title || ui.heroTitle}</h1>
                  <p className="mt-4 text-lg text-white/90">
                    {typeof t?.subtitle === 'string'
                      ? t.subtitle.replace(/<[^>]*>/g, '')
                      : ui.heroSubtitle}
                  </p>
                  <Link href={slide.buttonUrl || '/trips'} className="mt-8 inline-flex rounded-full bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-hover">
                      {t?.buttonText || ui.heroCtaDefault}
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {slidesList.length > 1 && (
        <>
          <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full bg-dark/60 px-3 py-2 backdrop-blur">
            {slidesList.map((slide, index) => (
              <button
                key={String(slide._id)}
                type="button"
                className={`h-2.5 w-2.5 rounded-full transition ${index === activeIndex ? 'bg-light' : 'bg-white/60'}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`${ui.carouselGoToSlide} ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="absolute right-16 top-[90%] hidden -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur md:inline-flex"
            onClick={() => setActiveIndex((value) => (value - 1 + slidesList.length) % slidesList.length)}
            aria-label={ui.carouselPreviousSlide}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            type="button"
            className="absolute right-4 top-[90%] hidden -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur md:inline-flex"
            onClick={() => setActiveIndex((value) => (value + 1) % slidesList.length)}
            aria-label={ui.carouselNextSlide}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </>
      )}
    </div>
  );
}
