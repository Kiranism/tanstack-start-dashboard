import { createFileRoute } from '@tanstack/react-router';
import NotificationsPage from '@/features/notifications/components/notifications-page';

export const Route = createFileRoute('/dashboard/notifications')({
  head: () => ({ meta: [{ title: 'Dashboard: Notifications' }] }),
  component: () => <NotificationsPage />
});
