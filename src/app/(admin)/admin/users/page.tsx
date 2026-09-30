import UserManager from '@/components/admin/UserManager';
import { Roles } from '@/domain/constants/roles';
import { getCurrentUserFromCookies } from '@/lib/auth';

export default async function AdminUsersPage() {
  const user = await getCurrentUserFromCookies();
  return <UserManager canManageUsers={Boolean(user?.roles.includes(Roles.Admin))} />;
}
