import { createFileRoute } from "@tanstack/react-router";
import ChatViewPage from "@/features/chat/components/chat-view-page";

export const Route = createFileRoute("/dashboard/chat")({
  head: () => ({ meta: [{ title: "Dashboard: Chat" }] }),
  component: () => <ChatViewPage />,
});
