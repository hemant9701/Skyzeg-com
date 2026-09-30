import { Roles } from './roles';

const contentRoutes = [
  '/admin/pages',
  '/admin/blogs',
  '/admin/destinations',
  '/admin/travel-types',
  '/admin/trips',
  '/admin/categories',
  '/admin/hero-sliders',
  '/admin/testimonials',
  '/admin/faqs'
];

const contentCollections = new Set([
  'pages',
  'blogs',
  'destinations',
  'travelTypes',
  'trips',
  'categories',
  'hero-sliders',
  'testimonials',
  'faqs'
]);

export function canAccessAdminPath(roles: readonly string[], pathname: string) {
  if (roles.includes(Roles.Admin) || roles.includes(Roles.Editor)) return true;
  if (!roles.includes(Roles.ContentManager)) return false;
  return pathname === '/admin' || contentRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function canAccessAdminCollection(roles: readonly string[], collection: string, method: string) {
  if (roles.includes(Roles.Admin)) return true;
  if (roles.includes(Roles.Editor)) return collection !== 'users';
  if (!roles.includes(Roles.ContentManager)) return false;
  if (collection === 'media') return method === 'GET';
  return contentCollections.has(collection) && ['GET', 'POST', 'PUT'].includes(method);
}