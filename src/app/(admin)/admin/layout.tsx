import { notFound, redirect } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import { AdminRoles, type RoleName } from '@/domain/constants/roles';
import { getCurrentUserFromCookies } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUserFromCookies();

  if (!user) {
    redirect('/admin/login');
  }
  if (!user.roles.some((role) => AdminRoles.includes(role as RoleName))) {
    notFound();
  }

  return <AdminShell>{children}</AdminShell>;
}
