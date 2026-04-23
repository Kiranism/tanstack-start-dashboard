import { createFileRoute, Outlet } from "@tanstack/react-router";
import KBar from "@/components/kbar";
import AppSidebar from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";
import { InfoSidebar } from "@/components/layout/info-sidebar";
import { InfobarProvider } from "@/components/ui/infobar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "TanStack Dashboard Starter" },
      {
        name: "description",
        content: "Dashboard with TanStack Start and Shadcn",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <KBar>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <InfobarProvider defaultOpen={false}>
            <Outlet />
            <InfoSidebar side="right" />
          </InfobarProvider>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
