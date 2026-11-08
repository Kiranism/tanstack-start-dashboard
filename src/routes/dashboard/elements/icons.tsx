import { createFileRoute } from '@tanstack/react-router';
import IconsViewPage from '@/features/elements/components/icons-view-page';
import { pageTitle } from '@/lib/seo';

export const Route = createFileRoute('/dashboard/elements/icons')({
  head: () => ({ meta: [{ title: pageTitle('Icons') }] }),
  component: () => <IconsViewPage />
});
