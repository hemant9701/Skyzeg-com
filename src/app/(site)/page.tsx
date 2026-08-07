import Link from 'next/link';
import Image from 'next/image';
import { getStrings } from '@/lib/ui-strings';
import HeroSlider from '@/components/public/HeroSlider';
import CardSlider from "@/components/public/CardSlider";
import TripCard from "@/components/public/TripCard";
import DestinationCard from '@/components/public/DestinationCard';
import BlogCard from '@/components/public/BlogCard';
import { HomeService } from '@/application/services/home.service';
import { getLanguageCode } from '@/lib/language';
import { pickTranslation } from '@/shared/utils/localize';
import { Compass, ShieldCheck, Users, Wallet, Route, Sparkles, ArrowRight } from 'lucide-react';
import AnimatedReveal from '@/components/public/AnimatedReveal';
import MotionSection from '@/components/public/MotionSection';
import { MotionStagger, MotionStaggerItem } from '@/components/public/MotionStagger';

function toPlain<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export default async function HomePage() {
  const languageCode = await getLanguageCode();
  const data = await new HomeService().getHomeData();
  const plainSlides = toPlain(data.sliders || []);
  const settingsTranslation = pickTranslation(data.settings as any, languageCode) as any;
  const ui = getStrings(languageCode);
  const processStepIcons = [Compass, Route, ShieldCheck];
  const trustStats = ui.homeTrustStats;
  const processSteps = ui.homeProcessSteps.map((step, index) => ({
    ...step,
    icon: processStepIcons[index] || Route
  }));
  const whyCardIcons = [Users, Wallet, ShieldCheck, Sparkles];
  const whyCards = ui.homeWhyCards.map((card, index) => ({
    ...card,
    icon: whyCardIcons[index] || Sparkles
  }));

  return (
    <>
      <HeroSlider slides={plainSlides as any[]} languageCode={languageCode} />

      <MotionSection className="bg-white px-4 py-20 sm:px-6 lg:px-8" delay={0.05}>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="mb-3 inline-flex rounded-full bg-[#0F766E]/10 px-3 py-1 text-sm font-semibold text-[#0F766E]">{ui.homeAboutBadge}</span>
            <h2 className="text-4xl font-semibold leading-tight text-[#0F172A] sm:text-5xl">
              Crafting journeys that feel personal, seamless, and unforgettable.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#475569]">
              We design meaningful travel experiences across iconic and offbeat destinations. Every itinerary balances discovery, comfort,
              and local insight so your trip feels effortless from planning to return.
            </p>
            <MotionStagger className="mt-8 grid gap-4 sm:grid-cols-2">
              {trustStats.map((item) => (
                <MotionStaggerItem key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-3xl font-bold text-[#1C398E]">{item.value}</p>
                  <p className="mt-1 text-sm font-medium text-[#475569]">{item.label}</p>
                </MotionStaggerItem>
              ))}
            </MotionStagger>
          </div>

          <div className="relative h-[520px] overflow-hidden rounded-[2rem] border border-slate-200 shadow-lg">
            <Image
              src="/images/placeholder-1.webp"
              alt="Travelers exploring scenic destination"
              fill
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/75 via-slate-900/30 to-transparent p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C5A880]">Travelnext Signature</p>
              <p className="mt-2 text-xl font-semibold text-white">Handcrafted itineraries with thoughtful details.</p>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8" delay={0.08}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="mb-2 inline-flex rounded-full bg-[#1C398E]/10 px-3 py-1 text-sm font-semibold text-[#1C398E]">{ui.homeFeaturedBadge}</span>
              <h2 className="text-3xl font-semibold text-[#1C398E]">{ui.homeFeaturedTitle}</h2>
              <p className="mt-2 text-[#334155]">{ui.homeFeaturedSubtitle}</p>
            </div>
            <Link href="/destinations" className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">{ui.homeFeaturedCta}</Link>
          </div>
          <CardSlider>
            {(data.destinations as any[]).map((destination) => (
              <DestinationCard
                key={String(destination._id)}
                destination={destination}
                languageCode={languageCode}
              />
            ))}
          </CardSlider>
        </div>
      </MotionSection>

      <MotionSection className="px-4 py-20 sm:px-6 lg:px-8" delay={0.11}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="mb-2 inline-flex rounded-full bg-[#1C398E]/10 px-3 py-1 text-sm font-semibold text-[#1C398E]">{ui.homePopularBadge}</span>
              <h2 className="text-3xl font-semibold text-[#1C398E]">{ui.homePopularTitle}</h2>
              <p className="mt-2 text-[#334155]">{ui.homePopularSubtitle}</p>
            </div>
            <Link href="/trips" className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">{ui.homePopularCta}</Link>
          </div>
          <CardSlider>
            {(data.trips as any[]).map((trip) => (
              <TripCard
                key={String(trip._id)}
                trip={trip}
                languageCode={languageCode}
              />
            ))}
          </CardSlider>
        </div>
      </MotionSection>

      <MotionSection className="bg-slate-900 px-4 py-20 text-white sm:px-6 lg:px-8" delay={0.14}>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="mb-2 inline-flex rounded-full bg-[#1C398E]/20 px-3 py-1 text-sm font-semibold text-[#C5A880]">{ui.homeWhyBadge}</span>
            <h2 className="text-3xl font-semibold text-white">{settingsTranslation?.whyChooseUsTitle || 'Built for modern travel brands'}</h2>
            <div className="mt-4 max-w-xl text-lg text-slate-300" dangerouslySetInnerHTML={{ __html: settingsTranslation?.whyChooseUsBody || 'Manage content, media, bookings and SEO from one dashboard.' }} />
          </div>
          <MotionStagger className="grid gap-4 sm:grid-cols-2">
            {whyCards.map((item) => {
              const Icon = item.icon;
              return (
                <MotionStaggerItem className="rounded-3xl border border-white/10 bg-white/10 p-5" key={item.title}>
                  <Icon size={30} className="text-[#C5A880]" />
                  <h5 className="mt-3 text-lg font-semibold text-white">{item.title}</h5>
                  <p className="mt-2 text-sm text-slate-300">{item.body}</p>
                </MotionStaggerItem>
              );
            })}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="bg-gradient-to-b from-[#F8FAFC] to-white px-4 py-20 sm:px-6 lg:px-8" delay={0.17}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="mb-2 inline-flex rounded-full bg-[#1C398E]/10 px-3 py-1 text-sm font-semibold text-[#1C398E]">{ui.homeHowItWorksBadge}</span>
            <h2 className="text-3xl font-semibold text-[#0F172A] sm:text-4xl">{ui.homeHowItWorksTitle}</h2>
          </div>

          <MotionStagger className="grid gap-6 md:grid-cols-3">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <MotionStaggerItem key={step.title} className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#1C398E]/10 text-[#1C398E]">
                    <Icon size={22} />
                  </span>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#64748B]">Step {index + 1}</p>
                  <h3 className="text-xl font-semibold text-[#0F172A]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#475569]">{step.body}</p>
                </MotionStaggerItem>
              );
            })}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="px-4 py-20 sm:px-6 lg:px-8" delay={0.2}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <span className="mb-2 inline-flex rounded-full bg-[#1C398E]/10 px-3 py-1 text-sm font-semibold text-[#1C398E]">{ui.homeBlogsBadge}</span>
            <h2 className="text-3xl font-semibold text-[#1C398E]">{ui.homeBlogsTitle}</h2>
          </div>
          <MotionStagger className="grid gap-6 md:grid-cols-3 xl:grid-cols-4">
            {(data.blogs as any[]).map((blog) => (
              <MotionStaggerItem key={String(blog._id)}>
                <BlogCard blog={blog} languageCode={languageCode} />
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      {/* <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <span className="mb-2 inline-flex rounded-full bg-[#1C398E]/10 px-3 py-1 text-sm font-semibold text-[#1C398E]">{ui.homeReviewsBadge}</span>
            <h2 className="text-3xl font-semibold text-[#1C398E]">{ui.homeReviewsTitle}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-4">
            {(data.testimonials as any[]).map((testimonial) => {
              const t = pickTranslation(testimonial, languageCode) as any;
              return (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" key={String(testimonial._id)}>
                  <div className="mb-3 text-[#C5A880]">{'★'.repeat(testimonial.rating || 5)}</div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: t?.quote || '',
                    }}
                  />
                  <h6 className="mt-4 font-semibold text-[#0F172A]">{t?.customerName}</h6>
                  <small className="text-slate-500">{t?.customerLocation}</small>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      <MotionSection className="px-4 py-20 sm:px-6 lg:px-8" delay={0.23}>
        <div className="mx-auto max-w-7xl">
          <AnimatedReveal className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0F172A] via-[#12244f] to-[#1C398E] p-8 shadow-2xl shadow-slate-900/20 sm:p-10 lg:p-12">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#C5A880]/20 blur-3xl" />
            <div className="absolute bottom-0 left-10 h-32 w-32 rounded-full bg-[#7dd3fc]/10 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="max-w-3xl">
                <span className="mb-4 inline-flex rounded-full border border-[#C5A880]/30 bg-[#C5A880]/15 px-3 py-1 text-sm font-semibold text-[#F2E2C4]">
                  {ui.homeTailorMadePlanningBadge}
                </span>
                <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Ready to design your next unforgettable journey?
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  From honeymoon escapes to multi-country adventures, our travel specialists shape a personalized itinerary around your pace, budget, and dream destinations.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-100">
                    <Sparkles size={16} className="text-[#C5A880]" />
                    Personalized itineraries
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-100">
                    <Route size={16} className="text-[#C5A880]" />
                    Flexible route planning
                  </div>
                </div>

                <Link
                  href="/tailor-made"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#C5A880] px-6 py-3 font-semibold text-[#0F172A] shadow-lg shadow-[#C5A880]/20 transition hover:-translate-y-0.5 hover:bg-[#d3b07a]"
                >
                  Start Tailor-Made Plan
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="grid gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C5A880]/15 text-[#F2E2C4]">
                      <Compass size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Travel design in 3 simple steps</p>
                      <p className="mt-1 text-sm text-slate-300">Tell us your style, we build the plan, and you travel with confidence.</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-[#C5A880]/20 bg-[#C5A880]/10 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8D5B7]">Fast response</p>
                  <p className="mt-2 text-3xl font-semibold text-white">Within 24 hours</p>
                  <p className="mt-2 text-sm text-slate-300">Our team replies with ideas, recommendations, and next steps tailored to you.</p>
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </MotionSection>
    </>
  );
}
