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
            <span className="mb-3 inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent-hover">{ui.homeAboutBadge}</span>
            <h2 className="text-4xl font-semibold leading-tight text-dark sm:text-5xl">
              Crafting journeys that feel personal, seamless, and unforgettable.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-subtle">
              We design meaningful travel experiences across iconic and offbeat destinations. Every itinerary balances discovery, comfort,
              and local insight so your trip feels effortless from planning to return.
            </p>
            <MotionStagger className="mt-8 grid gap-4 sm:grid-cols-2">
              {trustStats.map((item) => (
                <MotionStaggerItem key={item.label} className="rounded-2xl border border-line bg-surface p-5">
                  <p className="text-3xl font-bold text-primary">{item.value}</p>
                  <p className="mt-1 text-sm font-medium text-subtle">{item.label}</p>
                </MotionStaggerItem>
              ))}
            </MotionStagger>
          </div>

          <div className="relative h-[520px] overflow-hidden rounded-[2rem] border border-line shadow-lg">
            <Image
              src="/images/placeholder-1.webp"
              alt="Travelers exploring scenic destination"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/75 via-dark/30 to-transparent p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Travelnext Signature</p>
              <p className="mt-2 text-xl font-semibold text-white">Handcrafted itineraries with thoughtful details.</p>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="bg-surface px-4 py-20 sm:px-6 lg:px-8" delay={0.08}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="mb-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{ui.homeFeaturedBadge}</span>
              <h2 className="text-3xl font-semibold text-primary">{ui.homeFeaturedTitle}</h2>
              <p className="mt-2 text-body">{ui.homeFeaturedSubtitle}</p>
            </div>
            <Link href="/destinations" className="inline-flex rounded-full border border-line-strong px-4 py-2 text-sm font-semibold text-body transition hover:bg-line">{ui.homeFeaturedCta}</Link>
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
              <span className="mb-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{ui.homePopularBadge}</span>
              <h2 className="text-3xl font-semibold text-primary">{ui.homePopularTitle}</h2>
              <p className="mt-2 text-body">{ui.homePopularSubtitle}</p>
            </div>
            <Link href="/trips" className="inline-flex rounded-full border border-line-strong px-4 py-2 text-sm font-semibold text-body transition hover:bg-line">{ui.homePopularCta}</Link>
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

      <MotionSection className="bg-dark px-4 py-20 text-white sm:px-6 lg:px-8" delay={0.14}>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="mb-2 inline-flex rounded-full bg-primary/20 px-3 py-1 text-sm font-semibold text-accent">{ui.homeWhyBadge}</span>
            <h2 className="text-3xl font-semibold text-white">{settingsTranslation?.whyChooseUsTitle || 'Built for modern travel brands'}</h2>
            <div className="mt-4 max-w-xl text-lg text-line-strong" dangerouslySetInnerHTML={{ __html: settingsTranslation?.whyChooseUsBody || 'Manage content, media, bookings and SEO from one dashboard.' }} />
          </div>
          <MotionStagger className="grid gap-4 sm:grid-cols-2">
            {whyCards.map((item) => {
              const Icon = item.icon;
              return (
                <MotionStaggerItem className="rounded-3xl border border-white/10 bg-white/10 p-5" key={item.title}>
                  <Icon size={30} className="text-accent" />
                  <h5 className="mt-3 text-lg font-semibold text-white">{item.title}</h5>
                  <p className="mt-2 text-sm text-line-strong">{item.body}</p>
                </MotionStaggerItem>
              );
            })}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="bg-gradient-to-b from-surface to-white px-4 py-20 sm:px-6 lg:px-8" delay={0.17}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="mb-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{ui.homeHowItWorksBadge}</span>
            <h2 className="text-3xl font-semibold text-dark sm:text-4xl">{ui.homeHowItWorksTitle}</h2>
          </div>

          <MotionStagger className="grid gap-6 md:grid-cols-3">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <MotionStaggerItem key={step.title} className="relative rounded-3xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={22} />
                  </span>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted">Step {index + 1}</p>
                  <h3 className="text-xl font-semibold text-dark">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-subtle">{step.body}</p>
                </MotionStaggerItem>
              );
            })}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="px-4 py-20 sm:px-6 lg:px-8" delay={0.2}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <span className="mb-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{ui.homeBlogsBadge}</span>
            <h2 className="text-3xl font-semibold text-primary">{ui.homeBlogsTitle}</h2>
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

      {/* <section className="bg-surface px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <span className="mb-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{ui.homeReviewsBadge}</span>
            <h2 className="text-3xl font-semibold text-primary">{ui.homeReviewsTitle}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-4">
            {(data.testimonials as any[]).map((testimonial) => {
              const t = pickTranslation(testimonial, languageCode) as any;
              return (
                <div className="rounded-3xl border border-line bg-white p-6 shadow-sm" key={String(testimonial._id)}>
                  <div className="mb-3 text-accent">{'★'.repeat(testimonial.rating || 5)}</div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: t?.quote || '',
                    }}
                  />
                  <h6 className="mt-4 font-semibold text-dark">{t?.customerName}</h6>
                  <small className="text-muted">{t?.customerLocation}</small>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      <MotionSection className="px-4 py-20 sm:px-6 lg:px-8" delay={0.23}>
        <div className="mx-auto max-w-7xl">
          <AnimatedReveal className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-dark via-primary-deep to-primary p-8 shadow-2xl shadow-dark/20 sm:p-10 lg:p-12">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute bottom-0 left-10 h-32 w-32 rounded-full bg-info/10 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="max-w-3xl">
                <span className="mb-4 inline-flex rounded-full border border-accent/30 bg-accent/15 px-3 py-1 text-sm font-semibold text-accent-light">
                  {ui.homeTailorMadePlanningBadge}
                </span>
                <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Ready to design your next unforgettable journey?
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-line-strong sm:text-lg">
                  From honeymoon escapes to multi-country adventures, our travel specialists shape a personalized itinerary around your pace, budget, and dream destinations.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-light">
                    <Sparkles size={16} className="text-accent" />
                    Personalized itineraries
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-light">
                    <Route size={16} className="text-accent" />
                    Flexible route planning
                  </div>
                </div>

                <Link
                  href="/tailor-made"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-dark shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:bg-accent-light"
                >
                  Start Tailor-Made Plan
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="grid gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15 text-accent-light">
                      <Compass size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Travel design in 3 simple steps</p>
                      <p className="mt-1 text-sm text-line-strong">Tell us your style, we build the plan, and you travel with confidence.</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-accent/20 bg-accent/10 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-light">Fast response</p>
                  <p className="mt-2 text-3xl font-semibold text-white">Within 24 hours</p>
                  <p className="mt-2 text-sm text-line-strong">Our team replies with ideas, recommendations, and next steps tailored to you.</p>
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </MotionSection>
    </>
  );
}
