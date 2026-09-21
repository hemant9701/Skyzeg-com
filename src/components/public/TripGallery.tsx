'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import CardSlider from './CardSlider';

interface GalleryImage {
  url: string;
  altText?: string;
}

interface TripGalleryProps {
  images: GalleryImage[];
  title?: string;
}

export default function TripGallery({ images, title }: TripGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowLeft') {
        setActiveIndex((index) => index === null ? null : (index - 1 + images.length) % images.length);
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((index) => index === null ? null : (index + 1) % images.length);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [images.length, isOpen]);

  const activeImage = activeIndex === null ? null : images[activeIndex];

  return (
    <>
      <CardSlider>
        {images.map((image, index) => (
          <button
            key={`${image.url}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group block w-full overflow-hidden rounded-2xl border border-line bg-white text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`View ${image.altText || title || 'gallery image'}`}
          >
            <Image
              src={image.url}
              alt={image.altText || title || 'Trip gallery image'}
              width={800}
              height={560}
              className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </CardSlider>

      {activeImage && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.altText || title || 'Gallery image'}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 z-10 rounded-full p-2 text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close gallery"
          >
            <X size={28} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex((index) => index === null ? null : (index - 1 + images.length) % images.length);
                }}
                className="absolute left-3 z-10 rounded-full p-2 text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-8"
                aria-label="Previous gallery image"
              >
                <ChevronLeft size={36} />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex((index) => index === null ? null : (index + 1) % images.length);
                }}
                className="absolute right-3 z-10 rounded-full p-2 text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-8"
                aria-label="Next gallery image"
              >
                <ChevronRight size={36} />
              </button>
            </>
          )}

          <div className="relative h-[min(78vh,720px)] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <Image
              src={activeImage.url}
              alt={activeImage.altText || title || 'Trip gallery image'}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/80">
            {activeIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
