import { isValidObjectId } from 'mongoose';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';

type QueryValue = string | string[] | undefined;

export interface TripListQuery {
  search?: string;
  category?: QueryValue;
  destination?: QueryValue;
  'travel-type'?: QueryValue;
  featured?: QueryValue;
  duration?: QueryValue;
  admin?: boolean;
}

export interface TripInitialFilters {
  selectedDestinations: string[];
  selectedTravelTypes: string[];
  selectedCategories: string[];
  featuredOnly: boolean;
  durationMin?: number;
  durationMax?: number;
}

export interface TripQueryResult {
  filter: Record<string, unknown>;
  initialFilters: TripInitialFilters;
}

export async function populateTripReferences(uow: UnitOfWork, trips: any[]) {
  const getReferenceId = (reference: any) => String(reference?._id ?? reference ?? '');
  const getIds = (references: any[]) => Array.from(new Set(references.map(getReferenceId).filter(Boolean)));
  const destinationIds = getIds(trips.map((trip) => trip.destination));
  const travelTypeIds = getIds(trips.flatMap((trip) => trip.travelTypes || []));
  const categoryIds = getIds(trips.flatMap((trip) => trip.categories || []));

  const [destinations, travelTypes, categories] = await Promise.all([
    destinationIds.length ? uow.destinations.list({ _id: { $in: destinationIds }, isVisible: true }) : [],
    travelTypeIds.length ? uow.travelTypes.list({ _id: { $in: travelTypeIds }, isVisible: true }) : [],
    categoryIds.length ? uow.categories.list({ _id: { $in: categoryIds }, isVisible: true }) : []
  ]);

  const resolveReference = (reference: any, records: any[]) => {
    if (reference && typeof reference === 'object' && (reference.translations || reference.slug || reference.name || reference.title)) {
      return reference;
    }
    const id = getReferenceId(reference);
    return records.find((record) => String(record._id) === id) || null;
  };

  return trips.map((trip) => ({
    ...trip,
    destination: resolveReference(trip.destination, destinations),
    travelTypes: Array.isArray(trip.travelTypes)
      ? trip.travelTypes.map((reference: any) => resolveReference(reference, travelTypes)).filter(Boolean)
      : [],
    categories: Array.isArray(trip.categories)
      ? trip.categories.map((reference: any) => resolveReference(reference, categories)).filter(Boolean)
      : []
  }));
}

function normalizeQueryValues(value: QueryValue): string[] {
  if (Array.isArray(value)) return value.flatMap((entry) => normalizeQueryValues(entry));
  if (!value) return [];
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function normalizeQueryValue(value: QueryValue): string {
  return normalizeQueryValues(value)[0] || '';
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseBooleanValue(value: QueryValue) {
  const normalized = normalizeQueryValue(value).toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
}

function parseDurationValue(value: QueryValue): { min: number; max: number } | null {
  const normalized = normalizeQueryValue(value);
  if (!normalized) return null;

  const rangeMatch = normalized.match(/^(\d+)\s*(?:-|\.\.|,|:)\s*(\d+)$/);
  if (rangeMatch) {
    const first = Number(rangeMatch[1]);
    const second = Number(rangeMatch[2]);
    if (Number.isFinite(first) && Number.isFinite(second)) {
      return { min: Math.min(first, second), max: Math.max(first, second) };
    }
  }

  const exact = Number(normalized);
  if (!Number.isFinite(exact)) return null;
  return { min: exact, max: exact };
}

async function resolveReferencedIds(
  uow: UnitOfWork,
  values: string[],
  repository: 'categories' | 'destinations' | 'travelTypes',
  publicOnly: boolean
): Promise<string[]> {
  const resolvedIds: string[] = [];
  for (const value of values) {
    const orConditions: Record<string, unknown>[] = [{ slug: value }];
    if (isValidObjectId(value)) {
      orConditions.unshift({ _id: value });
    }

    const filter: Record<string, unknown> = { $or: orConditions };
    if (publicOnly) filter.isVisible = true;

    const doc = await uow[repository].findOne(filter);
    if (doc?._id) resolvedIds.push(String(doc._id));
  }

  return Array.from(new Set(resolvedIds));
}

function addArrayFilter(filter: Record<string, unknown>, key: string, values: string[]) {
  if (!values.length) return;
  filter[key] = values.length === 1 ? values[0] : { $in: values };
}

export async function buildTripQuery(uow: UnitOfWork, query: TripListQuery = {}): Promise<TripQueryResult> {
  const filter: Record<string, unknown> = query.admin ? {} : { isVisible: true };
  const search = normalizeQueryValue(query.search);
  const categories = normalizeQueryValues(query.category);
  const destinations = normalizeQueryValues(query.destination);
  const travelTypes = normalizeQueryValues(query['travel-type']);
  const featuredOnly = parseBooleanValue(query.featured);
  const duration = parseDurationValue(query.duration);

  if (search) {
    filter.$or = [
      { slug: { $regex: search, $options: 'i' } },
      { 'translations.title': { $regex: search, $options: 'i' } }
    ];
  }

  const [resolvedCategories, resolvedDestinations, resolvedTravelTypes] = await Promise.all([
    resolveReferencedIds(uow, categories, 'categories', !query.admin),
    resolveReferencedIds(uow, destinations, 'destinations', !query.admin),
    resolveReferencedIds(uow, travelTypes, 'travelTypes', !query.admin)
  ]);

  addArrayFilter(filter, 'categories', resolvedCategories);
  addArrayFilter(filter, 'destination', resolvedDestinations);
  addArrayFilter(filter, 'travelTypes', resolvedTravelTypes);

  if (featuredOnly) {
    filter.isFeatured = true;
  }

  if (duration) {
    filter.durationDays = duration.min === duration.max ? duration.min : { $gte: duration.min, $lte: duration.max };
  }

  return {
    filter,
    initialFilters: {
      selectedCategories: resolvedCategories,
      selectedDestinations: resolvedDestinations,
      selectedTravelTypes: resolvedTravelTypes,
      featuredOnly,
      durationMin: duration?.min,
      durationMax: duration?.max
    }
  };
}