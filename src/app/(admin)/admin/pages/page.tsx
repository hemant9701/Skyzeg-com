import AdminContentManager from '@/components/admin/AdminContentManager';
import { pageConfig } from '@/components/admin/module-configs';

export default function AdminModulePage() {
  return <AdminContentManager config={pageConfig} />;
}
