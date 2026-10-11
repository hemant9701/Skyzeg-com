import AdminContentManager from '@/components/admin/AdminContentManager';
import { placeConfig } from '@/components/admin/module-configs';

export default function AdminPlacePage() {
  return <AdminContentManager config={placeConfig} />;
}
