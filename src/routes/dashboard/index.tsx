import { createFileRoute } from "@tanstack/react-router";
import { DashboardOverview } from "@/features/overview";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardOverview,
  loader: () => ({
    crumb: "Dashboard",
  }),
});
