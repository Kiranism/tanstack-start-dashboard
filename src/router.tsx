import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { NotFound } from '@/components/not-found';
import { RouteError } from '@/components/route-error';
import { routeTree } from './routeTree.gen';

export function getRouter() {
  // A fresh QueryClient per router (i.e. per server request). A module-level
  // client would share one visitor's cached data with every other visitor.
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000
      }
    }
  });

  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    context: { queryClient },
    defaultPendingComponent: () => (
      <div className='flex min-h-[50dvh] flex-1 items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
      </div>
    ),
    defaultNotFoundComponent: () => <NotFound />,
    defaultErrorComponent: RouteError
  });

  // Provides QueryClientProvider and handles dehydration/hydration + streaming.
  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
