import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/forms/")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard/forms/basic" });
  },
});
