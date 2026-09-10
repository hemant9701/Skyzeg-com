import type { ReactNode } from 'react';

interface HeroBannerProps {
  imageSrc?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  minHeightClassName?: string;
  contentAlign?: 'center' | 'bottom';
}

export default function HeroBanner({
  imageSrc = '/images/heroBannerImg.webp',
  children,
  className = '',
  contentClassName = 'max-w-3xl',
  minHeightClassName = 'min-h-[480px]',
  contentAlign = 'center'
}: HeroBannerProps) {
  const alignClassName =
    contentAlign === 'center'
      ? 'items-center'
      : 'items-end';

  return (
    <section
      className={`site-hero relative isolate overflow-hidden bg-[var(--color-light)] text-white ${minHeightClassName} ${className}`}
    >
      <div
        className="absolute inset-0 bg-center bg-cover md:bg-fixed"
        style={{ backgroundImage: `url(${imageSrc})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-dark/55" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-light/60 to-light" aria-hidden="true" />
      <div className={`relative mx-auto flex min-h-[inherit] max-w-7xl px-4 sm:px-6 lg:px-8 ${alignClassName}`}>
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
}
