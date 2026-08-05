import AdminContentManager from '@/components/admin/AdminContentManager';
import { travelTypeConfig } from '@/components/admin/module-configs';

export default function AdminModulePage() {
  return <AdminContentManager config={travelTypeConfig} />;
}
