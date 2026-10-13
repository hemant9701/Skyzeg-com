import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';
import LoginForm from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
  return (
    <main className="h-dvh overflow-hidden bg-admin-canvas text-white [color-scheme:dark] p-2 sm:p-4">
      <div className="mx-auto grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] max-lg:[@media(max-height:760px)]:grid-rows-1 max-w-[1600px] overflow-hidden rounded-3xl border border-admin-line bg-admin-panel shadow-xl shadow-black/20 lg:grid-cols-2 lg:grid-rows-1">
        <section className="relative isolate flex min-h-0 flex-col justify-between overflow-hidden bg-admin-canvas p-5 text-white lg:p-8 xl:p-10 max-lg:[@media(max-height:760px)]:hidden" aria-label="SkyZeg travel">
          <Image src="/uploads/destinations/nepal-home-1783773370723.webp" alt="Illuminated monasteries beneath the Himalayan mountains and night sky in Nepal" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-admin-canvas/40 via-admin-canvas/20 to-admin-canvas/95" />
          <span className="w-fit rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] backdrop-blur-sm">THE SKYZEG EXPERIENCE</span>
          <div className="mt-5 max-w-lg lg:mt-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-admin-accent">Extraordinary places. Personal journeys.</p>
            <h2 className="font-semibold tracking-tight text-2xl leading-[1.1] lg:text-4xl xl:text-5xl">Every great journey<br />starts with you.</h2>
            <p className="mt-4 hidden max-w-sm lg:block text-sm leading-7 text-white/80 sm:text-base">Bring destinations to life and create unforgettable travel experiences with SkyZeg.</p>
            <div className="mt-5 hidden items-center lg:flex gap-2 border-t border-white/20 pt-5 text-xs text-white/80"><MapPin size={15} aria-hidden="true" />The Himalayas, Nepal</div>
          </div>
        </section>
        <section className="flex min-h-0 flex-col overflow-y-auto px-6 py-4 sm:px-12 lg:px-16 xl:px-24">
          <Link href="/" className="inline-flex w-fit items-center gap-2 rounded text-sm text-admin-muted transition hover:text-admin-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-admin-accent"><ArrowLeft size={16} aria-hidden="true" />Back to website</Link>
          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-4">
            <Link href="/" className="mb-4 w-fit rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-admin-accent" aria-label="SkyZeg home">
              <Image src="/uploads/logos/skyzeglogo-1786884691592.webp" alt="SkyZeg" width={204} height={120} priority className="h-auto w-24 brightness-0 invert" />
            </Link>
            <LoginForm />
          </div>
          <p className="text-center text-xs text-admin-muted">SkyZeg · Travel &amp; experiences</p>
        </section>
      </div>
    </main>
  );
}
