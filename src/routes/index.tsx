import SignInViewPage from "@/features/auth/sign-in-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: SignInViewPage,
});
