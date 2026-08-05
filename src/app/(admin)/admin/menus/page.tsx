import AdminContentManager from '@/components/admin/AdminContentManager';
import { menuConfig } from '@/components/admin/module-configs';

export default function AdminModulePage() {
  return <AdminContentManager config={menuConfig} />;
}
