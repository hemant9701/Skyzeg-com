'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { pickTranslation } from '@/shared/utils/localize';
import { getStrings } from '@/lib/ui-strings';

export default function HeroSlider({ slides, languageCode }: { slides: any[]; languageCode: string }) {
  const ui = getStrings(languageCode);
  const slidesList = Array.isArray(slides) ? slides : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (slidesList.length < 2 || isPaused || shouldReduceMotion) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setActiveIndex((value) => (value + 1) % slidesList.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [slidesList.length, activeIndex, isPaused, shouldReduceMotion]);

  const canRenderCarouselControls = slidesList.length > 1;

  if (!slidesList.length) {
    return (
      <section className="site-hero relative min-h-[560px] overflow-hidden bg-[var(--color-light)] text-white sm:min-h-[600px]">
        <div className="absolute inset-0 bg-center bg-cover md:bg-fixed" style={{ backgroundImage: 'url(/images/placeholder.svg)' }} aria-hidden="true" />
        <div className="absolute inset-0 bg-dark/55" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-light/60 to-light" aria-hidden="true" />
        <div className="site-hero-slider-content relative mx-auto flex min-h-[560px] max-w-7xl items-center px-4 sm:min-h-[600px] sm:px-6 lg:px-8">
          <div className="max-w-2xl pb-10">
            <h1 className="font-heading font-normal text-4xl text-white sm:text-5xl">{ui.heroTitle}</h1>
            <p className="mt-4 text-lg text-white/90">{ui.heroSubtitle}</p>
            <Link href="/trips" className="mt-8 inline-flex rounded-full bg-primary px-5 py-1 font-semibold text-white transition hover:bg-primary-hover">{ui.heroCta}</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="site-hero relative overflow-hidden bg-dark"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={(event) => { if (!event.currentTarget.contains(document.activeElement)) setIsPaused(false); }}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node) && !event.currentTarget.matches(':hover')) setIsPaused(false); }}
    >
      <div className="relative h-[75vh] min-h-[560px] overflow-hidden sm:min-h-[600px]">
        {slidesList.map((slide, index) => (
          <div key={String(slide._id || index)} aria-hidden={index !== activeIndex} className={`absolute inset-0 transition-opacity duration-[1000ms] ease-in-out motion-reduce:transition-none ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}>
          <Image
            src={slide.imageUrl || '/images/placeholder.svg'}
            alt={String(pickTranslation(slide, languageCode)?.title || ui.heroTitle)}
            fill
            priority={index === 0}
            loading={index === 0 ? undefined : 'eager'}
            sizes="100vw"
            quality={72}
            className="object-cover"
          />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-dark/55" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-light/60 to-light" aria-hidden="true" />
        {slidesList.map((slide, index) => {
          const translation = pickTranslation(slide, languageCode) as any;
          return (
          <div key={String(slide._id || index)} aria-hidden={index !== activeIndex} inert={index !== activeIndex} className={`site-hero-slider-content absolute inset-0 mx-auto flex h-full max-w-7xl items-center px-4 transition-opacity duration-[800ms] ease-in-out motion-reduce:transition-none sm:px-6 lg:px-8 ${index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
            <div className="max-w-2xl">
              <span className="mb-3 inline-flex rounded-full bg-white/90 px-4 py-1 text-sm font-semibold text-dark">{ui.heroBadge}</span>
              <h1 className="font-heading font-normal text-4xl text-white sm:text-5xl">{translation?.title || ui.heroTitle}</h1>
              <p className="mt-4 text-lg text-white/90">
                {typeof translation?.subtitle === 'string'
                  ? translation.subtitle.replace(/<[^>]*>/g, '')
                  : ui.heroSubtitle}
              </p>
              <Link href={slide.buttonUrl || '/trips'} className="mt-8 inline-flex rounded-full bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-hover">
                {translation?.buttonText || ui.heroCtaDefault}
              </Link>
            </div>
          </div>
          );
        })}
      </div>

      {canRenderCarouselControls && (
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
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="absolute right-4 top-[90%] hidden -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur md:inline-flex"
            onClick={() => setActiveIndex((value) => (value + 1) % slidesList.length)}
            aria-label={ui.carouselNextSlide}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}
