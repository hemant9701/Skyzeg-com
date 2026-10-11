import AdminContentManager from '@/components/admin/AdminContentManager';
import { regionConfig } from '@/components/admin/module-configs';

export default function AdminRegionPage() {
  return <AdminContentManager config={regionConfig} />;
}
