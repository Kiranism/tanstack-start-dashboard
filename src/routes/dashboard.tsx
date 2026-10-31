import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import CommandPalette from '@/components/command-palette';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { InfoSidebar } from '@/components/layout/info-sidebar';
import { InfobarProvider } from '@/components/ui/infobar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const Route = createFileRoute('/dashboard')({
  // Guard every /dashboard route. Returning the user narrows it to non-null
  // for child routes (`Route.useRouteContext()`).
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({ to: '/auth/sign-in', search: { redirect: location.href } });
    }
    return { user: context.user };
  },
  head: () => ({
    meta: [
      { title: 'TanStack Dashboard Starter' },
      {
        name: 'description',
        content: 'Dashboard with TanStack Start and Shadcn'
      },
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }),
  component: DashboardLayout
});

function DashboardLayout() {
  return (
    <CommandPalette>
      <SidebarProvider>
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md focus:ring-2 focus:ring-ring focus:outline-none'
        >
          Skip to content
        </a>
        <AppSidebar />
        <SidebarInset id='main-content' tabIndex={-1}>
          <Header />
          <InfobarProvider defaultOpen={false}>
            <Outlet />
            <InfoSidebar side='right' />
          </InfobarProvider>
        </SidebarInset>
      </SidebarProvider>
    </CommandPalette>
  );
}
