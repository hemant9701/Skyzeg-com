import AdminContentManager from '@/components/admin/AdminContentManager';
import { destinationConfig } from '@/components/admin/module-configs';

export default function AdminModulePage() {
  return <AdminContentManager config={destinationConfig} />;
}
