import { createFileRoute } from '@tanstack/react-router';
import AiChatViewPage from '@/features/ai-chat/components/ai-chat-view-page';

export const Route = createFileRoute('/dashboard/ai-chat')({
  head: () => ({ meta: [{ title: 'Dashboard: AI Chat' }] }),
  component: () => <AiChatViewPage />
});
