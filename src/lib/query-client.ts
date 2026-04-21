import { QueryClient } from "@tanstack/react-query";

// Singleton query client for use in mutation options and other non-component code.
// In TanStack Start, the primary queryClient lives in the router context,
// but mutations defined outside components need a reference too.
let queryClient: QueryClient | undefined;

export function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    });
  }
  return queryClient;
}

export function setQueryClient(client: QueryClient) {
  queryClient = client;
}
