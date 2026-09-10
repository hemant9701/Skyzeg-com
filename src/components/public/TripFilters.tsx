'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { pickTranslation } from '@/shared/utils/localize';
import TripCard from './TripCard';
import RangeSlider from './RangeSlider';
import { DollarSign, Calendar, MapPin, Plane, Tag, Menu, X, RotateCcw, TrendingUp } from 'lucide-react';
import { getStrings } from '@/lib/ui-strings';

interface FilterState {
  priceMin: number;
  priceMax: number;
  durationMin: number;
  durationMax: number;
  selectedDestinations: string[];
  selectedTravelTypes: string[];
  selectedCategories: string[];
  featuredOnly: boolean;
}

const EMPTY_FILTERS: FilterState = {
  priceMin: 0,
  priceMax: 10000,
  durationMin: 0,
  durationMax: 30,
  selectedDestinations: [],
  selectedTravelTypes: [],
  selectedCategories: [],
  featuredOnly: false
};

export default function TripFilters({
  trips,
  languageCode,
  destinations,
  travelTypes,
  categories,
  initialFilters
}: {
  trips: any[];
  languageCode: string;
  destinations: any[];
  travelTypes: any[];
  categories: any[];
  initialFilters?: Partial<FilterState>;
}) {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const pathname = usePathname();

  const destinationSlugById = useMemo(() => new Map(destinations.map((destination) => [String(destination._id), destination.slug || String(destination._id)])), [destinations]);
  const travelTypeSlugById = useMemo(() => new Map(travelTypes.map((travelType) => [String(travelType._id), travelType.slug || String(travelType._id)])), [travelTypes]);
  const categorySlugById = useMemo(() => new Map(categories.map((category) => [String(category._id), category.slug || String(category._id)])), [categories]);

  // Calculate price range from trips
  const priceRange = useMemo(() => {
    if (trips.length === 0) return { min: 0, max: 10000 };
    const prices = trips.map(t => t.discountPrice || t.price).filter(Boolean);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }, [trips]);

  // Calculate duration range from trips
  const durationRange = useMemo(() => {
    if (trips.length === 0) return { min: 0, max: 30 };
    const durations = trips.map(t => t.durationDays).filter(Boolean);
    return {
      min: Math.min(...durations),
      max: Math.max(...durations)
    };
  }, [trips]);

  const defaultFilters = useMemo<FilterState>(() => ({
    priceMin: priceRange.min,
    priceMax: priceRange.max,
    durationMin: durationRange.min,
    durationMax: durationRange.max,
    selectedDestinations: [],
    selectedTravelTypes: [],
    selectedCategories: [],
    featuredOnly: false
  }), [priceRange, durationRange]);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setFilters({
        ...defaultFilters,
        ...initialFilters,
        selectedDestinations: initialFilters?.selectedDestinations ?? [],
        selectedTravelTypes: initialFilters?.selectedTravelTypes ?? [],
        selectedCategories: initialFilters?.selectedCategories ?? [],
        featuredOnly: initialFilters?.featuredOnly ?? false
      });
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [defaultFilters, initialFilters]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const searchParams = new URLSearchParams(window.location.search);

    const mapIdsToSlugs = (values: string[], lookup: Map<string, string>) =>
      values.map((value) => lookup.get(value) || value).filter(Boolean);

    const syncListParam = (key: string, values: string[]) => {
      if (values.length > 0) {
        searchParams.set(key, values.join(','));
      } else {
        searchParams.delete(key);
      }
    };

    syncListParam('category', mapIdsToSlugs(filters.selectedCategories, categorySlugById));
    syncListParam('destination', mapIdsToSlugs(filters.selectedDestinations, destinationSlugById));
    syncListParam('travel-type', mapIdsToSlugs(filters.selectedTravelTypes, travelTypeSlugById));

    if (filters.featuredOnly) {
      searchParams.set('featured', 'true');
    } else {
      searchParams.delete('featured');
    }

    const durationChanged =
      filters.durationMin !== defaultFilters.durationMin ||
      filters.durationMax !== defaultFilters.durationMax;

    if (durationChanged) {
      searchParams.set('duration', String(filters.durationMin === filters.durationMax ? filters.durationMin : `${filters.durationMin}-${filters.durationMax}`));
    } else {
      searchParams.delete('duration');
    }

    const nextSearch = searchParams.toString();
    const nextUrl = nextSearch ? `${pathname}?${nextSearch}` : pathname;
    const currentUrl = `${window.location.pathname}${window.location.search}`;

    if (nextUrl !== currentUrl) {
      window.history.replaceState(null, '', nextUrl);
    }
  }, [categorySlugById, defaultFilters.durationMax, defaultFilters.durationMin, destinationSlugById, filters.durationMax, filters.durationMin, filters.featuredOnly, filters.selectedCategories, filters.selectedDestinations, filters.selectedTravelTypes, pathname, travelTypeSlugById]);

  const filteredTrips = useMemo(() => {
    return trips.filter(trip => {
      const price = trip.discountPrice || trip.price;
      const matchesPrice = price >= filters.priceMin && price <= filters.priceMax;
      const matchesDuration = trip.durationDays >= filters.durationMin && trip.durationDays <= filters.durationMax;

      const matchesDestination =
        filters.selectedDestinations.length === 0 ||
        filters.selectedDestinations.includes(String(trip.destination._id || trip.destination));

      const matchesTravelType =
        filters.selectedTravelTypes.length === 0 ||
        (trip.travelTypes &&
          trip.travelTypes.some((tt: any) =>
            filters.selectedTravelTypes.includes(String(tt._id || tt))
          ));

      const matchesCategory =
        filters.selectedCategories.length === 0 ||
        (trip.categories &&
          trip.categories.some((c: any) =>
            filters.selectedCategories.includes(String(c._id || c))
          ));

      const matchesFeatured = !filters.featuredOnly || Boolean(trip.isFeatured);

      return matchesPrice && matchesDuration && matchesDestination && matchesTravelType && matchesCategory && matchesFeatured;
    });
  }, [trips, filters]);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, [defaultFilters]);

  const ui = getStrings(languageCode);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-surface to-light">
      {/* Mobile Filter Toggle */}
      <div className="site-sticky-flush-header sticky z-30 bg-white shadow-sm lg:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          <h2 className="font-semibold text-dark">{ui.tripsFilters}</h2>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="rounded-lg border border-line-strong bg-white px-3 py-2 text-sm font-medium text-body hover:bg-surface flex items-center gap-2"
          >
            {showMobileFilters ? (
              <>
                <X size={18} /> {ui.commonClose}
              </>
            ) : (
              <>
                <Menu size={18} /> {ui.tripsFilters}
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
          {/* Sidebar Filters */}
          <aside
            className={`lg:sticky lg:self-start site-sticky-under-header ${
              showMobileFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="site-filter-panel overflow-y-auto rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-dark flex items-center gap-2"><DollarSign size={20} /> {ui.tripsFilters}</h3>
                <button
                  onClick={resetFilters}
                  className="text-xs font-medium text-primary hover:text-primary-hover flex items-center gap-1"
                >
                  <RotateCcw size={14} /> {ui.tripsReset}
                </button>
              </div>

              {/* Price Filter */}
              <div className="mb-6 pb-6 border-b border-line">
                <h4 className="mb-4 font-semibold text-dark flex items-center gap-2"><DollarSign size={18} className="text-primary" /> {ui.tripsPriceRange}</h4>
                <RangeSlider
                  min={priceRange.min}
                  max={priceRange.max}
                  minValue={filters.priceMin}
                  maxValue={filters.priceMax}
                  fromLabel={ui.rangeFrom}
                  toLabel={ui.rangeTo}
                  onChange={(minVal, maxVal) => {
                    setFilters({ ...filters, priceMin: minVal, priceMax: maxVal });
                  }}
                  step={100}
                  format={(value) => `$${value}`}
                />
              </div>

              {/* Duration Filter */}
              <div className="mb-6 pb-6 border-b border-line">
                <h4 className="mb-4 font-semibold text-dark flex items-center gap-2"><Calendar size={18} className="text-primary" /> {ui.tripsDurationFilter}</h4>
                <RangeSlider
                  min={durationRange.min}
                  max={durationRange.max}
                  minValue={filters.durationMin}
                  maxValue={filters.durationMax}
                  fromLabel={ui.rangeFrom}
                  toLabel={ui.rangeTo}
                  onChange={(minVal, maxVal) => {
                    setFilters({ ...filters, durationMin: minVal, durationMax: maxVal });
                  }}
                  step={1}
                  format={(value) => `${value} ${ui.tripsDays}`}
                />
              </div>

              {/* Featured Filter */}
              <div className="mb-6 pb-6 border-b border-line">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-dark">
                  <input
                    type="checkbox"
                    checked={filters.featuredOnly}
                    onChange={(e) => {
                      setFilters({ ...filters, featuredOnly: e.target.checked });
                    }}
                    className="rounded border-line-strong"
                  />
                  <span>{ui.tripsFeaturedOnly}</span>
                </label>
              </div>

              {/* Destinations Filter */}
              {destinations.length > 0 && (
                <div className="mb-6 pb-6 border-b border-line">
                  <h4 className="mb-3 font-semibold text-dark flex items-center gap-2"><MapPin size={18} className="text-primary" /> {ui.tripsDestinationsFilter}</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {destinations.map((dest) => (
                      <label key={dest._id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.selectedDestinations.includes(String(dest._id))}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({
                                ...filters,
                                selectedDestinations: [
                                  ...filters.selectedDestinations,
                                  String(dest._id)
                                ]
                              });
                            } else {
                              setFilters({
                                ...filters,
                                selectedDestinations: filters.selectedDestinations.filter(
                                  (id) => id !== String(dest._id)
                                )
                              });
                            }
                          }}
                          className="rounded border-line-strong"
                        />
                        <span className="text-sm text-body">{(pickTranslation(dest, languageCode) as any)?.title || dest.title}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Travel Types Filter */}
              {travelTypes.length > 0 && (
                <div className="mb-6 pb-6 border-b border-line">
                  <h4 className="mb-3 font-semibold text-dark flex items-center gap-2"><Plane size={18} className="text-primary" /> {ui.tripsTravelTypesFilter}</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {travelTypes.map((type) => (
                      <label key={type._id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.selectedTravelTypes.includes(String(type._id))}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({
                                ...filters,
                                selectedTravelTypes: [
                                  ...filters.selectedTravelTypes,
                                  String(type._id)
                                ]
                              });
                            } else {
                              setFilters({
                                ...filters,
                                selectedTravelTypes: filters.selectedTravelTypes.filter(
                                  (id) => id !== String(type._id)
                                )
                              });
                            }
                          }}
                          className="rounded border-line-strong"
                        />
                        <span className="text-sm text-body">{(pickTranslation(type, languageCode) as any)?.title || type.title}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories Filter */}
              {categories.length > 0 && (
                <div>
                  <h4 className="mb-3 font-semibold text-dark flex items-center gap-2"><Tag size={18} className="text-primary" /> {ui.tripsCategoriesFilter}</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {categories.map((cat) => (
                      <label key={cat._id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.selectedCategories.includes(String(cat._id))}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({
                                ...filters,
                                selectedCategories: [
                                  ...filters.selectedCategories,
                                  String(cat._id)
                                ]
                              });
                            } else {
                              setFilters({
                                ...filters,
                                selectedCategories: filters.selectedCategories.filter(
                                  (id) => id !== String(cat._id)
                                )
                              });
                            }
                          }}
                          className="rounded border-line-strong"
                        />
                        <span className="text-sm text-body">{(pickTranslation(cat, languageCode) as any)?.title || cat.title}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="min-w-0">
            {/* Results Summary */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-primary" />
                <p className="text-sm font-medium text-muted">
                                    {ui.tripsShowing} <span className="font-semibold text-dark">{filteredTrips.length}</span> {ui.tripsOf}{' '}
                  <span className="font-semibold text-dark">{trips.length}</span>
                </p>
              </div>
            </div>

            {/* Trips Grid */}
            {filteredTrips.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredTrips.map((trip) => (
                  <TripCard
                    trip={trip}
                    languageCode={languageCode}
                    key={String(trip._id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-96 items-center justify-center rounded-2xl border-2 border-dashed border-line-strong bg-white">
                <div className="text-center">
                  <p className="text-lg font-semibold text-dark">{ui.tripsNoTrips}</p>
                  <p className="mt-2 text-sm font-medium text-muted">{ui.tripsAdjustFilters}</p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover flex items-center gap-2 mx-auto"
                  >
                    <RotateCcw size={16} /> {ui.tripsResetFilters}
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
