import { redirect } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import { getCurrentUserFromCookies } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUserFromCookies();

  if (!user) {
    redirect('/admin/login');
  }

  return <AdminShell>{children}</AdminShell>;
}
