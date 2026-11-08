import { createFileRoute } from '@tanstack/react-router';
import AiChatViewPage from '@/features/ai-chat/components/ai-chat-view-page';
import { pageTitle } from '@/lib/seo';

export const Route = createFileRoute('/dashboard/ai-chat')({
  head: () => ({ meta: [{ title: pageTitle('AI Chat') }] }),
  component: () => <AiChatViewPage />
});
