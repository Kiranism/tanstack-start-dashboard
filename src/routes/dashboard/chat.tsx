import { createFileRoute } from '@tanstack/react-router';
import ChatViewPage from '@/features/chat/components/chat-view-page';
import { pageTitle } from '@/lib/seo';

export const Route = createFileRoute('/dashboard/chat')({
  head: () => ({ meta: [{ title: pageTitle('Chat') }] }),
  component: () => <ChatViewPage />
});
