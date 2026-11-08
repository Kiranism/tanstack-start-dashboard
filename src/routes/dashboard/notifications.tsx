import { createFileRoute } from '@tanstack/react-router';
import NotificationsPage from '@/features/notifications/components/notifications-page';
import { pageTitle } from '@/lib/seo';

export const Route = createFileRoute('/dashboard/notifications')({
  head: () => ({ meta: [{ title: pageTitle('Notifications') }] }),
  component: () => <NotificationsPage />
});
