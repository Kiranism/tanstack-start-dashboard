import SettingsView from "@/features/settings";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/settings")({
  component: RouteComponent,
  loader: () => ({
    crumb: "Settings",
  }),
});

function RouteComponent() {
  return <SettingsView />;
}
