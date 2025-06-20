import { AppSidebar } from "@/components/app-sidebar";
import { PathBreadcrumbs } from "@/components/path-breadcrumbs";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserNav } from "@/components/user-nav";
import { getUser, getUsers } from "@/data/users";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ReactNode } from "react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
  loader: async () => await getUser(),
});

export function DashboardLayout() {
  const user = Route.useLoaderData();
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <Card className="m-2 min-h-[calc(100vh-1rem)]">
          <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="h-4" />
              <PathBreadcrumbs />
            </div>
            <div className="flex items-center gap-3">
              <ModeToggle />
              <UserNav user={user} />
            </div>
          </header>
          <main className="flex-1 space-y-4 p-4">
            <Outlet />
          </main>
        </Card>
      </SidebarInset>
    </SidebarProvider>
  );
}
