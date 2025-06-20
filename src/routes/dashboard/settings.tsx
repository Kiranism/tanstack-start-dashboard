import SettingsView from "@/features/settings";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingsView />;
}
