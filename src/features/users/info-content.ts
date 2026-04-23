import type { InfobarContent } from '@/components/ui/infobar';

export const usersInfoContent: InfobarContent = {
  title: 'Users — React Query + Search Params Pattern',
  sections: [
    {
      title: 'Overview',
      description:
        'This page demonstrates data fetching with React Query combined with TanStack Router search params for URL state. The route loader prefetches data on the server, and the client uses useSuspenseQuery for cache-first rendering.',
      links: [
        {
          title: 'TanStack Query SSR Docs',
          url: 'https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr'
        }
      ]
    },
    {
      title: 'Route Loader + Client Hydration',
      description:
        "The route's loader function calls queryClient.ensureQueryData() to prefetch data on the server. TanStack Router with Query automatically handles dehydration and hydration — the client starts with cached data, no loading spinner on first render.",
      links: []
    },
    {
      title: 'URL State with TanStack Router',
      description:
        "Pagination, search, and role filters are synced to the URL via TanStack Router's search params (validateSearch + useSearch). The useDataTable hook manages TanStack Table state and debounces filter changes before updating the URL. When the URL changes, React Query automatically refetches because the query key includes the filters.",
      links: [
        {
          title: 'TanStack Router Search Params',
          url: 'https://tanstack.com/router/latest/docs/framework/react/guide/search-params'
        }
      ]
    },
    {
      title: 'Products vs Users Pattern',
      description:
        'Both pages use the same architecture: route loader prefetch → client useSuspenseQuery → useDataTable for table state. The pattern enables background refetching, cache sharing across components, and optimistic mutations.',
      links: []
    }
  ]
};
