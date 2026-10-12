import { getCurrentUserFromCookies } from '@/lib/auth';
import { canAccessAdminPath } from '@/domain/constants/admin-permissions';
import AdminPanel, { type AdminNavigationItem } from './AdminPanel';

const navItems: AdminNavigationItem[] = [
  { label: 'Dashboard', href: '/admin', icon: 'dashboard', group: '' },
  { label: 'Pages', href: '/admin/pages', icon: 'pages', group: 'Content' },
  { label: 'Blogs', href: '/admin/blogs', icon: 'blogs', group: 'Content' },
  { label: 'Categories', href: '/admin/categories', icon: 'categories', group: 'Content' },
  { label: 'Media', href: '/admin/media', icon: 'media', group: 'Content' },
  { label: 'Destinations', href: '/admin/destinations', icon: 'destinations', group: 'Travel' },
  { label: 'Regions', href: '/admin/regions', icon: 'regions', group: 'Travel' },
  { label: 'Places', href: '/admin/places', icon: 'places', group: 'Travel' },
  { label: 'Travel Types', href: '/admin/travel-types', icon: 'types', group: 'Travel' },
  { label: 'Trips', href: '/admin/trips', icon: 'trips', group: 'Travel' },
  { label: 'Bookings', href: '/admin/bookings', icon: 'bookings', group: 'Travel' },
  { label: 'Hero Slider', href: '/admin/hero-sliders', icon: 'sliders', group: 'Website' },
  { label: 'Testimonials', href: '/admin/testimonials', icon: 'testimonials', group: 'Website' },
  { label: 'FAQ', href: '/admin/faqs', icon: 'faqs', group: 'Website' },
  { label: 'Menus', href: '/admin/menus', icon: 'menus', group: 'Website' },
  { label: 'Settings', href: '/admin/settings', icon: 'settings', group: 'Administration' },
  { label: 'Users', href: '/admin/users', icon: 'users', group: 'Administration' }
];

export default async function AdminShell({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUserFromCookies();
  return <AdminPanel items={navItems.filter(({ href }) => user && canAccessAdminPath(user.roles, href))} fullName={user?.fullName || 'Admin'} email={user?.email || ''}>{children}</AdminPanel>;
}
