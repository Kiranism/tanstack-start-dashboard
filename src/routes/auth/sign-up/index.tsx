import { createFileRoute } from "@tanstack/react-router";
import SignUpViewPage from "@/features/auth/components/sign-up-view";

export const Route = createFileRoute("/auth/sign-up/")({
  head: () => ({
    meta: [{ title: "Sign Up" }],
  }),
  component: SignUpViewPage,
});
