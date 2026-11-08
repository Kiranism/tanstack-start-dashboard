import { createFileRoute } from '@tanstack/react-router';
import KanbanViewPage from '@/features/kanban/components/kanban-view-page';
import { pageTitle } from '@/lib/seo';

export const Route = createFileRoute('/dashboard/kanban')({
  head: () => ({ meta: [{ title: pageTitle('Kanban') }] }),
  component: () => <KanbanViewPage />
});
