import { createFileRoute } from "@tanstack/react-router";
import PageContainer from "@/components/layout/page-container";
import DemoForm from "@/components/forms/demo-form";

export const Route = createFileRoute("/dashboard/forms/basic")({
  head: () => ({ meta: [{ title: "Dashboard: Basic Form" }] }),
  component: () => (
    <PageContainer
      pageTitle="Basic Form"
      pageDescription="A comprehensive form demo with all field types."
    >
      <DemoForm />
    </PageContainer>
  ),
});
