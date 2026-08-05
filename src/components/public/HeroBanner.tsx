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
  imageSrc = '/images/placeholder.svg',
  children,
  className = '',
  contentClassName = 'max-w-3xl',
  minHeightClassName = 'min-h-[480px]',
  contentAlign = 'bottom'
}: HeroBannerProps) {
  const alignClassName = contentAlign === 'center' ? 'items-center py-24' : 'items-end pb-12 pt-24';

  return (
    <section
      className={`relative isolate overflow-hidden bg-[var(--travel-light)] text-white ${minHeightClassName} ${className}`}
    >
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${imageSrc})`, backgroundAttachment: 'fixed' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-slate-950/55" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-[#F1F5F9]/60 to-[#F1F5F9]" aria-hidden="true" />
      <div className={`relative mx-auto flex h-full max-w-7xl px-4 sm:px-6 lg:px-8 ${alignClassName}`}>
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
}