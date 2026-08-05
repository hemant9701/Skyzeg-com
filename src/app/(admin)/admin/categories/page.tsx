import AdminContentManager from '@/components/admin/AdminContentManager';
import { categoryConfig } from '@/components/admin/module-configs';

export default function AdminModulePage() {
  return <AdminContentManager config={categoryConfig} />;
}
