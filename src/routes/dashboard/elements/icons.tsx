import { createFileRoute } from "@tanstack/react-router";
import IconsViewPage from "@/features/elements/components/icons-view-page";

export const Route = createFileRoute("/dashboard/elements/icons")({
  head: () => ({ meta: [{ title: "Dashboard : Icons" }] }),
  component: () => <IconsViewPage />,
});
